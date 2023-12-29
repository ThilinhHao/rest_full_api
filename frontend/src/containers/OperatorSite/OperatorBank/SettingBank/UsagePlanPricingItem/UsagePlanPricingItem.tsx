import React, { useCallback } from 'react';

import DropdownCustom from '@components/DropdownCustom/DropdownCustom';

import { Rule } from 'antd/es/form';
import { OPTION_BANK } from 'constants/settingBank';
import { Form, InputProps } from 'antd';
import { CONST_COMMON, CONST_OPERATOR_BANK } from 'constants/language';
import { Require, RowCenter, SpaceBase } from 'styles';
import { BankInputStyle, TitleItemPlan, UsagePlanPricingItemWrapper } from './usagePlanPricingItemStyle';

interface IUsagePlanPricingItem extends InputProps {
  label: string;
  name: string;
  rules: Rule[];
  form: any;
  selectName: string;
}
const UsagePlanPricingItem = ({ label, name, rules, selectName, form, ...props }: IUsagePlanPricingItem) => {
  const handleChangeDrop = useCallback(
    (e: any) => {
      form.setFieldsValue({
        [name]: '',
      });
    },
    [form, name]
  );

  return (
    <UsagePlanPricingItemWrapper>
      <TitleItemPlan>
        {label}
        <Require>{CONST_COMMON.REQUIRE}</Require>
      </TitleItemPlan>
      <SpaceBase height={1} />
      <RowCenter>
        <Form.Item
          rules={[
            ...rules,
            {
              validator: (_, value) => {
                if (value > 100 && !form.getFieldsValue()[selectName]) {
                  return Promise.reject(CONST_OPERATOR_BANK.OVER_100);
                }
                return Promise.resolve();
              },
            },
          ]}
          name={name}
        >
          <BankInputStyle name={name} {...props} maxLength={10} />
        </Form.Item>
        <SpaceBase width={1.25} />
        <Form.Item name={selectName}>
          <DropdownCustom
            onChange={handleChangeDrop}
            height="3.125rem"
            width="7.938rem"
            options={OPTION_BANK}
            defaultValue={1}
          />
        </Form.Item>
      </RowCenter>
    </UsagePlanPricingItemWrapper>
  );
};

export default UsagePlanPricingItem;
