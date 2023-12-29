import React from 'react';

import { Form } from 'antd';
import { Container } from '@components/Style/Style';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';
import { CreateNoticeCard, ImageTitle, TitleCreateNotice, TitleScreenWrapper, WrapperEdit } from './noticeCreateStyle';

import images from '@assets/images-base';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import BottomButton from '@containers/OperatorSite/CreateNotice/BottomButton/BottomButton';
import ContentNotice from '@containers/OperatorSite/CreateNotice/ContentNotice/ContentNotice';
import useCreateNotice from './useCreateNotice';
import CreateTitleNotice from '@containers/OperatorSite/CreateNotice/CreateTitleNotice/CreateTitleNotice';
import CreateSubjectNotice from '@containers/OperatorSite/CreateNotice/CreateSubjectNotice/CreateSubjectNotice';
import CornFirmCreateNotice from '@containers/OperatorSite/CreateNotice/CornFirmCreateNotice/ConFirmCreateNotice';

const NoticeCreate = () => {
  const {
    BREADS,
    isConfirm,
    setIsConfirm,
    form,
    onFinishForm,
    selectedSubject,
    isLoading,
    setSelectedSubject,
    onCreateNotice,
    messageErrorSubject,
    checkIsErrorSubject,
    confirmCancel,
  } = useCreateNotice();
  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <CreateNoticeCard>
          <TitleScreenWrapper>
            <ImageTitle src={images.operator.noticeTitle} />
            <TitleCreateNotice>{CREATE_NOTIFICATION_OPERATOR.NEW_ANNOUNCEMENT}</TitleCreateNotice>
          </TitleScreenWrapper>
          <Form
            form={form}
            onFinish={onFinishForm}
            // initialValues={initialValues}
            // requiredMark={false}
            scrollToFirstError={true}
            validateTrigger="onSubmit"
          >
            <CornFirmCreateNotice
              setIsConfirm={setIsConfirm}
              isConfirm={isConfirm}
              form={form}
              isLoading={isLoading}
              onCreateNotice={onCreateNotice}
              selectedSubject={selectedSubject}
              textLeft={CREATE_NOTIFICATION_OPERATOR.POST}
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
          </Form>
        </CreateNoticeCard>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default NoticeCreate;
