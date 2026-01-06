'use client';

import PageCard from '@/components/PageCard';
import SliderSection from '@/components/SliderSection';

export default function About() {
  return (
    <PageCard>
      <div className="mb-10 border-y bg-white py-6">
        <h1 className="text-center text-3xl font-extrabold tracking-tight">
          เกี่ยวกับเรา
        </h1>
      </div>
      <section className="mx-auto mb-16 max-w-4xl px-4 text-center sm:px-6">
        <h2 className="mb-2 text-3xl font-extrabold text-primary">
          มูเต SAY HI
        </h2>
        <h3 className="mb-6 text-xl font-semibold text-gray-600">
          ทำไมต้องมูเตเวิร์ล
        </h3>

        <p className="leading-relaxed text-gray-700">
          ศูนย์รวมจักรวาลความมู
          ผู้คิดค้นศาสตร์มูด้วยวอลเปเปอร์มือถือเสริมดวงเจ้าแรกในประเทศไทย
          ที่สร้างปรากฎการณ์ความปังยอดซื้อซ้ำกว่าหลายหมื่นออเดอร์
          <span className="font-semibold text-primary"> มูเตเวิร์ล </span>
          เป็นพื้นที่สำหรับคนรุ่นใหม่ที่สนใจในเรื่องมูเตลู
          ไม่ว่าคุณจะเป็นมูมือใหม่ หรือมูตัวแม่
          ผู้ประกอบการ พ่อค้าแม่ค้า
          ที่อยากเสริมดวงเฮงๆ ปังๆ
          เราพร้อมสินค้าและบริการที่คัดสรรมาแล้วอย่างพิถีพิถัน
        </p>
      </section>

      <div className="h-64 w-full bg-[url(/images/bannerAb.avif)] bg-cover bg-center sm:h-96" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-10">
        <SliderSection />
      </div>

      <div className="flex justify-center px-4 pb-20 sm:px-10">
        <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h5 className="mb-2 text-xl font-bold text-primary">
                บริษัท Muteverse
              </h5>
              <p className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
                Company Address
              </p>
              <p className="leading-relaxed text-gray-700">
                ที่อยู่ 51/6 ถนนรามอินทรา แขวงคันนายาว
                เขตคันนายาว กรุงเทพฯ 10230
                <br />
                <span className="text-sm text-gray-500">
                  (สถานีรถไฟฟ้า กม.6)
                </span>
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col justify-center bg-gray-50 p-8 text-center sm:p-12">
              <h5 className="mb-6 text-xl font-bold text-primary">
                สนใจติดต่องาน
              </h5>

              <div className="mb-5">
                <p className="font-semibold text-primary">E-mail</p>
                <p className="text-gray-600">
                  phakkharaphong.c@kkumail.com
                </p>
              </div>

              <div>
                <p className="font-semibold text-primary">Tel</p>
                <p className="text-gray-600">099-470-1286</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageCard>

  );
}
