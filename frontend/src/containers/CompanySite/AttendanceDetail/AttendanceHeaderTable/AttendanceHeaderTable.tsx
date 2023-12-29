import React from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { SpaceBase } from 'styles';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import {
  AttendanceHeaderTableWrapper,
  Confirmed,
  ContentTextHeader,
  DateContent,
  DayTable,
  NameTable,
  StatusWorkTable,
  TimeChange,
} from './attendanceHeaderTableStyle';
import { ETimeShiftFormat } from 'constants/constants';

const AttendanceHeaderTable = ({ currentDate }: { currentDate: Dayjs }) => {
  const getDate = currentDate.format('YYYY/MM/DD');
  const checkDayShift = () => {
    if (dayjs().isAfter(currentDate.format(ETimeShiftFormat.DATE_NOON))) return true;
    return false;
  };
  const checkNightShift = () => {
    if (dayjs().isAfter(currentDate.format(ETimeShiftFormat.DATE_NIGHT))) return true;
    return false;
  };

  function TimeComponent() {
    return (
      <DayTable>
        {!checkNightShift() && (
          <>
            <SpaceBase height={3} />
            <DateContent>{getDate}</DateContent>
            <DateContent>{ETimeShiftFormat.NIGHT}</DateContent>
          </>
        )}
        {checkNightShift() && <Confirmed>{CONST_ATTENDANCE_COMPANY.CONFIRMED}</Confirmed>}
      </DayTable>
    );
  }

  return (
    <AttendanceHeaderTableWrapper>
      <NameTable>
        <ContentTextHeader>{CONST_ATTENDANCE_COMPANY.FAMILY_NAME}</ContentTextHeader>
      </NameTable>
      <StatusWorkTable>
        <ContentTextHeader>{CONST_ATTENDANCE_COMPANY.ATTENDANCE}</ContentTextHeader>
      </StatusWorkTable>

      <DayTable>
        <SpaceBase height={3} />
        {!checkDayShift() && (
          <>
            <DateContent>{getDate}</DateContent>
            <DateContent>{ETimeShiftFormat.NOON}</DateContent>
          </>
        )}
        {checkDayShift() && <Confirmed>{CONST_ATTENDANCE_COMPANY.CONFIRMED}</Confirmed>}
      </DayTable>
      <TimeComponent />
      <TimeComponent />

      <TimeChange>
        <ContentTextHeader>
          {!checkNightShift() && <DateContent>{CONST_ATTENDANCE_COMPANY.CHANGEABLE_DEADLINE}</DateContent>}
          {checkNightShift() && <Confirmed>{CONST_ATTENDANCE_COMPANY.CHANGEABLE_DEADLINE}</Confirmed>}
        </ContentTextHeader>
      </TimeChange>
    </AttendanceHeaderTableWrapper>
  );
};

export default AttendanceHeaderTable;
