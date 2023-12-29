import { Row } from 'antd';
import { CONST_COMPANY_ADMIN_ACCOUNT, CONST_COMPANY_UPLOAD_DOCUMENT } from 'constants/language';
import React from 'react';
import { ColVerifyDocument } from './ColVerifyDocument';
import { FormDocumentWrapper } from './uploadDocumentStyle';

interface IButtonActionProps {
  isVerifiedPrivacyPolicy: boolean;
  isVerifiedTermsOfUse: boolean;
  isLoadingDownloadPrivacyPolicy: boolean;
  isLoadingDownloadTermsOfUse: boolean;
  navigateToVerifyPrivacyPolicy: () => void;
  navigateToTermsOfUseContract: () => void;
  downloadPrivacyPolicy: () => void;
  downloadTermsOfUseContract: () => void;
}

export const DocumentContainer = ({
  isVerifiedPrivacyPolicy,
  isVerifiedTermsOfUse,
  navigateToVerifyPrivacyPolicy,
  navigateToTermsOfUseContract,
  downloadPrivacyPolicy,
  downloadTermsOfUseContract,
  isLoadingDownloadPrivacyPolicy,
  isLoadingDownloadTermsOfUse,
}: IButtonActionProps) => {
  return (
    <>
      <FormDocumentWrapper>
        <Row>
          <ColVerifyDocument
            key={'TermsOfUseContract'}
            documentName={CONST_COMPANY_ADMIN_ACCOUNT.TERMS_OF_USE_ELECTRONIC_CONTRACT}
            isVerified={isVerifiedTermsOfUse}
            documentNote={CONST_COMPANY_UPLOAD_DOCUMENT.PLEASE_AGREE_DOCUMENT}
            navigateTo={navigateToTermsOfUseContract}
            download={downloadTermsOfUseContract}
            done={isVerifiedTermsOfUse && isVerifiedPrivacyPolicy}
            isLoadingDownload={isLoadingDownloadTermsOfUse}
          />
          <ColVerifyDocument
            key={'PrivacyPolicy'}
            documentName={CONST_COMPANY_ADMIN_ACCOUNT.PRIVACY_POLICY_CONTRACT}
            isVerified={isVerifiedPrivacyPolicy}
            documentNote={CONST_COMPANY_UPLOAD_DOCUMENT.PLEASE_AGREE_DOCUMENT}
            navigateTo={navigateToVerifyPrivacyPolicy}
            download={downloadPrivacyPolicy}
            done={isVerifiedTermsOfUse && isVerifiedPrivacyPolicy}
            isLoadingDownload={isLoadingDownloadPrivacyPolicy}
          />
        </Row>
      </FormDocumentWrapper>
    </>
  );
};
