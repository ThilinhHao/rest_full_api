import React from 'react';

import images from '@assets/images-base';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import useUploadDocument from '../UploadDocument/useUploadDocument';

import { SettingCard } from '../SettingPage/settingPageStyle';
import { DocumentContainer } from '@containers/CompanySite/UploadDocument/DocumentContainer';
import { CONST_SETTING_PAGE } from 'constants/language';
import { ContainerTermOfUse, ContainerWrapper } from './termOfUseStyle';
import { DetailWrapper, PrefixIcon, TitlePageWrapper } from '@components/CompanySite/common/styled';

export const TermOfUse = () => {
  const isFirst = false;
  const {
    step,
    newAuthInfo,
    relatedInfo,
    isVerifiedPrivacyPolicy,
    isVerifiedTermsOfUse,
    idDocumentUpload,
    uploadDocument,
    isLoadingUploadDocument,
    previewPrivacyPolicy,
    previewTermOfUse,
    downloadPrivacyPolicy,
    downloadTermsOfUseContract,
    previewDocument,
    getGuideTextByStep,
    BREADS,
    isLoadingDownloadPrivacyPolicy,
    isLoadingDownloadTermsOfUse,
  } = useUploadDocument(isFirst);

  return (
    <ContainerWrapper padding={'0'}>
      <DetailWrapper>
        <BreadCrumb margin="0.25rem 0 0.625rem 0.125rem" breads={BREADS} />
        <ContainerTermOfUse>
          <SettingCard padding={'1.5rem 0 0 0'}>
            <div>
              <TitlePageWrapper>
                <PrefixIcon src={images.companySite.settingTermOfUseCompany} alt="" />
                <div>{CONST_SETTING_PAGE.COMPANY_SITE.REGULATIONS}</div>
              </TitlePageWrapper>
              <DocumentContainer
                newAuthInfo={newAuthInfo}
                relatedInfo={relatedInfo}
                step={step}
                isVerifiedPrivacyPolicy={isVerifiedPrivacyPolicy}
                isVerifiedTermsOfUse={isVerifiedTermsOfUse}
                navigateToVerifyPrivacyPolicy={previewPrivacyPolicy}
                navigateToTermsOfUseContract={previewTermOfUse}
                downloadPrivacyPolicy={downloadPrivacyPolicy}
                downloadTermsOfUseContract={downloadTermsOfUseContract}
                uploadDocument={uploadDocument}
                getGuideTextByStep={getGuideTextByStep}
                previewDocument={previewDocument}
                idDocumentUpload={idDocumentUpload}
                isLoadingUploadDocument={isLoadingUploadDocument}
                isLoadingDownloadPrivacyPolicy={isLoadingDownloadPrivacyPolicy}
                isLoadingDownloadTermsOfUse={isLoadingDownloadTermsOfUse}
              />
            </div>
          </SettingCard>
        </ContainerTermOfUse>
      </DetailWrapper>
    </ContainerWrapper>
  );
};
