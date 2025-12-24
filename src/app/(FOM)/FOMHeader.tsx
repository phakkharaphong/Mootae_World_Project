'use client';

import Link from 'next/link';

import { items } from '@/constants/menu';
import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function FOMHeader() {
  return (
    <>
      <div className="text-primary flex items-center justify-between bg-white p-4 text-center md:justify-center">
        <span className="text-2xl font-black">มูเตเวิร์ส</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {items.map((item) => (
              <DropdownMenuItem key={item.url} asChild>
                <Link href={item.url}>{item.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className={`sticky top-0 z-10 bg-white/80 p-2 backdrop-blur-2xl max-md:hidden`}
      >
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            {items.map((item) => (
              <NavigationMenuItem key={item.url}>
                <NavigationMenuLink asChild className="text-base font-medium">
                  <Link href={item.url}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu Items */}
      {/* {open && (
        <div className="flex flex-col gap-4 bg-white px-6 pt-2 pb-6 text-base font-medium shadow-md md:hidden">
          {items.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="hover:text-amber-700"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )} */}
    </>
  );
}
