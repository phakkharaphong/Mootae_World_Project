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
import Image from 'next/image';
import { Calendar, Eye, Heart, User } from 'lucide-react';
import { formatDateToBuddhistEra } from '@/utils/date-format';

export default function ArticleblogDetail() {
  const { id } = useParams<{ id: string }>();

  const [response, loading, fetchData] = useGetAPI<ResponseList<Articleblog>>(
    `/articleblog/${id}`,
  );

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

      <div className="flex justify-center px-4 py-6 sm:px-6 lg:px-8">
        <Card className="w-full max-w-5xl rounded-xl shadow-md">
          {/* Cover Image */}
          {item.cover_img && (
            <div className="relative h-64 w-full overflow-hidden rounded-t-xl sm:h-96">
              {/* <Image
                src={item.cover_img || ''}
                alt={item.title}
                fill
                className="object-cover"
              /> */}
            </div>
          )}

          {/* Header */}
          <CardHeader className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold sm:text-3xl">{item.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye size={16} />
                {item.view} views
              </div>
              {/* <div className="flex items-center gap-1">
                <Heart size={16} />
                {item.like} likes
              </div> */}
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                วันที่สร้าง  {formatDateToBuddhistEra(item.created_at, 'DD MMMM BBBB')}
              </div>
              <div className="flex items-center gap-1">
                <User size={16} />
                 {item.created_by || ' '}
              </div>
            </div>
            {/* <DocumentMeta
              viewer={item.view || 0}
              createdAt={item.created_at || ' '}
              createdBy={item.created_by || ' '}
            /> */}
          </CardHeader>

          {/* Content */}
          <CardContent className="px-4 pb-6 sm:px-6">
            <div className="prose dark:prose-invert max-w-none">
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
