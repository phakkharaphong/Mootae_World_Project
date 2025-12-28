import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface DeleteWallpaperFormProps {
  wallpaperId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DeleteWallpaperForm({
  wallpaperId,
  onSuccess,
  onCancel,
}: DeleteWallpaperFormProps) {
  const form = useForm({
    onSubmit: async ({ value }) => {
      try {
        await api.delete(`wallpaper/${wallpaperId}`, {
          json: value,
        });
        toast.success('ลบวอลเปเปอร์สำเร็จ');
        form.reset();
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถลบวอลเปเปอร์ได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
  });

  return (
    <div>
      <p className="mb-4">คุณแน่ใจหรือไม่ว่าต้องการลบวอลเปเปอร์นี้?</p>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button variant="destructive" onClick={form.handleSubmit}>
          ลบวอลเปเปอร์
        </Button>
      </div>
    </div>
  );
}
