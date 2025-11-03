"use client"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from 'next/image';
import Link from 'next/link';
import * as React from "react"

export function NavigationMenuDemo() {
  return (
    <div className="w-full bg-amber-100">
      {' '}
      <div className="flex w-full items-center justify-center bg-amber-800">
        <Image
          src={`/images/logoMootae world (NO CIRCLE).png`}
          width={84}
          height={83}
          className="w-14 justify-center lg:w-20"
          alt="mootae world logo"
        />
      </div>
      <NavigationMenu className="h-15 w-full max-w-none justify-center bg-gray-50">
        <NavigationMenuList className="flex w-full justify-around">
          <NavigationMenuItem>
            <NavigationMenuLink href="/Home">หน้าแรก</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">สำหรับองค์กร</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/article">บทความ</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/order">
              ตรวจสอบการสั่งซื้อ
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>List</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Components</div>
                      <div className="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
