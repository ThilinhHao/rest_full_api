import React from 'react';
import BottomButton from '../BottomButton/BottomButton';

import { ISelectedSubject } from '@pages/OperatorSite/NoticeCreate/useCreateNotice';
import { ContentNoticeWrapper } from '../ContentNotice/contentNoticeStyle';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';
import { CreateTitleNoticeWrapper, TitleCreateNoticeInput } from '../CreateTitleNotice/createTitleNoticeStyle';
import { CreateSubjectNoticeWrapper, TitleCreateNoticeSubject } from '../CreateSubjectNotice/createSubjectNoticeStyle';

import {
  BottomGim,
  ConfirmCreateNoticeWrapper,
  ContentConfirmNotice,
  ContentConfirmNoticeFixHeight,
} from './confirmCreateNoticeStyle';

const CornFirmCreateNotice = ({
  setIsConfirm,
  isConfirm,
  isLoading,
  form,
  onCreateNotice,
  selectedSubject,
  textLeft,
}: {
  setIsConfirm: (isConfirm: boolean) => void;
  onCreateNotice: () => void;
  isConfirm: boolean;
  isLoading: boolean;
  form: any;
  selectedSubject: ISelectedSubject;
  textLeft: string;
}) => {
  const values = form.getFieldsValue();
  const showSubjectContent = () => {
    return (
      <React.Fragment>
        <span>{selectedSubject.companyNotify ? CREATE_NOTIFICATION_OPERATOR.COMPANY_NOTICE : ''}</span>
        <span>{selectedSubject.companyNotify && selectedSubject.staffNotify ? '・' : ''}</span>
        <span>{selectedSubject.staffNotify ? CREATE_NOTIFICATION_OPERATOR.STAFF_NOTICE : ''}</span>
        <span>{selectedSubject.staffNotify && selectedSubject.agencyNotify ? '・' : ''}</span>
        <span>
          {selectedSubject.companyNotify && !selectedSubject.staffNotify && selectedSubject.agencyNotify ? '・' : ''}
        </span>
        <span>{selectedSubject.agencyNotify ? CREATE_NOTIFICATION_OPERATOR.AGENCY : ''}</span>
      </React.Fragment>
    );
  };

  return (
    <ConfirmCreateNoticeWrapper isConfirm={isConfirm}>
      <CreateTitleNoticeWrapper>
        <TitleCreateNoticeInput>{CREATE_NOTIFICATION_OPERATOR.TITLE}</TitleCreateNoticeInput>
        <ContentConfirmNotice>{values?.title}</ContentConfirmNotice>
      </CreateTitleNoticeWrapper>
      <CreateSubjectNoticeWrapper>
        <TitleCreateNoticeSubject>{CREATE_NOTIFICATION_OPERATOR.SUBJECT}</TitleCreateNoticeSubject>
        <ContentConfirmNotice>{showSubjectContent()}</ContentConfirmNotice>
      </CreateSubjectNoticeWrapper>
      <ContentNoticeWrapper>
        <TitleCreateNoticeSubject>{CREATE_NOTIFICATION_OPERATOR.TEXT}</TitleCreateNoticeSubject>
        <ContentConfirmNoticeFixHeight>{values?.content}</ContentConfirmNoticeFixHeight>
      </ContentNoticeWrapper>
      <BottomGim>
        <BottomButton
          leftText={textLeft}
          rightText={CREATE_NOTIFICATION_OPERATOR.CORRECTION}
          onClickLeft={onCreateNotice}
          onClickRight={() => setIsConfirm(false)}
          isLoading={isLoading}
        />
      </BottomGim>
    </ConfirmCreateNoticeWrapper>
  );
};

export default CornFirmCreateNotice;
