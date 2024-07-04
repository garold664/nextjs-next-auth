import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React from 'react';

interface FormErrorProps {
  message?: string;
}
export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className=" flex bg-destructive/15 text-destructive p-3 rounded-lg items-center gap-x-4 text-sm">
      <ExclamationTriangleIcon className="flex-shrink-0 h-5 w-5" />
      <p>{message}</p>
    </div>
  );
}
