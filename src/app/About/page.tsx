import { NavigationMenuDemo } from '@/components/AppHeader';
import Image from 'next/image';

export default function About() {
  return (
    <>
      <NavigationMenuDemo></NavigationMenuDemo>

      <div className="flex h-30 w-full items-center bg-gray-50">
        <h1 className="flex size-24 w-full items-center justify-center font-bold fon">
          สำหรับองค์กร
        </h1>
      </div>
      <div className='flex w-full'>
        <Image
          src={`/images/beadner.avif`}
          width={150}
          height={100}
          className="w-14 justify-center lg:w-full"
          alt="mootae world logo"
        />
      </div>
    </>
  );
}
