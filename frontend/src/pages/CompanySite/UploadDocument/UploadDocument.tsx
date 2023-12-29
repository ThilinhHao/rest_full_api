import React from 'react';
import { LinePage, UploadDocumentWrapper } from './uploadDocumentStyle';
import useUploadDocument, { DOCUMENT_STEPS_VALUE } from './useUploadDocument';
import { PageReject } from '@containers/CompanySite/UploadDocument/PageReject';
import { StepPage } from '@containers/CompanySite/UploadDocument/StepPage';
import { ButtonAction } from '@containers/CompanySite/UploadDocument/ButtonAction';
import { DocumentContainer } from '@containers/CompanySite/UploadDocument/DocumentContainer';
import Loading from '@components/Loading';

const UploadDocument = () => {
  const {
    DOCUMENT_STEPS,
    step,
    newAuthInfo,
    relatedInfo,
    isVerifiedPrivacyPolicy,
    isVerifiedTermsOfUse,
    idDocumentUpload,
    uploadDocument,
    isLoadingUploadDocument,
    navigateToVerifyPrivacyPolicy,
    navigateToTermsOfUseContract,
    downloadPrivacyPolicy,
    downloadTermsOfUseContract,
    previewDocument,
    getGuideTextByStep,
    isCanUploadDocument,
    requestReviewDocument,
    haveRejectDocumentDB,
    navigateToSalarySetting,
    statusReject,
    deleteLinkDocument,
    isLoadingInfo,
    isLoadingDownloadPrivacyPolicy,
    isLoadingDownloadTermsOfUse,
  } = useUploadDocument();

  return (
    <UploadDocumentWrapper>
      <StepPage
        DOCUMENT_STEPS={DOCUMENT_STEPS}
        DOCUMENT_STEPS_VALUE={DOCUMENT_STEPS_VALUE}
        statusReject={statusReject}
        step={step}
      />
      <LinePage />
      {statusReject && <PageReject />}
      {!statusReject && !isLoadingInfo && (
        <>
          <DocumentContainer
            newAuthInfo={newAuthInfo}
            relatedInfo={relatedInfo}
            step={step}
            isVerifiedPrivacyPolicy={isVerifiedPrivacyPolicy}
            isVerifiedTermsOfUse={isVerifiedTermsOfUse}
            navigateToVerifyPrivacyPolicy={navigateToVerifyPrivacyPolicy}
            navigateToTermsOfUseContract={navigateToTermsOfUseContract}
            downloadPrivacyPolicy={downloadPrivacyPolicy}
            downloadTermsOfUseContract={downloadTermsOfUseContract}
            uploadDocument={uploadDocument}
            deleteLinkDocument={deleteLinkDocument}
            getGuideTextByStep={getGuideTextByStep}
            previewDocument={previewDocument}
            idDocumentUpload={idDocumentUpload}
            isLoadingUploadDocument={isLoadingUploadDocument}
            isLoadingDownloadPrivacyPolicy={isLoadingDownloadPrivacyPolicy}
            isLoadingDownloadTermsOfUse={isLoadingDownloadTermsOfUse}
          />
          <ButtonAction
            newAuthInfo={newAuthInfo}
            DOCUMENT_STEPS={DOCUMENT_STEPS}
            DOCUMENT_STEPS_VALUE={DOCUMENT_STEPS_VALUE}
            haveRejectDocumentDB={haveRejectDocumentDB}
            step={step}
            isCanUploadDocument={isCanUploadDocument}
            requestReviewDocument={requestReviewDocument}
            navigateToSalarySetting={navigateToSalarySetting}
          />
        </>
      )}
      {!statusReject && isLoadingInfo && <Loading />}
    </UploadDocumentWrapper>
  );
};

export default UploadDocument;
