'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Paginated } from '@/models/common/paginated';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import PageCard from '@/components/PageCard';

import { api } from '@/lib/api';
import { uploadFile } from '@/lib/upload-file';

export default function WallpapersPage() {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState(false);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const queryClient = useQueryClient();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const resetCreateState = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setUploadedUrl('');
  };

  const { data } = useQuery({
    queryKey: ['wallpapers', pagination.pageIndex, pagination.pageSize],
    queryFn: async () =>
      await api
        .get(
          `wallpaper?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
        )
        .json<Paginated<{ url: string }>>(),
  });

  return (
    <PageCard title="วอลเปเปอร์">
      <div className="mb-2 flex justify-end">
        <Button onClick={() => setIsDialogCreateOpen(true)}>
          เพิ่มวอลเปเปอร์
        </Button>
      </div>

      <Dialog
        open={isDialogCreateOpen}
        onOpenChange={(open) => {
          if (!open) resetCreateState();
          setIsDialogCreateOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">เพิ่มวอลเปเปอร์</DialogTitle>
          </DialogHeader>

          <div className="grid gap-2">
            <div className="relative mx-auto aspect-2/3 w-40 overflow-hidden rounded-md border">
              {previewUrl || uploadedUrl ? (
                <Image
                  src={previewUrl ?? uploadedUrl}
                  alt="ตัวอย่าง Wallpaper"
                  className="h-full w-full object-cover"
                  width={320}
                  height={480}
                  unoptimized
                />
              ) : (
                <div className="text-muted-foreground flex h-full w-full items-center justify-center text-xs">
                  ไม่มีรูปภาพ
                </div>
              )}
            </div>

            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0] ?? null;
                if (!file) {
                  resetCreateState();
                  return;
                }

                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl(URL.createObjectURL(file));
                setUploadedUrl('');

                try {
                  setIsUploading(true);
                  const res = await uploadFile(file);
                  if (!res?.url) throw new Error('Invalid upload response');
                  setUploadedUrl(res.url);
                  toast.success('อัปโหลดรูปภาพสำเร็จ');
                } catch {
                  toast.error('อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่');
                } finally {
                  setIsUploading(false);
                }
              }}
            />

            <Button
              type="button"
              disabled={!uploadedUrl || isUploading || isCreating}
              onClick={async () => {
                if (!uploadedUrl) return;
                try {
                  setIsCreating(true);
                  await api.post('wallpaper', { json: { url: uploadedUrl } });
                  toast.success('สร้างวอลเปเปอร์สำเร็จ');
                  resetCreateState();
                  setIsDialogCreateOpen(false);
                  await queryClient.invalidateQueries({
                    queryKey: ['wallpapers'],
                  });
                } catch {
                  toast.error(
                    'ไม่สามารถสร้าง Wallpaper ได้ กรุณาลองใหม่อีกครั้ง'
                  );
                } finally {
                  setIsCreating(false);
                }
              }}
            >
              {isCreating
                ? 'กำลังสร้าง...'
                : isUploading
                  ? 'กำลังอัปโหลด...'
                  : 'สร้างวอลเปเปอร์'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data?.data.map((wallpaper, index) => (
          <div key={index} className="mb-4">
            <Image
              src={wallpaper.url}
              alt={`Wallpaper ${index + 1}`}
              className="aspect-2/3 w-48 rounded-xl object-cover shadow-md"
              width={1024}
              height={1536}
              unoptimized
            />
          </div>
        ))}
      </div>
    </PageCard>
  );
}
