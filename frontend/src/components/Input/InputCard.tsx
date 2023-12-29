import React from 'react';

import { InputProps } from 'antd';
import { InputCardWrapper } from './styled';

interface IPropsCard extends InputProps {
  width?: number;
  height?: number;
  backGroundColor?: string;
  margin?: number[];
  isShadow?: boolean;
}

const InputCard = ({ margin, backGroundColor, isShadow, ...props }: IPropsCard) => {
  const marginCustom = margin
    ? `${margin[0] || 0}rem ${margin[1] || 0}rem ${margin[2] || 0}rem ${margin[3] || 0}rem`
    : '0rem';
  return (
    <InputCardWrapper
      {...props}
      margincustom={marginCustom}
      backgroundcolor={backGroundColor}
      isshadow={isShadow?.toString()}
    />
  );
};

export default InputCard;
