'use client';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { FooterBar } from '@/components/Footer';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function ForgetPassword() {
  return (
    <>
      <NavigationMenuDemo />

      <div className="mx-auto mt-10 mb-10 max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-6 text-2xl font-bold text-black dark:text-white text-center">
          ลืมรหัสผ่าน
        </h2>

        <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-300">
          กรุณากรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
        </p>

        <form className="space-y-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">อีเมล</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                required
                className="mt-2"
              />
            </Field>
          </FieldGroup>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-amber-700 py-2.5 font-medium text-white transition hover:bg-amber-800 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            ส่งลิงก์รีเซ็ตรหัสผ่าน
          </button>
        </form>
      </div>

      <FooterBar />
    </>
  );
}