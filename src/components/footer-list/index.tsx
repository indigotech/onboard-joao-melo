import React from 'react';
import { LoadingBox, IndicatorLoading } from './style';

export function FooterList({ load }) {
  if (!load) return null;

  return (
    <LoadingBox>
      <IndicatorLoading />
    </LoadingBox>
  );
}
