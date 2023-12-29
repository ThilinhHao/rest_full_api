import React from 'react';

import BoxChat from '@containers/OperatorSite/ChatManagement/BoxChat/BoxChat';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import ThreadChat from '@containers/OperatorSite/ChatManagement/ThreadChat/ThreadChat';
import useChatManagement from './useChatManagement';

import { Container } from './chatManagementStyle';
import { GrantCompanyWrapper } from '../Companies/CreateCompany/createCompanyStyle';
import { ListOperatorWrapper } from '../Operators/ListOperator/listOperatorStyle';

const OperatorChatManagement = () => {
  const {
    content,
    setContent,
    listMessage,
    sendMessage,
    BREADS,
    listGroupChat,
    isLoadingAllListChatGroup,
    activeChatGroup,
    hanldeChangeActiveChatGroup,
    onSearch,
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
    searchInput,
    setSearchInput,
  } = useChatManagement();
  return (
    <ListOperatorWrapper>
      {listGroupChat && (
        <ThreadChat
          listGroupChat={listGroupChat}
          isLoading={isLoadingAllListChatGroup}
          activeChatGroup={activeChatGroup}
          onSearch={onSearch}
          hanldeChangeActiveChatGroup={hanldeChangeActiveChatGroup}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      )}
      <GrantCompanyWrapper>
        <BreadCrumb breads={BREADS} />
        <Container>
          {activeChatGroup && listMessage && (
            <BoxChat
              content={content}
              setContent={setContent}
              listMessage={listMessage}
              activeChatGroup={activeChatGroup}
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
          )}
        </Container>
      </GrantCompanyWrapper>
    </ListOperatorWrapper>
  );
};

export default OperatorChatManagement;
