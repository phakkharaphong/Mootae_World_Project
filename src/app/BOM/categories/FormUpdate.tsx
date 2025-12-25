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
import {
  UpdateCategoryRequest,
  updateCategorySchema,
} from '@/models/category-update.model';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface UpdateCategoryFormProps {
  categoryId: string;
  defaultValues: UpdateCategoryRequest;
  onSuccess?: () => void;
}

export default function UpdateCategoryForm({
  categoryId,
  defaultValues,
  onSuccess,
}: UpdateCategoryFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        await api.patch(`category/${categoryId}`, {
          json: value,
        });
        toast.success('อัปเดตหมวดหมู่สำเร็จ');
        form.reset();
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถสร้างหมวดหมู่ได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
    validators: {
      onChange: updateCategorySchema,
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
        <form.Field name="name">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>ชื่อหมวดหมู่</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="กรอกชื่อหมวดหมู่"
                autoComplete="off"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? 'กำลังอัปเดตหมวดหมู่...' : 'อัปเดตหมวดหมู่'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
