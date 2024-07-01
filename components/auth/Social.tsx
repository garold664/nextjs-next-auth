'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => {}}
        size={'lg'}
        className="w-full"
        variant={'outline'}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => {}}
        size={'lg'}
        className="w-full"
        variant={'outline'}
      >
        <FaGithub />
      </Button>
    </div>
  );
}
