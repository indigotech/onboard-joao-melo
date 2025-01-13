import React from 'react';

import { Container, Input, LabelInput } from './style';

interface UserFormProps {
  name: string;
  info: string;
}

function UserForm(props: UserFormProps): JSX.Element {
  return (
    <Container>
      <LabelInput> {props.name} </LabelInput>
      <Input> {props.info} </Input>
    </Container>
  );
}

export default UserForm;
