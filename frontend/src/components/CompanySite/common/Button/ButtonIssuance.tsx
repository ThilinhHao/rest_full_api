import React from 'react';
import { ButtonIssuanceWrapper } from './styled';
import { ButtonProps } from 'antd';

interface IButtonIssuance extends ButtonProps {
  label: string;
  PrefixIcon?: JSX.Element;
  background?: string;
  color?: string;
  boxShadow?: string;
  width?: string;
  height?: string;
}
const ButtonIssuance = ({
  label,
  PrefixIcon,
  background,
  width,
  height,
  color,
  boxShadow,
  ...props
}: IButtonIssuance) => {
  return (
    <ButtonIssuanceWrapper
      background={background}
      color={color}
      boxshadow={boxShadow}
      width={width}
      height={height}
      {...props}
    >
      {PrefixIcon ? PrefixIcon : <div />}
      <span>{label}</span>
    </ButtonIssuanceWrapper>
  );
};

export default ButtonIssuance;
