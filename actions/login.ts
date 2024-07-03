'use server';

import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { z } from 'zod';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success)
    return {
      error: 'Invalid email or password',
      success: '',
    };

  const { email, password } = validatedFields.data;

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
