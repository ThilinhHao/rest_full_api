import images from '@assets/images-base';
import React from 'react';
import { SpaceBase } from 'styles';
import { BtnProfile, IconProfile, LineProfile, PopupSettingWrapper, TextProfile } from './popupSettingStyle';
import { CONST_BREADS, CONST_COMMON } from 'constants/language';
import configs from 'config';
import { getFullHostName } from 'helper';
import { Tooltip } from 'antd';
import Loading from '@components/Loading';

interface IPopupSetting {
  onHandleLogout: () => void;
  name: string;
  userName: string;
  onClickProfile?: () => void;
  isLoading: boolean;
}

const getAvatarSite = () => {
  if (getFullHostName() === configs.APP_FRONTEND_OPERATOR) {
    return images.agencySite.bigProfile;
  }

  if (getFullHostName() === configs.APP_FRONTEND_AGENCY) {
    return images.agencySite.bigProfile;
  }

  if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
    return images.companySite.companyAvatar;
  }
};

const getBtnProfileText = () => {
  if (getFullHostName() === configs.APP_FRONTEND_OPERATOR) {
    return CONST_COMMON.PROFILE_POPUP.AGENCY_INFORMATION;
  }

  if (getFullHostName() === configs.APP_FRONTEND_AGENCY) {
    return CONST_COMMON.PROFILE_POPUP.AGENCY_INFORMATION;
  }

  if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
    return CONST_BREADS.COMPANY_SITE.COMPANY_PROFILE;
  }
};

const PopupSetting = ({ onClickProfile, onHandleLogout, name, userName, isLoading }: IPopupSetting) => {
  return (
    <PopupSettingWrapper>
      <IconProfile src={getAvatarSite()} />
      <SpaceBase height={1} />
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Tooltip placement="leftTop" title={name}>
            <TextProfile>{name}</TextProfile>
          </Tooltip>
          <Tooltip placement="leftTop" title={userName}>
            <TextProfile>{userName}</TextProfile>
          </Tooltip>
        </>
      )}
      <SpaceBase height={0.3} />
      <LineProfile />
      <SpaceBase height={1} />

      {onClickProfile && (
        <>
          <BtnProfile onClick={onClickProfile}>{getBtnProfileText()}</BtnProfile>
          <SpaceBase height={1.875} />
        </>
      )}
      {/* {!onClickProfile && <SpaceBase height={7.5} />} */}

      <BtnProfile onClick={onHandleLogout}>{CONST_COMMON.PROFILE_POPUP.LOGOUT}</BtnProfile>
    </PopupSettingWrapper>
  );
};

export default PopupSetting;
