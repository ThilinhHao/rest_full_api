import React from 'react';

import images from '@assets/images-base';
import ModalCommon from '@components/Modal/ModalCommon';

import {
  ButtonUpload,
  DeleteDocument,
  DivDocument,
  DivDocuments,
  DraggerUpload,
  GuideText,
  ModalContent,
} from './style';
import { UploadFile } from 'antd';
import { SpinLoading } from '@components/Loading/LoadingStyle';
import { ImgDocument } from '@containers/CompanySite/UploadDocument/uploadDocumentStyle';
import { UploadButtons } from './UploadButtons';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { UploadChangeParam } from 'antd/es/upload';
import { IconFile, ModalUploadBanner } from '@components/Icon';
import { CONST_COMMON, LANGUAGE_COMPANY } from 'constants/language';
import { FILE_UPLOAD_MAX_COUNT } from 'constants/constants';

interface IModalUpload {
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

export interface IUploadedFile {
  name: string;
  url: string;
}

export const ModalUpload = ({
  isOpenModal,
  setIsOpenModal,
  isLoadingUpload,
  uploadFile,
  uploadedFiles,
  deleteFile,
  cancelUpload,
  sendUploadFiles,
  isLoadingSaveFile,
}: IModalUpload) => {
  return (
    <ModalCommon
      isOpen={isOpenModal}
      setIsOpen={() => setIsOpenModal(false)}
      isShowBtnOk={false}
      isShowBtnCancel={false}
      width="97rem"
    >
      <ModalContainer>
        <ModalContent>
          {!uploadedFiles.length && (
            <>
              <DraggerUpload
                listType="picture-card"
                showUploadList={false}
                beforeUpload={() => {
                  return false;
                }}
                multiple={true}
                maxCount={FILE_UPLOAD_MAX_COUNT}
                onChange={(info) => uploadFile(info)}
              >
                {isLoadingUpload ? (
                  <SpinLoading />
                ) : (
                  <>
                    <ModalUploadBanner width="20.063rem" height="20rem" />
                    <GuideText>{LANGUAGE_COMPANY.createStaff.descriptionUploadFile}</GuideText>
                    <ButtonUpload icon={<IconFile className="icon" />}>{CONST_COMMON.SELECT_FILES}</ButtonUpload>
                  </>
                )}
              </DraggerUpload>
            </>
          )}
          {!!uploadedFiles.length && (
            <>
              <DivDocuments>
                {uploadedFiles.map((file: IUploadedFile, index: number) => (
                  <DivDocument key={index}>
                    <ImgDocument src={images.companySite.privacyPolicyNotCheck} alt="" />
                    <div>{file.name}</div>
                    <DeleteDocument src={images.common.btnCloseModal} alt="" onClick={() => deleteFile(file)} />
                  </DivDocument>
                ))}
              </DivDocuments>
              <UploadButtons
                cancelUpload={cancelUpload}
                sendUploadFiles={sendUploadFiles}
                isLoadingSaveFile={isLoadingSaveFile}
              />
            </>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalCommon>
  );
};
