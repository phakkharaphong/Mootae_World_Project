'use client';

import Link from 'next/link';

import { useUserStore } from '@/stores/user-store';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { withBasePath } from '@/lib/base-path-manager';
import { removeAccessToken } from '@/lib/token-manager';

type SidebarItem = {
  title: string;
  url: string;
};

const items: SidebarItem[] = [
  {
    title: 'แดชบอร์ด',
    url: '/dashboard',
  },
  {
    title: 'บทความ',
    url: '/articles',
  },
  {
    title: 'หมวดหมู่',
    url: '/categories',
  },
  {
    title: 'คำสั่งซื้อ',
    url: '/orders',
  },
  {
    title: 'วอลเปเปอร์',
    url: '/wallpapers',
  },
  {
    title: 'ผู้ใช้งาน',
    url: '/users',
  },
  {
    title: 'แบนเนอร์กิจกรรม',
    url: '/activity-banners',
  },
  {
    title: 'แบนเนอร์ข่าวสาร',
    url: '/news-banners',
  }
];

export function BOMSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const logout = useUserStore((s) => s.logout);

  function handleLogout() {
    removeAccessToken();
    logout();
    globalThis.location.href = withBasePath('/login');
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <p className='text-center font-bold text-2xl'>มูเตเวิร์ส</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild>
                  <Link href={`/BOM${item.url}`}>{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="text-red-500"
              >
                ออกจากระบบ
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
