'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { UpdateArticleRequest } from '@/models/article-update';
import { Article } from '@/models/article.model';
import { Paginated } from '@/models/common/paginated';
import { useForm } from '@tanstack/react-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import PageCard from '@/components/PageCard';
import TextEditor from '@/components/TextEditor';

import { api } from '@/lib/api';
import { uploadFile } from '@/lib/upload-file';

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
  const queryClient = useQueryClient();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const {
    data,
    isLoading: isArticleLoading,
    isError: isArticleError,
    error: articleError,
  } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => await api.get(`blog/${id}`).json<Article>(),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ['article-categories'],
    queryFn: async () =>
      await api.get('category').json<Paginated<{ id: string; name: string }>>(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const json: UpdateArticleRequest = {
          ...value,
          cover_img: value.cover_img || undefined,
        };
        await api.patch(`blog/${id}`, { json });
        // Invalidate queries so list and detail refresh with latest data
        queryClient.invalidateQueries({ queryKey: ['article', id] });
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        if (value.category_id) {
          queryClient.invalidateQueries({ queryKey: ['article-categories'] });
        }
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
      form.setFieldValue('cover_img', data.cover_img ?? '');
      form.setFieldValue('content', data.content ?? '');
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  if (isArticleLoading || isCategoriesLoading) {
    return (
      <PageCard title="แก้ไขบทความ">
        <div className="text-muted-foreground text-sm">กำลังโหลดข้อมูล...</div>
      </PageCard>
    );
  }

  if (isArticleError) {
    return (
      <PageCard title="แก้ไขบทความ">
        <div className="text-destructive text-sm">
          เกิดข้อผิดพลาดในการโหลดบทความ: {String(articleError)}
        </div>
      </PageCard>
    );
  }

  if (isCategoriesError) {
    toast.error('ไม่สามารถโหลดหมวดหมู่ได้');
  }

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
          <form.Field name="cover_img">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>รูปภาพปกบทความ</FieldLabel>
                <div className="grid gap-2">
                  <div className="relative aspect-video overflow-hidden rounded-md border">
                    {previewUrl || field.state.value ? (
                      <Image
                        src={previewUrl ?? (field.state.value as string)}
                        alt="ภาพปกบทความ"
                        className="h-full w-full object-cover"
                        width={256}
                        height={144}
                        unoptimized
                      />
                    ) : (
                      <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
                        ไม่มีรูปภาพ
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`${field.name}-file`}
                      name={`${field.name}-file`}
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0] ?? null;
                        setSelectedFile(file);
                        if (previewUrl) URL.revokeObjectURL(previewUrl);
                        const url = file ? URL.createObjectURL(file) : null;
                        setPreviewUrl(url);
                        if (file) {
                          try {
                            setIsUploading(true);
                            const res = await uploadFile(file);
                            const { url } = res;
                            field.handleChange(url);
                            toast.success('อัปโหลดรูปภาพสำเร็จ');
                          } catch {
                            toast.error('อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่');
                          } finally {
                            setIsUploading(false);
                          }
                        } else {
                          field.handleChange('');
                        }
                      }}
                    />
                  </div>
                  {isUploading && (
                    <span className="text-muted-foreground text-xs">
                      กำลังอัปโหลดรูปภาพ...
                    </span>
                  )}
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </div>
              </Field>
            )}
          </form.Field>
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
                  key={data?.id ?? 'editor'}
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
              <Button type="submit" disabled={!canSubmit || isUploading}>
                {isSubmitting
                  ? 'กำลังอัปเดตบทความ...'
                  : isUploading
                    ? 'กำลังอัปโหลดรูปภาพ...'
                    : 'อัปเดตบทความ'}
              </Button>
            )}
          </form.Subscribe>
        </FieldGroup>
      </form>
    </PageCard>
  );
}
