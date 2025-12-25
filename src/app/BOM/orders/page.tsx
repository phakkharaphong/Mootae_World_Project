'use client';

import { useState } from 'react';
import { Order } from '@/interfaces/Order';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { Paginated } from '@/models/common/paginated';
import { api } from '@/lib/api';
import PageCard from '@/components/PageCard';
import { DataTable } from '@/components/data-table/DataTable';
import { formatDateBEWithTime } from '@/lib/date-formatter';

export default function OrderTracking() {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

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

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'รหัสคำสั่งซื้อ',
    },
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
      accessorKey: 'is_active',
      header: 'สถานะ',
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
    </PageCard>
  );
}
