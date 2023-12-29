import React from 'react';
import images from '@assets/images-base';
import { IWeekType } from '@pages/CompanySite/AttendanceRecord/interface';
import { indexToDay } from 'helper/attendanceRecord';
import {
  ContainerWeekView,
  DayItem,
  DayWrapper,
  ElementWrapper,
  IconNextPre,
  IconSpace,
  WeekChangeWrapper,
} from './weekChangeStyle';

interface IWeekChange {
  preWeek: () => void;
  dayInWeek: number[] | any;
  nextWeek: () => void;
  page: number;
  maxPage: number;
}
const WeekChange = ({ preWeek, dayInWeek, nextWeek, page, maxPage }: IWeekChange) => {
  return (
    <WeekChangeWrapper>
      <DayWrapper>
        {page !== 1 && <IconNextPre src={images.companySite.preIcon} onClick={preWeek} />}
        {page === 1 && <IconSpace />}
        <ContainerWeekView>
          <DayWrapper>
            {dayInWeek?.map((element: number, index: IWeekType) => {
              return (
                <ElementWrapper key={`${element + index}`}>
                  {element && element < 10 ? `0${element}` : element} <DayItem>{indexToDay(index)}</DayItem>
                </ElementWrapper>
              );
            })}
          </DayWrapper>
        </ContainerWeekView>
        {page !== maxPage && <IconNextPre src={images.companySite.nextIcon} onClick={nextWeek} />}
        {page === maxPage && <IconSpace />}
      </DayWrapper>
    </WeekChangeWrapper>
  );
};

export default WeekChange;
