import React from 'react';

import { Rule } from 'antd/es/form';
import { SpaceBase, Require } from 'styles';
import { Form, InputProps } from 'antd';
import { EditItemWrapper, InputEditItem, InputTailTxt, LabelEditItem, RowItemInput } from './editItemStyle';
import { CONST_COMMON } from 'constants/language';

interface IEditItem extends InputProps {
  name: string;
  rules?: Rule[];
  label?: string;
  value?: any;
  inputWidth?: number;
  distance?: string;
  isPostalCode?: boolean;
  inputTail?: string;
  require?: boolean;
}
const EditItem = ({
  name,
  rules,
  label,
  value,
  inputWidth,
  distance,
  isPostalCode,
  inputTail,
  require,
  ...props
}: IEditItem) => {
  return (
    <EditItemWrapper inputwidth={inputWidth} distance={distance} ispostalcode={isPostalCode ? 'true' : ''}>
      {label && (
        <>
          <LabelEditItem>
            {label}
            {require && <Require>{CONST_COMMON.REQUIRE}</Require>}
          </LabelEditItem>
          <SpaceBase height={0.1} />
        </>
      )}
      <RowItemInput>
        <Form.Item rules={rules} name={name}>
          <InputEditItem name={name} inputwidth={inputWidth} {...props} />
        </Form.Item>
        {inputTail && <InputTailTxt>{inputTail}</InputTailTxt>}
      </RowItemInput>
    </EditItemWrapper>
  );
};

export default EditItem;
