'use client';

import { NavigationMenu } from '@/components/Navmenu';
import { Column, TablePagination } from '@/components/table';
import { Button } from '@/components/ui/button';
import { useGetAPI } from '@/hooks/use-api';
import { Articleblog } from '@/interfaces/Aricleblog';
import { ApiPaginatedResponse } from '@/interfaces/ResponseList';
import { formatDateToBuddhistEra } from '@/utils/date-format';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Articlelist() {
  const router = useRouter();

  const [articleblog, loading, fetchData] = useGetAPI<
    ApiPaginatedResponse<Articleblog>
  >('articleblog/', {
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const columns: Column<Articleblog>[] = [
    // {
    //   key: 'id',
    //   title: 'รหัสคำสั่งซื้อ',
    // },
    {
      key: 'title',
      title: 'หัวข้อ',
    },
    {
      key: 'created_at',
      title: 'วันที่สร้าง',
      render: ({ created_at }) => {
        return <>{formatDateToBuddhistEra(created_at)}</>;
      },
    },
    {
      key: 'is_active',
      title: 'สถานะ',
      render: ({ is_active }) => <> {is_active ? 'ใช้งาน' : 'ปิดการใช้งาน'}</>,
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
                  router.push(`/BOM/articlemanagement/edit/${row.id}`)
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
            data={articleblog?.data || []}
            columns={columns}
            totalItems={articleblog?.pagination.total ?? 0}
            page={1}
            limit={10}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </>
  );
}
