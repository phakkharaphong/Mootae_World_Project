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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { api } from '@/lib/api';

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
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        await api.put(`user/${userId}`, {
          json: value,
        });
        toast.success('อัปเดตผู้ใช้งานสำเร็จ');
        form.reset();
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? 'กำลังอัปเดตผู้ใช้งาน...' : 'อัปเดตผู้ใช้งาน'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
