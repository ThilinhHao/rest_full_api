import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import React from 'react';
import { AttendanceWrapper, DayWrapperHeader, MemberHeaderTableWrapper } from './memberHeaderTableStyle';

const MemberHeaderTable = () => {
  return (
    <MemberHeaderTableWrapper>
      <DayWrapperHeader>{CONST_ATTENDANCE_COMPANY.DATE}</DayWrapperHeader>
      <AttendanceWrapper>{CONST_ATTENDANCE_COMPANY.ATTENDANCE}</AttendanceWrapper>
    </MemberHeaderTableWrapper>
  );
};

export default MemberHeaderTable;
