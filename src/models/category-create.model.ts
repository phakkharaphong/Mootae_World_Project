import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อหมวดหมู่'),
  is_active: z.boolean(),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;
