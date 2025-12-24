'use client';

import PageCard from '@/components/PageCard';
import SliderSection from '@/components/SliderSection';

export default function About() {
  return (
    <PageCard>
      <div className="mb-4 border-y py-4">
        <h1 className="text-center text-2xl font-bold">เกี่ยวกับเรา</h1>
      </div>
      <section>
        <h2 className="text-2xl font-bold">มูเต SAY HI</h2>
        <h3 className="text-xl font-bold">ทำไมต้องมูเตเวิร์ล</h3>
        <p>
          ศูนย์รวมจักรวาลความมู
          ผู้คิดค้นศาสตร์มูด้วยวอลเปเปอร์มือถือเสริมดวงเจ้าแรกในประเทศไทย
          ที่สร้างปรากฎการณ์ความปังยอดซื้อซ้ำกว่าหลายหมื่นออเดอร์ ​ มูเตเวิร์ล
          เป็นพื้นที่สำหรับคนรุ่นใหม่ที่สนใจในเรื่องมูเตลู
          ไม่ว่าคุณจะเป็นมูมือใหม่ หรือมูตัวแม่ ผู้ประกอบการ พ่อค้าแม่ค้า
          ที่อยากเสริมดวงเฮงๆปังๆ
          มาพร้อมสินค้าและบริการต่างๆมากมายที่คัดสรรมาแล้ว
        </p>
      </section>
      <div className="h-62.5 w-full bg-[url(/images/bannerAb.avif)] bg-cover bg-center sm:h-95"></div>

      <div className="px-4 sm:px-10">
        <SliderSection />
      </div>

      <div className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col items-start overflow-hidden rounded-xl bg-white shadow-md sm:flex-row sm:items-center">
            <div className="w-full p-6 sm:w-1/2 sm:p-10">
              <h5 className="text-primary mb-2 text-xl font-bold">
                บริษัท Muteverse
              </h5>
              <h6 className="mb-3 text-lg text-gray-600">Subtitle</h6>
              <p className="text-gray-700">
                ที่อยู่ 51/6 ถนน รามอินทรา แขวง คันนายาว เขต คันนายาว กรุงเทพฯ
                10230 (สถานีรถไฟฟ้า กม.6)
              </p>
            </div>

            <div className="flex w-full flex-col items-center p-6 sm:w-1/2 sm:p-10">
              <h5 className="text-primary mb-5 text-xl font-bold">
                สนใจติดต่องาน
              </h5>

              <h6 className="text-primary mb-1 text-xl font-bold">E-mail</h6>
              <h6 className="mb-5 text-lg text-gray-600">
                phakkharaphong.c@kkumail.com
              </h6>

              <h6 className="text-primary mb-1 text-xl font-bold">Tel</h6>
              <h6 className="text-lg text-gray-600">0994701286</h6>
            </div>
          </div>
        </div>
      </div>
    </PageCard>
  );
}
