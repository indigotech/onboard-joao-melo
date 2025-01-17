import React from 'react';
import { BoxName, H3, ItemBox } from './style';

interface BoxProps {
  email: string;
  name: string;
}

export function BoxInfo(props: BoxProps): JSX.Element {
  return (
    <ItemBox>
      <BoxName>
        <H3> {props.name} </H3>
        <H3> {props.email} </H3>
      </BoxName>
    </ItemBox>
  );
}
