import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface DeleteUserFormProps {
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DeleteUserForm({
  userId,
  onSuccess,
  onCancel,
}: DeleteUserFormProps) {
  const form = useForm({
    onSubmit: async ({ value }) => {
      try {
        await api.delete(`user/${userId}`, {
          json: value,
        });
        toast.success('ลบผู้ใช้งานสำเร็จ');
        form.reset();
        onSuccess?.();
      } catch {
        toast.error('ไม่สามารถลบผู้ใช้งานได้ กรุณาลองใหม่อีกครั้ง');
      }
    },
  });

  return (
    <div>
      <p className="mb-4">คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้งานนี้?</p>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button variant="destructive" onClick={form.handleSubmit}>
          ลบผู้ใช้งาน
        </Button>
      </div>
    </div>
  );
}
