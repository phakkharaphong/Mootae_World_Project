import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1, 'กรุณากรอกชื่อผู้ใช้งาน'),
  password: z.string().min(6, 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร'),
  confirm_password: z.string().min(6, 'กรุณายืนยันรหัสผ่าน'),
  f_name: z.string().min(1, 'กรุณากรอกชื่อ'),
  l_name: z.string().min(1, 'กรุณากรอกนามสกุล'),
  phone: z.string().optional(),
  img_profile: z.string().optional(),
  address: z.string().optional(),
  is_admin: z.boolean(),
  is_active: z.boolean(),
}).refine((data) => data.password === data.confirm_password, {
  message: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน",
  path: ["confirm_password"],
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;
