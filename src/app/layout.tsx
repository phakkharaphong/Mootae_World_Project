import type { Metadata } from 'next';
import { Prompt } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import QueryProvider from './QueryProvider';
import UserBootstrap from '@/components/UserBootstrap';

export const metadata: Metadata = {
  title: 'มูเตเวิร์ล Mootae World ที่พึ่งทางดวงที่ไว้ใจได้เสมอ',
  description:
    'ศูนย์รวมจักรวาลความมู ผู้คิดค้นศาสตร์มูด้วยวอลเปเปอร์มือถือเสริมดวงเจ้าแรกในประเทศไทย มูเตเวิร์ล เป็นพื้นที่สำหรับคนรุ่นใหม่ที่สนใจในเรื่องมูเตลู ไม่ว่าคุณจะเป็นมูมือใหม่ หรือมูตัวแม่ ผู้ประกอบการ พ่อค้าแม่ค้า ที่อยากเสริมดวงเฮงๆปังๆ มาพร้อมสินค้าและบริการต่างๆมากมายที่คัดสรรมาแล้ว',
};

const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-prompt',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${prompt.className}`}>
        <QueryProvider>
          <UserBootstrap>{children}</UserBootstrap>
        </QueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
