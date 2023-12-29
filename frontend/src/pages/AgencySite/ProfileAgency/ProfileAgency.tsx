import React from 'react';

import { NameWrapper } from '@containers/OperatorSite/Agency/DetailAgency/detailAgencyStyle';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { CONST_AGENCY_SITE, CONST_COMMON } from 'constants/language';
import { CONST_LIST_AGENCY } from '@pages/OperatorSite/Agencies/ListAgency/constants';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { formatStrDateTimezone } from 'helper/date';
import { DetailBankWrapper, HeaderSettingWrapper } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import {
  ContainerProfile,
  ContentWrapper,
  ITemMarkEditProfileAgency,
  TitleAgencyName,
  UpdateContainer,
} from './profileAgencyStyle';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import EditAgencyInfo from '@containers/AgencySite/EditAgencyInfo/EditAgencyInfo';
import HomePageWrapper from '@pages/HomePage/homePageStyle';
import useProfileAgency from './useProfileAgency';
import AgencyInformation from '@containers/AgencySite/AgencyInformation/AgencyInformation';

interface IProfileAgencyProps {
  firstTime?: boolean;
}

const ProfileAgency = ({ firstTime }: IProfileAgencyProps) => {
  const { BREADS, detailAgencyData, isLoading, isEdit, setIsEdit, updateAgencyData } = useProfileAgency({
    firstTime: !!firstTime,
  });

  return (
    <HomePageWrapper firstTime={firstTime}>
      {!firstTime && <BreadCrumb breads={BREADS} />}
      <ContainerProfile>
        <DetailBankWrapper firstTime={firstTime}>
          <HeaderSettingWrapper paddingLeft={'6.25rem'}>
            {!firstTime && <SettingIcon src={images.setting.settingIcon} alt="setting" />}
            <TitleHeaderSetting>
              {CONST_AGENCY_SITE.AGENCY_INDOMATION}
              {isEdit && <ITemMarkEditProfileAgency>{CONST_COMMON.REQUIRE_TITLE}</ITemMarkEditProfileAgency>}
            </TitleHeaderSetting>{' '}
          </HeaderSettingWrapper>
          {isLoading && <Loading />}
          {!isLoading && detailAgencyData && (
            <ContentWrapper>
              <TitleAgencyName>{detailAgencyData?.name || detailAgencyData?.user_root?.full_name}</TitleAgencyName>
              {!isEdit && <AgencyInformation detailAgencyData={detailAgencyData} setIsEdit={setIsEdit} />}
              {isEdit && (
                <EditAgencyInfo
                  detailAgencyData={detailAgencyData}
                  setIsEdit={setIsEdit}
                  updateAgencyData={updateAgencyData}
                />
              )}
              {!firstTime && detailAgencyData?.updated_at && (
                <UpdateContainer>
                  {CONST_LIST_AGENCY.LAST_UPDATE} : {formatStrDateTimezone(detailAgencyData.updated_at)} [
                  <NameWrapper>{detailAgencyData?.updated_by?.full_name}</NameWrapper>]
                </UpdateContainer>
              )}
            </ContentWrapper>
          )}
        </DetailBankWrapper>
      </ContainerProfile>
    </HomePageWrapper>
  );
};

export default ProfileAgency;
