import React from 'react';
import useSelectAgency from './useSelectAgency';

import { SelectProps } from 'antd';
import { IAgencyResponse } from '@pages/OperatorSite/Agencies/ListAgency/useListAgency';
import { SelectBankWrapper } from '../LightningBank/lightningBankStyle';
import { CONST_CREATE_COMPANY } from 'constants/language';

interface ISelectAgency extends SelectProps {
  width?: number;
  height?: number;
  onChangeAgency: (code: string, agencyName: string) => void;
  value: string | undefined;
}
const SelectAgency = ({ width, height, onChangeAgency, value, ...props }: ISelectAgency) => {
  const { listAgency, isLoading } = useSelectAgency();
  return (
    <SelectBankWrapper
      {...props}
      showSearch
      value={!isLoading ? value : ''}
      custom={{ width: 19 }}
      placeholder={CONST_CREATE_COMPANY.AGENCY_CODE_PLACE}
      optionFilterProp="children"
      onChange={(e: string) => {
        const agency = listAgency.find((element: IAgencyResponse) => element.code === e);
        onChangeAgency(e, agency?.name || agency?.user_root?.full_name);
      }}
      filterOption={(input: any, option: any) => (option?.label ?? '').includes(input.trim())}
      filterSort={(optionA: any, optionB: any) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={listAgency}
    />
  );
};

export default SelectAgency;
