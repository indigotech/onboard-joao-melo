import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Container, Input, LabelInput } from './style';
import { ErrorMessage } from './style';

interface FormProps {
  name: string;
  onValidateValue: (text: string) => string | null;
}

export interface FormRef {
  validateForms: () => string | null;
}

export const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const [value, setValue] = useState<string>('');
  const [caption, setCaption] = useState<string>('');

  const validateForms = () => {
    const message = props.onValidateValue(value);

    if (message) {
      setCaption(message);
      return null;
    }

    setCaption('');

    return value;
  };

  useImperativeHandle(ref, () => ({
    validateForms,
  }));

  const isError = caption !== '';

  return (
    <Container>
      <LabelInput isError={isError}> {props.name} </LabelInput>
      <Input onChangeText={setValue} value={value} isError={isError} />
      {isError && <ErrorMessage> {caption} </ErrorMessage>}
    </Container>
  );
});
