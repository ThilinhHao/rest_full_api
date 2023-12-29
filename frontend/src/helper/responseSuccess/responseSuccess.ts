export const responseSuccess = (response: any) => {
  if (response?.message === 'Success') {
    return true;
  }
  return false;
};

export const responseCode = (response: any) => {
  if (response?.message !== 'Success') {
    return response.response?.data?.code;
  }
  return false;
};

export const responseMessage = (response: any) => {
  if (response?.message !== 'Success' && response.response?.status !== 500 && response.response?.data?.message) {
    return response.response.data.message;
  }
  return false;
};
