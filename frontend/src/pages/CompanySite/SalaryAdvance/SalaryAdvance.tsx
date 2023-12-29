import React from 'react';
import useSalaryAdvance from './useSalaryAdvance';
import { ContainerWrapper } from '../BankSetting/bankSettingStyle';
import { SalaryAdvanceDetail } from '@containers/CompanySite/SalaryAdvance/SalaryAdvanceDetail';

const SalaryAdvance = ({ firstTime = false }: { firstTime: boolean }) => {
  const {
    form,
    salaryAdvanceData,
    isLoading,
    navigate,
    handleStringToNumber,
    handleTrimSpaceInput,
    onFinishForm,
    handleOnChange,
    BREADS,
    isSalaryDayEndMonth,
    onChangeSalaryInputEndMonth,
  } = useSalaryAdvance({
    firstTime,
  });

  return (
    <ContainerWrapper padding={'0'} height={firstTime ? '100vh' : ''}>
      <SalaryAdvanceDetail
        BREADS={BREADS}
        form={form}
        firstTime={firstTime}
        salaryAdvanceData={salaryAdvanceData}
        handleSubmitForm={onFinishForm}
        isLoadingBtn={isLoading}
        handleStringToNumber={handleStringToNumber}
        handleTrimSpaceInput={handleTrimSpaceInput}
        handleOnChange={handleOnChange}
        navigate={navigate}
        isSalaryDayEndMonth={isSalaryDayEndMonth}
        onChangeSalaryInputEndMonth={onChangeSalaryInputEndMonth}
      />
    </ContainerWrapper>
  );
};

export default SalaryAdvance;
