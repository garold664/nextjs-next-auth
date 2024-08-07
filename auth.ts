import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { UserRole } from '@prisma/client';

import authConfig from '../nextjs-next-auth/auth.config';
import { db } from './lib/db';
import { getUserById } from './data/user';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // console.log('account: ', account);

      //! allowing OAuth users to sign in without email verification
      // we could also use account.type === 'oauth' or account.type !== 'credentials'
      if (account?.provider !== 'credentials') return true;
      if (!user.id) return false;
      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.emailVerified) return false;

      //TODO: add 2FA check

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (existingUser) {
        token.role = existingUser.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
