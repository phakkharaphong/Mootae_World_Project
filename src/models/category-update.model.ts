import { z } from 'zod';

export const updateCategorySchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อหมวดหมู่'),
  is_active: z.boolean(),
});

export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;
