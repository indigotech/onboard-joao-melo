import React from 'react';
import { StyledButton, LoginText, ButtonActivityIndicator } from './style';

interface PrimaryButtonProps {
  text: string;
  loading: boolean;
  onClick: () => void;
}

export function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <StyledButton onPress={props.onClick} disabled={props.loading}>
      {props.loading ? <ButtonActivityIndicator /> : <LoginText>{props.text}</LoginText>}
    </StyledButton>
  );
}
