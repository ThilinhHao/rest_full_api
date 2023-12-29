import React, { useState, useEffect } from 'react';

import { SpaceBase } from 'styles';
import { LoginPageWrapper, ManipulationWrapper, RightPage } from '@pages/LoginPage/loginPageStyle';

import images from '@assets/images-base';
import SettingPassword from '@components/SettingPassword/SettingPassword';

import { BackIcon } from './forgotPasswordStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFullHostName } from 'helper';
import configs from 'config';
import { LogoText } from '@components/Logo';
import { apiCheckForgotPassword } from 'api';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import Loading from '@components/Loading';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate('/login');
  };
  const [checkingForgot, setCheckingForgot] = useState<boolean>(true);

  const currentURL = window.location.pathname;
  const location = useLocation();
  const isCompantSite = getFullHostName() === configs.APP_FRONTEND_COMPANY;
  const query = new URLSearchParams(location.search);

  const checkForgotedPassword = async () => {
    try {
      const type = query.get('type') || null;
      const code = query.get('code');
      const time = query.get('time');
      const response = await apiCheckForgotPassword({ code, time, type });
      if (!responseSuccess(response)) {
        navigate('/url-invalid');
      }
    } catch (error) {
      //
    } finally {
      setCheckingForgot(false);
    }
  };

  useEffect(() => {
    checkForgotedPassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!checkingForgot && (
        <LoginPageWrapper>
          <>
            {currentURL !== '/setting' && (
              <>
                {isCompantSite ? (
                  <BackIcon src={images.login.companyBack} alt="" onClick={toLogin} />
                ) : (
                  <BackIcon src={images.login.back} alt="" onClick={toLogin} />
                )}
              </>
            )}
            <ManipulationWrapper>
              <SpaceBase height={2.5} />
              <SettingPassword />
            </ManipulationWrapper>
            {!isCompantSite ? (
              <RightPage>
                <LogoText />
              </RightPage>
            ) : (
              <RightPage />
            )}
          </>
        </LoginPageWrapper>
      )}

      {checkingForgot && <Loading />}
    </>
  );
};

export default ForgotPassword;
