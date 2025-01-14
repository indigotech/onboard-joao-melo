import React from 'react';

import { Container, Input, LabelInput } from './style';

interface FormProps {
  name: string;
  info: string;
  setValue?: (text: string) => void;
}

export function Form(props: FormProps): JSX.Element {
  return (
    <Container>
      <LabelInput> {props.name} </LabelInput>
      <Input onChangeText={props.setValue}> {props.info} </Input>
    </Container>
  );
}
