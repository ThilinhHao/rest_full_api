import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import dayjs from 'dayjs';
import React from 'react';
import { SpaceBase } from 'styles';
import { Confirmed } from '../../AttendanceHeaderTable/attendanceHeaderTableStyle';
import { TimeActiveItemWrapper, TimeWrapper, Brackets, TimeContent } from './timeActiveItemStyle';
import { ETimeShiftFormat } from 'constants/constants';

const TimeActiveItem = ({
  isConfirmed,
  date,
  isTimeNoon,
}: {
  isConfirmed: boolean;
  date: string;
  isTimeNoon: boolean;
}) => {
  return (
    <TimeActiveItemWrapper>
      {isConfirmed ? (
        <Confirmed>
          <SpaceBase width={1.563} />
          {CONST_ATTENDANCE_COMPANY.CONFIRMED_BRACKET}
        </Confirmed>
      ) : (
        <TimeWrapper>
          <Brackets>(</Brackets>
          <TimeContent>
            <div>{dayjs(date).format('YYYY/MM/DD')}</div>
            <div>{isTimeNoon ? ETimeShiftFormat.NOON : ETimeShiftFormat.NIGHT}</div>
          </TimeContent>
          <Brackets>)</Brackets>
        </TimeWrapper>
      )}
    </TimeActiveItemWrapper>
  );
};

export default TimeActiveItem;
