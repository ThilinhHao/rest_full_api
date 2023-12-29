import images from '@assets/images-base';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import { Container } from '@components/Style/Style';
import { DocumentContainer } from '@containers/AgencySite/UploadDocument/DocumentContainer';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import React from 'react';
import useUploadDocument from '../UploadDocument/useUploadDocument';
import { ContainerWrapper } from './termOfUseAgencyStyle';
import { HeaderFootstepsWrapper } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import CONST_SIDE_BAR from '@components/layout/SideBar/constants';

export const TermOfUseAgency = () => {
  const isFirst = false;
  const {
    BREADS,
    isVerifiedPrivacyPolicy,
    isVerifiedTermsOfUse,
    previewPrivacyPolicy,
    previewTermOfUse,
    downloadPrivacyPolicy,
    downloadTermsOfUseContract,
    isLoadingDownloadPrivacyPolicy,
    isLoadingDownloadTermsOfUse,
  } = useUploadDocument(isFirst);

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <ContainerWrapper>
          <div>
            <HeaderFootstepsWrapper>
              <img src={images.agencySite.agencyTermOfUse} alt="" />
              <TitleHeaderSetting>{CONST_SIDE_BAR.MENU.PRIVATE}</TitleHeaderSetting>
            </HeaderFootstepsWrapper>
          </div>

          <DocumentContainer
            isVerifiedPrivacyPolicy={isVerifiedPrivacyPolicy}
            isVerifiedTermsOfUse={isVerifiedTermsOfUse}
            isLoadingDownloadPrivacyPolicy={isLoadingDownloadPrivacyPolicy}
            isLoadingDownloadTermsOfUse={isLoadingDownloadTermsOfUse}
            navigateToVerifyPrivacyPolicy={previewPrivacyPolicy}
            navigateToTermsOfUseContract={previewTermOfUse}
            downloadPrivacyPolicy={downloadPrivacyPolicy}
            downloadTermsOfUseContract={downloadTermsOfUseContract}
          />
        </ContainerWrapper>
      </Container>
    </GrantCompanyWrapper>
  );
};
