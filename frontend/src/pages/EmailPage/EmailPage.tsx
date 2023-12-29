import React from 'react';
import { useNavigate } from 'react-router-dom';

import SettingUrl from '@components/SettingUrl/SettingUrl';
import { LogoText } from '@components/Logo';
import configs from 'config';
import images from '@assets/images-base';
import { BackIcon } from '@pages/ForgotPassword/forgotPasswordStyle';
import { BoxEmailInput } from './emailPageStyle';
import { LoginPageWrapper, ManipulationWrapper, RightPage } from '@pages/LoginPage/loginPageStyle';
import { SpaceBase } from 'styles';
import { getFullHostName } from 'helper';

const EmailPage = () => {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate('/login');
  };

  const isCompantSite = getFullHostName() === configs.APP_FRONTEND_COMPANY;

  return (
    <LoginPageWrapper>
      {getFullHostName() === configs.APP_FRONTEND_COMPANY ? (
        <BackIcon src={images.login.companyBack} alt="" onClick={toLogin} />
      ) : (
        <BackIcon src={images.login.back} alt="" onClick={toLogin} />
      )}
      <ManipulationWrapper>
        <SpaceBase height={3} />
        <BoxEmailInput>
          <SettingUrl />
        </BoxEmailInput>
      </ManipulationWrapper>
      {!isCompantSite ? (
        <RightPage>
          <LogoText />
        </RightPage>
      ) : (
        <RightPage />
      )}
    </LoginPageWrapper>
  );
};

export default EmailPage;
