import { DAY_OF_WEEK } from 'constants/company';
import dayjs, { Dayjs } from 'dayjs';

export const getAllDayOfMonth = (month: Dayjs) => {
  const arrDate = [];
  const startDay = dayjs(month).startOf('month').day();
  const endDay = dayjs(month).daysInMonth();
  const maxArr = Math.ceil((endDay + startDay) / DAY_OF_WEEK) * DAY_OF_WEEK;
  for (let i = -startDay; i < maxArr; i++) {
    if (i >= 0 && i < endDay) {
      arrDate.push(i + 1);
    } else {
      arrDate.push(null);
    }
  }
  return arrDate;
};

export const getDayListOfMonth = (month: Dayjs) => {
  const endDay = dayjs(month).daysInMonth();
  return Array.from(Array(endDay).keys());
};

export const getDaysOfMonth = (month: Dayjs) => {
  const endDay = dayjs(month).daysInMonth();
  const arrDate = [];

  for (let i = 0; i < endDay; i++) {
    if (i >= 0 && i < endDay) {
      arrDate.push(String(i + 1));
    }
  }
  return arrDate;
};
