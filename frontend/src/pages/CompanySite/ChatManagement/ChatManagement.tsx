import React from 'react';

import images from '@assets/images-base';
import BoxChat from '@containers/CompanySite/ChatManagement/BoxChat/BoxChat';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import CONST_SIDE_BAR from '@components/layout/SideBar/constants';
import useChatManagement from './useChatManagement';

import { Container } from './chatManagementStyle';
import { GrantCard } from '@components/Style/Style';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { TitleHeaderSetting } from '../SettingPage/settingPageStyle';
import { HeaderSettingWrapper } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';

const CompanyChatManagement = () => {
  const {
    setContent,
    listMessage,
    content,
    sendMessage,
    BREADS,
    boxChatRef,
    isLoadingSendMessage,
    totalMesssage,
    setPage,
    isOpenModal,
    setIsOpenModal,
    uploadFile,
    isLoadingUpload,
    uploadedFiles,
    deleteFile,
    cancelUpload,
    sendUploadFiles,
    isLoadingSaveFile,
  } = useChatManagement();

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard padding="1.25rem 0rem" percentWidth="100%" width={106.25}>
          <HeaderSettingWrapper>
            <SettingIcon src={images.companySite.chatCompany} />
            <TitleHeaderSetting>{CONST_SIDE_BAR.MENU.INQUIRY}</TitleHeaderSetting>
          </HeaderSettingWrapper>
          <BoxChat
            content={content}
            setContent={setContent}
            listMessage={listMessage}
            sendMessage={sendMessage}
            boxChatRef={boxChatRef}
            isLoadingSendMessage={isLoadingSendMessage}
            totalMesssage={totalMesssage}
            setPage={setPage}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            uploadFile={uploadFile}
            isLoadingUpload={isLoadingUpload}
            uploadedFiles={uploadedFiles}
            deleteFile={deleteFile}
            sendUploadFiles={sendUploadFiles}
            cancelUpload={cancelUpload}
            isLoadingSaveFile={isLoadingSaveFile}
          />
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};

export default CompanyChatManagement;
