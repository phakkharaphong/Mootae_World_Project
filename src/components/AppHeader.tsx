'use client';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import * as React from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export function NavigationMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full bg-amber-100 ${isSticky ? 'fixed top-0 left-0 z-50 shadow-md' : 'relative'} transition-all duration-200`}>
      {/* Logo */}
      <div className="flex w-full items-center justify-center bg-blue-950 py-2">
        <Image
          src="/images/logoMootae world (NO CIRCLE).png"
          width={84}
          height={83}
          className="w-14 lg:w-20"
          alt="mootae world logo"
        />
      </div>

      {/* Desktop Menu */}
      <NavigationMenu className="hidden h-15 w-full max-w-none justify-center bg-gray-50 md:flex">
        <NavigationMenuList className="flex w-full max-w-5xl justify-around text-base font-medium">
          <NavigationMenuItem>
            <NavigationMenuLink href="/Home">หน้าแรก</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/About">สำหรับองค์กร</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/article">บทความ</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/Ordertracking">
              ตรวจสอบการสั่งซื้อ
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/Wallpaper">รายการวอลเปเปอร์</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/Wallpaper/form">แบบฟอร์มสั่งซื้อ</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center justify-between bg-gray-50 p-4 md:hidden">
        <span className="text-lg font-semibold text-amber-900">เมนู</span>

        <button
          className="rounded-md p-2 text-amber-900"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Items */}
      {open && (
        <div className="flex flex-col gap-4 bg-white px-6 pb-6 pt-2 text-base font-medium shadow-md md:hidden">
          <Link href="/Home" className="hover:text-amber-700">หน้าแรก</Link>
          <Link href="/About" className="hover:text-amber-700">สำหรับองค์กร</Link>
          <Link href="/article" className="hover:text-amber-700">บทความ</Link>
          <Link href="/Ordertracking" className="hover:text-amber-700">ตรวจสอบการสั่งซื้อ</Link>
          <Link href="/Wallpaper" className="hover:text-amber-700">รายการวอลเปเปอร์</Link>
          <Link href="/Wallpaper/form" className="hover:text-amber-700">แบบฟอร์มสั่งซื้อ</Link>
        </div>
      )}
    </div>
  );
} 