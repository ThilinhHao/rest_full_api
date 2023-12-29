import React from 'react';
import { ButtonIssuanceWrapper } from './styled';
import { ButtonProps } from 'antd';

interface IButtonIssuance extends ButtonProps {
  label: string;
  PrefixIcon?: any;
}
const ButtonIssuance = ({ label, PrefixIcon, ...props }: IButtonIssuance) => {
  return (
    <ButtonIssuanceWrapper {...props}>
      {PrefixIcon ? PrefixIcon === 'hidden' ? '' : PrefixIcon : <div className="square" />}
      <span className="label">{label}</span>
    </ButtonIssuanceWrapper>
  );
};

export default ButtonIssuance;
