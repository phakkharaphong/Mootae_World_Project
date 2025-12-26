'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Article } from '@/models/article.model';
import { Paginated } from '@/models/common/paginated';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';

import PageCard from '@/components/PageCard';

import { api } from '@/lib/api';
import { withBasePath } from '@/lib/base-path-manager';
import { formatDateBE } from '@/lib/date-formatter';

export default function ArticlesPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['articles', pagination],
    queryFn: async () =>
      await api
        .get(
          `blog?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
        )
        .json<Paginated<Article>>(),
  });

  return (
    <PageCard>
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4">
        {data?.data.map((article) => (
          <article key={article.id} className="rounded-xl border p-4">
            <Image
              src={
                article.cover_img ||
                withBasePath('/images/post-placeholder.webp')
              }
              className="mb-2 aspect-video w-full rounded-lg object-cover"
              alt={article.title}
              width={320}
              height={180}
            />
            <h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
            <div className="text-end text-xs">
              {article.created_at
                ? formatDateBE(new Date(article.created_at))
                : ''}
            </div>
            <div className="flex justify-end items-center gap-1 text-end text-xs">
              <EyeIcon className='size-4' /> {article.view}
            </div>
          </article>
        ))}
        <div></div>
      </div>
    </PageCard>
  );
}
