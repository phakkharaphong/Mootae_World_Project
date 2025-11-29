"use client";

import { Articleblog } from '@/interfaces/Aricleblog';
import { formatDateToBuddhistEra } from '@/utils/date-format';
import { Calendar, View } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import PaginationControls from './PaginationControls';
export function Cardarticle({ response = [] }: { response?: Articleblog[] }) {
  const router = useRouter();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {response?.map((item) => (
            <div
              className="rounded-lg bg-white p-4 shadow-md transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
              key={item.id}
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image
                  src="/images/tarot-banner.jpg"
                  alt="test"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h5 className="text-primary mb-2 text-xl font-bold">
                  {item.title}
                </h5>

                {/* <p className="mb-4 line-clamp-3 text-gray-700 dark:text-gray-300">
                  {item.conten}
                </p> */}

                {/* Date */}
                <div className="mb-4 flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDateToBuddhistEra(item.created_at, 'DD MMMM BBBB')}
                  </span>
                </div>
                {/* View */}
                <div className="mb-4 flex items-center space-x-2 text-sm text-gray-500">
                  <View className="h-4 w-4" />
                  <span>จำนวนคนดู {item.view}</span>
                </div>

                {/* Button */}
                <Button
                  className="mt-auto w-full bg-blue-950 hover:bg-blue-600"
                  onClick={() => router.push(`/article/${item.id}`)}
                >
                  ดูรายละเอียด
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
