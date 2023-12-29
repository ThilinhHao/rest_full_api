import React from 'react';
import HistoryHeader from '../HistoryHeader/HistoryHeader';
import { formatMoney } from 'helper/formatMoney';
import { ISalaryAdvance } from '@pages/CompanySite/AttendanceHistoryDetail/useAttendanceHistoryDetail';
import { AmountHistoryHeader, DayHistoryHeader } from '../HistoryHeader/historyHeaderStyle';
import { HistoryItemMemberWrapper, HistoryTableWrapper, ScrollWrapperHistoryMemberTable } from './historyTableStyle';
import dayjs from 'dayjs';
import { HistoryTotalBottom } from '../HistoryTotalBottom/HistoryTotalBottom';

const HistoryTable = ({ listSalaryAdvance }: { listSalaryAdvance: ISalaryAdvance[] }) => {
  return (
    <HistoryTableWrapper>
      <HistoryHeader />
      <ScrollWrapperHistoryMemberTable>
        {listSalaryAdvance.map((element: ISalaryAdvance) => (
          <HistoryItemMemberWrapper key={String(element)}>
            <DayHistoryHeader>{dayjs(element.tran_date).format('YYYY/MM/DD')}</DayHistoryHeader>
            <AmountHistoryHeader>{formatMoney(element.total_salary || 0)}</AmountHistoryHeader>
            <AmountHistoryHeader>{formatMoney(element.system_fee || 0)}</AmountHistoryHeader>
            <AmountHistoryHeader>{formatMoney(element.transaction_fee || 0)}</AmountHistoryHeader>
            <AmountHistoryHeader>
              {formatMoney((element.total_salary || 0) + (element.system_fee || 0) + (element.transaction_fee || 0))}
            </AmountHistoryHeader>
          </HistoryItemMemberWrapper>
        ))}
      </ScrollWrapperHistoryMemberTable>
      <HistoryTotalBottom listSalaryAdvance={listSalaryAdvance} />
    </HistoryTableWrapper>
  );
};

export default HistoryTable;
