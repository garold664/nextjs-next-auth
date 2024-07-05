'use server';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { z } from 'zod';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: 'Invalid email or password',
      success: '',
    };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return {
      error: 'User, Email or password does not exist',
    };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success:
        "We can't let you in until you verified your email. Confirmation email sent. If you don't see it, check your spam folder.",
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // console.log('ERROR TYPE: ', error.type);
      //TODO fix this: now it is throwing error of CallbackRouteError instead of CredentialsSignin !!!
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            error: 'Invalid email or password',
            success: '',
          };
        default:
          // console.log(error);
          return {
            error: 'Something went wrong',
            success: '',
          };
      }
    }
    throw error;
  }
};
