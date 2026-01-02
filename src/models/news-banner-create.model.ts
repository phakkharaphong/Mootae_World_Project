import { z } from 'zod';

export const createNewsBannerSchema = z.object({
  title: z.string().min(1, 'กรุณากรอกชื่อแบนเนอร์ข่าวสาร'),
  img_path: z.string().min(1, 'กรุณาอัปโหลดรูปภาพแบนเนอร์'),
  link_ref: z.string().min(1, 'กรุณากรอกลิงก์แบนเนอร์'),
  // is_active: z.boolean(),
});

export type CreateNewsBannerRequest = z.infer<typeof createNewsBannerSchema>;
