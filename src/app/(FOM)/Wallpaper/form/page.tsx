'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Paginated } from '@/models/common/paginated';
import { useForm } from '@tanstack/react-form';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/base-path-manager';

type OrderType = {
  id: string;
  type_name: string;
  price: number;
};

export default function FormCreateWallpaper() {
  const [isWallpaperDialogOpen, setIsWallpaperDialogOpen] = useState(false);

  const { data: orderTypes } = useQuery({
    queryKey: ['oreder-type-list'],
    queryFn: async () =>
      await api.get('order-type?page=1&limit=100').json<Paginated<OrderType>>(),
  });

  const { data: wallpapers } = useQuery({
    queryKey: ['wallpaper-list'],
    queryFn: async () =>
      await api
        .get('wallpaper?page=1&limit=100')
        .json<Paginated<{ id: string; url: string }>>(),
  });

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: {
        day: '',
        month: '',
        year: '',
      },
      orderType: '',
      wallperUrl: '',
    },
    onSubmit: async ({ value }) => {
      try {
        const {
          data: { id },
        } = await api
          .post('order', {
            json: {
              first_name_customer: value.firstName,
              last_name_customer: value.lastName,
              email: value.email,
              phone: value.phone,
              birth_date_customer_number: value.birthDate.day,
              birth_month_customer_number: value.birthDate.month,
              zodiac_customer_number: value.birthDate.year,
              order_type_id: value.orderType,
              wallpaper_url: value.wallperUrl,
            },
          })
          .json<{ data: { id: string } }>();
        toast.success('บันทึกข้อมูลสำเร็จ');
        window.location.href = withBasePath(`/Orders/payment/${id}`);
      } catch {
        toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    },
  });

  const formatTHB = (value: number) =>
    new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <>
      <div className="flex w-full items-center justify-center p-5">
        <div className="w-150">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="w-full rounded-2xl border border-white/30 bg-white/40 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-[2px] dark:border-slate-700 dark:bg-slate-900/60"
          >
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-center text-2xl font-bold">
                  คำสั่งซื้อวอลเปเปอร์
                </h1>
              </div>

              <Separator />

              <FieldGroup>
                <form.Field name="firstName">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        ชื่อจริงของท่าน
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        placeholder="ชื่อจริง"
                        required
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="lastName">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        นามสกุลของท่าน
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        placeholder="นามสกุล"
                        required
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="email">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        อีเมล (วอลเปเปอร์จะถูกส่งไปยังอีเมลนี้)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        placeholder="อีเมล"
                        type="email"
                        required
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="phone">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        เบอร์โทรศัพท์ของท่าน
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.setValue(e.target.value)}
                        placeholder="เบอร์โทรศัพท์"
                        required
                      />
                    </Field>
                  )}
                </form.Field>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <form.Field name="birthDate.day">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>วันเกิด</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => field.setValue(value)}
                        >
                          <SelectTrigger id={field.name} name={field.name}>
                            <SelectValue placeholder="เลือกวันเกิด" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">วันอาทิตย์</SelectItem>
                            <SelectItem value="1">วันจันทร์</SelectItem>
                            <SelectItem value="2">วันอังคาร</SelectItem>
                            <SelectItem value="3">วันพุธ</SelectItem>
                            <SelectItem value="4">วันพฤหัสบดี</SelectItem>
                            <SelectItem value="5">วันศุกร์</SelectItem>
                            <SelectItem value="6">วันเสาร์</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  </form.Field>

                  <form.Field name="birthDate.month">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>เดือนเกิด</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => field.setValue(value)}
                        >
                          <SelectTrigger id={field.name} name={field.name}>
                            <SelectValue placeholder="เลือกเดือนเกิด" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">เดือนมกราคม</SelectItem>
                            <SelectItem value="1">เดือนกุมภาพันธ์</SelectItem>
                            <SelectItem value="2">เดือนมีนาคม</SelectItem>
                            <SelectItem value="3">เดือนเมษายน</SelectItem>
                            <SelectItem value="4">เดือนพฤษภาคม</SelectItem>
                            <SelectItem value="5">เดือนมิถุนายน</SelectItem>
                            <SelectItem value="6">เดือนกรกฏาคม</SelectItem>
                            <SelectItem value="7">เดือนสิงหาคม</SelectItem>
                            <SelectItem value="8">เดือนกันยายน</SelectItem>
                            <SelectItem value="9">เดือนตุลาคม</SelectItem>
                            <SelectItem value="10">เดือนพฤศจิกายน</SelectItem>
                            <SelectItem value="11">เดือนธันวาคม</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  </form.Field>

                  <form.Field name="birthDate.year">
                    {(field) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>ปีนักษัตร</FieldLabel>
                        <Select
                          value={field.state.value}
                          onValueChange={(value) => field.setValue(value)}
                        >
                          <SelectTrigger id={field.name} name={field.name}>
                            <SelectValue placeholder="เลือกปีนักษัตร" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">ปีชวด</SelectItem>
                            <SelectItem value="1">ปีฉลู</SelectItem>
                            <SelectItem value="2">ปีชาล</SelectItem>
                            <SelectItem value="3">ปีเถาะ</SelectItem>
                            <SelectItem value="4">ปีมะโรง</SelectItem>
                            <SelectItem value="5">ปีมะเส็ง</SelectItem>
                            <SelectItem value="6">ปีมะเมีย</SelectItem>
                            <SelectItem value="7">ปีมะเเม</SelectItem>
                            <SelectItem value="8">ปีวอก</SelectItem>
                            <SelectItem value="9">ปีระกา</SelectItem>
                            <SelectItem value="10">ปีจอ</SelectItem>
                            <SelectItem value="11">ปีกุน</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  </form.Field>
                </div>

                <form.Field name="orderType">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        ต้องการเสริมดวงในด้าน
                      </FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => field.setValue(value)}
                      >
                        <SelectTrigger id={field.name} name={field.name}>
                          <SelectValue placeholder="เลือกประเภท" />
                        </SelectTrigger>
                        <SelectContent>
                          {orderTypes?.data.map((orderType) => (
                            <SelectItem key={orderType.id} value={orderType.id}>
                              {orderType.type_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {field.state.value ? (
                        <p className="text-muted-foreground text-sm">
                          ราคา:{' '}
                          {(() => {
                            const selected = orderTypes?.data.find(
                              (orderType) => orderType.id === field.state.value
                            );
                            return selected ? formatTHB(selected.price) : '-';
                          })()}
                        </p>
                      ) : null}
                    </Field>
                  )}
                </form.Field>

                <form.Field name="wallperUrl">
                  {(field) => (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        เลือกวอลเปเปอร์ที่ต้องการสั่งซื้อ
                      </FieldLabel>

                      <input
                        id={field.name}
                        name={field.name}
                        type="hidden"
                        value={field.state.value}
                        readOnly
                      />

                      <div className="flex items-center gap-2">
                        <Dialog
                          open={isWallpaperDialogOpen}
                          onOpenChange={setIsWallpaperDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button type="button" variant="outline">
                              เลือกวอลเปเปอร์
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[calc(100dvh---spacing(4))] overflow-auto">
                            <DialogHeader>
                              <DialogTitle>เลือกวอลเปเปอร์</DialogTitle>
                            </DialogHeader>

                            {!wallpapers ? (
                              <div className="text-muted-foreground text-sm">
                                กำลังโหลดวอลเปเปอร์...
                              </div>
                            ) : wallpapers.data.length === 0 ? (
                              <div className="text-muted-foreground text-sm">
                                ไม่มีวอลเปเปอร์ให้เลือก
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {wallpapers.data.map((wallpaper) => {
                                  const isSelected =
                                    field.state.value === wallpaper.url;
                                  return (
                                    <button
                                      key={wallpaper.id}
                                      type="button"
                                      onClick={() => {
                                        field.setValue(wallpaper.url);
                                        setIsWallpaperDialogOpen(false);
                                      }}
                                      className={cn(
                                        'relative overflow-hidden rounded-xl border transition',
                                        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                                        isSelected
                                          ? 'ring-primary ring-2 ring-offset-2'
                                          : 'hover:ring-primary/40 hover:ring-2 hover:ring-offset-2'
                                      )}
                                    >
                                      <Image
                                        src={wallpaper.url}
                                        alt="ตัวอย่าง Wallpaper"
                                        className="aspect-2/3 w-full object-cover"
                                        width={512}
                                        height={768}
                                        unoptimized
                                      />
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          type="button"
                          variant="outline"
                          disabled={!field.state.value}
                          onClick={() => field.setValue('')}
                        >
                          ล้าง
                        </Button>
                      </div>

                      <div className="mt-3">
                        <div className="relative mx-auto aspect-2/3 w-40 overflow-hidden rounded-md border">
                          {field.state.value ? (
                            <Image
                              src={field.state.value}
                              alt="Wallpaper ที่เลือก"
                              className="h-full w-full object-cover"
                              width={320}
                              height={480}
                              unoptimized
                            />
                          ) : (
                            <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
                              ยังไม่ได้เลือกวอลเปเปอร์
                            </div>
                          )}
                        </div>
                      </div>
                    </Field>
                  )}
                </form.Field>
              </FieldGroup>

              <form.Subscribe
                selector={(state) =>
                  [state.canSubmit, state.isSubmitting] as const
                }
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="mt-5 flex justify-end gap-3">
                    <Button
                      disabled={!canSubmit}
                      className="cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      type="submit"
                    >
                      บันทึก
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      className="cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      variant="outline"
                      type="button"
                      asChild
                    >
                      <Link href="/Home">ยกเลิก</Link>
                    </Button>
                  </div>
                )}
              </form.Subscribe>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
