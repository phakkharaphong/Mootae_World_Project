import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { api } from '@/lib/api';

interface VerifyOrderFormProps {
  orderId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  param: string
}

export default function VerifyOrderForm({
  orderId,
  onSuccess,
  onCancel,
  param,
}: VerifyOrderFormProps) {
  const form = useForm({
    onSubmit: async ({ value }) => {
      if (param == 'ยืนยัน') {

        try {
          await api.patch(`order/${orderId}/complete`, {
            json: value,
          });
          toast.success('ยืนยันการตรวจสอบสำเร็จ');
          form.reset();
          onSuccess?.();
        } catch {
          toast.error('ไม่สามารถยืนยันการตรวจสอบได้ กรุณาลองใหม่อีกครั้ง');
        }
      }
      if (param == 'ยกเลิก') {

        try {
          await api.patch(`order/${orderId}/reject`, {
            json: value,
          });
          toast.success('ยืนยันการตรวจสอบสำเร็จ');
          form.reset();
          onSuccess?.();
        } catch {
          toast.error('ไม่สามารถยืนยันการตรวจสอบได้ กรุณาลองใหม่อีกครั้ง');
        }
      }
    },
  });

  return (
    <div>
      <p className="mb-4">
        ยืนยันการตรวจสอบคำสั่งซื้อนี้และส่งวอลเปเปอร์หรือไม่?
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button onClick={form.handleSubmit}>
          ยืนยัน
        </Button>
      </div>
    </div>
  );
}
