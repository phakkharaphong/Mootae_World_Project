'use client';
import Image from 'next/image';
import Link from 'next/link';

import { items } from '@/constants/menu';
import { ActivityBanner } from '@/models/activity-banner';
import { Article } from '@/models/article.model';
import { Paginated } from '@/models/common/paginated';
import { NewsBanner } from '@/models/news-banner';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import { EyeIcon, MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { api } from '@/lib/api';
import { withBasePath } from '@/lib/base-path-manager';
import { formatDateBE } from '@/lib/date-formatter';

import FOMFooter from '../(FOM)/FOMFooter';
import LandingImage from '../../../public/images/landing.png';

export default function Home() {
  const { data: activityBanners } = useQuery({
    queryKey: ['activity-banners'],
    queryFn: async () =>
      await api.get('slide-activity').json<Paginated<ActivityBanner>>(),
  });

  const { data: newsBanners } = useQuery({
    queryKey: ['news-banners'],
    queryFn: async () =>
      await api.get('slide-new').json<Paginated<NewsBanner>>(),
  });

  const { data: articles } = useQuery({
    queryKey: ['articles-home'],
    queryFn: async () =>
      await api.get(`blog?page=1&limit=3`).json<Paginated<Article>>(),
  });
  return (
    <>
      <div
        className="relative min-h-dvh p-4"
        style={{
          backgroundImage: `url(${LandingImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
        }}
      >
        <header className="flex items-start justify-between gap-4">
          <Image
            src="/images/logo.png"
            className="w-24 md:w-36"
            width={897}
            height={812}
            alt="Muteverse logo"
          />
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList>
              {items.map((item) => (
                <NavigationMenuItem key={item.url}>
                  <NavigationMenuLink
                    asChild
                    className="text-base font-medium text-white"
                  >
                    <Link href={item.url}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white md:hidden">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {items.map((item) => (
                <DropdownMenuItem key={item.url} asChild>
                  <Link href={item.url}>{item.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="flex flex-col items-center gap-4 p-4 pt-20 *:drop-shadow md:items-end">
          <h1 className="text-6xl font-black text-white">มูเตเวิร์ส</h1>
          <h2 className="text-lg text-white md:text-2xl">
            ที่พึ่งทางดวงที่ไว้ใจได้เสมอ
          </h2>
          <p className="text-white md:text-2xl">
            SINCERE | PASSIONATE | INFORMATIVE
          </p>
        </div>
      </div>

      <div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {activityBanners?.data.map((item) => (
              <CarouselItem key={item.id}>
                <div className="p-2">
                  <Image
                    src={item.img_path || '/images/placeholder-image.png'}
                    alt={item.title || 'ภาพแบนเนอร์กิจกรรม'}
                    className="aspect-3/1 w-full rounded-xl object-cover"
                    width={900}
                    height={300}
                    unoptimized
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <h2 className="my-8 text-center text-2xl font-bold">บทความ</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
        {articles?.data.map((article) => (
          <Link key={article.id} href={`/Articles/${article.id}`}>
            <article className="rounded-xl border p-4">
              <Image
                src={
                  article.cover_img ||
                  withBasePath('/images/post-placeholder.webp')
                }
                className="mb-2 aspect-video w-full rounded-lg object-cover"
                alt={article.title}
                width={320}
                height={180}
                unoptimized
              />
              <h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
              <div className="text-end text-xs">
                {article.created_at
                  ? formatDateBE(new Date(article.created_at))
                  : ''}
              </div>
              <div className="flex items-center justify-end gap-1 text-end text-xs">
                <EyeIcon className="size-4" /> {article.view}
              </div>
            </article>
          </Link>
        ))}
      </div>
      <div className="my-4 flex items-center justify-center">
        <Button asChild>
          <Link href="/Articles">ดูเพิ่มเติม</Link>
        </Button>
      </div>

      <div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {newsBanners?.data.map((item) => (
              <CarouselItem key={item.id}>
                <div className="p-2">
                  <Link href={item.link_ref || '#'}>
                    <Image
                      src={item.img_path || '/images/placeholder-image.png'}
                      alt={item.title || 'ภาพแบนเนอร์กิจกรรม'}
                      className="aspect-3/1 w-full rounded-xl object-cover"
                      width={900}
                      height={300}
                      unoptimized
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <FOMFooter />
    </>
  );
}
