import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { validateEmail } from 'helper/validateEmail';
import { isStringEmpty } from 'helper/stringEmpty';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { CONST_CREATE_AGENCY } from '@pages/OperatorSite/Agencies/CreateAgency/constants';

import { CONST_OPERATOR } from './constants';
import { MESSAGE_SUCCESS } from 'constants/constants';
import { apiCreateOperator } from 'api';
import { katakana } from 'helper/regex';
import { isFormatPhone } from 'helper/formatPhone';
interface IOperator {
  fullName: string;
  kanaName: string;
  email: string;
  phone: string;
  validateEmail?: string;
}
const useCreateOperator = () => {
  const navigate = useNavigate();
  const BREADS = [
    {
      name: CONST_OPERATOR.ACCOUNT_LIST,
      path: '/operator',
    },
    {
      name: CONST_OPERATOR.OPERATOR,
      path: '',
    },
  ];
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [operator, setOperator] = useState<IOperator>({
    fullName: '',
    kanaName: '',
    email: '',
    phone: '',
    validateEmail: '',
  });

  const [error, setError] = useState<IOperator>({
    fullName: '',
    kanaName: '',
    email: '',
    phone: '',
  });

  const onChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperator({ ...operator, fullName: e?.target?.value });
    setError({
      ...error,
      fullName: '',
    });
  };
  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperator({ ...operator, kanaName: e?.target?.value });
    setError({
      ...error,
      kanaName: '',
    });
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperator({ ...operator, email: e?.target?.value });
    setError({
      ...error,
      email: '',
      validateEmail: '',
    });
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFormatPhone(e?.target?.value)) {
      setOperator({ ...operator, phone: e?.target?.value });
      setError({
        ...error,
        phone: '',
      });
    }
  };

  const onCreate = async () => {
    if (isLoading) {
      return false;
    }
    if (
      isStringEmpty(operator.fullName) ||
      isStringEmpty(operator.kanaName) ||
      validateEmail(operator.email) ||
      isStringEmpty(operator.email) ||
      !operator.kanaName.match(katakana)
    ) {
      const error = {
        fullName: isStringEmpty(operator.fullName) ? CONST_OPERATOR.ERROR_FIRST_NAME : '',
        kanaName: isStringEmpty(operator.kanaName) ? CONST_OPERATOR.ERROR_LAST_NAME : '',
        email: isStringEmpty(operator.email) ? CONST_OPERATOR.ERROR_EMAIL : '',
        phone: isStringEmpty(operator.phone) ? CONST_OPERATOR.ERROR_PHONE : '',
        validateEmail:
          validateEmail(operator.email) && !isStringEmpty(operator.email) ? CONST_OPERATOR.ERROR_FORMAT_EMAIL : '',
      };
      if (operator.kanaName && !operator.kanaName.match(katakana)) {
        error.kanaName = CONST_OPERATOR.ERROR_KATAKANA;
      }
      setError(error);
      return;
    }
    try {
      setIsLoading(true);
      const response = await apiCreateOperator({
        full_name: operator.fullName,
        name_kana: operator.kanaName,
        email: operator.email,
        phone: operator.phone,
      });
      if (responseSuccess(response)) {
        message.success(MESSAGE_SUCCESS);
        navigate('/operator');
      } else {
        if (response?.response?.data?.message?.email === 'A002') {
          setError({ ...error, email: CONST_CREATE_AGENCY.VALIDATE_MAIL });
        } else {
          setError({ ...error, email: CONST_CREATE_AGENCY.SAME_EMAIL });
        }
      }
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    BREADS,
    operator,
    isLoading,
    onCreate,
    onChangeEmail,
    onChangeLastName,
    onChangeFullName,
    onChangePhoneNumber,
  };
};

export default useCreateOperator;
