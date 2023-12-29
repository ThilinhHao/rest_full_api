import React from 'react';
import Form, { Rule } from 'antd/es/form';
import { CreateItemTailTxt, InputCreateItemAgency, InputItemCreateWrapper } from './inputItemCreateStyle';
import { InputProps } from 'antd';

interface IInputItem extends InputProps {
  name: string;
  rules?: Rule[];
  label?: string;
  value?: any;
  inputWidth?: number;
  distance?: string;
  isPostalCode?: boolean;
  alignRight?: boolean | undefined;
  inputTail?: string;
}
const InputItemCreate = ({
  name,
  rules,
  label,
  value,
  inputWidth,
  distance,
  isPostalCode,
  alignRight,
  inputTail,
  ...props
}: IInputItem) => {
  return (
    <InputItemCreateWrapper>
      <Form.Item rules={rules} name={name}>
        <InputCreateItemAgency name={name} inputwidth={inputWidth} {...props} alignright={alignRight} />
      </Form.Item>
      <CreateItemTailTxt>{inputTail}</CreateItemTailTxt>
    </InputItemCreateWrapper>
  );
};

export default InputItemCreate;
