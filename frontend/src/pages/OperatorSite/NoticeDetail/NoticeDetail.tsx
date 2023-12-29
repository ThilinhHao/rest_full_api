import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import DetailNotice from '@containers/OperatorSite/DetailNotice/DetailNotice';
import BottomButton from '@containers/OperatorSite/CreateNotice/BottomButton/BottomButton';
import ContentNotice from '@containers/OperatorSite/CreateNotice/ContentNotice/ContentNotice';
import useNoticeDetail from './useNoticeDetail';
import CreateTitleNotice from '@containers/OperatorSite/CreateNotice/CreateTitleNotice/CreateTitleNotice';
import CreateSubjectNotice from '@containers/OperatorSite/CreateNotice/CreateSubjectNotice/CreateSubjectNotice';
import CornFirmCreateNotice from '@containers/OperatorSite/CreateNotice/CornFirmCreateNotice/ConFirmCreateNotice';

import { Form } from 'antd';
import { Container } from '@components/Style/Style';
import { NameWrapper } from '@containers/OperatorSite/Agency/DetailAgency/detailAgencyStyle';
import { StatusUpdate } from '@containers/AgencySite/CompanyDetail/companyDetailStyle';
import { CONST_LIST_AGENCY } from '../Agencies/ListAgency/constants';
import { GrantCompanyWrapper } from '../Companies/CreateCompany/createCompanyStyle';
import { formatStrDateTimezone } from 'helper/date';
import { LoadingListNoticeDetail } from './noticeDetailStyle';
import { CONST_COMMON, CREATE_NOTIFICATION_OPERATOR } from 'constants/language';

import {
  CreateNoticeCard,
  ImageTitle,
  TitleCreateNotice,
  TitleScreenWrapper,
  WrapperEdit,
} from '../NoticeCreate/noticeCreateStyle';

const NoticeDetail = () => {
  const {
    form,
    BREADS,
    isEdit,
    isConfirm,
    isLoading,
    detailData,
    selectedSubject,
    messageErrorSubject,
    setIsEdit,
    onFinishForm,
    setIsConfirm,
    confirmCancel,
    onEditNotice,
    setSelectedSubject,
    checkIsErrorSubject,
    confirmDelete,
  } = useNoticeDetail();
  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <CreateNoticeCard>
          {isLoading && (
            <LoadingListNoticeDetail>
              <Loading />
            </LoadingListNoticeDetail>
          )}
          {detailData && (
            <>
              <TitleScreenWrapper>
                <ImageTitle src={images.operator.noticeTitle} />
                <TitleCreateNotice>{CREATE_NOTIFICATION_OPERATOR.NEW_ANNOUNCEMENT}</TitleCreateNotice>
              </TitleScreenWrapper>
              <Form
                form={form}
                onFinish={onFinishForm}
                initialValues={detailData}
                // requiredMark={false}
                scrollToFirstError={true}
                validateTrigger="onSubmit"
              >
                {!isEdit && (
                  <DetailNotice
                    detailData={detailData}
                    setIsEdit={setIsEdit}
                    isLoading={isLoading}
                    selectedSubject={selectedSubject}
                    confirmDelete={confirmDelete}
                  />
                )}
                {isEdit && (
                  <React.Fragment>
                    <CornFirmCreateNotice
                      setIsConfirm={setIsConfirm}
                      isConfirm={isConfirm}
                      form={form}
                      isLoading={isLoading}
                      onCreateNotice={onEditNotice}
                      selectedSubject={selectedSubject}
                      textLeft={CONST_COMMON.KEEP}
                    />
                    <WrapperEdit isConfirm={isConfirm}>
                      <CreateTitleNotice name="title" />
                      <CreateSubjectNotice
                        selectedSubject={selectedSubject}
                        setSelectedSubject={setSelectedSubject}
                        messageErrorSubject={messageErrorSubject}
                      />
                      <ContentNotice name="content" />
                      <BottomButton
                        leftText={CREATE_NOTIFICATION_OPERATOR.CONFIRMATION}
                        rightText={CREATE_NOTIFICATION_OPERATOR.CANCEL}
                        onClickLeft={() => {
                          checkIsErrorSubject();
                          form.submit();
                        }}
                        onClickRight={confirmCancel}
                      />
                    </WrapperEdit>
                  </React.Fragment>
                )}
              </Form>
              {detailData?.updated_at && (
                <StatusUpdate>
                  {CONST_LIST_AGENCY.LAST_UPDATE} : {formatStrDateTimezone(detailData.updated_at)} [
                  <NameWrapper>{detailData?.user_updated}</NameWrapper>]
                </StatusUpdate>
              )}
            </>
          )}
        </CreateNoticeCard>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default NoticeDetail;
