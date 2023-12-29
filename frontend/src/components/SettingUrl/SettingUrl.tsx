import React from 'react';

import { SpaceBase } from 'styles';
import { ButtonLogin, ErrorLogin } from '@pages/LoginPage/loginPageStyle';
import { InputSetting, LabelInput, SettingWrapper, TitleSetting } from '@pages/ForgotPassword/forgotPasswordStyle';
import CONST_SETTING_URL from './constants';
import useSettingEmail from './useSettingEmail';
import { getFullHostName } from 'helper';
import configs from 'config';
import images from '@assets/images-base';

const SettingUrl = () => {
  const { isLoading, error, onSendEmail, onChangeEmail } = useSettingEmail();

  const isCompantSite = getFullHostName() === configs.APP_FRONTEND_COMPANY;

  return (
    <>
      <SettingWrapper>
        <TitleSetting>{CONST_SETTING_URL.SEND_PASSWORD}</TitleSetting>
        <SpaceBase height={7} />
        {isCompantSite && <LabelInput>{CONST_SETTING_URL.EMAIL_ADDRESS}</LabelInput>}
        <InputSetting
          placeholder={isCompantSite ? CONST_SETTING_URL.PLACEHOLDER_EMAIL : CONST_SETTING_URL.EMAIL_ADDRESS}
          onChange={onChangeEmail}
        />
        <ErrorLogin>{error}</ErrorLogin>
        <SpaceBase height={6.313} />
      </SettingWrapper>
      <SpaceBase height={4.688} />
      <ButtonLogin
        iconWidth={'3.75rem'}
        iconHeight={'3.75rem'}
        icon={isCompantSite && <img src={images.companySite.companySendMail} alt="" />}
        onClick={onSendEmail}
        isloading={isLoading}
      >
        {CONST_SETTING_URL.SEND}
      </ButtonLogin>
    </>
  );
};

export default SettingUrl;
