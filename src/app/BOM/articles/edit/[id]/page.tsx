'use client';

import { useParams, useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { Article } from '@/models/article.model';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { UpdateArticleRequest } from '@/models/article-update';
import { useForm } from '@tanstack/react-form';
import PageCard from '@/components/PageCard';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Paginated } from '@/models/common/paginated';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TextEditor from '@/components/TextEditor';

const defaultValues: UpdateArticleRequest = {
  title: '',
  category_id: '',
  is_active: false,
  cover_img: '',
  content: '',
};

export default function UpdateArticleFormPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => await api.get(`blog/${id}`).json<Article>(),
    enabled: !!id,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['article-categories'],
    queryFn: async () =>
      await api.get('category').json<Paginated<{ id: string; name: string }>>(),
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        await api.patch(`blog/${id}`, {
          json: value,
        });
        toast.success('อัปเดตบทความสำเร็จ');
        form.reset();
        router.replace('/BOM/articles');
      } catch {
        toast.error('ไม่สามารถอัปเดตบทความได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('title', data.title);
      form.setFieldValue('category_id', data.category_id);
      form.setFieldValue('is_active', data.is_active);
      form.setFieldValue('cover_img', data.cover_img);
      form.setFieldValue('content', data.content);
    }
  }, [data, form]);

  return (
    <PageCard title="แก้ไขบทความ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <form.Field name="title">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>ชื่อบทความ</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="กรอกชื่อบทความ"
                    autoComplete="off"
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
            {categoriesData?.data && (
              <form.Field name="category_id">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>หมวดหมู่</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกหมวดหมู่" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData.data.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              </form.Field>
            )}
          </div>
          <form.Field name="is_active">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>สถานะ</FieldLabel>
                <div className="flex items-center gap-2">
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                  <span className="text-xs">
                    {field.state.value ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                  </span>
                </div>
              </Field>
            )}
          </form.Field>
          <form.Field name="content">
            {(field) => (
              <Field>
                <TextEditor
                  value={field.state.value ?? ''}
                  onChange={field.handleChange}
                />
              </Field>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? 'กำลังอัปเดตบทความ...' : 'อัปเดตบทความ'}
              </Button>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form>
    </PageCard>
  );
}
