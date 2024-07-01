import React from 'react';
import CardWrapper from './CardWrapper';

export default function LoginForm() {
  return (
    <CardWrapper
      headerLabel={'Sign in'}
      backButtonLabel={'Sign up'}
      backButtonHref={'/'}
    >
      LoginForm
    </CardWrapper>
  );
}
