'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Article } from '@/models/article.model';
import { Paginated } from '@/models/common/paginated';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

import PageCard from '@/components/PageCard';

import { api } from '@/lib/api';
import { withBasePath } from '@/lib/base-path-manager';
import { formatDateBE } from '@/lib/date-formatter';

export default function ArticlesPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
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

  const total = data?.pagination?.total ?? 0;
  const limit = data?.pagination?.limit ?? pagination.pageSize;
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));
  const currentPage = pagination.pageIndex + 1;

  const startPage = Math.max(
    1,
    Math.min(currentPage - 2, Math.max(1, totalPages - 4))
  );
  const endPage = Math.min(totalPages, startPage + 4);
  const pages = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, i) => startPage + i
  );

  const canPrev = !isLoading && currentPage > 1;
  const canNext = !isLoading && currentPage < totalPages;

  return (
    <PageCard>
      <div className="mb-4 border-y py-4">
        <h1 className="text-center text-2xl font-bold">บทความ</h1>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4">
        {data?.data.map((article) => (
          <Link key={article.id} href={`/Articles/${article.id}`}>
            <article className="rounded-xl border p-4">
              <Image
                src={
                  article.cover_img ||
                  withBasePath('/images/post-placeholder.webp')
                }
                className="mb-2 aspect-video w-full rounded-lg object-cover"
                alt={article.title}
                width={320}
                height={180}
                unoptimized
              />
              <h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
              <div className="text-end text-xs">
                {article.created_at
                  ? formatDateBE(new Date(article.created_at))
                  : ''}
              </div>
              <div className="flex items-center justify-end gap-1 text-end text-xs">
                <EyeIcon className="size-4" /> {article.view}
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <ButtonGroup>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canPrev}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.max(0, prev.pageIndex - 1),
              }))
            }
          >
            ก่อนหน้า
          </Button>

          {pages.map((page) => {
            const isActive = page === currentPage;
            return (
              <Button
                key={page}
                type="button"
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                disabled={isLoading}
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    pageIndex: page - 1,
                  }))
                }
              >
                {page}
              </Button>
            );
          })}

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canNext}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: Math.min(totalPages - 1, prev.pageIndex + 1),
              }))
            }
          >
            ถัดไป
          </Button>
        </ButtonGroup>
      </div>
    </PageCard>
  );
}
