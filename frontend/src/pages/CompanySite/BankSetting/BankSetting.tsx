import React from 'react';

import useBankSetting from './useBankSetting';

import { ContainerWrapper } from './bankSettingStyle';
import { BankSettingDetail } from '@containers/CompanySite/BankSetting/BankSettingDetail/BankSettingDetail';

const BankSetting = ({ firstTime = false }: { firstTime: boolean }) => {
  const {
    BREADS,
    form,
    bankSetting,
    isLoadingUpdateBankSetting,
    isLoadingGetDetailBank,
    navigate,
    handleTrimSpaceInput,
    handleOnChange,
    onFinishForm,
    isConfirmed,
    onSubmitForm,
    setIsConfirmed,
  } = useBankSetting({ firstTime });

  return (
    <ContainerWrapper padding={'0'} height={firstTime ? '100vh' : ''}>
      <BankSettingDetail
        BREADS={BREADS}
        form={form}
        firstTime={firstTime}
        bankSettingDetail={bankSetting}
        isLoadingBtn={isLoadingUpdateBankSetting}
        isLoadingDetail={isLoadingGetDetailBank}
        navigate={navigate}
        handleTrimSpaceInput={handleTrimSpaceInput}
        handleOnChange={handleOnChange}
        onFinishForm={onFinishForm}
        onSubmitForm={onSubmitForm}
        isConfirmed={isConfirmed}
        setIsConfirmed={setIsConfirmed}
      />
    </ContainerWrapper>
  );
};

export default BankSetting;
