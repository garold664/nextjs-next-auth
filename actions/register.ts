'use server';
import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

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

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    error: '',
    success: 'You are successfully registered! Confirmation email sent',
  };
};
