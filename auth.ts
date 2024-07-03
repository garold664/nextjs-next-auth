import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '../nextjs-next-auth/auth.config';
import { db } from './lib/db';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
