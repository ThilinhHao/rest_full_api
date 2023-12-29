import configs from 'config';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
// const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

export const formatStrDateTimezone = (date: string, strFormat = 'YYYY/MM/DD HH:mm') => {
  const dateNew = getDateTimeByTimeZone(date);
  if (!dateNew) return '';

  return dayjs(dateNew).format(strFormat);
};

export const validateStrNewDate = (dateStr: string) => {
  return /^[0-9]{4}(\/|-)[0-1][0-9](\/|-)[0-3][0-9]\s[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?$/.test(dateStr);
};

export const getDateTimeByTimeZone = (date: string) => {
  if (!date || !validateStrNewDate(date)) {
    return '';
  }

  const dateNew = new Date(date.replace(/\//g, '-'));
  let timzoneOffset = 0;

  // switch (timeZone) {
  //   case 'Asia/Ho_Chi_Minh':
  //   case 'Asia/Saigon':
  //     timzoneOffset = 7;
  //     break;
  //   case 'Asia/Tokyo':
  //     timzoneOffset = 9;
  //     break;
  //   default:
  //     timzoneOffset = 9;
  //     break;
  // }

  return dateNew.setHours(dateNew.getHours() + timzoneOffset);
};

export const _getDateTimeByTimeZone = () => {
  const dateNew = dayjs().tz(configs.TIME_ZONE).toISOString();

  return new Date(dateNew);
};

export const getDayjsByTimeZone = (date?: string) => {
  if (date) {
    return dayjs(date).tz(configs.TIME_ZONE);
  }
  return dayjs().tz(configs.TIME_ZONE);
};

export const convertTimeFirebaseToString = (time?: number) => {
  if (!time) return;
  const dateObj = dayjs(time * 1000).tz(configs.TIME_ZONE);

  return dateObj.format('YYYY/MM/DD HH:mm');
};

export const formatDateCommon = (date?: string) => {
  if (!date) return;
  if (date.length < 10) {
    date = date + '-01';
  }
  return date.replaceAll('-', '/').substring(0, 10);
};

export const formatDateJP = (date?: string, isHaveDay: boolean = true, hasSpace: boolean = true) => {
  if (!date) return;
  if (date.length < 10) {
    date = date + '-01';
  }
  const [year, month, day] = date.split('-');

  if (!year || !month) return;
  if (isHaveDay) {
    if (hasSpace) return `${year}年 ${('0' + Number(month)).slice(-2)}月 ${('0' + Number(day)).slice(-2)}日`;
    else return `${year}年${('0' + Number(month)).slice(-2)}月${('0' + Number(day)).slice(-2)}日`;
  } else {
    if (hasSpace) return `${year}年 ${('0' + Number(month)).slice(-2)}月`;
    else return `${year}年${('0' + Number(month)).slice(-2)}月`;
  }
};

export const compareDate = ($dateStart: Dayjs, $dateEnd: Dayjs) => {
  const strStart = $dateStart.format('YYYY-MM-DD');
  const strEnd = $dateEnd.format('YYYY-MM-DD');
  if (strStart < strEnd) return -1;
  if (strStart > strEnd) return 1;
  return 0;
};
