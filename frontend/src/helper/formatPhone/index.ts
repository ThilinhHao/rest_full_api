import { isNumberOfJP } from 'helper/regex';

export const stringToPhone = (value: string, beforeValue: string) => {
  if (!value || beforeValue.length >= value.length) return value;

  const phoneNumber = phoneStringToNumber(value);
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${value.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${value.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

export const stringToPhoneView = (text: string) => {
  if (!text) {
    return '';
  }
  return text;
};

export const phoneStringToNumber = (phone: string) => {
  return phone?.replace(isNumberOfJP, '') || phone;
};

export const formatPhone = (value: string) => {
  return value;
};
export const formatFax = (value: string) => {
  if (!value) return value;

  const phoneNumberLength = value.length;
  if (phoneNumberLength < 4) return value;

  let formattedPhone = value.slice(0, 3);
  if (phoneNumberLength <= 7) {
    formattedPhone += `-${value.slice(3)}`;
  } else {
    formattedPhone += `-${value.slice(3, 7)}-${value.slice(7, 10)}`;
  }

  return formattedPhone;
};

export const formatPhoneUploadFile = (str: string | number) => {
  const _str = JSON.stringify(str);
  if (!_str) return '';
  let newStr = _str.replace(/[,\s]/g, '').replace(/[^0-9]/g, '');

  if (newStr.length > 11) {
    newStr = newStr.slice(0, 11);
  }

  return newStr;
};

export const stringRegisterCode = (value: string) => {
  if (value.trim().length < 14) return value;
  const phoneNumber = phoneStringToNumber(value).replaceAll('-', '').replace('T', '');
  return `T${phoneNumber.slice(0, 1)}-${phoneNumber.slice(1, 5)}-${phoneNumber.slice(5, 9)}-${phoneNumber.slice(
    9,
    13
  )}`;
};

export const isFormatPhone = (str: string, isValidateSubmit = false) => {
  if (!str) return true;
  let lastCharacter = '';
  if (str && str.length > 0) {
    lastCharacter = str.charAt(str.length - 1);
  }

  if (lastCharacter && (!isNaN(Number(lastCharacter)) || lastCharacter === '-')) {
    if (str.replace(/-/g, '').length > 11) {
      return false;
    }
    if (str.replace(/\d+/g, '').length > 2) {
      return false;
    }
    if (isValidateSubmit && (str.replace(/-/g, '').length < 10 || str.replace(/-/g, '').length > 11)) {
      return false;
    }
    return true;
  }
  return false;
};

export const onChangePhoneUseForm = (form: any, e: any) => {
  if (isFormatPhone(e?.target?.value)) {
    form.setFieldsValue({
      [e.target.name]: e?.target?.value,
    });
  } else if (e?.target?.value !== '') {
    form.setFieldsValue({
      // eslint-disable-next-line no-useless-escape
      [e.target.name]: e.target.value.replace(/[^0-9\-]/g, ''),
    });
  } else {
    form.setFieldsValue({
      [e.target.name]: '',
    });
  }
};

export const isFormatFax = (str: string) => {
  if (!str) return true;
  let lastCharacter = '';
  if (str && str.length > 0) {
    lastCharacter = str.charAt(str.length - 1);
  }
  if (lastCharacter && (!isNaN(Number(lastCharacter)) || lastCharacter === '-')) {
    return true;
  }
  return false;
};

export const onChangeFaxUseForm = (form: any, e: any) => {
  if (isFormatFax(e?.target?.value)) {
    form.setFieldsValue({
      [e.target.name]: e?.target?.value,
    });
  } else if (e?.target?.value !== '') {
    form.setFieldsValue({
      // eslint-disable-next-line no-useless-escape
      [e.target.name]: e.target.value.replace(/[^0-9\-]/g, ''),
    });
  } else {
    form.setFieldsValue({
      [e.target.name]: '',
    });
  }
};
