import {
  CreateUserRequest,
  createUserSchema,
} from '@/models/user-create.model';
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

interface CreateUserFormProps {
  onSuccess?: () => void;
}

const defaultValues: CreateUserRequest = {
  username: '',
  password: '',
  confirm_password: '',
  f_name: '',
  l_name: '',
  phone: '',
  img_profile: '',
  address: '',
  is_admin: false,
  is_active: false,
};

export default function CreateUserForm({ onSuccess }: CreateUserFormProps) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        await api.post('user', {
          json: value,
        });
        toast.success('สร้างผู้ใช้งานสำเร็จ');
        form.reset();
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถสร้างผู้ใช้งานได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
    validators: {
      onChange: createUserSchema,
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
        <form.Field name="username">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>ชื่อผู้ใช้งาน</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้งาน"
                autoComplete="off"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
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
        <form.Field name="password">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>รหัสผ่าน</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                autoComplete="off"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="confirm_password">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>ยืนยันรหัสผ่าน</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="กรอกยืนยันรหัสผ่าน"
                autoComplete="off"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        </form.Field>
        <div className="grid grid-cols-2 gap-2">
        <form.Field name="is_admin">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>สิทธิ์ผู้ดูแลระบบ</FieldLabel>
              <div className="flex items-center gap-2">
                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                />
                <span className="text-xs">
                  {field.state.value ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งานทั่วไป'}
                </span>
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
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting] as const}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? 'กำลังสร้างผู้ใช้งาน...' : 'สร้างผู้ใช้งาน'}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
