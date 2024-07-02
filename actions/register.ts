'use server';

import { LoginSchema, RegisterSchema } from '@/schemas';
import { error } from 'console';
import { z } from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: 'Invalid email, password or name',
      success: '',
    };
  return {
    error: '',
    success: 'You are successfully registered!',
  };
};
