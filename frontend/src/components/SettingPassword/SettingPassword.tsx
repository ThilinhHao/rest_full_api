import React from 'react';

import { SpaceBase } from 'styles';
import { ButtonLogin } from '@pages/LoginPage/loginPageStyle';
import { SettingWrapper, TitleSetting } from '@pages/ForgotPassword/forgotPasswordStyle';

import useSettingPassword from './useSettingPassword';
import CONST_SETTING_PASSWORD from './constants';

import { EyeOutlined } from '@ant-design/icons/lib/icons';
import { useLocation } from 'react-router-dom';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import { ETypePasswordPage, MAX_LENGTH } from 'constants/constants';
import { ErrorForgot, InputForgot, LabelInput } from './settingPasswordStyle';

const SettingPassword = () => {
  const {
    passwordIncorrect,
    password,
    error,
    isLoading,
    onChangePassword,
    onSettingPassword,
    onChangePasswordConfirm,
    onChangeTypePassword,
    typePassword,
    onChangeTypeConfirmPassword,
  } = useSettingPassword();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const typePage = query.get('type') || null;

  return (
    <>
      <SettingWrapper>
        <TitleSetting>
          {typePage === ETypePasswordPage.GIVE_PASSWORD
            ? CONST_SETTING_PASSWORD.SETTING_PASSWORD
            : CONST_SETTING_PASSWORD.GIVE_PASSWORD}
        </TitleSetting>
        <SpaceBase height={4} />
        <LabelInput>{CONST_SETTING_PASSWORD.NEW_PASSWORD}</LabelInput>
        <InputForgot
          value={password.password}
          onChange={onChangePassword}
          maxLength={MAX_LENGTH.DEFAULT}
          type={typePassword.password}
          placeholder={CONST_SETTING_PASSWORD.PLACEHOULDER_PWD}
          suffix={
            typePassword.password ? (
              <EyeInvisibleOutlined onClick={onChangeTypePassword} />
            ) : (
              <EyeOutlined onClick={onChangeTypePassword} />
            )
          }
        />
        <ErrorForgot>{error?.password}</ErrorForgot>

        <SpaceBase height={4.813} />
        <LabelInput>{CONST_SETTING_PASSWORD.CONFIRM_NEW}</LabelInput>
        <InputForgot
          value={password.confirmPassword}
          onChange={onChangePasswordConfirm}
          maxLength={MAX_LENGTH.DEFAULT}
          type={typePassword.confirmPassword}
          suffix={
            typePassword.confirmPassword ? (
              <EyeInvisibleOutlined onClick={onChangeTypeConfirmPassword} />
            ) : (
              <EyeOutlined onClick={onChangeTypeConfirmPassword} />
            )
          }
          placeholder={CONST_SETTING_PASSWORD.PLACEHOULDER_PWD}
        />
        <ErrorForgot>{error?.confirmPassword}</ErrorForgot>
        <ErrorForgot>{passwordIncorrect}</ErrorForgot>

        <SpaceBase height={4} />
      </SettingWrapper>
      <SpaceBase height={2.25} />
      <ButtonLogin iconWidth={'3.75rem'} iconHeight={'3.75rem'} isloading={isLoading} onClick={onSettingPassword}>
        {CONST_SETTING_PASSWORD.REGISTER}
      </ButtonLogin>
    </>
  );
};

export default SettingPassword;
