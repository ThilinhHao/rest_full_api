import React from 'react';
import { HeaderPage, UploadDocumentWrapper } from './uploadDocumentStyle';
import useUploadDocument from './useUploadDocument';
import { CONST_AGENCY_VERIFY_DOCUMENT, CONST_COMPANY_UPLOAD_DOCUMENT } from 'constants/language';
import { colors } from 'constants/colorsBase';
import images from '@assets/images-base';
import { DocumentContainer } from '@containers/AgencySite/UploadDocument/DocumentContainer';
import { BtnActionWrapper, BtnWrapper } from '@components/CompanySite/common/styled';
import { getColorSite } from 'helper/colorSite';

const UploadDocument = () => {
  const {
    isVerifiedPrivacyPolicy,
    isVerifiedTermsOfUse,
    navigateToVerifyPrivacyPolicy,
    navigateToTermsOfUseContract,
    downloadPrivacyPolicy,
    downloadTermsOfUseContract,
    navigateToProfileSetting,
    isLoadingDownloadPrivacyPolicy,
    isLoadingDownloadTermsOfUse,
  } = useUploadDocument();

  return (
    <UploadDocumentWrapper>
      <HeaderPage>
        <img src={images.agencySite.agencyLogoWithName} alt="" />
        <span color={colors.mainText}>{CONST_AGENCY_VERIFY_DOCUMENT.PLEASE_VERIFY_DOCUMENT}</span>
      </HeaderPage>
      <DocumentContainer
        isVerifiedPrivacyPolicy={isVerifiedPrivacyPolicy}
        isVerifiedTermsOfUse={isVerifiedTermsOfUse}
        navigateToVerifyPrivacyPolicy={navigateToVerifyPrivacyPolicy}
        navigateToTermsOfUseContract={navigateToTermsOfUseContract}
        downloadPrivacyPolicy={downloadPrivacyPolicy}
        downloadTermsOfUseContract={downloadTermsOfUseContract}
        isLoadingDownloadPrivacyPolicy={isLoadingDownloadPrivacyPolicy}
        isLoadingDownloadTermsOfUse={isLoadingDownloadTermsOfUse}
      />
      {isVerifiedPrivacyPolicy && isVerifiedTermsOfUse && (
        <BtnWrapper>
          <BtnActionWrapper onClick={navigateToProfileSetting} background={getColorSite()} boxshadow={'unset'}>
            {CONST_COMPANY_UPLOAD_DOCUMENT.GO_FIRST_SETTING}
          </BtnActionWrapper>
        </BtnWrapper>
      )}
    </UploadDocumentWrapper>
  );
};

export default UploadDocument;
