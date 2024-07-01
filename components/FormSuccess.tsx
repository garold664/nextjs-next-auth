import { CheckCircledIcon } from '@radix-ui/react-icons';
import React from 'react';

interface FormSuccessProps {
  message?: string;
}
export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div className=" flex bg-emerald-500/20 text-emerald-500 p-3 rounded-lg items-center gap-x-4 text-sm">
      <CheckCircledIcon className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
}
