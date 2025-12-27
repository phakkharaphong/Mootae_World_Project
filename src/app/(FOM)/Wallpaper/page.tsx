'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Paginated } from '@/models/common/paginated';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import PageCard from '@/components/PageCard';

import { api } from '@/lib/api';

export default function Wallpaper() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const { data } = useQuery({
    queryKey: ['wallpapers', pagination.pageIndex, pagination.pageSize],
    queryFn: async () =>
      await api
        .get(
          `wallpaper?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
        )
        .json<Paginated<{ url: string }>>(),
  });
  return (
    <PageCard>
      <div className="mb-4 border-y py-4">
        <h1 className="text-center text-2xl font-bold">วอลเปเปอร์</h1>
      </div>
      <section>
        <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data?.data.map((wallpaper, index) => (
            <div key={index} className="mb-4">
              <Image
                src={wallpaper.url}
                alt={`Wallpaper ${index + 1}`}
                className="aspect-2/3 w-48 rounded-xl object-cover shadow-md"
                width={1024}
                height={1536}
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>
    </PageCard>
  );
}
