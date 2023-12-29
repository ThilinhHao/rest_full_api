import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storeSetAuth, storeSetToken, storeSetUserType } from '@store/auth-reducer';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { theme } from 'antd';

import configs from 'config';
import { getFullHostName } from 'helper';

import { HeaderBarWrapper } from './headerBarStyle';
import HeaderOperator from './HeaderOperator';
import HeaderCompany from './HeaderCompany';
import HeaderAgency from './HeaderAgency';
import { firestoreFirebaseAuthApp } from '@hooks/useFireBase/useFireBase';
import useHeader from './HeaderHooks/useHeader';

export interface IHeaderInfo {
  full_name: string;
  div_name: string;
}

const HeaderBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { headerInfo, isLoadingHeaderInfo, navigateToTopPage } = useHeader();

  const handleLogout = () => {
    dispatch(storeSetToken(''));
    dispatch(storeSetUserType(0));
    dispatch(storeSetAuth(null));
    firestoreFirebaseAuthApp?.signOut();
    navigate('/');
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (getFullHostName() === configs.APP_FRONTEND_OPERATOR) {
    return (
      <HeaderOperator
        navigateToTopPage={navigateToTopPage}
        onHandleLogout={handleLogout}
        headerInfo={headerInfo}
        isLoadingHeaderInfo={isLoadingHeaderInfo}
      />
    );
  }

  if (getFullHostName() === configs.APP_FRONTEND_AGENCY) {
    return (
      <HeaderAgency
        navigateToTopPage={navigateToTopPage}
        onHandleLogout={handleLogout}
        headerInfo={headerInfo}
        isLoadingHeaderInfo={isLoadingHeaderInfo}
      />
    );
  }

  if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
    return (
      <HeaderCompany
        navigateToTopPage={navigateToTopPage}
        onHandleLogout={handleLogout}
        headerInfo={headerInfo}
        isLoadingHeaderInfo={isLoadingHeaderInfo}
      />
    );
  }

  return <HeaderBarWrapper style={{ height: '3.75rem', background: colorBgContainer }} />;
};

export default HeaderBar;
