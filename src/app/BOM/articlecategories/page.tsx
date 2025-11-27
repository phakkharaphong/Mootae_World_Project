'use client';

import { NavigationMenu } from '@/components/Navmenu';
import { Column, TablePagination } from '@/components/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { articleCatService } from '@/hooks/use-api-catearticleservice';
import { Articlecategories } from '@/interfaces/Articlecategories';
import { formatDateToBuddhistEra } from '@/utils/date-format';
import { usePagination } from '@/utils/use-pagination';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ArticleCategories() {
  const router = useRouter();
  const { pageIndex, setPageIndex, pageSize } = usePagination({
    totalItems: 0,
    pageSize: 10,
    initialPage: 1,
    maxButtons: 5,
  });

  const [aricleCategories, setArticleCategories] = useState<
    Articlecategories[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await articleCatService.getAll(pageIndex, pageSize);
      setArticleCategories(data);
    };
    fetchData();
  }, [pageIndex, pageSize]);

  const columns: Column<Articlecategories>[] = [
    {
      key: 'name',
      title: 'ชื่อหมวดหมู่',
    },
    {
      key: 'is_active',
      title: 'สถานะการใช้งาน',

      render: ({ is_active }) => (
        <Badge className={is_active ? 'bg-green-600' : 'bg-red-600'}>
          {is_active ? 'ใช้งาน' : 'ปิดการใช้งาน'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      title: 'วันที่สร้าง',
      render: ({ created_at }) => {
        return <>{formatDateToBuddhistEra(created_at)}</>;
      },
    },
    {
      key: 'created_by',
      title: 'สร้างโดย',
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
              <Link href={'/BOM/articlemanagement/create'}>เพิ่มหมวดหมู่</Link>
            </Button>
          </div>
          <TablePagination
            data={aricleCategories || []}
            columns={columns}
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
