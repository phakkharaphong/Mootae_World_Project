'use client';

import { useParams } from 'next/navigation';

import { Article } from '@/models/article.model';
import { useQuery } from '@tanstack/react-query';

import PageCard from '@/components/PageCard';
import ReadOnlyEditor from '@/components/ReadOnlyEditor';

import { api } from '@/lib/api';

export default function ArticleblogDetail() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => await api.get(`blog/${id}`).json<Article>(),
  });

  return (
    <PageCard>
      <div className="mb-4 border-y py-4">
        <h1 className="text-center text-2xl font-bold">
          {data?.title ?? 'บทความ'}
        </h1>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground py-8 text-center text-sm">
          Loading...
        </div>
      ) : (
        <ReadOnlyEditor className="min-h-50" value={data?.content ?? ''} />
      )}
    </PageCard>
  );
}
