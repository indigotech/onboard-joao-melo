import React from 'react';
import { LogginButton, LoginText, ActivityIndicatorButton } from './style';

interface PrimaryButtonProps {
  text: string;
  loading: boolean;
  validate: () => void;
}

export function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <LogginButton onPress={props.validate} disabled={props.loading}>
      {props.loading ? <ActivityIndicatorButton /> : <LoginText>{props.text}</LoginText>}
    </LogginButton>
  );
}
