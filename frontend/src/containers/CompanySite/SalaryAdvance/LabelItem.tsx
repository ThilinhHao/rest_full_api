import React from 'react';
import { SpaceBase } from 'styles';
import { LabelItemWrapper, TitleLabel } from './labelItemStyle';

const LabelItem = ({ label }: { label: string }) => {
  return (
    <LabelItemWrapper>
      <TitleLabel>{label}</TitleLabel>
      <SpaceBase height={0.0625} />
    </LabelItemWrapper>
  );
};

export default LabelItem;
