import dayjs from 'dayjs';
const DATE_NEW = 5;
export const checkIsNew = (create_at: string) => {
  const date1 = dayjs();
  const diffCount = date1.diff(create_at, 'day'); // 7
  if (diffCount < DATE_NEW) {
    return true;
  }
  return false;
};
