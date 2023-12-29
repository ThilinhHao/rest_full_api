import React from 'react';
import {
  Actions,
  ButtonCheckPrivacy,
  ColDocumentWrapper,
  DivUploadDocument,
  ImgDocument,
  NoteForDocument,
  RowFlexDocument,
  RowFlexWrapper,
} from './uploadDocumentStyle';
import { CONST_COMMON } from 'constants/language';
import images from '@assets/images-base';
import { DownloadIcon, PreviewIcon } from '@components/Icon';
import { DOCUMENT_STEPS_VALUE } from '@pages/CompanySite/UploadDocument/useUploadDocument';
import { Tooltip } from 'antd';

interface IPageRejectProps {
  key: string;
  documentName: string;
  isVerified: boolean;
  isLoadingDownload: boolean;
  documentNote: string;
  step: number;
  navigateTo: () => void;
  download: () => void;
}

export const ColVerifyDocument = ({
  key,
  documentName,
  isVerified,
  documentNote,
  step,
  navigateTo,
  download,
  isLoadingDownload,
}: IPageRejectProps) => {
  return (
    <ColDocumentWrapper span={8} key={key}>
      <RowFlexWrapper>
        <div className="documentName">
          <Tooltip placement="top" title={documentName}>
            <span>{documentName}</span>
          </Tooltip>
        </div>
        <RowFlexDocument>
          <DivUploadDocument>
            <ImgDocument
              src={isVerified ? images.companySite.privacyPolicyChecked : images.companySite.privacyPolicyNotCheck}
              alt=""
            />
            <Actions isLoadingDownload={isLoadingDownload}>
              {isVerified && <PreviewIcon onClick={navigateTo} />}
              {step === DOCUMENT_STEPS_VALUE.DONE && <DownloadIcon onClick={download} />}
            </Actions>
          </DivUploadDocument>
        </RowFlexDocument>
        <NoteForDocument>{!isVerified && documentNote}</NoteForDocument>
        {!isVerified && <ButtonCheckPrivacy onClick={navigateTo}>{CONST_COMMON.VERIFY}</ButtonCheckPrivacy>}
      </RowFlexWrapper>
    </ColDocumentWrapper>
  );
};
