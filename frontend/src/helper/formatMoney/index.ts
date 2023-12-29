import { CONST_COMMON } from 'constants/language';

export const formatMoney = (num: string | number | undefined) => {
  if (num === '' || num === undefined || num === null) {
    return '';
  }
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${CONST_COMMON.YEN}`;
};
export const formatMoneyNumber = (num: string | number | undefined) => {
  if (num === '' || num === undefined || num === null) {
    return '';
  }
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};
