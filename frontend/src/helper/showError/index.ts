import { CONST_CREATE_AGENCY } from '@pages/OperatorSite/Agencies/CreateAgency/constants';
import { message } from 'antd';
import { ERROR_CODE, IErrorCode, MESSAGE_FROM_CODE } from 'constants/errorCode';

export const showError = (code: string, messageDefault: string) => {
  const find = ERROR_CODE.find((element: IErrorCode) => element.code === code);
  if (find) {
    message.warning(find.message);
    return;
  }
  message.warning(messageDefault);
};

export const showErrorFromResponse = (responseError: any) => {
  const messageRes = responseError?.response?.data?.message || '';
  const key = Object.keys(messageRes)[0];
  if (key && MESSAGE_FROM_CODE[key][messageRes[key]]) {
    message.warning(MESSAGE_FROM_CODE[key][messageRes[key]]);
    return;
  }
  message.warning(CONST_CREATE_AGENCY.SAME_EMAIL);
};
export const returnErrorFromResponse = (responseError: any): any => {
  const messageRes = responseError?.response?.data?.message || '';
  const keys = Object.keys(messageRes);
  console.log(messageRes);
  if (keys) {
    return keys.map((element) => ({
      name: element,
      errors: [`${MESSAGE_FROM_CODE[element][messageRes[element]]}`],
    }));
  }
  return undefined;
};
