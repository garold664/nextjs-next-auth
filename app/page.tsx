import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]  from-sky-500 to-sky-400 ">
      <div className="space-y-6 text-center">
        <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md')}>
          🔒Auth
        </h1>
        <p className="text-white text-lg ">Authentication service</p>
        <Button variant={'secondary'} size={'xl'}>
          Sign in
        </Button>
      </div>
    </main>
  );
}
