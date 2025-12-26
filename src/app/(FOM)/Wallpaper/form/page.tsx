'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { OrderType } from '@/interfaces/OrderType';
// import { usePagination } from '@/utils/use-pagination';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function FormCreateWallpaper() {
  // const router = useRouter();
  // const [totalItems, setTotalItems] = useState(1);
  // const [selectedOrderType, setSelectedOrderType] = useState<string>("")
  // const {
  //   pageIndex,
  //   setPageIndex,
  //   pageSize,
  //   setPageSize,
  //   totalPages,
  //   startItem,
  //   endItem,
  //   pageButtons,
  // } = usePagination({
  //   totalItems,
  //   pageSize: 10,
  //   initialPage: 1,
  //   maxButtons: 5,
  // });
  // const [orderType, setOrderType] = useState<OrderType[] | null>()

  // useEffect(() => {
  //   const fecthdata = async () => {
  //     const res = await OrderTypeService.getall(pageIndex, 100)
  //     setOrderType(res)
  //   }
  //   fecthdata();
  // }, [pageIndex])
  return (
    <>
      <div className="flex w-full items-center justify-center bg-blue-50 p-5">
        <div className="mt-5 w-150">
          {/* <Form></Form> */}
          <form className="  w-full rounded-2xl bg-white/40 backdrop-blur-[2px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-white/30 dark:bg-slate-900/60 dark:border-slate-700">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-bold">คำสั่งซื้อ Wallpaper</h1>
                <h2 className="p-1">คอลเลคชันวอลเปเปอร์ที่คุณลูกค้าสั่งซื้อ</h2>
              </div>
              <FieldGroup>

                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    เลือกคอลเลคชั่นวอเปเปอร์ที่ต้องการสั่งซื้อ
                  </FieldLabel>
                  {/* <Select defaultValue="" value={selectedOrderType} onValueChange={(value) => setSelectedOrderType(value)}>
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="เลือกประเภทวอเปเปอร์" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        orderType?.map((item) => (
                          <SelectItem key={item.id} value={item.id}>{item?.type_name || 'ไม่มีรายการ'} (ราคา {item?.price} บาท)</SelectItem>
                        ))
                      }

                    </SelectContent>
                  </Select> */}
                </Field>


                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    ชื่อจริงของท่าน
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="ชื่อจริง"
                    required
                  />
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    นามสกุลของท่าน
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="นามสกุล"
                    required
                  />
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    อีเมล
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="อีเมล"
                    type="email"
                    required
                  />
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    เบอร์โทรศัพท์
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="เบอร์โทร"
                    type="tels"
                    required
                  />
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    โรคประจำตัว
                  </FieldLabel>
                  <Textarea
                    id="checkout-7j9-card-name-43j"
                    placeholder="กรอกรายละเอียด..."
                    required
                  />
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    หมายเหตุ
                  </FieldLabel>
                  <Textarea
                    id="checkout-7j9-card-name-43j"
                    placeholder="กรอกรายละเอียด..."
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    เพศของท่าน
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="เลือกเพศ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">ชาย</SelectItem>
                      <SelectItem value="female">หญิง</SelectItem>
                      <SelectItem value="LGBTQ">LGBTQ++</SelectItem>
                      <SelectItem value="lesbian">เลสเบี้ยน</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>


                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  วัน/เดือน/ปี เกิด
                </FieldLabel>
                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <Field>
                      <FieldLabel htmlFor="checkout-7j9-cvv">วัน</FieldLabel>
                      <Select defaultValue="">
                        <SelectTrigger id="checkout-exp-month-ts6">
                          <SelectValue placeholder="เลือกวันเกิด" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monday">จันทร์</SelectItem>
                          <SelectItem value="Tuesday">อังคาร</SelectItem>
                          <SelectItem value="Wednesday">พุธ</SelectItem>
                          <SelectItem value="Thursday">พฤหัสบดี</SelectItem>
                          <SelectItem value="Friday">ศุกร์</SelectItem>
                          <SelectItem value="Saturday">เสาร์</SelectItem>
                          <SelectItem value="Sunday">อาทิตย์</SelectItem>

                        </SelectContent>
                      </Select>
                    </Field>

                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-cvv">เดือน</FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="checkout-exp-month-ts6">
                        <SelectValue placeholder="เลือกเดือนเกิด" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="January">มกราคม</SelectItem>
                        <SelectItem value="February">กุมภาพันธ์</SelectItem>
                        <SelectItem value="March">มีนาคม</SelectItem>
                        <SelectItem value="April">เมษายน</SelectItem>
                        <SelectItem value="May">พฤษภาคม</SelectItem>
                        <SelectItem value="June">มิถุนายน</SelectItem>
                        <SelectItem value="July">กรกฏาคม</SelectItem>
                        <SelectItem value="August">สิงหาคม</SelectItem>
                        <SelectItem value="September">กันยายน</SelectItem>
                        <SelectItem value="October">ตุลาคม</SelectItem>
                        <SelectItem value="November">พฤศจิกายน</SelectItem>
                        <SelectItem value="December">ธันวาคม</SelectItem>

                      </SelectContent>
                    </Select>

                  </Field>
                  <Field>
                    <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                      ปีนักษัตร
                    </FieldLabel>
                    <Select defaultValue="">
                      <SelectTrigger id="checkout-7j9-exp-year-f59">
                        <SelectValue placeholder="เลือกปีนักษัตร" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rat">ชวด (Rat)</SelectItem>
                        <SelectItem value="Ox">ฉลู (Ox)</SelectItem>
                        <SelectItem value="TIger">ชาล (TIger)</SelectItem>
                        <SelectItem value="Rabbit">เถาะ (Rabbit)</SelectItem>
                        <SelectItem value="Dragon">มะโรง (Dragon)</SelectItem>
                        <SelectItem value="Snake">มะเส็ง (Snake)</SelectItem>
                        <SelectItem value="Horse">มะเมีย (Horse)</SelectItem>
                        <SelectItem value="Goat">มะเเม (Goat)</SelectItem>
                        <SelectItem value="Monkey">วอก (Monkey)</SelectItem>
                        <SelectItem value="Rooster">ระกา (Rooster)</SelectItem>
                        <SelectItem value="Dog">จอ (Dog)</SelectItem>
                        <SelectItem value="Pig">กุน (Pig)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </FieldGroup>

              <div className="mt-5 flex gap-3 ">
                <Button className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer' type="submit">บันทึก</Button>{' '}
                <Button
                  className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer'
                  variant="outline"
                  type="button"
                  // onClick={() => router.push('/Home')}
                >
                  ยกเลิก{' '}
                </Button>
              </div>
            </div>
          </form>
          {/* <DynamicForm>
          </DynamicForm> */}
        </div>
      </div>
    </>
  );
}
