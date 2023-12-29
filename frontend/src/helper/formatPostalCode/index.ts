export const postalCodeFormat = (value: string) => {
  if (!value) return value;

  return `〒${value.slice(0, 3)}-${value.slice(3, 7)}`;
};
