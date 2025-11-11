'use client';
import { NavigationMenuDemo } from '@/components/AppHeader';
import { FooterBar } from '@/components/Footer';
import SliderSection from '@/components/SliderSection';
import { Button } from '@/components/ui/button';
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
      <SliderSection></SliderSection>

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
                  บริษัท มูเตเวิลด์ จำกัด
                </h5>
                <h6 className="mb-1 text-lg text-gray-600">Subtitle</h6>
                <p className="line-clamp-3 text-gray-700">
                  ที่อยู่ 51/6 ถนน รามอินทรา แขวง คันนายาว เขต คันนายาว กรุงเทพ
                  ฯ 10230 (สถานีรถไฟฟ้า กม.6)
                </p>
              </div>
              <div className="flex flex-col items-center p-15">
                <h5 className="text-primary mb-5 text-xl font-bold">
                  สนใจติดต่องาน
                </h5>
                <h6 className="text-primary mb-5 text-xl font-bold">E-mail</h6>
                <h6 className="mb-1 text-lg text-gray-600">
                  phakkharaphong.c@kkumail.com
                </h6>
                 <h6 className="text-primary mb-5 text-xl font-bold">Tel</h6>
                <h6 className="mb-1 text-lg text-gray-600">
                  0994701286
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterBar></FooterBar>
    </>
  );
}
