'use client';

import { NavigationMenuDemo } from '@/components/AppHeader';
import { FooterBar } from '@/components/Footer';
import SliderSection from '@/components/SliderSection';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function About() {
  return (
    <>

     
      <div className="flex h-28 w-full items-center bg-gray-50">
        <h1 className="mx-auto text-center text-3xl font-bold md:text-4xl">
          สำหรับองค์กร
        </h1>
      </div>

      
      <div className="relative flex h-[300px] w-full items-center justify-center bg-[url(/images/bannerhome.avif)] bg-cover bg-center sm:h-[420px]">
        <div className="flex flex-col items-center justify-center text-center bg-black/20 p-4 sm:bg-black/0">
          <h1 className="p-2 text-2xl font-bold text-blue-950  sm:text-4xl">
            มูเตเวิส Muteverse
          </h1>
          <span className="p-1 text-lg sm:text-2xl">
            ที่พึ่งทางดวงที่ไว้ใจได้เสมอ
          </span>
          <span className="p-1 text-lg sm:text-2xl">
            SINCERE | PASSIONATE | INFORMATIVE
          </span>
        </div>
      </div>

      
      <div className="h-[250px] w-full bg-[url(/images/bannerAb.avif)] bg-cover bg-center sm:h-[380px]"></div>

     
      <div className="px-4 sm:px-10">
        <SliderSection />
      </div>

      
      <div className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col items-start overflow-hidden rounded-xl bg-white shadow-md sm:flex-row sm:items-center">
            
            
            <div className="w-full p-6 sm:w-1/2 sm:p-10">
              <h5 className="mb-2 text-xl font-bold text-primary">
                บริษัท Muteverse
              </h5>
              <h6 className="mb-3 text-lg text-gray-600">Subtitle</h6>
              <p className="text-gray-700">
                ที่อยู่ 51/6 ถนน รามอินทรา แขวง คันนายาว เขต คันนายาว กรุงเทพฯ 10230  
                (สถานีรถไฟฟ้า กม.6)
              </p>
            </div>

           
            <div className="flex w-full flex-col items-center p-6 sm:w-1/2 sm:p-10">
              <h5 className="mb-5 text-xl font-bold text-primary">
                สนใจติดต่องาน
              </h5>

              <h6 className="mb-1 text-xl font-bold text-primary">E-mail</h6>
              <h6 className="mb-5 text-lg text-gray-600">
                phakkharaphong.c@kkumail.com
              </h6>

              <h6 className="mb-1 text-xl font-bold text-primary">Tel</h6>
              <h6 className="text-lg text-gray-600">0994701286</h6>
            </div>

          </div>
        </div>
      </div>

    </>
  );
}
