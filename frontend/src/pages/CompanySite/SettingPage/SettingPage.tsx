import React from 'react';
import { CONST_SETTING_PAGE } from 'constants/language';
import { RowCenter, SpaceBase } from 'styles';
import { Container, GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { ContainerSetting, RenameTxt, SettingCard, TitleHeaderSetting, WrapperButton } from './settingPageStyle';
import { useNavigate } from 'react-router-dom';

import { SettingItemWrapper, LineHeaderSetting } from '@components/Style/Style';
import { IconSetting } from '@components/Icon';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { USER_TYPE_IP_SUPPORT, USER_TYPE_OWNER } from 'constants/User';

const SettingPage = () => {
  const navigate = useNavigate();

  const authInfo = useAppSelector((state) => state.auth.authInfo);

  const toEditScreen = (path: string) => {
    navigate(`${path}`);
  };

  const toListNotice = () => {
    toEditScreen('listNotice');
  };

  const toFootstepsHistory = () => {
    navigate('/setting-page/footsteps');
  };

  const toNextnovaPAQ = () => {
    setTimeout(() => {
      window.open('https://moai.bucho.nextnova.co.jp/qa/', '_blank');
    }, 0);
  };

  const toNextnovaHelp = () => {
    setTimeout(() => {
      window.open('https://moai.bucho.nextnova.co.jp/administrator_manual/', '_blank');
    }, 0);
  };

  return (
    <GrantCompanyWrapper>
      <Container>
        <SettingCard>
          <SpaceBase height={1.5} />
          <RowCenter>
            <SpaceBase width={2.5} />
            <IconSetting />
            <TitleHeaderSetting>{CONST_SETTING_PAGE.SETTING_TITLE}</TitleHeaderSetting>
          </RowCenter>
          <SpaceBase height={0.375} />
          <LineHeaderSetting />
          <SpaceBase height={3.75} />

          <ContainerSetting>
            <RenameTxt>{CONST_SETTING_PAGE.CHANGE_NAME}</RenameTxt>
            <SpaceBase height={0.375} />
            <LineHeaderSetting />
            <SpaceBase height={4.375} />
            <WrapperButton>
              <SettingItemWrapper onClick={toListNotice}>{CONST_SETTING_PAGE.COMPANY_SITE.NOTICE}</SettingItemWrapper>
              <SpaceBase width={6.25} />
              {(authInfo?.user?.type === USER_TYPE_OWNER || authInfo?.user?.type === USER_TYPE_IP_SUPPORT) && (
                <>
                  <SettingItemWrapper onClick={() => toEditScreen('/chat')}>
                    {CONST_SETTING_PAGE.COMPANY_SITE.CHAT}
                  </SettingItemWrapper>
                  <SpaceBase width={6.25} />
                </>
              )}
              <SettingItemWrapper onClick={() => toEditScreen('/setting-page/term-of-use')}>
                {CONST_SETTING_PAGE.COMPANY_SITE.REGULATIONS}
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
              <SettingItemWrapper onClick={toFootstepsHistory}>
                {CONST_SETTING_PAGE.COMPANY_SITE.HISTORY}
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
            </WrapperButton>
            <SpaceBase height={3.125} />
            <WrapperButton>
              <SettingItemWrapper onClick={toNextnovaPAQ}>{CONST_SETTING_PAGE.COMPANY_SITE.QANDA}</SettingItemWrapper>
              <SpaceBase width={6.25} />
              <SettingItemWrapper onClick={toNextnovaHelp}>{CONST_SETTING_PAGE.COMPANY_SITE.HELP}</SettingItemWrapper>
              <SpaceBase width={6.25} />
            </WrapperButton>
          </ContainerSetting>

          <SpaceBase height={3.4375} />
          <ContainerSetting>
            <RenameTxt>設定</RenameTxt>
            <SpaceBase height={0.375} />
            <LineHeaderSetting />
            <SpaceBase height={4.375} />
            <WrapperButton>
              <SettingItemWrapper onClick={() => toEditScreen('/setting-page/company-paired')}>
                {CONST_SETTING_PAGE.COMPANY_SITE.PARIED_COMPANY}
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
              <SettingItemWrapper onClick={() => toEditScreen('/setting-page/edit/salary')}>
                {CONST_SETTING_PAGE.COMPANY_SITE.SALARY}
              </SettingItemWrapper>
              <SpaceBase width={6.25} />
              {/* {authInfo?.user?.type === USER_TYPE_OWNER && (
                <SettingItemWrapper onClick={() => toEditScreen('/setting-page/edit/bank')}>
                  {CONST_SETTING_PAGE.COMPANY_SITE.BANK}
                </SettingItemWrapper>
              )} */}
              <SpaceBase width={6.25} />
            </WrapperButton>
          </ContainerSetting>
          <SpaceBase height={3.4375} />
        </SettingCard>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default SettingPage;
