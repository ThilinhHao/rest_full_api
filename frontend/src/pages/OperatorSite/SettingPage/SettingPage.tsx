import React from 'react';
import images from '@assets/images-base';
import { CONST_SETTING_PAGE } from 'constants/language';
import { RowCenter, SpaceBase } from 'styles';
import { Container, GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import {
  ContainerSetting,
  LineHeaderSetting,
  SettingCard,
  TitleHeaderSetting,
  WrapperButton,
} from './settingPageStyle';
import { useNavigate } from 'react-router-dom';
import { ERegulation } from 'constants/constants';
import { SettingItemWrapper } from '@components/Style/Style';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import CONST_SIDE_BAR from '@components/layout/SideBar/constants';

const BREADS: IBread[] = [
  {
    name: CONST_SIDE_BAR.MENU.SETTING,
    path: '',
  },
];

const SettingPage = () => {
  const navigate = useNavigate();
  const toEditScreen = (
    idRegulation:
      | ERegulation.OPERATION_COMPANY
      | ERegulation.COMPANY_STAFF
      | ERegulation.OPERATION_AGENCY
      | ERegulation.REGULATION_STAFF
      | ERegulation.PRIVACY_POLICE
  ) => {
    navigate(`/setting-page/edit/${idRegulation}`);
  };
  const toSettingBank = () => {
    navigate('/setting-page/bank');
  };
  const toFootstepsHistory = () => {
    navigate('/setting-page/footsteps');
  };

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <SettingCard>
          <SpaceBase height={1.5} />
          <RowCenter>
            <SpaceBase width={2.5} />
            <img src={images.setting.settingIcon} alt="setting" />
            <TitleHeaderSetting>{CONST_SETTING_PAGE.SETTING_TITLE}</TitleHeaderSetting>
          </RowCenter>
          <SpaceBase height={0.375} />
          <LineHeaderSetting />
          <SpaceBase height={6.25} />

          <ContainerSetting>
            <WrapperButton>
              <SpaceBase width={6} />
              <SettingItemWrapper onClick={toSettingBank}>
                <span>{CONST_SETTING_PAGE.PLAN_PEE}</span>
                <span>{CONST_SETTING_PAGE.MANAGEMENT_ACCOUNT_SETTING}</span>
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
              <SettingItemWrapper onClick={toFootstepsHistory}>{CONST_SETTING_PAGE.WORD_LOG}</SettingItemWrapper>
              <SpaceBase width={6.25} />
              <SettingItemWrapper onClick={() => toEditScreen(ERegulation.PRIVACY_POLICE)}>
                {CONST_SETTING_PAGE.PRIVACY_POLICE}
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
              <SettingItemWrapper onClick={() => toEditScreen(ERegulation.OPERATION_COMPANY)}>
                <span>{CONST_SETTING_PAGE.OPERATION_COMPANIES}</span>
                <span>{CONST_SETTING_PAGE.TERMS_OF_SERVICE}</span>
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
            </WrapperButton>
            <SpaceBase height={3.125} />
            <WrapperButton>
              <SpaceBase width={6} />
              <SettingItemWrapper onClick={() => toEditScreen(ERegulation.COMPANY_STAFF)}>
                <span>{CONST_SETTING_PAGE.COMPANY_EMPLOYEES}</span>
                <span>{CONST_SETTING_PAGE.TERMS_OF_SERVICE}</span>
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
              <SettingItemWrapper onClick={() => toEditScreen(ERegulation.OPERATION_AGENCY)}>
                <span>{CONST_SETTING_PAGE.OPERATOR_BETWEEN_AGENCY}</span>
                <span>{CONST_SETTING_PAGE.TERMS_OF_SERVICE}</span>
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
              <SettingItemWrapper onClick={() => toEditScreen(ERegulation.REGULATION_STAFF)}>
                <span>{CONST_SETTING_PAGE.EMPLOYEES_SERVICE}</span>
                <span>{CONST_SETTING_PAGE.TERMS_OF_SERVICE}</span>
              </SettingItemWrapper>
            </WrapperButton>
          </ContainerSetting>
        </SettingCard>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default SettingPage;
