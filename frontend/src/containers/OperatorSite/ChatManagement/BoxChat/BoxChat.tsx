import React from 'react';

import images from '@assets/images-base';
import ListChatMessage from './ListChatMessage';

import { IChatGroup } from '@pages/OperatorSite/ChatManagement/interface';
import { BoxChatMain } from '@components/ChatMessage/BoxChatMain/BoxChatMain';
import { UploadChangeParam } from 'antd/es/upload';
import { Button, UploadFile } from 'antd';
import { IUploadedFile, ModalUpload } from '@components/common/Modal/ModalUpload';
import { CONST_CHAT_MANAGEMENT, CONST_COMMON } from 'constants/language';
import { BoxChatAction, BoxChatContainer, BoxChatWrapper, InputChat, TitleBoxChat } from './boxChatStyle';
import useBoxChat from './useBoxChat';

interface IBoxChat {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  listMessage: any;
  sendMessage: () => Promise<void>;
  activeChatGroup: IChatGroup;
  boxChatRef: React.MutableRefObject<HTMLDivElement | null>;
  isLoadingSendMessage: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalMesssage: number;
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFile: (info: UploadChangeParam<UploadFile>) => Promise<false | undefined>;
  isLoadingUpload: boolean;
  uploadedFiles: IUploadedFile[];
  deleteFile: (file: IUploadedFile) => void;
  cancelUpload: () => void;
  sendUploadFiles: () => void;
  isLoadingSaveFile: boolean;
}

const BoxChat = ({
  activeChatGroup,
  content,
  setContent,
  listMessage,
  sendMessage,
  boxChatRef,
  isLoadingSendMessage,
  setPage,
  totalMesssage,
  isOpenModal,
  setIsOpenModal,
  uploadFile,
  isLoadingUpload,
  uploadedFiles,
  deleteFile,
  cancelUpload,
  sendUploadFiles,
  isLoadingSaveFile,
}: IBoxChat) => {
  useBoxChat({ sendMessage });

  return (
    <BoxChatContainer>
      <TitleBoxChat>{`${activeChatGroup.companyName} ${CONST_COMMON.LOOKS}`}</TitleBoxChat>
      <BoxChatWrapper>
        <BoxChatMain boxChatRef={boxChatRef} setPage={setPage} listMessage={listMessage} totalMesssage={totalMesssage}>
          <ListChatMessage listMessage={listMessage} />
        </BoxChatMain>
        <BoxChatAction>
          <div>
            <Button onClick={() => setIsOpenModal(true)}>
              <img src={images.common.attach} alt="" />
            </Button>
            <Button disabled={!content} onClick={() => sendMessage()}>
              {CONST_CHAT_MANAGEMENT.SEND}
            </Button>
          </div>
          <InputChat
            placeholder={CONST_CHAT_MANAGEMENT.INPUT_CHAT_PLACEHOLDER}
            maxLength={3000}
            value={content}
            autoSize={{ minRows: 4, maxRows: 4 }}
            onChange={(e: any) => setContent(e.currentTarget.value)}
            isLoading={isLoadingSendMessage}
          />
        </BoxChatAction>
      </BoxChatWrapper>
      <ModalUpload
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
    </BoxChatContainer>
  );
};

export default BoxChat;
