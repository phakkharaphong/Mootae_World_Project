'use client';

import { useState } from 'react';

import { Paginated } from '@/models/common/paginated';
import { User } from '@/models/user.model';
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

import CreateUserForm from './FormCreate';
import DeleteUserForm from './FormDelete';
import UpdateUserForm from './FormUpdate';

export default function UsersPage() {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const { data, isLoading, isFetching, refetch } = useQuery<Paginated<User>>({
    queryKey: ['users', pagination.pageIndex, pagination.pageSize],
    queryFn: async () =>
      await api
        .get<
          Paginated<User>
        >(`user?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`)
        .json(),
  });

  const handleClickUpdate = (user: User) => {
    setSelectedUser(user);
    setIsDialogUpdateOpen(true);
  };

  const handleClickDelete = (user: User) => {
    setSelectedUser(user);
    setIsDialogDeleteOpen(true);
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{row.original.id}</span>,
    },
    {
      accessorKey: 'username',
      header: 'ชื่อผู้ใช้',
      cell: ({ row }) => <span>{row.original.username}</span>,
    },
    {
      accessorKey: 'f_name',
      header: 'ชื่อ',
      cell: ({ row }) => <span>{row.original.f_name}</span>,
    },
    {
      accessorKey: 'l_name',
      header: 'นามสกุล',
      cell: ({ row }) => <span>{row.original.l_name}</span>,
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
    setSelectedUser(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessUpdate = () => {
    setIsDialogUpdateOpen(false);
    setSelectedUser(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  const handleSuccessDelete = () => {
    setIsDialogDeleteOpen(false);
    setSelectedUser(null);
    setPagination({ ...pagination, pageIndex: 0 });
    refetch();
  };

  return (
    <PageCard title="ผู้ใช้งาน">
      <div className="mb-2 flex justify-end">
        <Button onClick={() => setIsDialogCreateOpen(true)}>
          เพิ่มผู้ใช้งาน
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
        <DialogContent className='max-h-[calc(100dvh---spacing(4))] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className="text-center">เพิ่มผู้ใช้งาน</DialogTitle>
          </DialogHeader>
          <CreateUserForm onSuccess={handleSuccessCreate} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogUpdateOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedUser(null);
          setIsDialogUpdateOpen(open);
        }}
      >
        <DialogContent className='max-h-[calc(100dvh---spacing(4))] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className="text-center">แก้ไขผู้ใช้งาน</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <UpdateUserForm
              userId={selectedUser.id}
              defaultValues={{
                f_name: selectedUser.f_name,
                l_name: selectedUser.l_name,
                phone: selectedUser.phone || '',
                img_profile: selectedUser.img_profile || '',
                address: selectedUser.address || '',
              }}
              onSuccess={handleSuccessUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDialogDeleteOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedUser(null);
          setIsDialogDeleteOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">ลบผู้ใช้งาน</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <DeleteUserForm
              userId={selectedUser.id}
              onSuccess={handleSuccessDelete}
              onCancel={() => {
                setIsDialogDeleteOpen(false);
                setSelectedUser(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageCard>
  );
}
