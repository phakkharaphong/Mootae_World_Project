import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface DeleteCategoryFormProps {
  articleId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DeleteArticleForm({
  articleId,
  onSuccess,
  onCancel,
}: DeleteCategoryFormProps) {
  const form = useForm({
    onSubmit: async ({ value }) => {
      try {
        await api.delete(`blog/${articleId}`, {
          json: value,
        });
        toast.success('ลบบทความสำเร็จ');
        form.reset();
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถลบบทความได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
  });

  return (
    <div>
      <p className="mb-4">คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?</p>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button variant="destructive" onClick={form.handleSubmit}>
          ลบบทความ
        </Button>
      </div>
    </div>
  );
}
