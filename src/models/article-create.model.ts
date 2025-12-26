import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'กรุณากรอกชื่อบทความ'),
  category_id: z.string().min(1, 'กรุณาเลือกหมวดหมู่บทความ'),
  cover_img: z.string().optional(),
  is_active: z.boolean(),
});

export type CreateArticleRequest = z.infer<typeof createArticleSchema>;
