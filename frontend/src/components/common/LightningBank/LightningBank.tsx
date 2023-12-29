import React from 'react';

import Loading from '@components/Loading';
import useLightningBank from './useLightningBank';

import { Form } from 'antd';
import { CONST_COMMON } from 'constants/language';
import { ItemBank, NoDataBankWrapper, SelectBankWrapper, WaitingList, WrapperList } from './lightningBankStyle';

interface ILightningBank {
  width?: number;
  height?: number;
  form: any;
  isRequired?: boolean;
  onlySevenBank?: boolean;
}
const LightningBank = ({ width, height, form, isRequired = true, onlySevenBank = false }: ILightningBank) => {
  const { listBank, handleScrollBank, handleSearch, isLoading, onSelectedBank, isOpen, setIsOpen } = useLightningBank(
    form,
    onlySevenBank
  );

  return (
    <>
      <Form.Item
        name="bank_code_custom"
        rules={[{ required: isRequired, message: '金融機関名(銀行コード)は必須です。' }]}
      >
        {!isLoading && (
          <SelectBankWrapper
            name="bank_code_custom"
            showSearch
            onSearch={handleSearch}
            filterOption={false}
            custom={{ width, height }}
            placeholder="金融機関名またはコードを入力"
            autoComplete="none"
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
            options={listBank}
            dropdownRender={() => {
              return (
                <WrapperList onScroll={handleScrollBank}>
                  {listBank && listBank.length === 0 && <NoDataBankWrapper>{CONST_COMMON.NO_DATA}</NoDataBankWrapper>}
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

export default LightningBank;
