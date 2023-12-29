import React from 'react';
import { ButtonWrapper } from './styled';
import { ButtonProps } from 'antd';

const ButtonCustom = ({ ...props }: ButtonProps) => {
  return <ButtonWrapper {...props} />;
};

export default ButtonCustom;
