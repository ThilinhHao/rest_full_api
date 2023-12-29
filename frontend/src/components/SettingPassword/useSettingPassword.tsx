import React, { useState } from 'react';

import { message } from 'antd';
import { isStringEmpty } from 'helper/stringEmpty';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiChangePassword } from 'api';
import { ERROR_CODE_COMMON } from 'constants/errorCode';
import { JAPANESE_CHARACTER } from 'helper/regex';
import { TYPE_INPUT_PASSWORD } from 'constants/constants';
import { useLocation, useNavigate } from 'react-router-dom';

import CONST_SETTING_PASSWORD from './constants';

interface ISettingPassword {
  password: string;
  confirmPassword: string;
}
const useSettingPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [typePassword, setTypePassword] = useState<ISettingPassword>({
    password: TYPE_INPUT_PASSWORD,
    confirmPassword: TYPE_INPUT_PASSWORD,
  });

  const [passwordIncorrect, setPasswordInCorrect] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<ISettingPassword>({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<ISettingPassword>({
    password: '',
    confirmPassword: '',
  });

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(JAPANESE_CHARACTER)) {
      return;
    }
    setPassword({ ...password, password: e?.target?.value });
    if (error.password) {
      setError({
        ...error,
        password: '',
      });
    }
    if (passwordIncorrect) {
      setPasswordInCorrect('');
    }
  };
  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(JAPANESE_CHARACTER)) {
      return;
    }
    setPassword({ ...password, confirmPassword: e?.target?.value });
    if (error.confirmPassword) {
      setError({
        ...error,
        confirmPassword: '',
      });
    }
    if (passwordIncorrect) {
      setPasswordInCorrect('');
    }
  };

  const onSettingPassword = async () => {
    if (isLoading) {
      return false;
    }
    setPasswordInCorrect('');
    setError({
      ...error,
      password: '',
      confirmPassword: '',
    });

    if (isStringEmpty(password.password) || isStringEmpty(password.confirmPassword)) {
      setError({
        password: isStringEmpty(password.password) ? CONST_SETTING_PASSWORD.EMPTY_PASSWORD : '',
        confirmPassword: isStringEmpty(password.confirmPassword) ? CONST_SETTING_PASSWORD.EMPTY_CONFIRM_PASSWORD : '',
      });
      return;
    }
    if (password.password.length < 8 || password.confirmPassword.length < 8) {
      if (password.password.length < 8) {
        setError({
          ...error,
          password: CONST_SETTING_PASSWORD.WITHIN,
        });
      }
      if (password.confirmPassword.length < 8) {
        setPasswordInCorrect(CONST_SETTING_PASSWORD.WITHIN);
      }

      return;
    }

    if (password.password !== password.confirmPassword) {
      setPasswordInCorrect(CONST_SETTING_PASSWORD.INCORRECT_PASSWORD);
      return;
    }

    try {
      setIsLoading(true);
      const code = query.get('code');
      const response = await apiChangePassword(code, {
        password: password.password,
        password_confirm: password.confirmPassword,
      });
      if (responseSuccess(response)) {
        message.success(CONST_SETTING_PASSWORD.SETTING_SUCCESS);
        navigate('/login');
      } else {
        message.warning(ERROR_CODE_COMMON.settingPassword[`${response?.response?.data?.code}`]);
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeTypePassword = () => {
    setTypePassword({
      ...typePassword,
      password: typePassword.password ? '' : TYPE_INPUT_PASSWORD,
    });
  };
  const onChangeTypeConfirmPassword = () => {
    setTypePassword({
      ...typePassword,
      confirmPassword: typePassword.confirmPassword ? '' : TYPE_INPUT_PASSWORD,
    });
  };

  return {
    passwordIncorrect,
    isLoading,
    password,
    error,
    onChangePassword,
    onSettingPassword,
    onChangePasswordConfirm,
    onChangeTypePassword,
    typePassword,
    onChangeTypeConfirmPassword,
  };
};

export default useSettingPassword;
