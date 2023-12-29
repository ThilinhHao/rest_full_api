import dayjs, { Dayjs } from 'dayjs';
import { DAY_OF_WEEK, HASH_WEEK } from 'constants/company';
import { ITimeAttendance, IWeekType } from '@pages/CompanySite/AttendanceRecord/interface';
import { ETimeShift, ETimeShiftFormat, ETimeShiftKeys } from 'constants/constants';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { getDayjsByTimeZone } from 'helper/date';

export const getMaxPage = (month: Dayjs) => {
  const startDay = dayjs(month).startOf('month').day();
  const endDay = dayjs(month).daysInMonth();
  const maxArr = Math.ceil((endDay + startDay) / DAY_OF_WEEK) * DAY_OF_WEEK;
  return Math.ceil(maxArr / DAY_OF_WEEK);
};

export const indexToDay = (index: IWeekType) => {
  return HASH_WEEK[index] || '';
};

export const checkOverDate = (date: string | Dayjs, timeShift: string, isRootAdmin: boolean) => {
  let dataChoose = date;
  if (typeof dataChoose === 'string') {
    dataChoose = dayjs(date);
  }
  // if isRootAdmin and current date in now month
  const firstDayOfMonth = dayjs().startOf('month');
  if (isRootAdmin && dataChoose.isAfter(firstDayOfMonth.subtract(1, 'second'))) return false;
  // if not isRootAdmin and current date is over date
  if (dayjs().isAfter(dayjs(date).format(timeShift))) return true;
  return false;
};

export const shiftTxt = (shift: string) => {
  switch (shift) {
    case ETimeShiftKeys.DAY_SHIFT:
      return CONST_ATTENDANCE_COMPANY.NOON;
    case ETimeShiftKeys.NIGHT_SHIFT:
      return CONST_ATTENDANCE_COMPANY.NIGHT;
    case ETimeShiftKeys.LEAVE:
      return CONST_ATTENDANCE_COMPANY.REST;
    default:
      return '';
  }
};

export const checkCanChangeByRootAdmin = (
  changeData: ITimeAttendance,
  changing: string,
  currentDate: string | Dayjs,
  isRootAdmin: boolean
) => {
  // if had activity day_shift or night_shift and currentDate after today, can't change leave
  if (
    // had activity day_shift or night_shift
    (changeData.day_shift === ETimeShift.ACTIVITY || changeData.night_shift === ETimeShift.ACTIVITY) &&
    // change leave
    changeData.leave === ETimeShift.ACTIVITY &&
    changing === ETimeShiftKeys.LEAVE &&
    // currentDate after night today
    checkOverDate(currentDate, ETimeShiftFormat.DATE_NIGHT, false)
  ) {
    return false;
  }
  // if had activity day_shift and currentDate after today, can't change day_shift
  if (
    // had activity day_shift
    changeData.day_shift === ETimeShift.NOT_ACTIVITY &&
    // change day_shift
    changing === ETimeShiftKeys.DAY_SHIFT &&
    // currentDate after noon today
    checkOverDate(currentDate, ETimeShiftFormat.DATE_NOON, false)
  ) {
    return false;
  }
  // if had activity night_shift and currentDate after today, can't change night_shift
  if (
    // had activity day_shift
    changeData.night_shift === ETimeShift.NOT_ACTIVITY &&
    // change day_shift
    changing === ETimeShiftKeys.NIGHT_SHIFT &&
    // currentDate after noon today
    checkOverDate(currentDate, ETimeShiftFormat.DATE_NIGHT, false)
  ) {
    return false;
  }
  // check over date day_shift
  if (checkOverDate(currentDate, ETimeShiftFormat.DATE_NOON, isRootAdmin) && changing === ETimeShiftKeys.DAY_SHIFT) {
    return false;
  }
  // check over date night_shift
  if (
    checkOverDate(currentDate, ETimeShiftFormat.DATE_NIGHT, isRootAdmin) &&
    (changing === ETimeShiftKeys.NIGHT_SHIFT || changing === ETimeShiftKeys.LEAVE)
  ) {
    return false;
  }
  return true;
};

export const getLastTimeCanChange = (canChange: boolean, isRootAdmin: boolean, date: string) => {
  if (isRootAdmin) {
    if (canChange) {
      return getDayjsByTimeZone(date).endOf('month');
    } else {
      return false;
    }
  } else {
    if (canChange) {
      return getDayjsByTimeZone(date);
    } else {
      return false;
    }
  }
};

export const checkCanChangeOneOfShifts = (element: ITimeAttendance, isRootAdmin: boolean) => {
  if (!element) return false;
  const isActiveDayShift = element ? element[`${ETimeShiftKeys.DAY_SHIFT}`] : ETimeShift.NOT_ACTIVITY;
  const changeDataDayShift: ITimeAttendance = {
    staff_id: element.staff_id,
    date: element.date,
    day_shift: element?.day_shift || ETimeShift.NOT_ACTIVITY,
    night_shift: element?.night_shift || ETimeShift.NOT_ACTIVITY,
    leave: element?.leave || ETimeShift.NOT_ACTIVITY,
    [`${ETimeShiftKeys.DAY_SHIFT}`]: isActiveDayShift ? ETimeShift.NOT_ACTIVITY : ETimeShift.ACTIVITY,
  };
  const isActiveNightShift = element ? element[`${ETimeShiftKeys.NIGHT_SHIFT}`] : ETimeShift.NOT_ACTIVITY;
  const changeDataNightShift: ITimeAttendance = {
    staff_id: element.staff_id,
    date: element.date,
    day_shift: element?.day_shift || ETimeShift.NOT_ACTIVITY,
    night_shift: element?.night_shift || ETimeShift.NOT_ACTIVITY,
    leave: element?.leave || ETimeShift.NOT_ACTIVITY,
    [`${ETimeShiftKeys.NIGHT_SHIFT}`]: isActiveNightShift ? ETimeShift.NOT_ACTIVITY : ETimeShift.ACTIVITY,
  };
  const isActiveLeave = element ? element[`${ETimeShiftKeys.LEAVE}`] : ETimeShift.NOT_ACTIVITY;
  const changeDataLeave: ITimeAttendance = {
    staff_id: element.staff_id,
    date: element.date,
    day_shift: element?.day_shift || ETimeShift.NOT_ACTIVITY,
    night_shift: element?.night_shift || ETimeShift.NOT_ACTIVITY,
    leave: element?.leave || ETimeShift.NOT_ACTIVITY,
    [`${ETimeShiftKeys.LEAVE}`]: isActiveLeave ? ETimeShift.NOT_ACTIVITY : ETimeShift.ACTIVITY,
  };
  if (checkCanChangeByRootAdmin(changeDataDayShift, ETimeShiftKeys.DAY_SHIFT, element.date, isRootAdmin)) {
    return true;
  }
  if (checkCanChangeByRootAdmin(changeDataNightShift, ETimeShiftKeys.NIGHT_SHIFT, element.date, isRootAdmin)) {
    return true;
  }
  if (checkCanChangeByRootAdmin(changeDataLeave, ETimeShiftKeys.LEAVE, element.date, isRootAdmin)) {
    return true;
  }
  return false;
};
