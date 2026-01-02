'use client';

import { useState } from 'react';

import Image from 'next/image';

import { ActivityBanner } from '@/models/activity-banner';
import { Paginated } from '@/models/common/paginated';
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

import CreateActivityBannerForm from './FormCreate';
import DeleteActivityBannerForm from './FormDelete';
import UpdateActivityBannerForm from './FormUpdate';

export default function ActivityBannersPage() {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const [selectedActivityBanner, setSelectedActivityBanner] =
    useState<ActivityBanner | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const { data, isLoading, isFetching, refetch } = useQuery<
    Paginated<ActivityBanner>
  >({
    queryKey: ['activity-banners'],
    queryFn: async () =>
      await api
        .get<
          Paginated<ActivityBanner>
        >(`slide-activity?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
        .json(),
  });

  const handleClickUpdate = (banner: ActivityBanner) => {
    setSelectedActivityBanner(banner);
    setIsDialogUpdateOpen(true);
  };

  const handleClickDelete = (banner: ActivityBanner) => {
    setSelectedActivityBanner(banner);
    setIsDialogDeleteOpen(true);
  };

  const columns: ColumnDef<ActivityBanner>[] = [
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
    setSelectedActivityBanner(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessUpdate = () => {
    setIsDialogUpdateOpen(false);
    setSelectedActivityBanner(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessDelete = () => {
    setIsDialogDeleteOpen(false);
    setSelectedActivityBanner(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  return (
    <PageCard title="แบนเนอร์กิจกรรม">
      <div className="mb-2 flex justify-end">
        <Button onClick={() => setIsDialogCreateOpen(true)}>
          เพิ่มแบนเนอร์กิจกรรม
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
              เพิ่มแบนเนอร์กิจกรรม
            </DialogTitle>
          </DialogHeader>
          <CreateActivityBannerForm onSuccess={handleSuccessCreate} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogUpdateOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedActivityBanner(null);
          setIsDialogUpdateOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              แก้ไขแบนเนอร์กิจกรรม
            </DialogTitle>
          </DialogHeader>
          {selectedActivityBanner && (
            <UpdateActivityBannerForm
              activityBannerId={selectedActivityBanner.id}
              defaultValues={{
                title: selectedActivityBanner.title,
                img_path: selectedActivityBanner.img_path,
                // is_active: selectedActivityBanner.is_active,
              }}
              onSuccess={handleSuccessUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogDeleteOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedActivityBanner(null);
          setIsDialogDeleteOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">ลบแบนเนอร์กิจกรรม</DialogTitle>
          </DialogHeader>
          {selectedActivityBanner && (
            <DeleteActivityBannerForm
              activityBannerId={selectedActivityBanner.id}
              onSuccess={handleSuccessDelete}
              onCancel={() => {
                setIsDialogDeleteOpen(false);
                setSelectedActivityBanner(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageCard>
  );
}
