'use client';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import PageCard from '@/components/PageCard';
import { DataTable } from '@/components/data-table/DataTable';

import { api } from '@/lib/api';

type OrderRow = {
  id: string;
  first_name_customer?: string;
  frist_name_customer?: string;
  last_name_customer?: string;
  email: string;
  total_price: number;
  payment_status?: string;
  created_at?: string;
};

function normalizePaymentStatus(status?: string) {
  return (status ?? '').trim().toLowerCase();
}

function PaymentStatusCell({
  orderId,
  status,
}: {
  orderId: string;
  status?: string;
}) {
  const normalized = normalizePaymentStatus(status);

  if (!normalized) return <span>-</span>;

  if (normalized === 'payment pending' || normalized === 'pending') {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline">Payment Pending</Badge>
        <Button asChild size="sm" variant="secondary">
          <Link href={`/Orders/payment/${orderId}`}>Pay</Link>
        </Button>
      </div>
    );
  }

  if (normalized === 'completed') {
    return <Badge>Completed</Badge>;
  }

  if (normalized === 'verifying') {
    return <Badge variant="secondary">Verifying</Badge>;
  }

  return <Badge variant="outline">{status}</Badge>;
}

function normalizeOrdersResponse(payload: unknown): OrderRow[] {
  if (!payload) return [];

  if (Array.isArray(payload)) {
    return payload as OrderRow[];
  }

  if (typeof payload === 'object') {
    const obj = payload as { data?: unknown };
    if (Array.isArray(obj.data)) return obj.data as OrderRow[];
  }

  return [];
}

function formatTHB(value: number) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const columns = useMemo<ColumnDef<OrderRow>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Order ID',
        cell: ({ row }) => row.original.id,
        enableSorting: false,
      },
      {
        id: 'name',
        header: 'Customer',
        cell: ({ row }) => {
          const first =
            row.original.first_name_customer ??
            row.original.frist_name_customer ??
            '';
          const last = row.original.last_name_customer ?? '';
          return `${first} ${last}`.trim() || '-';
        },
        enableSorting: false,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => row.original.email,
        enableSorting: false,
      },
      {
        accessorKey: 'total_price',
        header: 'Total',
        cell: ({ row }) => formatTHB(Number(row.original.total_price ?? 0)),
        enableSorting: false,
      },
      {
        accessorKey: 'payment_status',
        header: 'Payment',
        cell: ({ row }) => (
          <PaymentStatusCell
            orderId={row.original.id}
            status={row.original.payment_status}
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }) => row.original.created_at ?? '-',
        enableSorting: false,
      },
    ],
    []
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const emailParam = (searchParams.get('email') ?? '').trim();
  const [emailInput, setEmailInput] = useState(emailParam);

  useEffect(() => {
    setEmailInput(emailParam);
  }, [emailParam]);

  const {
    data: orders = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['orders-by-email', emailParam, pagination.pageIndex, pagination.pageSize],
    enabled: emailParam.length > 0,
    queryFn: async () => {
      const payload = await api
        .get(`order/by-email/${emailParam}?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
        .json<unknown>();

      return normalizeOrdersResponse(payload);
    },
  });


  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [emailParam]);

  const pageCount = Math.max(
    1,
    Math.ceil(orders.length / Math.max(1, pagination.pageSize))
  );

  const pagedOrders = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return orders.slice(start, end);
  }, [orders, pagination.pageIndex, pagination.pageSize]);

  

  return (
    <PageCard title="Orders">
      <div className="mb-6 rounded-xl border bg-muted/30 p-4 sm:p-6">
        <h2 className="mb-1 text-lg font-semibold">ค้นหาคำสั่งซื้อ</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          กรุณากรอกอีเมลที่ใช้สั่งซื้อ เพื่อดูรายการคำสั่งซื้อของคุณ
        </p>

        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
          onSubmit={(e) => {
            e.preventDefault();
            const next = new URLSearchParams(searchParams.toString());
            const nextEmail = emailInput.trim();

            if (nextEmail) next.set('email', nextEmail);
            else next.delete('email');

            const query = next.toString();
            router.push(query ? `?${query}` : globalThis.location.pathname);
          }}
        >
          <Input
            type="email"
            placeholder="example@email.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="sm:max-w-sm"
          />
          <Button type="submit" className="sm:w-auto">
            ค้นหา
          </Button>
        </form>
      </div>

      {!emailParam ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          กรุณากรอกอีเมลแล้วกดค้นหา เพื่อดูคำสั่งซื้อของคุณ
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              ไม่สามารถโหลดข้อมูลคำสั่งซื้อได้
            </div>
          )}

          <DataTable
            data={pagedOrders}
            columns={columns}
            isLoading={isLoading}
            isRefreshing={isFetching && !isLoading}
            pagination={pagination}
            onPaginationChange={setPagination}
            pageCount={pageCount}
          />

          {!isLoading && pagedOrders.length === 0 && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              ไม่พบคำสั่งซื้อสำหรับอีเมลนี้
            </div>
          )}
        </>
      )}
    </PageCard>
  );
}
