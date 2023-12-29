import React from 'react';

import { colors } from 'constants/colorsBase';
import { ETimeShift } from 'constants/constants';
import { ITimeAttendance } from '@pages/CompanySite/AttendanceRecord/interface';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { AfternoonShift, MorningShift, ShiftItemWrapper } from './shiftItemStyle';

const ShiftItem = ({ shiftElement }: { shiftElement: ITimeAttendance | null }) => {
  const getColorMorning = () => {
    if (shiftElement === null) return colors.white;
    if (shiftElement?.day_shift === ETimeShift.ACTIVITY) return colors.mainColorCompany;
    return colors.greenWhite;
  };
  const getColorAfternoon = () => {
    if (shiftElement === null) return colors.white;
    if (shiftElement?.night_shift === ETimeShift.ACTIVITY) return colors.mediumTurquoise;
    return colors.greenWhite;
  };
  return (
    <ShiftItemWrapper>
      <MorningShift color={getColorMorning()} isWork={shiftElement?.day_shift === ETimeShift.ACTIVITY}>
        {shiftElement?.day_shift === ETimeShift.ACTIVITY && CONST_ATTENDANCE_COMPANY.NOON}
      </MorningShift>
      <AfternoonShift color={getColorAfternoon()} isWork={shiftElement?.night_shift === ETimeShift.ACTIVITY}>
        {shiftElement?.night_shift === ETimeShift.ACTIVITY && CONST_ATTENDANCE_COMPANY.NIGHT}
      </AfternoonShift>
    </ShiftItemWrapper>
  );
};

export default ShiftItem;
