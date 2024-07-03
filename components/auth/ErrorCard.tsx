import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import CardWrapper from './CardWrapper';

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Error! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex justify-center">
        <ExclamationTriangleIcon className=" text-destructive h-5 w-5" />
      </div>
    </CardWrapper>
  );
}
