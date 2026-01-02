import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { api } from '@/lib/api';

interface DeleteNewsBannerFormProps {
  newsBannerId: string | number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DeleteNewsBannerForm({
  newsBannerId,
  onSuccess,
  onCancel,
}: DeleteNewsBannerFormProps) {
  const form = useForm({
    onSubmit: async ({ value }) => {
      try {
        await api.delete(`slide-new/${newsBannerId}`, {
          json: value,
        });
        toast.success('ลบแบนเนอร์ข่าวสารสำเร็จ');
        form.reset();
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถลบแบนเนอร์ข่าวสารได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
  });

  return (
    <div>
      <p className="mb-4">คุณแน่ใจหรือไม่ว่าต้องการลบแบนเนอร์ข่าวสารนี้?</p>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button variant="destructive" onClick={form.handleSubmit}>
          ลบแบนเนอร์
        </Button>
      </div>
    </div>
  );
}
