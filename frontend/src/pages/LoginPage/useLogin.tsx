/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { apiLogin } from 'api';
import { useNavigate } from 'react-router-dom';
import { isStringEmpty } from 'helper/stringEmpty';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { getFullHostName, getUseRoleByHostName } from 'helper';
import { storeSetToken, storeSetUserType, storeSetAuth, storeSetCompanyIdLeague } from '@store/auth-reducer';
import {
  EKeyCode,
  EStatusCheckCompanyDocument,
  EStatusCheckPrivacyPolicy,
  EStatusCompany,
  REGULATIONS_PATH_NAME_AGENCY,
  REGULATIONS_PATH_NAME_COMPANY,
  TYPE_INPUT_PASSWORD,
} from 'constants/constants';

import configs from 'config';
import CONST_LOGIN_PAGE from './constants';
import { firestoreFirebaseAuthApp } from '@hooks/useFireBase/useFireBase';
import { getEmailFirebase, getPasswordFirebase } from 'helper/firebase';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';

export interface IUserLogin {
  userName: string;
  password: string;
}

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const firestoreFirebaseAuth = firestoreFirebaseAuthApp;
  const [errorLogin, setErrorLogin] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typePassword, setTypePassword] = useState<string>(TYPE_INPUT_PASSWORD);

  const [error, setError] = useState<IUserLogin>({
    userName: '',
    password: '',
  });
  const [user, setUser] = useState<IUserLogin>({
    userName: '',
    password: '',
  });

  const handleLogout = () => {
    dispatch(storeSetToken(''));
    dispatch(storeSetUserType(0));
    dispatch(storeSetAuth(null));
    dispatch(storeSetCompanyIdLeague(null));
    firestoreFirebaseAuth?.signOut();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, userName: e?.target?.value });
    setError({
      ...error,
      userName: !e?.target?.value ? CONST_LOGIN_PAGE.LOGIN.ERROR_NAME : '',
    });
    if (errorLogin) {
      setErrorLogin('');
    }
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e?.target?.value });
    setError({
      ...error,
      password: !e?.target?.value ? CONST_LOGIN_PAGE.LOGIN.ERROR_PASSWORD : '',
    });
    if (errorLogin) {
      setErrorLogin('');
    }
  };

  const onLogin = async () => {
    if (isLoading) {
      return false;
    }
    if (isStringEmpty(user.password) || isStringEmpty(user.userName)) {
      setError({
        userName: isStringEmpty(user.userName) ? CONST_LOGIN_PAGE.LOGIN.ERROR_NAME : '',
        password: isStringEmpty(user.password) ? CONST_LOGIN_PAGE.LOGIN.ERROR_PASSWORD : '',
      });
      return;
    }
    try {
      setIsLoading(true);
      const response = await apiLogin({
        email: user.userName,
        password: user.password,
        user_role: getUseRoleByHostName(),
      });
      if (responseSuccess(response)) {
        dispatch(storeSetToken(response.data.token));
        dispatch(storeSetUserType(response.data.user.type));
        dispatch(storeSetAuth(response.data));
        // auth firebase
        const emailUser = getEmailFirebase(response.data?.user?.email, response.data?.user?.user_role);
        const passwordUser = getPasswordFirebase(response.data?.user?.email, response.data?.user?.user_role);
        if (emailUser && passwordUser) {
          firestoreFirebaseAuth?.signInWithEmailAndPassword(emailUser, passwordUser);
        }
        // if site company
        if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
          // If not verify documents
          if (
            response.data?.regulations_status !== EStatusCheckPrivacyPolicy.AGREE ||
            response.data?.company?.documents?.filter(
              (document: any) => document?.status !== EStatusCheckCompanyDocument.VERIFIED
            )?.length > 0 ||
            !response.data?.company?.company_setting
          ) {
            if (response.data?.regulations_status === EStatusCheckPrivacyPolicy.UPDATE) {
              const keyRegulation = response.data?.regulations_confirms?.find(
                (element: any) => element?.regulations_status === EStatusCheckPrivacyPolicy.UPDATE
              )?.key_name;
              if (keyRegulation) {
                navigate(REGULATIONS_PATH_NAME_COMPANY[keyRegulation]);
              } else {
                navigate('/company/upload-document');
              }
            } else {
              navigate('/company/upload-document');
            }
          }
          // if not config setting salary0000
          else if (!response.data?.company?.company_setting) {
            navigate('/setting/edit/salary');
          }
          // if not config bank
          else if (!response.data?.company?.is_setting_bank) {
            navigate('/setting/edit/bank');
          }
          // if company suspend
          else if (response.data?.company?.status === EStatusCompany.STATUS_SUSPEND) {
            navigate('/history');
          } else {
            navigate('/');
          }
        } else if (getFullHostName() === configs.APP_FRONTEND_AGENCY) {
          // If not verify documents

          if (response.data?.regulations_status !== EStatusCheckPrivacyPolicy.AGREE || !response.data?.agency_bank) {
            if (response.data?.regulations_status === EStatusCheckPrivacyPolicy.UPDATE) {
              const keyRegulation = response.data?.regulations_confirms?.find(
                (element: any) => element?.regulations_status === EStatusCheckPrivacyPolicy.UPDATE
              )?.key_name;
              if (keyRegulation) {
                navigate(REGULATIONS_PATH_NAME_AGENCY[keyRegulation]);
              } else {
                navigate('/agency/upload-document');
              }
            } else {
              navigate('/agency/upload-document');
            }
          } else {
            navigate('/');
          }
        }
        // Return home page
        else {
          navigate('/');
        }
      } else {
        if (response?.response?.data?.code === VALIDATE_ERROR_CODE.NOT_CONFIRM_REGULATIONS) {
          setErrorLogin(CONST_LOGIN_PAGE.LOGIN.ERROR_NOT_CONFIRM_REGULATIONS);
        } else {
          setErrorLogin(CONST_LOGIN_PAGE.LOGIN.ERROR_Login);
        }
      }
    } catch (error) {
      setErrorLogin(CONST_LOGIN_PAGE.LOGIN.ERROR_Login);
    } finally {
      setIsLoading(false);
    }
  };

  const toSettingPassword = () => {
    navigate('/email');
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === EKeyCode.ENTER || event.code === EKeyCode.NUMPAD_ENTER) {
        onLogin();
        event.preventDefault();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [user]);

  const onChangeTypePassword = () => {
    setTypePassword(typePassword ? '' : TYPE_INPUT_PASSWORD);
  };

  return {
    user,
    error,
    isLoading,
    errorLogin,
    onLogin,
    typePassword,
    setTypePassword,
    onChangeUserName,
    onChangePassword,
    toSettingPassword,
    onChangeTypePassword,
  };
};

export default useLogin;
