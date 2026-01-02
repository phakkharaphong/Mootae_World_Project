'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Paginated } from '@/models/common/paginated';
import { NewsBanner } from '@/models/news-banner';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { EditIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import PageCard from '@/components/PageCard';
import StatusBadge from '@/components/StatusBadge';
import { DataTable } from '@/components/data-table/DataTable';

import { api } from '@/lib/api';
import { formatDateBEWithTime } from '@/lib/date-formatter';

import CreateNewsBannerForm from './FormCreate';
import DeleteNewsBannerForm from './FormDelete';
import UpdateNewsBannerForm from './FormUpdate';

export default function NewsBannersPage() {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const [selectedNewsBanner, setSelectedNewsBanner] =
    useState<NewsBanner | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const { data, isLoading, isFetching, refetch } = useQuery<
    Paginated<NewsBanner>
  >({
    queryKey: ['news-banners'],
    queryFn: async () =>
      await api
        .get<
          Paginated<NewsBanner>
        >(`slide-new?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
        .json(),
  });

  const handleClickUpdate = (banner: NewsBanner) => {
    setSelectedNewsBanner(banner);
    setIsDialogUpdateOpen(true);
  };

  const handleClickDelete = (banner: NewsBanner) => {
    setSelectedNewsBanner(banner);
    setIsDialogDeleteOpen(true);
  };

  const columns: ColumnDef<NewsBanner>[] = [
    {
      accessorKey: 'title',
      header: 'ชื่อ',
    },
    {
      accessorKey: 'img_path',
      header: 'รูปภาพ',
      cell: ({ row }) => {
        const src = row.original.img_path;
        if (!src) return null;
        return (
          <div className="relative aspect-video w-32 overflow-hidden rounded-md border">
            <Image
              src={src}
              alt={row.original.title}
              className="h-full w-full object-cover"
              width={256}
              height={144}
              unoptimized
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'link_ref',
      header: 'ลิงก์',
      cell: ({ row }) => (
        <span className="max-w-[320px] break-all">
          {row.original.link_ref}
        </span>
      ),
    },
    // {
    //   accessorKey: 'is_active',
    //   header: 'สถานะ',
    //   cell: ({ row }) => <StatusBadge active={row.original.is_active} />,
    // },
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
    setSelectedNewsBanner(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessUpdate = () => {
    setIsDialogUpdateOpen(false);
    setSelectedNewsBanner(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessDelete = () => {
    setIsDialogDeleteOpen(false);
    setSelectedNewsBanner(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  return (
    <PageCard title="แบนเนอร์ข่าวสาร">
      <div className="mb-2 flex justify-end">
        <Button onClick={() => setIsDialogCreateOpen(true)}>
          เพิ่มแบนเนอร์ข่าวสาร
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
            <DialogTitle className="text-center">
              เพิ่มแบนเนอร์ข่าวสาร
            </DialogTitle>
          </DialogHeader>
          <CreateNewsBannerForm onSuccess={handleSuccessCreate} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogUpdateOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedNewsBanner(null);
          setIsDialogUpdateOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              แก้ไขแบนเนอร์ข่าวสาร
            </DialogTitle>
          </DialogHeader>
          {selectedNewsBanner && (
            <UpdateNewsBannerForm
              newsBannerId={selectedNewsBanner.id}
              defaultValues={{
                title: selectedNewsBanner.title,
                img_path: selectedNewsBanner.img_path,
                link_ref: selectedNewsBanner.link_ref,
                // is_active: selectedNewsBanner.is_active,
              }}
              onSuccess={handleSuccessUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogDeleteOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedNewsBanner(null);
          setIsDialogDeleteOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">ลบแบนเนอร์ข่าวสาร</DialogTitle>
          </DialogHeader>
          {selectedNewsBanner && (
            <DeleteNewsBannerForm
              newsBannerId={selectedNewsBanner.id}
              onSuccess={handleSuccessDelete}
              onCancel={() => {
                setIsDialogDeleteOpen(false);
                setSelectedNewsBanner(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageCard>
  );
}
