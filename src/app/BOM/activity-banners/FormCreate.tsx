import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
  CreateActivityBannerRequest,
  createActivityBannerSchema,
} from '@/models/activity-banner-create.model';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

import { api } from '@/lib/api';
import { uploadFile } from '@/lib/upload-file';

interface CreateActivityBannerFormProps {
  onSuccess?: () => void;
}

const defaultValues: CreateActivityBannerRequest = {
  title: '',
  img_path: '',
  // is_active: false,
};

export default function CreateActivityBannerForm({
  onSuccess,
}: CreateActivityBannerFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        await api.post('slide-activity', {
          json: value,
        });
        toast.success('สร้างแบนเนอร์กิจกรรมสำเร็จ');
        form.reset();
        setPreviewUrl(null);
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถสร้างแบนเนอร์กิจกรรมได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
    validators: {
      onChange: createActivityBannerSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="title">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>ชื่อแบนเนอร์</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="กรอกชื่อแบนเนอร์"
                autoComplete="off"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="img_path">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                รูปภาพแบนเนอร์ (แนะนำขนาด 3:1)
              </FieldLabel>
              <div className="grid gap-2">
                <div className="relative aspect-3/1 overflow-hidden rounded-md border">
                  {previewUrl || field.state.value ? (
                    <Image
                      src={previewUrl ?? (field.state.value as string)}
                      alt="รูปภาพแบนเนอร์ (แนะนำขนาด 3:1)"
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

                <Input
                  id={`${field.name}-file`}
                  name={`${field.name}-file`}
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0] ?? null;
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(file ? URL.createObjectURL(file) : null);

                    if (!file) {
                      field.handleChange('');
                      return;
                    }

                    try {
                      setIsUploading(true);
                      const res = await uploadFile(file);
                      field.handleChange(res.url);
                      toast.success('อัปโหลดรูปภาพสำเร็จ');
                    } catch {
                      toast.error('อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่');
                      field.handleChange('');
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                />

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

        {/* <form.Field name="is_active">
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
        </form.Field> */}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isUploading}>
              {isSubmitting
                ? 'กำลังสร้างแบนเนอร์กิจกรรม...'
                : isUploading
                  ? 'กำลังอัปโหลดรูปภาพ...'
                  : 'สร้างแบนเนอร์กิจกรรม'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
