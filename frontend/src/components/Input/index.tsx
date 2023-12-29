import React from 'react';
import { InputWrapper } from './styled';
import { InputProps } from 'antd';

const InputCustom = ({ ...props }: InputProps) => {
  return <InputWrapper {...props} />;
};

export default InputCustom;
