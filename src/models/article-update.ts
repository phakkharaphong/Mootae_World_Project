import { z } from 'zod';

export const updateArticleSchema = z.object({
  title: z.string().min(1, 'กรุณากรอกชื่อบทความ'),
  category_id: z.string().min(1, 'กรุณาเลือกหมวดหมู่บทความ'),
  is_active: z.boolean(),
  cover_img: z.string().optional(),
  content: z.string().optional(),
});

export type UpdateArticleRequest = z.infer<typeof updateArticleSchema>;
