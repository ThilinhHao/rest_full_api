import React from 'react';
import { SpaceBase } from 'styles';
import images from '@assets/images-base';

import useLogin from './useLogin';
import CONST_LOGIN_PAGE from './constants';
import {
  ManipulationWrapper,
  LoginPageWrapper,
  InputLogin,
  ButtonLogin,
  ForgotPassword,
  ErrorLogin,
  RightPage,
} from './loginPageStyle';
import { LogoText } from '@components/Logo';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { getFullHostName } from 'helper';
import configs from 'config';
import { MAX_LENGTH } from 'constants/constants';

const LoginPage = () => {
  const {
    error,
    user,
    errorLogin,
    isLoading,
    onChangeUserName,
    onChangePassword,
    onLogin,
    toSettingPassword,
    typePassword,
    onChangeTypePassword,
  } = useLogin();

  const isSiteLoginCompany = getFullHostName() === configs.APP_FRONTEND_COMPANY;

  return (
    <LoginPageWrapper isSiteLoginCompany={isSiteLoginCompany}>
      <ManipulationWrapper>
        <SpaceBase height={2.5} />
        {/* <LogoWrapper>
          <div />
          <span>Logo</span>
        </LogoWrapper> */}
        <InputLogin
          placeholder={CONST_LOGIN_PAGE.LOGIN.LOGIN_ID}
          prefix={<img src={images.login.emaiImg} alt="" />}
          value={user.userName}
          onChange={onChangeUserName}
        />
        <ErrorLogin>{error?.userName}</ErrorLogin>
        <SpaceBase height={3.125} />
        <InputLogin
          placeholder={CONST_LOGIN_PAGE.LOGIN.PASSWORD}
          prefix={<img src={images.login.lock} alt="" />}
          value={user.password}
          type={typePassword}
          maxLength={MAX_LENGTH.INPUT_ACCOUNT_NUMBER}
          onChange={onChangePassword}
          suffix={
            typePassword ? (
              <EyeInvisibleOutlined onClick={onChangeTypePassword} />
            ) : (
              <>{!typePassword && <EyeOutlined onClick={onChangeTypePassword} />}</>
            )
          }
        />
        <ErrorLogin>{error?.password}</ErrorLogin>
        <ErrorLogin>{errorLogin}</ErrorLogin>
        <SpaceBase height={3.125} />
        <ButtonLogin
          icon={isSiteLoginCompany && <img src={images.companySite.companyLogin} alt="" />}
          isloading={isLoading}
          onClick={onLogin}
        >
          {CONST_LOGIN_PAGE.LOGIN.LOGIN}
        </ButtonLogin>
        <ForgotPassword isSiteLoginCompany={isSiteLoginCompany}>
          {CONST_LOGIN_PAGE.LOGIN.FORGOT_PASSWORD}
          <span onClick={toSettingPassword}>{CONST_LOGIN_PAGE.LOGIN.HEAR}</span>
        </ForgotPassword>
        <SpaceBase height={1.2} />
        {/* <LineLogin /> */}
      </ManipulationWrapper>
      <RightPage>
        <LogoText isSiteLoginCompany={isSiteLoginCompany} />
      </RightPage>
    </LoginPageWrapper>
  );
};

export default LoginPage;
