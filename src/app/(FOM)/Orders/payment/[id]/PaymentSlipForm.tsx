'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { api } from '@/lib/api';
import { uploadFile } from '@/lib/upload-file';

import PromptPayQRCode from './PromptPayQRCode';

export default function PaymentSlipForm({
  orderId,
  order_no,
  amount,
  payload,
}: {
  orderId: string;
  order_no: string;
  amount: number;
  payload: string;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const formatTHB = (value: number) =>
    new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="grid gap-3 rounded-lg border p-4">
      <div className="text-sm font-medium">หมายเลขคำสั่งซื้อ: {order_no}</div>
      <div className="grid gap-1">
        <div className="text-sm font-medium">ขั้นตอน</div>
        <ol className="text-muted-foreground list-decimal space-y-1 pl-5 text-xs">
          <li>สแกนและชำระเงิน</li>
          <li>อัปโหลดสลิป</li>
          <li>กดส่งสลิป</li>
          <li>รอแอดมินตรวจสอบ และส่งวอลเปเปอร์ไปทางอีเมล</li>
        </ol>
      </div>

      <div className="grid gap-1">
        <div className="text-sm font-medium">สแกนเพื่อชำระเงิน</div>
        <PromptPayQRCode payload={payload} />
      </div>

      <div>
        <div className="text-sm font-medium">อัปโหลดสลิปการชำระเงิน</div>
        <div className="text-muted-foreground text-xs">
          ยอดชำระ: {formatTHB(Number(amount ?? 0))}
        </div>
      </div>

      <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-md border">
        {previewUrl || uploadedUrl ? (
          <Image
            src={previewUrl ?? uploadedUrl}
            alt="Payment slip preview"
            className="h-full w-full object-cover"
            width={448}
            height={448}
            unoptimized
          />
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
            ยังไม่ได้เลือกสลิป
          </div>
        )}
      </div>

      <Input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0] ?? null;

          if (previewUrl) URL.revokeObjectURL(previewUrl);
          setPreviewUrl(file ? URL.createObjectURL(file) : null);
          setUploadedUrl('');

          if (!file) return;

          try {
            setIsUploading(true);
            const res = await uploadFile(file);
            if (!res?.url) throw new Error('Invalid upload response');
            setUploadedUrl(res.url);
            toast.success('อัปโหลดสลิปสำเร็จ');
          } catch {
            toast.error('อัปโหลดสลิปไม่สำเร็จ กรุณาลองใหม่');
          } finally {
            setIsUploading(false);
          }
        }}
      />

      <Button
        type="button"
        disabled={!uploadedUrl || isUploading || isSubmitting}
        onClick={async () => {
          if (!uploadedUrl) return;

          try {
            setIsSubmitting(true);
            await api.post('order-payment', {
              json: {
                order_id: orderId,
                slip_url: uploadedUrl,
                amount: amount,
              },
            });
            toast.success('ส่งสลิปสำเร็จ รอแอดมินตรวจสอบ');
          } catch {
            toast.error('ส่งสลิปไม่สำเร็จ กรุณาลองใหม่');
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {isSubmitting
          ? 'กำลังส่ง...'
          : isUploading
            ? 'กำลังอัปโหลด...'
            : 'ส่งสลิป'}
      </Button>
    </div>
  );
}
