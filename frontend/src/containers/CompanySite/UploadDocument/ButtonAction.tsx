import images from '@assets/images-base';
import { BtnActionWrapper, BtnWrapper, ItemIcon, SquareIcon } from '@components/CompanySite/common/styled';
import { ICompanyDocument } from '@pages/CompanySite/UploadDocument/interface';
import { colors } from 'constants/colorsBase';
import { EStatusCheckCompanyDocument } from 'constants/constants';
import { CONST_COMPANY_UPLOAD_DOCUMENT } from 'constants/language';
import React from 'react';
import { GuideText, NoteDiv, NoteText } from './uploadDocumentStyle';

interface IButtonActionProps {
  newAuthInfo: any;
  DOCUMENT_STEPS: {
    value: number;
    label: string;
  }[];
  DOCUMENT_STEPS_VALUE: {
    ACCEPT: number;
    UPLOAD: number;
    WAIT_REVIEW: number;
    COMPELE_REVIEW: number;
    DONE: number;
  };
  haveRejectDocumentDB: boolean;
  isCanUploadDocument: boolean;
  step: number;
  requestReviewDocument: () => Promise<void>;
  navigateToSalarySetting: () => void;
}

export const ButtonAction = ({
  newAuthInfo,
  DOCUMENT_STEPS,
  DOCUMENT_STEPS_VALUE,
  haveRejectDocumentDB,
  step,
  isCanUploadDocument,
  requestReviewDocument,
  navigateToSalarySetting,
}: IButtonActionProps) => {
  return (
    <>
      {step === DOCUMENT_STEPS_VALUE.WAIT_REVIEW && (
        <>
          {!haveRejectDocumentDB && (
            <>
              <GuideText>{CONST_COMPANY_UPLOAD_DOCUMENT.PLEASE_WAIT_FOR_VERIFYING}</GuideText>
              <GuideText>{CONST_COMPANY_UPLOAD_DOCUMENT.THE_RESULT_WILL_BE_SENT_TO_YOUR_EMAIL}</GuideText>
              <NoteDiv>
                <NoteText color="#DF9E37">
                  {CONST_COMPANY_UPLOAD_DOCUMENT.WAIT_FORM_ONE_TO_TWO_DAY_FOR_VERIFYING}
                </NoteText>
                <NoteText color={colors.mainText}>
                  {CONST_COMPANY_UPLOAD_DOCUMENT.MAYBE_CANCEL_YOUR_APPLICATION}
                </NoteText>
              </NoteDiv>
            </>
          )}
          <BtnWrapper>
            {!haveRejectDocumentDB ? (
              <BtnActionWrapper disabled={true}>{CONST_COMPANY_UPLOAD_DOCUMENT.REVIEWING}</BtnActionWrapper>
            ) : (
              <BtnActionWrapper
                disabled={
                  newAuthInfo?.company?.documents?.filter(
                    (document: ICompanyDocument) => document?.status === EStatusCheckCompanyDocument.REJECT
                  )?.length !== 0
                }
                onClick={requestReviewDocument}
                // icon={<SquareIcon />}
              >
                {CONST_COMPANY_UPLOAD_DOCUMENT.SEND_DOCUMENT_AGAIN}
              </BtnActionWrapper>
            )}
          </BtnWrapper>
        </>
      )}
      {step === DOCUMENT_STEPS_VALUE.DONE && (
        <>
          <NoteDiv center={true}>
            <NoteText>{CONST_COMPANY_UPLOAD_DOCUMENT.REVIEW_COMPLETED}</NoteText>
            <NoteText>{CONST_COMPANY_UPLOAD_DOCUMENT.PLEASE_CONTINUE_OTHER_SETTING}</NoteText>
          </NoteDiv>
          <BtnWrapper>
            <BtnActionWrapper onClick={navigateToSalarySetting} icon={<SquareIcon />}>
              {CONST_COMPANY_UPLOAD_DOCUMENT.START_SETTING}
            </BtnActionWrapper>
          </BtnWrapper>
        </>
      )}
      {isCanUploadDocument && step === DOCUMENT_STEPS_VALUE.UPLOAD && (
        <BtnWrapper>
          <BtnActionWrapper
            onClick={requestReviewDocument}
            icon={<ItemIcon src={images.companySite.saveAccount} alt="" />}
          >
            {CONST_COMPANY_UPLOAD_DOCUMENT.REVIEW_REQUEST}
          </BtnActionWrapper>
        </BtnWrapper>
      )}
    </>
  );
};
