import React, { useState } from 'react';

import { message } from 'antd';
import { REGEX_EMAIL } from 'helper/regex';
import { CONST_COMMON } from 'constants/language';
import { isStringEmpty } from 'helper/stringEmpty';
import { apiOperatorVerifyChangePassword } from 'api';
import { getUseRoleByHostName } from 'helper';

import CONST_SETTING_URL from './constants';
import CONST_LOGIN_PAGE from '@pages/LoginPage/constants';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { useNavigate } from 'react-router-dom';

const useSettingEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e?.target?.value);
    setError(!e?.target?.value ? CONST_LOGIN_PAGE.LOGIN.ERROR_NAME : '');
  };

  const onSendEmail = async () => {
    if (isStringEmpty(email)) {
      setError(CONST_LOGIN_PAGE.LOGIN.ERROR_NAME);
      return;
    }
    if (!email.trim().match(REGEX_EMAIL)) {
      message.warning(CONST_COMMON.VALIDATE_EMAIL);
      return;
    }
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await apiOperatorVerifyChangePassword({
        email,
        user_role: getUseRoleByHostName(),
      });
      if (responseSuccess(response)) {
        message.success(CONST_SETTING_URL.SEND_SUCCESS);
        navigate('/login');
      } else {
        if (response.response.data.message.email === 'C001') {
          message.warning(CONST_SETTING_URL.MAIL_WAITING_SETTING_PASSWORD);
        } else {
          message.warning(CONST_COMMON.SYSTEM_NOT_EMAIL);
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    error,
    isLoading,
    onSendEmail,
    onChangeEmail,
  };
};

export default useSettingEmail;
