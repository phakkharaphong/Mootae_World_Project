import { NavigationMenuDemo } from '@/components/AppHeader';
import SliderSection from '@/components/SliderSection';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const images = [
    '/images/instagram.avif',
    '/images/line.avif',
    '/images/facebook.avif',
    '/images/shopee.avif',
  ];
  const link = [
    '/instagram',
    '/line',
    'facebook',
    'shopee'
  ]
  return (
    <div>
      <NavigationMenuDemo></NavigationMenuDemo>
      <div className="flex w-full items-center justify-center">
        <SliderSection></SliderSection>
      </div>

      <div className="p-8">
        <h2 className="mb-4 text-center text-4xl font-bold">กำลังมาแรง</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <div className="relative mb-4 aspect-square h-100 w-full">
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

      {/* Card */}
      <div className="p-5">
        <h2 className="mb-4 text-center text-xl font-bold"></h2>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-1">
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
      <div className="p-5">
        <h2 className="mb-2 text-center text-xl font-bold"></h2>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-1">
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
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex h-20 w-full items-center justify-center bg-amber-800">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="flex overflow-hidden rounded-lg p-5" key={index}>
            {/* รูปภาพด้านซ้าย */}
            <div className="relative aspect-square w-15">
              <Link href={link[index]}>
                <Image
                  src={images[index % images.length]}
                  alt={`Card ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
