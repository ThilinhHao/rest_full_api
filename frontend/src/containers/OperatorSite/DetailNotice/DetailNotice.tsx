import { ISelectedSubject } from '@pages/OperatorSite/NoticeCreate/useCreateNotice';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';
import React from 'react';
import { SpaceBase } from 'styles';
import BottomButton from '../CreateNotice/BottomButton/BottomButton';
import { ContentNoticeWrapper } from '../CreateNotice/ContentNotice/contentNoticeStyle';
import {
  BottomGim,
  ContentConfirmNotice,
  ContentConfirmNoticeFixHeight,
} from '../CreateNotice/CornFirmCreateNotice/confirmCreateNoticeStyle';
import {
  CreateSubjectNoticeWrapper,
  TitleCreateNoticeSubject,
} from '../CreateNotice/CreateSubjectNotice/createSubjectNoticeStyle';
import {
  CreateTitleNoticeWrapper,
  TitleCreateNoticeInput,
} from '../CreateNotice/CreateTitleNotice/createTitleNoticeStyle';
import { DetailNoticeWrapper } from './detailNoticeStyle';

const DetailNotice = ({
  isLoading,
  setIsEdit,
  detailData,
  selectedSubject,
  confirmDelete,
}: {
  setIsEdit: (isEdit: boolean) => void;
  confirmDelete: () => void;
  isLoading: boolean;
  detailData: any;
  selectedSubject: ISelectedSubject;
}) => {
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
    <DetailNoticeWrapper>
      <CreateTitleNoticeWrapper>
        <TitleCreateNoticeInput>{CREATE_NOTIFICATION_OPERATOR.TITLE}</TitleCreateNoticeInput>
        <ContentConfirmNotice>{detailData?.title}</ContentConfirmNotice>
      </CreateTitleNoticeWrapper>
      <CreateSubjectNoticeWrapper>
        <TitleCreateNoticeSubject>{CREATE_NOTIFICATION_OPERATOR.SUBJECT}</TitleCreateNoticeSubject>
        <ContentConfirmNotice>{showSubjectContent()}</ContentConfirmNotice>
      </CreateSubjectNoticeWrapper>
      <ContentNoticeWrapper>
        <TitleCreateNoticeSubject>{CREATE_NOTIFICATION_OPERATOR.TEXT}</TitleCreateNoticeSubject>
        <ContentConfirmNoticeFixHeight>{detailData?.content}</ContentConfirmNoticeFixHeight>
      </ContentNoticeWrapper>
      <BottomGim>
        <BottomButton
          leftText="編　集"
          rightText="投稿削除"
          onClickLeft={() => setIsEdit(true)}
          onClickRight={confirmDelete}
          isLoading={isLoading}
          rightColor="#C74646"
        />
      </BottomGim>
      <SpaceBase height={5} />
    </DetailNoticeWrapper>
  );
};

export default DetailNotice;
