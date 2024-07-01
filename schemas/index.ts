import { z } from 'zod';
export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, 'Password is required'),
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be less than 32 characters'),
  name: z.string().min(1, 'Name is required'),
});
