import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Container, Input, LabelInput } from './style';
import { ErrorMessage } from './style';

interface FormProps {
  name: string;
  validateValue: (text: string) => string | null;
}

export interface FormRef {
  validateForms: () => string | null;
}

export const Form = forwardRef<FormRef, FormProps>((props, ref) => {
  const [value, setValue] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [isError, setIsError] = useState(false);

  const validateForms = () => {
    const message = props.validateValue(value);

    if (message) {
      setIsError(true);
      setCaption(message);
      return null;
    }

    setIsError(false);
    setCaption('');

    return value;
  };

  useImperativeHandle(ref, () => ({
    validateForms,
  }));

  return (
    <Container>
      <LabelInput isError={isError}> {props.name} </LabelInput>
      <Input
        onChangeText={(newValue: string): void => {
          setValue(newValue);
        }}
        value={value}
        isError={isError}
      />
      {isError && <ErrorMessage> {caption} </ErrorMessage>}
    </Container>
  );
});
