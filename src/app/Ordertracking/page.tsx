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

export default function Tracking() {
  return (
    <>
      <NavigationMenuDemo />

      <div className="mx-auto mt-8 mb-5 max-w-xl rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
          ติดตามคำสั่งซื้อ
        </h2>

        <form>
          <FieldGroup>
            <FieldDescription>
              การุณากรอกอีเมลที่ท่านทำการสั่งซื้อวอลเปเปอร์
            </FieldDescription>
            <Field>
              <FieldLabel htmlFor="card-name">Email</FieldLabel>
              <Input
                id="card-name"
                placeholder="การุณากรอกอีเมล"
                required
                className="mt-2"
              />
            </Field>
          </FieldGroup>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-amber-800 py-2 font-medium text-white transition hover:bg-amber-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            ตรวจสอบการสั่งซื้อ
          </button>
        </form>
      </div>
      <FooterBar></FooterBar>
    </>
  );
}
