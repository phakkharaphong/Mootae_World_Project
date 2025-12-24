import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface DeleteCategoryFormProps {
  categoryId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DeleteCategoryForm({
  categoryId,
  onSuccess,
  onCancel,
}: DeleteCategoryFormProps) {
  const form = useForm({
    onSubmit: async ({ value }) => {
      try {
        await api.delete(`category/${categoryId}`, {
          json: value,
        });
        toast.success('ลบหมวดหมู่สำเร็จ');
        form.reset();
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถลบหมวดหมู่ได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
  });

  return (
    <div>
      <p className="mb-4">คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?</p>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button variant="destructive" onClick={form.handleSubmit}>
          ลบหมวดหมู่
        </Button>
      </div>
    </div>
  );
}
