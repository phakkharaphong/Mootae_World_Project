import { z } from 'zod';

export const createActivityBannerSchema = z.object({
  title: z.string().min(1, 'กรุณากรอกชื่อแบนเนอร์กิจกรรม'),
  img_path: z.string().min(1, 'กรุณาอัปโหลดรูปภาพแบนเนอร์'),
  // is_active: z.boolean(),
});

export type CreateActivityBannerRequest = z.infer<
  typeof createActivityBannerSchema
>;
