import { ICompanyDocument } from '@pages/CompanySite/UploadDocument/interface';
import { Row } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { CONST_COMPANY_ADMIN_ACCOUNT, CONST_COMPANY_UPLOAD_DOCUMENT } from 'constants/language';
import React from 'react';
import { ColUploadDocument } from './ColUploadDocument';
import { ColVerifyDocument } from './ColVerifyDocument';
import { FormDocumentWrapper, GuideText } from './uploadDocumentStyle';

interface IButtonActionProps {
  newAuthInfo: any;
  relatedInfo: any;
  step: number;
  isVerifiedPrivacyPolicy: boolean;
  isVerifiedTermsOfUse: boolean;
  uploadDocument: (
    info: UploadChangeParam<UploadFile<any>>,
    idDocument: number | undefined
  ) => Promise<false | undefined>;
  deleteLinkDocument?: (id?: number | undefined) => void;
  navigateToVerifyPrivacyPolicy: () => void;
  navigateToTermsOfUseContract: () => void;
  downloadPrivacyPolicy: () => void;
  downloadTermsOfUseContract: () => void;
  getGuideTextByStep: (step: number) => string;
  previewDocument: (docs: ICompanyDocument) => void;
  idDocumentUpload?: number;
  isLoadingUploadDocument: boolean;
  isLoadingDownloadPrivacyPolicy: boolean;
  isLoadingDownloadTermsOfUse: boolean;
}

export const DocumentContainer = ({
  newAuthInfo,
  relatedInfo,
  step,
  isVerifiedPrivacyPolicy,
  isVerifiedTermsOfUse,
  navigateToVerifyPrivacyPolicy,
  navigateToTermsOfUseContract,
  downloadPrivacyPolicy,
  downloadTermsOfUseContract,
  uploadDocument,
  deleteLinkDocument,
  getGuideTextByStep,
  previewDocument,
  idDocumentUpload,
  isLoadingUploadDocument,
  isLoadingDownloadPrivacyPolicy,
  isLoadingDownloadTermsOfUse,
}: IButtonActionProps) => {
  return (
    <>
      <GuideText marginTop="0.625rem">{getGuideTextByStep(step)}</GuideText>
      <FormDocumentWrapper>
        <Row>
          <ColVerifyDocument
            key={'TermsOfUseContract'}
            documentName={CONST_COMPANY_ADMIN_ACCOUNT.TERMS_OF_USE_ELECTRONIC_CONTRACT}
            isVerified={isVerifiedTermsOfUse}
            documentNote={CONST_COMPANY_UPLOAD_DOCUMENT.PLEASE_AGREE_DOCUMENT}
            step={step}
            navigateTo={navigateToTermsOfUseContract}
            download={downloadTermsOfUseContract}
            isLoadingDownload={isLoadingDownloadTermsOfUse}
          />
          <ColVerifyDocument
            key={'PrivacyPolicy'}
            documentName={CONST_COMPANY_ADMIN_ACCOUNT.PRIVACY_POLICY_CONTRACT}
            isVerified={isVerifiedPrivacyPolicy}
            documentNote={CONST_COMPANY_UPLOAD_DOCUMENT.PLEASE_AGREE_DOCUMENT}
            step={step}
            navigateTo={navigateToVerifyPrivacyPolicy}
            download={downloadPrivacyPolicy}
            isLoadingDownload={isLoadingDownloadPrivacyPolicy}
          />
          {newAuthInfo?.company?.documents?.length > 0 &&
            newAuthInfo?.company?.documents?.map((item: ICompanyDocument, index: number) => (
              <ColUploadDocument
                index={index}
                document={item}
                relatedInfo={relatedInfo}
                uploadDocument={uploadDocument}
                deleteLinkDocument={deleteLinkDocument}
                previewDocument={previewDocument}
                idDocumentUpload={idDocumentUpload}
                isLoadingUploadDocument={isLoadingUploadDocument}
              />
            ))}
        </Row>
      </FormDocumentWrapper>
    </>
  );
};
