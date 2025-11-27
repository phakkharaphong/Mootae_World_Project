'use client';
import { NavigationMenu } from '@/components/Navmenu';
import { Column, TablePagination } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { orderService } from '@/hooks/use-api-orderService';
import { Order } from '@/interfaces/Order';
import { formatDateToBuddhistEra } from '@/utils/date-format';
import { usePagination } from '@/utils/use-pagination';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderTracking() {
  const router = useRouter();
  const { pageIndex, setPageIndex, pageSize } = usePagination({
    totalItems: 0,
    pageSize: 10,
    initialPage: 1,
    maxButtons: 5,
  });
  const [orders, setOrders] = useState<Order[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await orderService.getall(pageIndex, pageSize);
      setOrders(data);
    };
    fetchData();
  }, [pageIndex, pageSize]);

  const columns: Column<Order>[] = [
    // {
    //   key: 'id',
    //   title: 'รหัสคำสั่งซื้อ',
    // },
    {
      key: 'id',
      title: 'หมายเลขคำสั่งซื้อ',
    },
    {
      key: 'created_at',
      title: 'วันที่สร้าง',
      render: ({ created_at }) => {
        return <>{formatDateToBuddhistEra(created_at)}</>;
      },
    },
    {
      key: 'payment_status',
      title: 'สถานะ',
      render: ({ payment_status }) => (
        <Badge
          className={
            payment_status === 'รอการชำระ'
              ? 'bg-yellow-500 text-white'
              : payment_status === 'ชำระเงินแล้ว'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
          }
        >
          {payment_status}
        </Badge>
      ),
    },
    {
      key: 'id',
      title: 'การจัดการ',
      render: (row) => {
        return (
          <>
            <div className="flex gap-2">
              <Button
                className="bg-primary hover:bg-blue-300"
                onClick={() =>
                  router.push(`/BOM/orders-tracking/edit/${row.id}`)
                }
              >
                แก้ไข
              </Button>
              <Button className="bg-primary hover:bg-blue-300">
                <Link href="">ลบ</Link>
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <NavigationMenu />
        </div>

        {/* Right Content */}
        <div className="w-6 flex-1 bg-white p-6">
          <div className="flex justify-end">
            <Button className="m-5 p-3">
              <Link href={'/BOM/articlemanagement/create'}>เพิ่มบทความ</Link>
            </Button>
          </div>
          <TablePagination
            data={orders || []}
            columns={columns || []}
            totalItems={pageSize}
            page={pageIndex}
            limit={pageSize}
            onPageChange={setPageIndex}
          />
        </div>
      </div>
    </>
  );
}
