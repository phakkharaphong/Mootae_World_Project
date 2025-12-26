'use client';
import Image from 'next/image';
import Link from 'next/link';

import { items } from '@/constants/menu';
import { ArrowRightIcon, MenuIcon } from 'lucide-react';

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

import SliderSection from '@/components/SliderSection';
import LandingImage from '../../../public/images/landing.png';

export default function Home() {
  return (
    <>
      <div
        className="relative min-h-dvh p-4"
        style={{
          backgroundImage: `url(${LandingImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
        }}
      >
        <header className="flex items-start justify-between gap-4">
          <Image
            src="/images/logo.png"
            className="w-24 md:w-36"
            width={897}
            height={812}
            alt="Muteverse logo"
          />
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList>
              {items.map((item) => (
                <NavigationMenuItem key={item.url}>
                  <NavigationMenuLink
                    asChild
                    className="text-base font-medium text-white"
                  >
                    <Link href={item.url}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white md:hidden">
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
        </header>
        <div className="flex flex-col items-center gap-4 p-4 pt-20 *:drop-shadow md:items-end">
          <h1 className="text-6xl font-black text-white">มูเตเวิร์ส</h1>
          <h2 className="text-lg text-white md:text-2xl">
            ที่พึ่งทางดวงที่ไว้ใจได้เสมอ
          </h2>
          <p className="text-white md:text-2xl">
            SINCERE | PASSIONATE | INFORMATIVE
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        <SliderSection
          bgColor="bg-white"
          items={['/images/No_Image_Available.jpg', '/images/tarot-banner.jpg']}
        ></SliderSection>
      </div>

      <div className="flex justify-center p-8">
        <div className="grid w-300 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="rounded-lg bg-white p-4 shadow-md transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
              key={index}
            >
              {/* รูปภาพ */}
              <div className="relative mb-4 aspect-square w-full">
                <Image
                  src="/images/tarot-banner.jpg"
                  alt="test"
                  fill
                  className="rounded-t-lg object-cover"
                  sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   25vw"
                />
              </div>

              <h5 className="text-primary text-xl font-bold">Title</h5>
              <h6 className="text-lg">Subtitle</h6>
              <p className="line-clamp-3">
                Description : Lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Doloremque incidunt inventore repudiandae
                fugiat repellat, dolore culpa, quas, tenetur maiores molestias
                facilis perspiciatis error sit omnis! Ex sunt id culpa officiis.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="relative mb-4 aspect-square h-100 w-full">
        <Image
          src="/images/tarot-banner.jpg"
          alt="test"
          fill
          className="rounded-t-lg object-cover"
          sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         25vw"
        />
      </div> */}
      <div className="flex h-96 w-full justify-center bg-[url(/images/tarot-banner.jpg)] bg-cover bg-center"></div>

      {/* Left Image + Text Section */}
      <section className="mx-auto max-w-6xl p-6 sm:p-10">
        <div className="grid grid-cols-1 items-center gap-6 rounded-xl bg-white shadow-md sm:grid-cols-2">
          <div className="relative aspect-square w-full">
            <Image
              src="/images/tarot-banner.jpg"
              alt="test"
              fill
              className="rounded-l-xl object-cover"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-10">
            <h5 className="text-primary mb-2 text-xl font-bold">Title</h5>
            <h6 className="mb-6 text-lg text-gray-600">Subtitle</h6>
            <p className="text-gray-700">
              Description: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Doloremque incidunt inventore repudiandae fugiat repellat.
            </p>
          </div>
        </div>
      </section>

      {/* Right Image + Text Section */}
      <section className="mx-auto max-w-6xl p-6 sm:p-10">
        <div className="grid grid-cols-1 items-center gap-6 rounded-xl bg-white shadow-md sm:grid-cols-2">
          <div className="flex flex-col p-6 sm:p-10">
            <h5 className="text-primary mb-2 text-xl font-bold">Title</h5>
            <h6 className="mb-6 text-lg text-gray-600">Subtitle</h6>
            <p className="text-gray-700">
              Description: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Doloremque incidunt inventore repudiandae fugiat repellat.
            </p>
          </div>

          <div className="relative aspect-square w-full">
            <Image
              src="/images/tarot-banner.jpg"
              alt="test"
              fill
              className="rounded-r-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-5xl p-6 sm:p-10">
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-white p-10 shadow-md sm:flex-row">
          <div>
            <h5 className="text-primary mb-1 text-xl font-bold">
              สำหรับลูกค้าองค์กร
            </h5>
            <h6 className="mb-3 text-lg text-gray-600">Subtitle</h6>
            <p className="text-gray-700">
              Media Content Service • Moo-Tour Wallpaper • Event Service
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h5 className="text-primary mb-4 text-xl font-bold">
              สนใจติดต่องาน
            </h5>
            <Button className="bg-blue-950 px-6 py-2 hover:bg-blue-600">
              อ่านรายละเอียดเพิ่มเติม
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
