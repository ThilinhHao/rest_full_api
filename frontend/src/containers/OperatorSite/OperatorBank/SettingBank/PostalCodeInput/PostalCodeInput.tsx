import React, { useCallback, useRef } from 'react';

import { InputEditItem } from '@containers/AgencySite/EditAgencyInfo/EditItem/editItemStyle';
import { Form, InputProps } from 'antd';
import { CONST_COMMON, CONST_COMPANY_PROFILE } from 'constants/language';
import { PostalCodeTitle, PostalCodeWrapper, StrikethroughCode } from './postCodeInputStyle';
import { onBlurInputNumber, onInputNumberHaf } from 'helper/text';
import { Require } from 'styles';

interface IPostalCodeInput extends InputProps {
  form: any;
}
const PostalCodeInput = ({ form, ...props }: IPostalCodeInput) => {
  const handleFormatNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, length: number) => {
      form.setFieldsValue({
        [e.target.name]: onBlurInputNumber(e.target.value, length, true),
      });
    },
    [form]
  );

  const handleOnChange = useCallback(() => {
    form.setFields([
      {
        name: 'code_1',
        errors: undefined,
      },
      {
        name: 'code_2',
        errors: undefined,
      },
    ]);
  }, [form]);

  const ref = useRef<any>();
  const onchangeCodeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldsValue({
      [e.target.name]: onInputNumberHaf(e.target.value),
    });
    form.setFields([
      {
        name: 'code_1',
        errors: undefined,
      },
      {
        name: 'code_2',
        errors: undefined,
      },
    ]);
    if (form.getFieldValue('code_1') && e.target.value.length === 3) {
      ref.current.focus();
    }
  };

  return (
    <>
      <PostalCodeTitle>
        {CONST_COMPANY_PROFILE.POSTAL_CODE}
        <Require>{CONST_COMMON.REQUIRE}</Require>
      </PostalCodeTitle>
      <PostalCodeWrapper>
        <Form.Item
          rules={[
            { required: true, message: CONST_COMPANY_PROFILE.REQUIRED_POSTAL_CODE },
            {
              validator: (_, value) => {
                try {
                  const postalCodeLast = form?.getFieldValue('code_2') || '';
                  const valueLength = value.length || 0;
                  const codeLength = postalCodeLast.length || 0;
                  const length = valueLength + codeLength;
                  if (length > 0 && length < 7) {
                    return Promise.reject(CONST_COMPANY_PROFILE.WRONG_ZIP_COD);
                  }
                  return Promise.resolve();
                } catch (error) {}
              },
            },
          ]}
          name="code_1"
        >
          <InputEditItem
            name="code_1"
            type="tel"
            maxLength={3}
            placeholder="000"
            inputwidth={7.688}
            {...props}
            onChange={onchangeCodeFirst}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatNumber(e, 3)}
          />
        </Form.Item>
        <StrikethroughCode>-</StrikethroughCode>
        <Form.Item
          name="code_2"
          rules={[
            { required: false },
            {
              validator: (_, value) => {
                try {
                  const postalCodeLast = form?.getFieldValue('code_1') || '';
                  const valueLength = value.length || 0;
                  const codeLength = postalCodeLast.length || 0;
                  const length = valueLength + codeLength;
                  if (!postalCodeLast || (length > 0 && length < 7)) {
                    return Promise.reject('');
                  }
                  return Promise.resolve();
                } catch (error) {}
              },
            },
          ]}
        >
          <InputEditItem
            name="code_2"
            ref={ref}
            type="tel"
            placeholder="0000"
            maxLength={4}
            inputwidth={7.688}
            onChange={handleOnChange}
            {...props}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatNumber(e, 4)}
          />
        </Form.Item>
      </PostalCodeWrapper>
    </>
  );
};

export default PostalCodeInput;
