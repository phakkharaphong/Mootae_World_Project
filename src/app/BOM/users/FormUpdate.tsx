import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
  UpdateUserRequest,
  updateUserSchema,
} from '@/models/user-update.model';
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
import { Textarea } from '@/components/ui/textarea';

import { api } from '@/lib/api';
import { uploadFile } from '@/lib/upload-file';

interface UpdateUserFormProps {
  userId: string;
  defaultValues: UpdateUserRequest;
  onSuccess?: () => void;
}

export default function UpdateUserForm({
  userId,
  defaultValues,
  onSuccess,
}: UpdateUserFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        await api.put(`user/${userId}`, {
          json: value,
        });
        toast.success('อัปเดตผู้ใช้งานสำเร็จ');
        form.reset();
        setSelectedFile(null);
        setPreviewUrl(null);
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถอัปเดตผู้ใช้งานได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
    validators: {
      onChange: updateUserSchema,
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
        <div className="grid grid-cols-2 gap-2">
          <form.Field name="f_name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>ชื่อ</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="กรอกชื่อ"
                  autoComplete="off"
                />
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )}
          </form.Field>
          <form.Field name="l_name">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>นามสกุล</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="กรอกนามสกุล"
                  autoComplete="off"
                />
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )}
          </form.Field>
        </div>
        <form.Field name="phone">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>เบอร์โทรศัพท์</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="กรอกเบอร์โทรศัพท์"
                autoComplete="off"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="address">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>ที่อยู่</FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="กรอกที่อยู่"
                autoComplete="off"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="img_profile">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>รูปโปรไฟล์</FieldLabel>
              <div className="grid gap-2">
                <div className="relative h-32 w-32 overflow-hidden rounded-md border">
                  {previewUrl || field.state.value ? (
                    <Image
                      src={previewUrl ?? (field.state.value as string)}
                      alt="โปรไฟล์"
                      className="h-full w-full object-cover"
                      width={128}
                      height={128}
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isUploading}>
              {isSubmitting
                ? 'กำลังอัปเดตผู้ใช้งาน...'
                : isUploading
                  ? 'กำลังอัปโหลดรูปภาพ...'
                  : 'อัปเดตผู้ใช้งาน'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
