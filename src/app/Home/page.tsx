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
import { CalendarIcon, EyeIcon, MenuIcon, Phone } from 'lucide-react';

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
import { useForm } from '@tanstack/react-form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import router from 'next/router';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

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


  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const {
          data: { id },
        } = await api
          .post('contactus', {
            json: {
              name: value.name,
              email: value.email,
              phone: value.phone,
              message: value.message
            },
          })
          .json<{ data: { id: string } }>();
        toast.success('บันทึกข้อมูลสำเร็จ');
        router.push(`/Home`);
      } catch {

      }
    },
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
          <h2 className="my-8 text-center text-2xl font-bold">กิจกรรม</h2>
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
            <article className="group h-full overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

              <div className="relative overflow-hidden">
                <Image
                  src={
                    article.cover_img ||
                    withBasePath('/images/post-placeholder.webp')
                  }
                  alt={article.title}
                  width={400}
                  height={225}
                  unoptimized
                  className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex h-full flex-col p-5">
                <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-800 group-hover:text-primary">
                  {article.title}

                </h3>
                <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="size-4" />
                    {article.created_at
                      ? formatDateBE(new Date(article.created_at))
                      : ''}
                  </span>

                  <span className="flex items-center gap-1">
                    <EyeIcon className="size-4" />
                    {article.view}
                  </span>
                </div>
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

      <div className="flex justify-center px-4 pb-20 sm:px-10">
        <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2">

            {/* Company Info */}
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

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-primary">E-mail:</span>{' '}
                  phakkharaphong.c@kkumail.com
                </p>
                <p>
                  <span className="font-semibold text-primary">Tel:</span>{' '}
                  099-470-1286
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 sm:p-12">
              <h5 className="mb-6 text-xl font-bold text-primary text-center">
                ติดต่อเรา
              </h5>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}

                className="space-y-4">
                <div>
                  <form.Field name="name">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          ชื่อ - นามสกุล
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.setValue(e.target.value)}
                          placeholder="กรอกชื่อของคุณ"
                          required
                          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

                        />
                      </Field>
                    )}
                  </form.Field>
                </div>

                <div>
                  <form.Field name="email">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          E-mail
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.setValue(e.target.value)}
                          placeholder="กรอกอีเมลของคุณ"
                          required
                          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          type='email'
                        />
                      </Field>
                    )}
                  </form.Field>
                </div>

                <div>
                  <form.Field name="phone">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          เบอร์โทรศัพท์
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.setValue(e.target.value)}
                          placeholder="0xx-xxx-xxxx"
                          required
                          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </Field>
                    )}
                  </form.Field>
                </div>

                <div>
                  <form.Field name="message">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          ข้อความ
                        </FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.setValue(e.target.value)}
                          placeholder="รายละเอียดที่ต้องการติดต่อ"
                          required
                          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </Field>
                    )}
                  </form.Field>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>


      <FOMFooter />
    </>
  );
}
