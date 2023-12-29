export const formatIdOperator = (id: number) => {
  if (!id) {
    return 10000000;
  }
  return 10000000 + id;
};
