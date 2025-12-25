import Link from 'next/link';

export default function FOMFooter() {
  return (
    <footer className="bg-primary flex items-center justify-between gap-4 p-4 text-white">
      มูเตเวิร์ส &copy; 2025 All rights reserved.
      <Link href="/login">เข้าสู่ระบบภายใน</Link>
    </footer>
  );
}
