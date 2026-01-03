'use client';

import { useState } from 'react';

import { Order } from '@/interfaces/Order';
import { Paginated } from '@/models/common/paginated';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { EditIcon, Trash2Icon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import PageCard from '@/components/PageCard';
import { DataTable } from '@/components/data-table/DataTable';

import { api } from '@/lib/api';
import { formatDateBEWithTime } from '@/lib/date-formatter';

import VerifyOrderForm from './VerifyOrderForm';

export default function OrderTracking() {
  const [isDialogVerifyOpen, setIsDialogVerifyOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: async () =>
      await api
        .get<
          Paginated<Order>
        >(`order?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
        .json(),
  });

  const handleClickVerify = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogVerifyOpen(true);
  };

  const handleSuccessVerify = () => {
    setIsDialogVerifyOpen(false);
    setSelectedOrder(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'first_name_customer',
      header: 'ชื่อลูกค้า',
    },
    {
      accessorKey: 'last_name_customer',
      header: 'นามสกุลลูกค้า',
    },
    {
      accessorKey: 'phone',
      header: 'เบอร์โทรศัพท์',
    },
    {
      accessorKey: 'email',
      header: 'อีเมล',
    },
    {
      accessorKey: 'total_price',
      header: 'ราคารวม',
    },
    {
      accessorKey: 'payment_status',
      header: 'สถานะ',
      cell: ({ row }) => <Badge>{row.original.payment_status}</Badge>,
    },
    {
      accessorKey: 'created_at',
      header: 'วันที่สร้าง',
      cell: ({ row }) => {
        const createdAt = row.original.created_at;
        return (
          <span>
            {createdAt ? formatDateBEWithTime(new Date(createdAt)) : ''}
          </span>
        );
      },
    },
    {
      accessorKey: 'created_by',
      header: 'สร้างโดย',
    },
    {
      accessorKey: 'updated_at',
      header: 'วันที่แก้ไขล่าสุด',
      cell: ({ row }) => {
        const updatedAt = row.original.updated_at;
        return (
          <span>
            {updatedAt ? formatDateBEWithTime(new Date(updatedAt)) : ''}
          </span>
        );
      },
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
          {row.original.payment_status.toLowerCase() === 'verifying' && (
            <>
              <Button
                onClick={() => handleClickVerify(row.original)}
                variant="outline"
                className="text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
              >
                <EditIcon />
                ยืนยันการตรวจสอบ
              </Button>
              <Button
                onClick={() => handleClickVerify(row.original)}
                variant="outline"
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <EditIcon />
                ปฏิเสธการสั่งซื้อ
              </Button>
            </>
          )}
        </ButtonGroup>
      ),
    },
  ];

  return (
    <PageCard title="รายการสั่งซื้อ">
      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        isRefreshing={isFetching}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={Math.ceil(
          (data?.pagination.total || 0) / pagination.pageSize
        )}
      />

      <Dialog
        open={isDialogVerifyOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
          setIsDialogVerifyOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">ยืนยันการตรวจสอบ</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <VerifyOrderForm
              orderId={selectedOrder.id}
              onSuccess={handleSuccessVerify}
              onCancel={() => {
                setIsDialogVerifyOpen(false);
                setSelectedOrder(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageCard>
  );
}
