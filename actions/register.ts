'use server';
import bcrypt from 'bcrypt';
import { RegisterSchema } from '@/schemas';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: 'Invalid email, password or name',
      success: '',
    };

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 8);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: `User with email ${email} already exists`,
      success: '',
    };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  //! TODO: send email verification token

  return {
    error: '',
    success: 'You are successfully registered!',
  };
};
