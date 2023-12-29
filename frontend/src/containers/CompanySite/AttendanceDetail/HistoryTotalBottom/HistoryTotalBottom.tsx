import React from 'react';
import { HistoryTotalBottomWrapper, HistoryTotalNumber, HistoryTotalTitle } from './historyTotalBottomStyle';
import { formatMoney } from 'helper/formatMoney';
import { ISalaryAdvance } from '@pages/CompanySite/AttendanceHistoryDetail/useAttendanceHistoryDetail';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';

export const HistoryTotalBottom = ({ listSalaryAdvance }: { listSalaryAdvance: ISalaryAdvance[] }) => {
  const totalSalary = listSalaryAdvance.reduce((total, element) => {
    return total + (element.total_salary || 0);
  }, 0);

  const totalSystemFee = listSalaryAdvance.reduce((total, element) => {
    return total + (element.system_fee || 0);
  }, 0);

  const totalTransactionFee = listSalaryAdvance.reduce((total, element) => {
    return total + (element.transaction_fee || 0);
  }, 0);

  return (
    <HistoryTotalBottomWrapper>
      <HistoryTotalTitle>{CONST_ATTENDANCE_COMPANY.TOTAL_TITLE}</HistoryTotalTitle>
      <HistoryTotalNumber>{formatMoney(totalSalary)}</HistoryTotalNumber>
      <HistoryTotalNumber>{formatMoney(totalSystemFee)}</HistoryTotalNumber>
      <HistoryTotalNumber>{formatMoney(totalTransactionFee)}</HistoryTotalNumber>
      <HistoryTotalNumber>{formatMoney(totalSalary + totalSystemFee + totalTransactionFee)}</HistoryTotalNumber>
    </HistoryTotalBottomWrapper>
  );
};
