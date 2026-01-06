'use client';

import { useParams } from 'next/navigation';

import { Article } from '@/models/article.model';
import { useQuery } from '@tanstack/react-query';

import PageCard from '@/components/PageCard';
import ReadOnlyEditor from '@/components/ReadOnlyEditor';

import Image from 'next/image';
import { api } from '@/lib/api';
import { formatDateBE } from '@/lib/date-formatter';
import { CalendarIcon, EyeIcon } from 'lucide-react';
import { withBasePath } from '@/lib/base-path-manager';

export default function ArticleblogDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => await api.get(`blog/${id}`).json<Article>(),
  });

  return (
    <PageCard>
      {/* Header */}
      <div className="mb-10 border-y bg-white py-6">
        <h1 className="mx-auto max-w-3xl text-center text-3xl font-extrabold leading-tight tracking-tight">
          {data?.title ?? 'บทความ'}
        </h1>

        {data?.created_at && (
          <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500">
            <CalendarIcon className="size-4" />
            <span>
              {formatDateBE(new Date(data.created_at))}
            </span>
            {typeof data?.view === 'number' && (
              <span className="flex items-center gap-1">
                <EyeIcon className="size-4" />
                {data.view}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-pulse text-sm text-muted-foreground">
            กำลังโหลดบทความ...
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 pb-16 ">

          <div className="relative overflow-hidden">
            <Image
              src={
                data?.cover_img ||
                withBasePath('/images/post-placeholder.webp')
              }
              alt={""}
              width={400}
              height={225}
              unoptimized
              className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
          <ReadOnlyEditor
            className="prose prose-gray max-w-none leading-relaxed prose-img:rounded-xl prose-a:text-primary hover:prose-a:underline"
            value={data?.content ?? ''}
          />
        </div>
      )}
    </PageCard>

  );
}
