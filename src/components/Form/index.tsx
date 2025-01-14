import React from 'react';

import { Container, Input, LabelInput } from './style';

interface FormProps {
  name: string;
  info: string;
}

export function Form(props: FormProps): JSX.Element {
  return (
    <Container>
      <LabelInput> {props.name} </LabelInput>
      <Input> {props.info} </Input>
    </Container>
  );
}
