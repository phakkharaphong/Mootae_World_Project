'use client';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { FooterBar } from '@/components/Footer';
import SliderSection from '@/components/SliderSection';
import { Button } from '@/components/ui/button';

import Image from 'next/image';
// import Link from 'next/link';
// import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  // const images = [
  //   '/images/instagram.avif',
  //   '/images/line.avif',
  //   '/images/facebook.avif',
  //   '/images/shopee.avif',
  // ];
  // const link = ['/instagram', '/line', 'facebook', 'shopee'];

  // const INITIAL_PAGE_SIZE = 10;
  // const [totalItems, setTotalItems] = useState(0);

  return (
    <div>
      <NavigationMenuDemo></NavigationMenuDemo>
      <div className="flex w-full items-center justify-center">
        <SliderSection></SliderSection>
      </div>

      <div className="flex justify-center p-8">
        {/* <h2 className="mb-4 text-center text-4xl font-bold">กำลังมาแรง</h2> */}
        <div className="grid w-300 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="rounded-lg bg-white p-4 shadow-md" key={index}>
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

      {/* Card */}
      <div className="flex justify-center p-5">
        {/* <h2 className="mb-4 w-250 text-center text-xl font-bold"> เพิ่มเติม</h2> */}
        <div className="grid w-250 grid-cols-1 gap-4 xl:grid-cols-1">
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              className="flex overflow-hidden rounded-lg bg-white shadow-md"
              key={index}
            >
              {/* รูปภาพด้านซ้าย */}
              <div className="relative aspect-square w-100">
                <Image
                  src="/images/tarot-banner.jpg"
                  alt="test"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         25vw"
                />
              </div>

              {/* ข้อความด้านขวา */}
              <div className="flex h-full w-full flex-col justify-center p-10">
                <h5 className="text-primary mb-1 text-xl font-bold">Title</h5>
                <h6 className="mb-10 text-lg text-gray-600">Subtitle</h6>
                <p className="line-clamp-3 text-gray-700">
                  Description: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Doloremque incidunt inventore repudiandae
                  fugiat repellat, dolore culpa, quas, tenetur maiores molestias
                  facilis perspiciatis error sit omnis! Ex sunt id culpa
                  officiis.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card รูปขวามือ*/}
      <div className="flex justify-center p-5">
        <h2 className="mb-2 text-center text-xl font-bold"></h2>
        <div className="grid w-250 grid-cols-1 items-center gap-4 xl:grid-cols-1">
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              className="flex overflow-hidden rounded-lg bg-white shadow-md"
              key={index}
            >
              {/* ข้อความด้านขวา */}
              <div className="flex h-full w-full flex-col justify-center p-10">
                <h5 className="text-primary mb-1 text-xl font-bold">Title</h5>
                <h6 className="mb-10 text-lg text-gray-600">Subtitle</h6>
                <p className="line-clamp-3 text-gray-700">
                  Description: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Doloremque incidunt inventore repudiandae
                  fugiat repellat, dolore culpa, quas, tenetur maiores molestias
                  facilis perspiciatis error sit omnis! Ex sunt id culpa
                  officiis.
                </p>
              </div>

              {/* รูปภาพด้านซ้าย */}
              <div className="relative aspect-square w-100">
                <Image
                  src="/images/tarot-banner.jpg"
                  alt="test"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Contact */}
      <div className="flex items-center justify-center p-3">
        <div className="grid gap-4 xl:grid-cols-1">
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              className="flex w-5/5 items-center overflow-hidden rounded-lg bg-white shadow-md"
              key={index}
            >
              {/* ข้อความด้านขวา */}
              <div className="flex flex-col p-10">
                <h5 className="text-primary mb-1 text-xl font-bold">
                  สำหรับลูกค้าองค์กร
                </h5>
                <h6 className="mb-1 text-lg text-gray-600">Subtitle</h6>
                <p className="line-clamp-3 text-gray-700">
                  Media Content Service Pray for you & Moo-Tour Wallpaper
                  Service Event Service
                </p>
              </div>
              <div className="flex flex-col items-center p-15">
                <h5 className="text-primary mb-5 text-xl font-bold">
                  สนใจติดต่องาน
                </h5>
                <Button className="relative items-center justify-center bg-red-900 hover:bg-amber-200">
                  อ่านรายละเอียดเพิ่มเติม
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterBar></FooterBar>
    </div>
  );
}
