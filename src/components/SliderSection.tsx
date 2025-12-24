'use client';
import * as React from 'react';

import Image from 'next/image';

import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

export default function SliderSection({
  bgColor = 'bg-white',
  items = [],
}: {
  bgColor?: string;
  items?: string[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section className={`w-450 overflow-hidden ${bgColor}`}>
      {/* w-screen = เต็มจอแนวนอน, overflow-hidden ป้องกัน scrollbar */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-2">
                <Card className="h-100 p-0">
                  <CardContent className="relative h-100 items-center justify-center">
                    <Image
                      src={item}
                      alt="test"
                      fill
                      className="rounded-t-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
          {/* {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="xl:basis-1/1"
            >
              <div className="p-2">
                <Card className="h-full">
                  <CardContent className="flex h-100 items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))} */}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
