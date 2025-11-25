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
import { userService } from '@/hooks/use-api-userservice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await userService.login(username,password) 

      // เก็บ JWT ใน localStorage
      localStorage.setItem('accessToken', data.access_token);

      toast.success('เข้าสู่ระบบสำเร็จ!');
      router.push('/BOM/dashboard'); // หรือหน้าอื่นที่ต้องการ
    }catch{
      toast.error('Username หรือ Password ไม่ถูกต้อง!')
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <NavigationMenuDemo />

      <div className="mx-auto mt-10 mb-10 max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
          เข้าสู่ระบบหลังบ้าน
        </h2>

        <form className="space-y-5"  onSubmit={handleLogin}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                placeholder="กรอกชื่อผู้ใช้"
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
