export const deepEqual: any = (x: any, y: any) => {
  return x && y && typeof x === 'object' && typeof y === 'object'
    ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).reduce((isEqual: any, key: any) => {
          return isEqual && deepEqual(x[key], y[key]);
        }, true)
    : x === y;
};
