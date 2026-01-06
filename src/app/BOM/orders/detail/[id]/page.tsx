'use client';

import { OrderPayment } from "@/interfaces/OrderPayment";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderJoin } from "@/models/order.model";

interface OrderFormProps {
  orderId: string;
}

export default function DetailOrder({ orderId }: OrderFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["order-payment", orderId],
    queryFn: async () =>
      await api.get<OrderPayment>(`order-payment/OrderId/${orderId}`).json(),
    enabled: !!orderId,
  });

  const { data: order, isLoading: isOrderLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () =>
      await api.get<OrderJoin>(`order/${orderId}`).json(),
    enabled: !!orderId,
  });

  if (isLoading || isOrderLoading) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border bg-background p-4 sm:p-6 shadow-sm">
      <section className="space-y-2">
        <h3 className="text-sm font-semibold">ขั้นตอนการชำระเงิน</h3>
        <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
          <li>สแกนและชำระเงิน</li>
          <li>อัปโหลดสลิป</li>
          <li>กดส่งสลิป</li>
          <li>รอแอดมินตรวจสอบ และส่งวอลเปเปอร์ทางอีเมล</li>
        </ol>
      </section>

      <Separator />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">รายละเอียดผู้สั่งซื้อ</h3>

          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <span className="text-muted-foreground">ชื่อจริง</span>
              <div className="font-medium">
                {order?.first_name_customer} {order?.last_name_customer}
              </div>
            </div>

            <div>
              <span className="text-muted-foreground">อีเมล</span>
              <div className="font-medium break-all">{order?.email}</div>
            </div>

            <div>
              <span className="text-muted-foreground">เบอร์โทรศัพท์</span>
              <div className="font-medium">{order?.phone}</div>
            </div>

            <div>
              <span className="text-muted-foreground">สถานะการชำระเงิน</span>
              <div>
                <Badge
                  variant={
                    order?.payment_status === "Completed"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {order?.payment_status}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <span className="text-muted-foreground">จำนวนเงิน</span>
            <div className="text-base font-semibold">
              {data?.amount || order?.total_price} บาท
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">สลิปการชำระเงิน</h3>

          {data?.slip_url ? (
            <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md overflow-hidden rounded-lg border bg-muted">
              <Image
                src={data.slip_url}
                alt="Payment Slip"
                width={600}
                height={600}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div className="mx-auto flex aspect-square w-full max-w-xs items-center justify-center rounded-lg border bg-muted text-xs text-muted-foreground">
              ยังไม่มีสลิปการชำระเงิน
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
