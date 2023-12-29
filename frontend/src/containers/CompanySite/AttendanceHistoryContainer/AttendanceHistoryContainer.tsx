import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { colors } from 'constants/colorsBase';
import { TableName } from '../AttendanceDetail/AttendanceTable/attendanceTableStyle';
import { IWeekType } from '@pages/CompanySite/AttendanceRecord/interface';
import { indexToDay } from 'helper/attendanceRecord';
import { DayWrapper } from '@components/CompanySite/AttendanceRecord/WeekChange/weekChangeStyle';
import { useNavigate } from 'react-router-dom';
import { DAY_OF_WEEK } from 'constants/company';
import { formatMoney } from 'helper/formatMoney';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { IStaffHistory, IStaffHistoryItem } from '@pages/CompanySite/AttendanceHistory/useAttendanceHistory';
import {
  AmountApplied,
  FeeContent,
  FeeWrapper,
  Brackets,
  ItemHistory,
  ItemHistoryTotal,
  TotalApplication,
  TransactionFee,
  WrapperItemHistory,
  WrapperTotalItemHistory,
} from './attendanceHistoryContainerStyle';
import {
  CarouselContainer,
  LineMemberShift,
  LineShift,
  ListShiftItemWrapper,
  MemberWrapper,
} from '@components/CompanySite/AttendanceRecord/ListShiftItem/listShiftItemStyle';
import { isNumber } from 'lodash';

dayjs.extend(weekOfYear);

const AttendanceHistoryContainer: React.ForwardRefRenderFunction<any, any> = (
  { listDate, setPage, listMember, maxPage, month },
  ref
) => {
  const navigate = useNavigate();
  const listCarousel = Array.from({ length: maxPage }, (_, i) => i + 1);

  const getTotalRequestSalary = (arrAdvance: IStaffHistoryItem[]) => {
    return arrAdvance.reduce((sum, salary) => sum + Number(salary.total_salary), 0) || 0;
  };
  const getTotalSystemFee = (arrAdvance: IStaffHistoryItem[]) => {
    return arrAdvance.reduce((sum, salary) => sum + Number(salary.system_fee), 0) || 0;
  };
  const getTotalTransactionFee = (arrAdvance: IStaffHistoryItem[]) => {
    return arrAdvance.reduce((sum, salary) => sum + Number(salary.transaction_fee), 0) || 0;
  };

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

  const getItemData = (date: number | null, listShift: IStaffHistoryItem[]) => {
    if (!date) {
      return null;
    }
    const find = listShift.find((element: IStaffHistoryItem) => Number(element?.tran_date?.split('-')[2]) === date);
    if (find) {
      return find;
    }
    return null;
  };

  const getStyleItem: any = (itemTime: number | null | boolean, itemData: IStaffHistoryItem | null) => {
    const styleCustom = {
      background: colors.dayShift,
      color: colors.white,
      shadow: colors.historyItemShadow,
    };
    if (!itemData) {
      styleCustom.background = colors.greenWhite;
      styleCustom.shadow = 'none';
    }
    if (itemTime === null) {
      styleCustom.shadow = 'none';
      styleCustom.background = colors.white;
    }
    return styleCustom;
  };

  return (
    <ListShiftItemWrapper>
      <MemberWrapper>
        {listMember?.map((element: IStaffHistory) => (
          <React.Fragment key={String(element.id)}>
            <WrapperItemHistory>
              <TableName onClick={() => navigate(`${element.id}?date=${month.format('YYYY-MM')}`)}>
                {element.name}
              </TableName>
              <AmountApplied>
                {CONST_ATTENDANCE_COMPANY.AMOUNT_CAN_BE_APPLIED}
                {formatMoney(element.salary_remain)}
              </AmountApplied>
            </WrapperItemHistory>
            <LineMemberShift />
          </React.Fragment>
        ))}
      </MemberWrapper>

      <CarouselContainer afterChange={onChange} ref={refRoute}>
        {listCarousel?.map((element, index: number) => (
          <div key={String(element)}>
            {listMember?.map((member: IStaffHistory) => (
              <React.Fragment key={String(member.id)}>
                <DayWrapper>
                  {getTimeAttendanceInWeek(index)?.map((itemTime: number | null, indexTime: IWeekType) => {
                    const value = getItemData(itemTime, member.staff_salary_advance);
                    return (
                      <React.Fragment key={`${itemTime}${indexToDay(indexTime)}`}>
                        <ItemHistory styleProps={getStyleItem(itemTime, value)}>
                          {formatMoney(value?.total_salary)}
                          {!!(isNumber(value?.transaction_fee) || isNumber(value?.system_fee)) && (
                            <FeeWrapper>
                              <Brackets>(</Brackets>
                              <FeeContent>
                                {isNumber(value?.transaction_fee) && (
                                  <TransactionFee>
                                    {CONST_ATTENDANCE_COMPANY.TRANSFER_FEE} {formatMoney(value?.transaction_fee)}
                                  </TransactionFee>
                                )}
                                {isNumber(value?.system_fee) && (
                                  <TransactionFee>
                                    {CONST_ATTENDANCE_COMPANY.SYSTEM_FEE} {formatMoney(value?.system_fee)}
                                  </TransactionFee>
                                )}
                              </FeeContent>
                              <Brackets>)</Brackets>
                            </FeeWrapper>
                          )}
                        </ItemHistory>
                      </React.Fragment>
                    );
                  })}
                </DayWrapper>
                <LineShift />
              </React.Fragment>
            ))}
          </div>
        ))}
      </CarouselContainer>

      <MemberWrapper>
        <TotalApplication>{CONST_ATTENDANCE_COMPANY.TOTAL_SALARY}</TotalApplication>
        {listMember?.map((element: IStaffHistory) => (
          <React.Fragment key={String(element.id)}>
            <WrapperTotalItemHistory>
              <ItemHistoryTotal styleProps={getStyleItem(true, getTotalRequestSalary(element.staff_salary_advance))}>
                {getTotalRequestSalary(element.staff_salary_advance)
                  ? formatMoney(getTotalRequestSalary(element.staff_salary_advance))
                  : ''}

                {!!element.staff_salary_advance?.length && (
                  <FeeWrapper>
                    <Brackets>(</Brackets>
                    <FeeContent>
                      <TransactionFee>
                        {CONST_ATTENDANCE_COMPANY.TRANSFER_FEE}{' '}
                        {formatMoney(getTotalTransactionFee(element.staff_salary_advance))}
                      </TransactionFee>
                      <TransactionFee>
                        {CONST_ATTENDANCE_COMPANY.SYSTEM_FEE}{' '}
                        {formatMoney(getTotalSystemFee(element.staff_salary_advance))}
                      </TransactionFee>
                    </FeeContent>
                    <Brackets>)</Brackets>
                  </FeeWrapper>
                )}
              </ItemHistoryTotal>
            </WrapperTotalItemHistory>
            <LineMemberShift />
          </React.Fragment>
        ))}
      </MemberWrapper>
    </ListShiftItemWrapper>
  );
};

export default forwardRef(AttendanceHistoryContainer);
