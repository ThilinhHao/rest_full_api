import React from 'react';
import {
  Actions,
  ButtonCheckPrivacy,
  ColDocumentWrapper,
  DivUploadDocument,
  ImgDocument,
  RowFlexDocument,
  RowFlexWrapper,
} from './uploadDocumentStyle';
import { CONST_COMMON } from 'constants/language';
import images from '@assets/images-base';
import { DownloadIcon, PreviewIcon } from '@components/Icon';
import { Tooltip } from 'antd';

interface IPageRejectProps {
  key: string;
  documentName: string;
  isVerified: boolean;
  documentNote: string;
  navigateTo: () => void;
  download: () => void;
  done: boolean;
  isLoadingDownload: boolean;
}

export const ColVerifyDocument = ({
  key,
  documentName,
  isVerified,
  documentNote,
  navigateTo,
  download,
  done,
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
              {done && <DownloadIcon onClick={download} />}
            </Actions>
          </DivUploadDocument>
        </RowFlexDocument>
        {!isVerified && <ButtonCheckPrivacy onClick={navigateTo}>{CONST_COMMON.VERIFY}</ButtonCheckPrivacy>}
      </RowFlexWrapper>
    </ColDocumentWrapper>
  );
};
