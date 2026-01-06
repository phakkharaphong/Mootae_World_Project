'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Article } from '@/models/article.model';
import { Paginated } from '@/models/common/paginated';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { CalendarIcon, EyeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

import PageCard from '@/components/PageCard';

import { api } from '@/lib/api';
import { withBasePath } from '@/lib/base-path-manager';
import { formatDateBE } from '@/lib/date-formatter';
import { Category } from '@/models/category.model';

export default function ArticlesPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined)


  const { data, isLoading } = useQuery({
    queryKey: ['articles', pagination, categoryId],
    queryFn: async () =>
      await api
        .get(
          `blog?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}${categoryId ? `&category_id=${categoryId}` : ''
          }`
        )
        .json<Paginated<Article>>(),
  })

  const { data: categoryData, isLoading: isLoad } = useQuery({
    queryKey: ['category', pagination, categoryId],
    queryFn: async () =>
      await api
        .get(
          `category/?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}&category_id=${categoryId}`
        )
        .json<Paginated<Category>>(),
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
      <div className="mx-auto mb-8 flex max-w-6xl flex-wrap justify-center gap-2 px-4">
        <button
          onClick={() => {
            setCategoryId(undefined)
            setPagination((p) => ({ ...p, pageIndex: 0 }))
          }}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${!categoryId
            ? 'border-primary bg-primary text-white'
            : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
            }`}
        >
          ทั้งหมด
        </button>

        {categoryData?.data.map((cat) => {
          const active = cat.id === categoryId
          return (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryId(cat.id)
                setPagination((p) => ({ ...p, pageIndex: 0 }))
              }}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${active
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                }`}
            >
              {cat.name}
            </button>
          )
        })}
      </div>


      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((article) => (
          <Link key={article.id} href={`/Articles/${article.id}`}>
            <article className="group h-full overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="relative overflow-hidden">
                <Image
                  src={
                    article.cover_img ||
                    withBasePath('/images/post-placeholder.webp')
                  }
                  alt={article.title}
                  width={400}
                  height={225}
                  unoptimized
                  className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex h-full flex-col p-5">
                <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-800 group-hover:text-primary">
                  {article.title}

                </h3>
                <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="size-4" />
                    {article.created_at
                      ? formatDateBE(new Date(article.created_at))
                      : ''}
                  </span>

                  <span className="flex items-center gap-1">
                    <EyeIcon className="size-4" />
                    {article.view}
                  </span>
                </div>
                {/* <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {article.created_at
                      ? formatDateBE(new Date(article.created_at))
                      : ''}
                  </span>

                  <span className="flex items-center gap-1">
                    <EyeIcon className="size-4" />
                    {article.view}
                  </span>
                </div> */}
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
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
            const isActive = page === currentPage
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
            )
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
