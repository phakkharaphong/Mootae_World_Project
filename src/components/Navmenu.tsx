'use client';
import { userService } from '@/hooks/use-api-userservice';
import { UserProfile } from '@/interfaces/Member';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {  useEffect, useState } from 'react';

export function NavigationMenu() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getMe();
      setUserProfile(data);
    };

    fetchData();
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem('accessToken')
    router.push('/BOM/authen')
  }
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 space-y-4 bg-primary p-6 text-white">
        {/* <h2 className="mb-6 text-xl font-bold"></h2> */}
        <div className="m-2 flex">
          <User />
          <h2 className="p-1">{userProfile?.username}</h2>
        </div>

        <nav className="space-y-2">
          <a href="#" className="block rounded px-4 py-2 hover:bg-gray-700">
            Dashboard
          </a>
          {/* <a
            href="/articlemanagement"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            บทความ
          </a> */}
          <Link
            href="/BOM/articlemanagement"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            บทความ
          </Link>

          <Link
            href="/BOM/wallpaper"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            จัดการวอลเปเปอร์
          </Link>

          <Link
            href="/BOM/articlemanagement"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            คำสั่งซื้อ
          </Link>

          <Link
            href="/BOM/articlemanagement"
            className="block rounded px-4 py-2 hover:bg-gray-700"
          >
            รายชื่อผู้ใช้งาน
          </Link>

          <button onClick={handleLogout} className="block rounded px-4 py-2 hover:bg-gray-700">
            <span className="text-red-600">Logout</span>
          </button>
        </nav>
      </aside>
    </div>
  );
}
