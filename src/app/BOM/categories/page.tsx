'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { Paginated } from '@/models/common/paginated';
import { Category } from '@/models/category.model';
import { api } from '@/lib/api';
import PageCard from '@/components/PageCard';
import { DataTable } from '@/components/data-table/DataTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CreateCategoryForm from './FormCreate';
import { formatDateBEWithTime } from '@/lib/date-formatter';
import { ButtonGroup } from '@/components/ui/button-group';
import { EditIcon, Trash2Icon } from 'lucide-react';
import StatusBadge from '@/components/StatusBadge';
import UpdateCategoryForm from './FormUpdate';
import DeleteCategoryForm from './FormDelete';

export default function CategoriesPage() {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const { data, isLoading, isFetching, refetch } = useQuery<
    Paginated<Category>
  >({
    queryKey: ['categories'],
    queryFn: async () =>
      await api
        .get<
          Paginated<Category>
        >(`category?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
        .json(),
  });

  const handleClickUpdate = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogUpdateOpen(true);
  };

  const handleClickDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogDeleteOpen(true);
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
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
            onClick={() => handleClickUpdate(row.original)}
            variant="outline"
            className="text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
          >
            <EditIcon />
            แก้ไข
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
    setSelectedCategory(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessUpdate = () => {
    setIsDialogUpdateOpen(false);
    setSelectedCategory(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessDelete = () => {
    setIsDialogDeleteOpen(false);
    setSelectedCategory(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  return (
    <PageCard title="หมวดหมู่">
      <div className="mb-2 flex justify-end">
        <Button onClick={() => setIsDialogCreateOpen(true)}>
          เพิ่มหมวดหมู่
        </Button>
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
            <DialogTitle className="text-center">เพิ่มหมวดหมู่</DialogTitle>
          </DialogHeader>
          <CreateCategoryForm onSuccess={handleSuccessCreate} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogUpdateOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedCategory(null);
          setIsDialogUpdateOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">แก้ไขหมวดหมู่</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <UpdateCategoryForm
              categoryId={selectedCategory.id}
              defaultValues={{
                name: selectedCategory.name,
                is_active: selectedCategory.is_active,
              }}
              onSuccess={handleSuccessUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogDeleteOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedCategory(null);
          setIsDialogDeleteOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">ลบหมวดหมู่</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <DeleteCategoryForm
              categoryId={selectedCategory.id}
              onSuccess={handleSuccessDelete}
              onCancel={() => {
                setIsDialogDeleteOpen(false);
                setSelectedCategory(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageCard>
  );
}
