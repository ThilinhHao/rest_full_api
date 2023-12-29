export const isStringEmpty = (txt: string | number) => {
  if (!txt && txt !== 0) return true;
  if (!String(txt).replace(/\s/g, '')?.length) return true;
  return false;
};
