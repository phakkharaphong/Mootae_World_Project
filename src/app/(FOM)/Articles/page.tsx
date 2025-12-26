'use client';

import { useState } from 'react';

import { Article } from '@/models/article.model';
import { Paginated } from '@/models/common/paginated';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import PageCard from '@/components/PageCard';

import { api } from '@/lib/api';
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
      <div className="grid grid-cols-4 gap-4">
        {data?.data.map((article) => (
          <article key={article.id} className="border p-4 shadow">
            <div>{article.title}</div>
            <div>
              {article.created_at
                ? formatDateBE(new Date(article.created_at))
                : ''}
            </div>
            <div>{article.view}</div>
          </article>
        ))}
        <div></div>
      </div>
    </PageCard>
  );
}
