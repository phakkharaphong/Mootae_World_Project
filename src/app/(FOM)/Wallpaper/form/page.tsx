'use client';

import { NavigationMenuDemo } from '@/components/AppHeader';
import { FooterBar } from '@/components/Footer';
import { Form } from '@/components/Form';
import { DynamicForm } from '@/components/Formtest';
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

export default function FormCreateWallpaper() {
  return (
    <>
      <div className="flex w-full items-center justify-center bg-white p-5">
        <div className="mt-5 w-150">
          {/* <Form></Form> */}
          <DynamicForm>
            <div>
              <h1 className="text-2xl font-bold">คำสั่งซื้อ Wallpaper</h1>
              <h2 className="p-1">คอลเลคชันวอลเปเปอร์ที่คุณลูกค้าสั่งซื้อ</h2>
            </div>
            <FieldGroup>
              {/* <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  ชื่อจริงของท่าน
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="ชื่อจริง"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  นามสกุลของท่าน
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="นามสกุล"
                  required
                />
              </Field> */}

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
              {/* <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Card Number
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field> */}
              <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                วัน/เดือน/ปี เกิด
              </FieldLabel>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    เดือน
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">01</SelectItem>
                      <SelectItem value="02">02</SelectItem>
                      <SelectItem value="03">03</SelectItem>
                      <SelectItem value="04">04</SelectItem>
                      <SelectItem value="05">05</SelectItem>
                      <SelectItem value="06">06</SelectItem>
                      <SelectItem value="07">07</SelectItem>
                      <SelectItem value="08">08</SelectItem>
                      <SelectItem value="09">09</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    ปี
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-cvv">วัน</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </DynamicForm>
        </div>
      </div>
    </>
  );
}
