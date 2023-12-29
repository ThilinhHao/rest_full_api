import React from 'react';
import { SpaceBase, RowCenter } from 'styles';
import { LabelSalaryInput, SalaryInputStyle, SalaryInputWrapper, Square, YenTxt } from './salaryInputStyle';
import { ErrorOperator } from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';
import { InputProps } from 'antd';

interface ISalaryInput extends InputProps {
  value?: string;
  label: string;
  des: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  icon?: boolean;
}
const SalaryInput = ({ value, onChange, des, label, error, icon, placeholder, ...props }: ISalaryInput) => {
  return (
    <SalaryInputWrapper>
      <LabelSalaryInput>
        {label} {icon && <Square />}
      </LabelSalaryInput>
      <SpaceBase height={1.25} />

      <RowCenter>
        <SalaryInputStyle
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          isError={!!error}
          {...props} // format
        />
        <YenTxt>{des}</YenTxt>
      </RowCenter>
      <ErrorOperator>{error}</ErrorOperator>
    </SalaryInputWrapper>
  );
};

export default SalaryInput;
