import { InputProps } from 'antd';
import React from 'react';
import {
  BankInputStyle,
  InputSettingBankWrapper,
  TitleLabel,
  TitleLabelLine,
  WrapperInputBank,
} from './inputSettingBankStyle';
import { Rule } from 'antd/es/form';
import { Require } from 'styles';
import { CONST_COMMON } from 'constants/language';
import { TooltipAccountName, TooltipSevenUser } from '@containers/OperatorSite/Agency/TitleAgency/TitleAgency';
import { SpaceBase } from 'styles';

interface IInputSettingBank extends InputProps {
  labelLine?: string;
  label?: string;
  name: string;
  rules: Rule[];
  width?: number;
  require?: boolean;
  requireLine?: boolean;
  isAccountName?: boolean;
  isSevenUser?: boolean;
}

const InputSettingBank = ({
  label,
  labelLine,
  rules,
  name,
  width,
  isAccountName,
  requireLine,
  require,
  isSevenUser,
  ...props
}: IInputSettingBank) => {
  return (
    <InputSettingBankWrapper>
      {labelLine && (
        <TitleLabelLine>
          {labelLine} {requireLine && <Require className="require-span">{CONST_COMMON.REQUIRE}</Require>}
          {isAccountName && <SpaceBase width={0.8} />}
          {isAccountName && <TooltipAccountName />}
          {isSevenUser && <TooltipSevenUser marginLeft='0rem'/>}
        </TitleLabelLine>
      )}
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

export default InputSettingBank;
