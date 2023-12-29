import React from 'react';
import { IconSetting } from '@components/Icon';
import { LineHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { TitleHeaderSetting } from '@pages/CompanySite/SettingPage/settingPageStyle';
import { CONST_SETTING_SALARY } from 'constants/language';
import { RowCenter, SpaceBase } from 'styles';

const HeaderSetting = () => {
  return (
    <>
      <SpaceBase height={1.5} />
      <RowCenter>
        <SpaceBase width={2.5} />
        <IconSetting />
        <TitleHeaderSetting>{CONST_SETTING_SALARY.ADVANCE_PAYMENT_APP_SETTING}</TitleHeaderSetting>
      </RowCenter>
      <SpaceBase height={0.375} />
      <LineHeaderSetting />
      <SpaceBase height={3.75} />
    </>
  );
};

export default HeaderSetting;
