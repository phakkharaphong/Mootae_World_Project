import { z } from 'zod';

export const updateUserSchema = z.object({
  f_name: z.string().min(1, 'กรุณากรอกชื่อ'),
  l_name: z.string().min(1, 'กรุณากรอกนามสกุล'),
  phone: z.string().optional(),
  img_profile: z.string().optional(),
  address: z.string().optional(),
});

export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
