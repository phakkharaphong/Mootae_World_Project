'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageCard from '@/components/PageCard';
import { DataTable } from '@/components/data-table/DataTable';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Article } from '@/models/article.model';
import { useQuery } from '@tanstack/react-query';
import { Paginated } from '@/models/common/paginated';
import { api } from '@/lib/api';
import { useState } from 'react';
import { formatDateBEWithTime } from '@/lib/date-formatter';
import { ButtonGroup } from '@/components/ui/button-group';
import { EditIcon, Trash2Icon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateArticleForm from './FormCreate';
import DeleteArticleForm from './FormDelete';
import StatusBadge from '@/components/StatusBadge';

export default function ArticlesPage() {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const { data, isLoading, isFetching, refetch } = useQuery<Paginated<Article>>(
    {
      queryKey: ['articles'],
      queryFn: async () =>
        await api
          .get<
            Paginated<Article>
          >(`blog?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
          .json(),
    }
  );

  const handleClickDelete = (article: Article) => {
    setSelectedArticle(article);
    setIsDialogDeleteOpen(true);
  };

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: 'title',
      header: 'ชื่อ',
    },
    {
      accessorKey: 'is_active',
      header: 'สถานะ',
      cell: ({ row }) => <StatusBadge active={row.original.is_active} />,
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
      header: 'การจัดการ',
      cell: ({ row }) => (
        <ButtonGroup className="*:shadow-none">
          <Button
            asChild
            variant="outline"
            className="text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
          >
            <Link href={`/BOM/articles/edit/${row.original.id}`}>
              <EditIcon />
              แก้ไข
            </Link>
          </Button>
          <Button
            onClick={() => handleClickDelete(row.original)}
            variant="outline"
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2Icon />
            ลบ
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  const handleSuccessCreate = () => {
    setIsDialogCreateOpen(false);
    setSelectedArticle(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessDelete = () => {
    setIsDialogDeleteOpen(false);
    setSelectedArticle(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  return (
    <PageCard title="บทความ">
      <div className="mb-2 flex justify-end">
        <Button onClick={() => setIsDialogCreateOpen(true)}>เพิ่มบทความ</Button>
      </div>
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

      <Dialog open={isDialogCreateOpen} onOpenChange={setIsDialogCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">เพิ่มบทความ</DialogTitle>
          </DialogHeader>
          <CreateArticleForm onSuccess={handleSuccessCreate} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogDeleteOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedArticle(null);
          setIsDialogDeleteOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">ลบบทความ</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <DeleteArticleForm
              articleId={selectedArticle.id}
              onSuccess={handleSuccessDelete}
              onCancel={() => {
                setIsDialogDeleteOpen(false);
                setSelectedArticle(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageCard>
  );
}
