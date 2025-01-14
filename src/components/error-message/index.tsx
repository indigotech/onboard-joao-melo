import React from 'react';
import { BoxError, TextError } from './style';

export function ErrorMessage({ message }: { message: string }): JSX.Element {
  return (
    <BoxError>
      <TextError>{message}</TextError>
    </BoxError>
  );
}
