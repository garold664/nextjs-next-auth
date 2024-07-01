'use server';

import { LoginSchema } from '@/schemas';
import { error } from 'console';
import { z } from 'zod';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: 'Invalid email or password',
      success: '',
    };
  return {
    error: '',
    success: 'Email successfully sent',
  };
};
