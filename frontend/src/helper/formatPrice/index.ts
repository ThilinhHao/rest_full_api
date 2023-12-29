export const formatPrice = (value?: number | string, unit?: string) => {
  if (value === undefined) return 'Undefined';
  let string = new Intl.NumberFormat('ja-JP').format(Number(value)).replace(/\./g, '.');
  if (unit) {
    string += ' ' + unit;
  }

  return string;
};
