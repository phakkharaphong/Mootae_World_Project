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
import { ButtonGroup } from '@/components/ui/button-group';
import { EditIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import DetailOrder from './detail/[id]/page';


type OrderRow = {
  id: string;
  order_no: string;
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
  const [isDialogPreviweOpen, setIsDialogPreviweOpen] = useState(false);


  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  const handleClicPreview = (order: OrderRow) => {
    setSelectedOrder(order);
    setIsDialogPreviweOpen(true);
  };


  const columns = useMemo<ColumnDef<OrderRow>[]>(
    () => [
      {
        accessorKey: 'order_no',
        header: 'Order ID',
        cell: ({ row }) => row.original.order_no,
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
        cell: ({ row }) => {
          const status = row.original.payment_status;

          let color = '';
          let text = '';
          if (status === 'Verifying') {
            color = 'bg-blue-100 text-blue-700';
            text = 'รอแอดมินตรวจสอบ';
          } else if (status === 'Completed') {
            color = 'bg-green-100 text-green-700';
            text = 'เสร็จสิ้น';
          } else if (status === 'Rejected') {
            color = 'bg-red-100 text-red-700';
            text = 'ยกเลิก';
          } else if (status === 'Pending') {
            // color = 'bg-yellow-100 text-yellow-700';

            return (
              <div className="flex items-center gap-2">
                <div className='bg-yellow-100 text-yellow-700 p-1 rounded-sm'>รอชำระเงิน</div>
                <Button asChild size="sm" variant="secondary">
                  <Link href={`/Orders/payment/${row.original.id}`}>ชำระเงิน</Link>
                </Button>
              </div>
            )
          } else {
            color = 'bg-gray-100 text-gray-700';
          }


          return (
            <span
              className={`rounded-md px-2 py-1 text-sm font-medium ${color}`}
            >
              {text}
            </span>
          );
        },
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }) => row.original.created_at ?? '-',
        enableSorting: false,
      },
      {
        accessorKey: 'updated_by',
        header: 'แก้ไขล่าสุดโดย',
      },
      {
        accessorKey: 'actions',
        header: 'จัดการ',
        cell: ({ row }) => (
          <ButtonGroup className="*:shadow-none">
            <Button
              onClick={() => handleClicPreview(row.original)}
              variant="outline"
              className="text-gray-900 hover:bg-gray-400 hover:text-gray-500"
            >
              <EditIcon />
              ตรวจสอบคำสั่งซื้อ
            </Button>

          </ButtonGroup>
        ),
      },
    ],
    []
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  type SearchMode = 'email' | 'order';

  const [searchMode, setSearchMode] = useState<SearchMode>('order');

  const emailParam = (searchParams.get('email') ?? '').trim();
  const orderParam = (searchParams.get('order_no') ?? '').trim();

  const [emailInput, setEmailInput] = useState(emailParam);
  const [orderInput, setOrderInput] = useState(orderParam);

  useEffect(() => {
    setEmailInput(emailParam);
  }, [emailParam]);

  const activeParam = searchMode === 'email' ? emailParam : orderParam;

  const {
    data: orders = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [
      'orders',
      searchMode,
      activeParam,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    enabled: activeParam.length > 0,
    queryFn: async () => {
      const endpoint =
        searchMode === 'email'
          ? `order/by-email/${activeParam}`
          : `order/by-order-number/${activeParam}`;

      const payload = await api
        .get(`${endpoint}?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
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
    <>
      <PageCard title="ตรวจสอบสถานการสั่งซื้อ">
        <div className="mb-4 flex gap-2">
          <Button
            size="sm"
            variant={searchMode === 'order' ? 'default' : 'outline'}
            onClick={() => {
              setSearchMode('order');
              setPagination((p) => ({ ...p, pageIndex: 0 }));
            }}
          >
            ค้นหาด้วยหมายเลขคำสั่งซื้อ
          </Button>

          <Button
            size="sm"
            variant={searchMode === 'email' ? 'default' : 'outline'}
            onClick={() => {
              setSearchMode('email');
              setPagination((p) => ({ ...p, pageIndex: 0 }));
            }}
          >
            ค้นหาด้วยอีเมล
          </Button>


        </div>
        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-center p-2"
          onSubmit={(e) => {
            e.preventDefault();
            const next = new URLSearchParams(searchParams.toString());

            if (searchMode === 'email') {
              emailInput ? next.set('email', emailInput) : next.delete('email');
              next.delete('order_no');
            } else {
              orderInput ? next.set('order_no', orderInput) : next.delete('order_no');
              next.delete('email');
            }

            router.push(next.toString() ? `?${next}` : location.pathname);
          }}
        >
          <Input
            type={searchMode === 'email' ? 'email' : 'text'}
            placeholder={
              searchMode === 'email'
                ? 'example@email.com'
                : 'กรอกหมายเลขคำสั่งซื้อ'
            }
            value={searchMode === 'email' ? emailInput : orderInput}
            onChange={(e) =>
              searchMode === 'email'
                ? setEmailInput(e.target.value)
                : setOrderInput(e.target.value)
            }
            className="sm:max-w-sm"
          />
          <Button type="submit">ค้นหา</Button>
        </form>



        {!activeParam ? (
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

        <Dialog
          open={isDialogPreviweOpen}
          onOpenChange={(open) => {
            if (!open) setSelectedOrder(null);
            setIsDialogPreviweOpen(open);
          }}
        >
          <DialogContent
            className="max-h-150 overflow-y-auto sm:max-w-2xl"
          >
            <DialogHeader>
              <DialogTitle className="text-center">
                ยืนยันการตรวจสอบ
              </DialogTitle>
            </DialogHeader>

            {selectedOrder?.id && (
              <DetailOrder orderId={selectedOrder.id} />
            )}
          </DialogContent>
        </Dialog>

      </PageCard>
    </>
  );
}
