import React from 'react';

import Loading from '@components/Loading';
import useLightningBranchCode from './useLightningBranchCode';

import { Form } from 'antd';
import { CONST_COMMON } from 'constants/language';
import { CONST_OPERATOR_BANK } from 'constants/language';

import {
  ItemBank,
  NoDataBankWrapper,
  SelectBankWrapper,
  WaitingList,
  WrapperList,
} from '../LightningBank/lightningBankStyle';
interface ILightningBank {
  width?: number;
  height?: number;
  form: any;
  isRequired?: boolean;
}
const LightningBranchCode = ({ width, height, form, isRequired = true }: ILightningBank) => {
  const { listBank, handleScrollBank, handleSearch, isLoading, onSelectedBank, isOpen, setIsOpen, isLoadingBottom } =
    useLightningBranchCode(form);
  return (
    <>
      <Form.Item
        name="bank_branches_code_custom"
        rules={[{ required: isRequired, message: '支店名(支店コード)は必須です。' }]}
      >
        {!isLoading && (
          <SelectBankWrapper
            name="bank_branches_code_custom"
            showSearch
            onSearch={handleSearch}
            filterOption={false}
            custom={{ width, height }}
            placeholder={CONST_OPERATOR_BANK.ENTER_BRANCH_NAME_OR_CODE}
            autoComplete="none"
            onPopupScroll={handleScrollBank}
            options={listBank}
            onClick={() => {
              if (!isOpen) setIsOpen(true);
            }}
            onBlur={() => {
              if (isOpen)
                setTimeout(() => {
                  setIsOpen(false);
                }, 200);
            }}
            open={isOpen}
            dropdownRender={() => {
              return (
                <WrapperList onScroll={handleScrollBank}>
                  {listBank && listBank.length === 0 && !isLoadingBottom && (
                    <NoDataBankWrapper>{CONST_COMMON.NO_DATA}</NoDataBankWrapper>
                  )}
                  {listBank?.map((element) => (
                    <ItemBank key={element.value} onClick={() => onSelectedBank(element)}>
                      {element.label}
                    </ItemBank>
                  ))}
                </WrapperList>
              );
            }}
          />
        )}
      </Form.Item>
      {isLoading && (
        <WaitingList>
          <Loading />
        </WaitingList>
      )}
    </>
  );
};

export default LightningBranchCode;
