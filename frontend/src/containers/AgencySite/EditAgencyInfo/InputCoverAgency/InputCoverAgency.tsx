import { InputProps } from 'antd';
import React from 'react';
import {
  BankInputStyle,
  InputSettingBankWrapper,
  TitleLabel,
  TitleLabelLine,
  WrapperInputBank,
} from './inputCoverAgencyStyle';
import { Rule } from 'antd/es/form';
import { Require } from 'styles';
import { CONST_COMMON } from 'constants/language';

interface IInputSettingBank extends InputProps {
  labelLine?: string;
  label?: string;
  name: string;
  rules: Rule[];
  width?: number;
  require?: boolean;
}
const InputCoverAgency = ({ label, labelLine, rules, name, width, require, ...props }: IInputSettingBank) => {
  return (
    <InputSettingBankWrapper>
      {labelLine && <TitleLabelLine>{labelLine}</TitleLabelLine>}
      {label && (
        <TitleLabel>
          {label}
          {require && <Require>{CONST_COMMON.REQUIRE}</Require>}
        </TitleLabel>
      )}
      <WrapperInputBank name={name} rules={rules}>
        <BankInputStyle name={name} {...props} innitWidth={width} />
      </WrapperInputBank>
    </InputSettingBankWrapper>
  );
};

export default InputCoverAgency;
