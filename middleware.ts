import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log('Is logged in: ', isLoggedIn);
});

// export default auth(async function middleware(req: NextRequest) {
//   // Your custom middleware logic goes here
// })

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
