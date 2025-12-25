'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { Articleblog } from '@/interfaces/Aricleblog';
import { ResponseList } from '@/interfaces/ResponseList';
import { Calendar, Eye, User } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';


export default function ArticleblogDetail() {
  const { id } = useParams<{ id: string }>();

  // const [response, loading, fetchData] = useGetAPI<ResponseList<Articleblog>>(
  //   `/articleblog/${id}`
  // );

  // useEffect(() => {
  //   if (id) fetchData();
  // }, [id]);

  // if (loading) {
  //   return <div className="p-10 text-center text-gray-500">กำลังโหลด...</div>;
  // }

  // const item = response?.data;

  // if (!item) {
  //   return (
  //     <>
  //       <div className="flex justify-center p-10 text-gray-500">
  //         ไม่พบบทความที่คุณต้องการ
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>

    </>
  );
}
