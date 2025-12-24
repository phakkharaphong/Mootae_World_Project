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
import { api } from '@/lib/api';
import {
  CreateArticleRequest,
  createArticleSchema,
} from '@/models/article-create.model';
import { Paginated } from '@/models/common/paginated';
import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CreateArticleFormProps {
  onSuccess?: () => void;
}

const defaultValues: CreateArticleRequest = {
  title: '',
  category_id: '',
  is_active: false,
};

export default function CreateArticleForm({
  onSuccess,
}: CreateArticleFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        await api.post('blog', {
          json: value,
        });
        toast.success('สร้างบทความสำเร็จ');
        form.reset();
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถสร้างบทความได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
    validators: {
      onChange: createArticleSchema,
    },
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['article-categories'],
    queryFn: async () =>
      await api.get('category').json<Paginated<{ id: string; name: string }>>(),
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
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )}
          </form.Field>
        )}
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
              {isSubmitting ? 'กำลังสร้างบทความ...' : 'สร้างบทความ'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
