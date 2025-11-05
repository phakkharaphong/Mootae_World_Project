'use client';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { FooterBar } from '@/components/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <NavigationMenuDemo></NavigationMenuDemo>

      <div className="flex h-30 w-full items-center bg-gray-50">
        <h1 className="flex w-full items-center justify-center text-4xl font-bold">
          สำหรับองค์กร
        </h1>
      </div>
      <div className="flex h-96 w-full justify-center bg-[url(/images/bannerhome.avif)] bg-cover bg-center">
        {/* <Image
          src={`/images/beadner.avif`}
          width={150}
          height={100}
          className="w-14 justify-center lg:w-full"
          alt="mootae world logo"
        /> */}
        <div className="flex w-full flex-col items-center justify-center text-center">
          <h1 className="p-5 text-4xl font-bold text-amber-900">
            มูเตเวิร์ล Mootae World
          </h1>
          <span className="p-2 text-2xl">ที่พึ่งทางดวงที่ไว้ใจได้เสมอ</span>
          <span className="p-2 text-2xl">
            SINCERE | PASSIONATE | INFORMATIVE
          </span>
        </div>
      </div>
      <div className="flex h-96 w-full justify-center bg-[url(/images/bannerAb.avif)] bg-cover bg-center"></div>
      <FooterBar></FooterBar>
    </>
  );
}
