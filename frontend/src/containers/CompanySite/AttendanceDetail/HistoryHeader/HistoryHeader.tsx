import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import React from 'react';
import { AmountHistoryHeader, DayHistoryHeader, HistoryHeaderWrapper } from './historyHeaderStyle';

const HistoryHeader = () => {
  return (
    <HistoryHeaderWrapper>
      <DayHistoryHeader>{CONST_ATTENDANCE_COMPANY.DATE}</DayHistoryHeader>
      <AmountHistoryHeader>{CONST_ATTENDANCE_COMPANY.APPLICATION_AMOUNT}</AmountHistoryHeader>
      <AmountHistoryHeader>{CONST_ATTENDANCE_COMPANY.SYSTEM_FEE}</AmountHistoryHeader>
      <AmountHistoryHeader>{CONST_ATTENDANCE_COMPANY.TRANSFER_FEE}</AmountHistoryHeader>
      <AmountHistoryHeader>{CONST_ATTENDANCE_COMPANY.TOTAL_AMOUNT}</AmountHistoryHeader>
    </HistoryHeaderWrapper>
  );
};

export default HistoryHeader;
