export const paginate = (myArray: any, current: number, perPage: number) => {
  if (myArray) {
    const totalPages = Math.ceil(myArray.length / perPage);

    const paginatedArray = myArray.slice((current - 1) * perPage, current * perPage);

    return {
      data: paginatedArray,
      current,
      total: myArray.length,
      total_page: totalPages,
    };
  }

  return {
    data: [],
    current: 1,
    total: 0,
    total_page: 0,
  };
};
