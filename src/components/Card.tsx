import { Articleblog } from '@/interfaces/Aricleblog';
import { formatDateToBuddhistEra } from '@/utils/date-format';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
export function Cardarticle({ response = [] }: { response?: Articleblog[] }) {
  return (
    <>
      <div className="container mx-auto px-4">
        {/* <h2 className="mb-4 text-center text-4xl font-bold">กำลังมาแรง</h2> */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {response?.map((item, index) => (
            <div className="rounded-lg bg-white p-4 shadow-md" key={item.id}>
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

              <h5 className="text-primary text-xl font-bold">{item.title}</h5>
              {/* <h6 className="text-lg">{}</h6> */}
              <p className="line-clamp-3 text-gray-700">
             
                {item.conten}
              </p>
              <Calendar className='flex'></Calendar><span className=''>{formatDateToBuddhistEra(item.created_at, 'DD MMMM BBBB')}</span>
            </div>
          ))}
         
        </div>
      </div>
    </>
  );
}
