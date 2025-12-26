'use client';

import { LoginRequest, loginSchema } from '@/models/login.model';
import { useUserStore } from '@/stores/user-store';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { api } from '@/lib/api';
import { withBasePath } from '@/lib/base-path-manager';
import { setAccessToken } from '@/lib/token-manager';

const defaultValues: LoginRequest = {
  username: '',
  password: '',
};

export default function LoginPage() {
  const login = useUserStore((s) => s.login);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const loginResponse = await api.post<{
          access_token: string;
          token_type: string;
        }>('auth/login', {
          json: value,
        });

        if (loginResponse.status !== 200) {
          throw new Error('Login failed');
        }

        const { access_token } = await loginResponse.json();

        setAccessToken(access_token);
        login();

        globalThis.location.href = withBasePath('/BOM/dashboard');
      } catch {
        toast.error(
          'ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบชื่อผู้ใช้งานและรหัสผ่านอีกครั้ง'
        );
      }
    },
    validators: {
      onChange: loginSchema,
    },
  });

  return (
    <div className="flex h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="border-b text-center text-2xl font-bold">
          เข้าสู่ระบบ
        </CardHeader>
        <CardContent>
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
                    <FieldLabel htmlFor={field.name}>
                      ชื่อผู้ใช้งาน/อีเมล
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="กรอกชื่อผู้ใช้งาน/อีเมล"
                      autoComplete="off"
                    />
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
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
                    {field.state.meta.isTouched &&
                      !field.state.meta.isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                  </Field>
                )}
              </form.Field>
              <form.Subscribe
                selector={(state) =>
                  [state.canSubmit, state.isSubmitting] as const
                }
              >
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                  </Button>
                )}
              </form.Subscribe>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
