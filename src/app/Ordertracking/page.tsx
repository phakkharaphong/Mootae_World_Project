'use client';
import { useEffect, useState } from 'react';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { FooterBar } from '@/components/Footer';
import { Column, TablePagination } from '@/components/table';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useGetAPI } from '@/hooks/use-api';
import { ApiPaginatedResponse } from '@/interfaces/ResponseList';
import { usePagination } from '@/utils/use-pagination';

interface Order {
  id: string;
  frist_name_customer: string;
  last_name_customer: string;
  email: string;
  total_price: number;
  payment_status: string;
}

export default function Tracking() {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState(''); // เก็บ email ที่ submit แล้ว
  const [error, setError] = useState('');

  const {
    pageIndex,
    setPageIndex,
    pageSize,
  } = usePagination({
    totalItems: 0,
    pageSize: 10,
    initialPage: 0,
    maxButtons: 5,
  });

  const [orders, loading, fetchData] = useGetAPI<ApiPaginatedResponse<Order>>(
    'ordersByEmail/',
    {
      email: submittedEmail,
      page: pageIndex,
      limit: pageSize,
    }
  );

  // เรียก fetchData ทุกครั้งที่ email submit หรือ pageIndex/pageSize เปลี่ยน
  useEffect(() => {
    if (!submittedEmail) return;
    fetchData().catch((error) => setError('เกิดข้อผิดพลาดในการดึงข้อมูล'));
  }, [submittedEmail, pageIndex, pageSize]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email) return;
    setSubmittedEmail(email);
    setPageIndex(1);
    setError('');
  };

  const columns: Column<Order>[] = [
    { key: 'id', title: 'รหัสคำสั่งซื้อ' },
    {
      key: 'frist_name_customer',
      title: 'ชื่อ',
      render: (item) => `${item.frist_name_customer} ${item.last_name_customer}`,
    },
    { key: 'email', title: 'Email' },
    { key: 'total_price', title: 'ยอดรวม' },
    { key: 'payment_status', title: 'สถานะการชำระเงิน' },
  ];

  return (
    <>
      <NavigationMenuDemo />
      <div className="mx-auto mt-8 mb-5 max-w-5xl rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
          ติดตามคำสั่งซื้อ
        </h2>

        <form onSubmit={onSubmit}>
          <FieldGroup>
            <FieldDescription>
              กรุณากรอกอีเมลที่ท่านทำการสั่งซื้อวอลเปเปอร์
            </FieldDescription>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="กรอกอีเมล"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
            </Field>
          </FieldGroup>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-950  py-2 font-medium text-white transition hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loading ? 'กำลังโหลด...' : 'ตรวจสอบการสั่งซื้อ'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        <TablePagination
          data={orders?.data ?? []}
          columns={columns}
          totalItems={orders?.pagination.total ?? 0}
          page={pageIndex}
          limit={pageSize}
          onPageChange={setPageIndex}
        />
      </div>
      <FooterBar />
    </>
  );
}
