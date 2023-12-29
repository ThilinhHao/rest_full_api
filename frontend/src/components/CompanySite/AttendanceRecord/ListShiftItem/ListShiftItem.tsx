import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

import dayjs from 'dayjs';
import ShiftItem from '@components/CompanySite/AttendanceRecord/ShiftItem/ShiftItem';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { indexToDay } from 'helper/attendanceRecord';
import { DayWrapper } from '../WeekChange/weekChangeStyle';
import { DAY_OF_WEEK } from 'constants/company';
import {
  defaultTimeAttendance,
  IStaff,
  ITimeAttendance,
  IWeekType,
} from '@pages/CompanySite/AttendanceRecord/interface';
import {
  CarouselContainer,
  LineMemberShift,
  LineShift,
  ListShiftItemWrapper,
  MemberItem,
  MemberWrapper,
  WrapperItem,
} from './listShiftItemStyle';
import { getDayjsByTimeZone } from 'helper/date';

dayjs.extend(weekOfYear);
const ListShiftItem: React.ForwardRefRenderFunction<any, any> = ({ listDate, listMember, maxPage, setPage, month }, ref) => {
  const listCarousel = Array.from({ length: maxPage }, (_, i) => i + 1);
  const refRoute = useRef<any>();
  const onChange = (e: number) => {
    setPage(e + 1);
  };

  useImperativeHandle(ref, () => {
    return {
      nextPage: () => {
        refRoute.current.next();
      },
      prePage: () => {
        refRoute.current.prev();
      },
      toFirst: () => {
        refRoute.current.goTo(0);
      },
    };
  });

  useEffect(() => {
    const currentWeekOfMonth = dayjs().week() - dayjs().startOf('month').week() + 1;
    refRoute.current.goTo(currentWeekOfMonth - 1);
  }, []);

  const getTimeAttendanceInWeek: any = (week: number) => {
    const newArr = [...listDate]?.slice(DAY_OF_WEEK * week, DAY_OF_WEEK * (week + 1)) || [];
    return newArr;
  };

  const getItemShift = (date: number | null, listShift: ITimeAttendance[]) => {
    if (!date) {
      return null;
    }
    const find = listShift.find((element: ITimeAttendance) => Number(element?.date?.split('-')[2]) === date);
    if (find) {
      return find;
    }
    return defaultTimeAttendance;
  };

  const shouldDisplayMember = (member: IStaff, month: dayjs.Dayjs) => {
    const disconnectTime = member.staff_disconnect_time;
    const isCanDisplay = disconnectTime && getDayjsByTimeZone(disconnectTime).format('YYYY-MM') >= month.format('YYYY-MM');
    return member?.time_attendance?.length || !disconnectTime || isCanDisplay;
  };
  const listMemberShow = listMember?.filter((member: IStaff) => shouldDisplayMember(member, month));

  return (
    <ListShiftItemWrapper>
      <MemberWrapper>
        {listMemberShow?.map((member: IStaff, index: number) => (
          <React.Fragment key={String(member.staff_id)}>
            <WrapperItem>
              <MemberItem>{member.name}</MemberItem>
            </WrapperItem>
            {listMemberShow?.length - 1 !== index && <LineMemberShift />}
          </React.Fragment>
        ))}
      </MemberWrapper>

      <CarouselContainer afterChange={onChange} ref={refRoute}>
        {listCarousel?.map((element, index: number) => (
          <div key={String(element)}>
            {listMemberShow?.map((member: IStaff, indexStaff: number) => (
              <React.Fragment key={String(member.staff_id)}>
                <DayWrapper>
                  {getTimeAttendanceInWeek(index)?.map((itemTime: number | null, indexTime: IWeekType) => {
                    return (
                      <React.Fragment key={`${itemTime}${indexToDay(indexTime)}`}>
                        <ShiftItem shiftElement={getItemShift(itemTime, member.time_attendance)} />
                      </React.Fragment>
                    );
                  })}
                </DayWrapper>
                {listMemberShow?.length - 1 !== indexStaff && <LineShift />}
              </React.Fragment>
            ))}
          </div>
        ))}
      </CarouselContainer>
    </ListShiftItemWrapper>
  );
};

export default forwardRef(ListShiftItem);
