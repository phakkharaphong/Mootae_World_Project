'use client';

import { NavigationMenuDemo } from '@/components/AppHeader';
import { DocumentMeta } from '@/components/DocumentMeta';
import { FooterBar } from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useGetAPI } from '@/hooks/use-api';
import { Articleblog } from '@/interfaces/Aricleblog';
import { ResponseList } from '@/interfaces/ResponseList';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ArticleblogDetail() {
  const { id } = useParams<{ id: string }>();

  const [response, loading, fetchData] = useGetAPI<
    ResponseList<Articleblog>
  >(`/articleblog/${id}`);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">กำลังโหลด...</div>;
  }

  const item = response?.data;

  if (!item) {
    return (
      <>
        <NavigationMenuDemo />
        <div className="flex justify-center p-10 text-gray-500">
          ไม่พบบทความที่คุณต้องการ
        </div>
        <FooterBar />
      </>
    );
  }

  return (
    <>
      <NavigationMenuDemo />

      <div className="flex justify-center p-4">
        <Card className="mt-5 w-full max-w-5xl border-none shadow-none">
          <CardHeader className="p-0">
            <h1 className="text-3xl font-semibold">{item.title || 'หัวข้อ'}</h1>
            <DocumentMeta
              viewer={item.view || 0}
              createdAt={item.created_at|| ' '}
              createdBy={item.created_by|| ' '}
            />
          </CardHeader>

          <CardContent className="p-0">
            <div className="my-5 prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: item.conten || '',
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <FooterBar />
    </>
  );
}
