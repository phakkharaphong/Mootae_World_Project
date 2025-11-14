'use client';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { FooterBar } from '@/components/Footer';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function Login() {
  return (
    <>
      <NavigationMenuDemo />

      <div className="mx-auto mt-10 mb-10 max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-6 text-2xl font-bold text-black dark:text-white text-center">
          เข้าสู่ระบบหลังบ้าน
        </h2>

        <form className="space-y-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                placeholder="กรอกชื่อผู้ใช้"
                required
                className="mt-2"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                required
                className="mt-2"
              />
            </Field>
          </FieldGroup>

          <div className="flex justify-end">
            <Link
              href="/BOM/authen/forgetpassword"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-amber-700 py-2.5 font-medium text-white transition hover:bg-amber-800 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>

      <FooterBar />
    </>
  );
}