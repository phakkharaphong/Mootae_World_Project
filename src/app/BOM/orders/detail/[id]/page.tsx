'use client';

import { OrderPayment } from "@/interfaces/OrderPayment";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Order, OrderJoin } from "@/models/order.model";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from "react";


interface OrderFormProps {
  orderId: string;
}
interface MutationResponse {
  message: string;
  file_url: string;
}

export default function DetailOrder({ orderId }: OrderFormProps) {

  const [isDialogPreviweImgOpen, setIsDialogPreviweImgOpen] = useState(false);

  const handleClickPreview = () => {
    // setSelectedOrder(order);
    setIsDialogPreviweImgOpen(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["order-payment", orderId],
    queryFn: async () =>
      await api.get<OrderPayment>(`order-payment/OrderId/${orderId}`).json(),
    enabled: !!orderId,
  });

  const mutation = useMutation<MutationResponse, unknown, { wallpaper_url: string; text: string }>({
    mutationFn: async ({ wallpaper_url, text }) => {
      return api
        .post(`attachment/image/text?text=${text}&image_url=${wallpaper_url}`)
        .json<MutationResponse>();
    },
  });

  const { data: order, isLoading: isOrderLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () =>
      await api.get<OrderJoin>(`order/${orderId}`).json(),
    enabled: !!orderId,
  });

  const handleClickSend = async (wallpaper_url: string, text: string) => {
    if (!orderId) return;

    try {
      const mutationResponse = await mutation.mutateAsync({ wallpaper_url, text });
      if (!mutationResponse?.file_url) {
        toast.error("ไม่สามารถสร้างวอลเปเปอร์ได้");
        return;
      }
      await api.post(`email/send-email`, {
        json: {
          subject: "นำส่งรายการวอลเปเปอร์ที่ท่านทำการสั่งซื้อ",
          email: order?.email,
          title: `สวัสดีคุณ ${order?.first_name_customer}`,
          name: "ทางบริษัท มูเตเวิส ขอขอบคุณลูกค้าที่ไว้ใจในการสั่งซื้อวอลเปเปอร์กับทางบริษัทเป็นอย่างสูง",
          img_Url: mutationResponse.file_url,
          detail: "ท่านสามารถดาวนโหลดภาพวอลเปอร์เสริมดวงได้จากไฟล์ด้านล่างนี้ครับ"
        }
      })

      toast.success("ส่งวอลเปเปอร์เรียบร้อยแล้ว");
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }


  };



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
                onClick={() => handleClickPreview()}
                src={data.slip_url}
                alt="Payment Slip"
                width={600}
                height={600}
                className="h-auto w-full object-contain cursor-pointer"
                unoptimized
              />
            </div>
          ) : (
            <div className="mx-auto flex aspect-square w-full max-w-xs items-center justify-center rounded-lg border bg-muted text-xs text-muted-foreground">
              ยังไม่มีสลิปการชำระเงิน
            </div>
          )}
        </div>

        {order?.payment_status === 'Completed' && (
          <Button
            onClick={() => handleClickSend(order?.wallpaper_url || '', order?.full_mootext || '')}
            variant="outline"
            className="text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 cursor-pointer"
          >
            {mutation.isPending ? "กำลังส่ง..." : <><EditIcon /> ส่งวอลเปเปอร์</>}
          </Button>

        )}

        {mutation.isError && <div className="text-red-500 text-sm mt-2">ส่งวอลเปเปอร์ไม่สำเร็จ</div>}
        {mutation.isSuccess && <div className="text-green-500 text-sm mt-2">ส่งวอลเปเปอร์เรียบร้อยแล้ว</div>}
      </section>

      <Dialog
        open={isDialogPreviweImgOpen}
        onOpenChange={(open) => {
          setIsDialogPreviweImgOpen(open);
        }}
      >
        <DialogContent
          className="max-h-screen overflow-y-auto sm:max-w-2xl"
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              ตรวจสอบหลักฐานการโอนเงิน
            </DialogTitle>
          </DialogHeader>
          {data?.slip_url ? (
            <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md overflow-hidden rounded-lg border bg-muted">
              <Image
                onClick={() => handleClickPreview()}
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

          {/* {selectedOrder?.id && (
            <DetailOrder orderId={selectedOrder.id} />
          )} */}
        </DialogContent>
      </Dialog>


    </div>



  );
}
