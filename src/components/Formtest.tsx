"use client";

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export function DynamicForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <form className="w-full rounded-xl bg-white p-5 shadow-md dark:bg-slate-900">
      <div className="flex flex-col gap-4">{children}</div>

      <div className="mt-5 flex gap-3">
        <Button type="submit">บันทึก</Button>{' '}
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push('/Home')}
        >
          ยกเลิก{' '}
        </Button>
      </div>
    </form>
  );
}
