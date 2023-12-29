import React, { useMemo } from 'react';
import {
  Actions,
  ButtonUpload,
  ColDocumentWrapper,
  DeleteDocument,
  DivUploadDocument,
  DraggerUpload,
  ImgDocument,
  NoteForDocument,
  RowFlexWrapper,
} from './uploadDocumentStyle';
import { CONST_COMMON, CONST_COMPANY_UPLOAD_DOCUMENT } from 'constants/language';
import images from '@assets/images-base';
import { ICompanyDocument } from '@pages/CompanySite/UploadDocument/interface';
import { EStatusCheckCompanyDocument, EStatusCheckPrivacyPolicy, STRING_FILE_IMAGE_ACCEPT } from 'constants/constants';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { Spin, Tooltip } from 'antd';
import { PreviewIcon, UploadBanner } from '@components/Icon';
import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';
import { getTypeFileByURL, isFileImageType, isFilePDFType } from 'helper';

interface IPageRejectProps {
  index: number;
  document: ICompanyDocument;
  relatedInfo: any;
  uploadDocument: (
    info: UploadChangeParam<UploadFile<any>>,
    idDocument: number | undefined
  ) => Promise<false | undefined>;
  deleteLinkDocument?: (id?: number | undefined) => void;
  previewDocument: (docs: ICompanyDocument) => void;
  idDocumentUpload?: number;
  isLoadingUploadDocument: boolean;
}

export const ColUploadDocument = ({
  index,
  document,
  relatedInfo,
  uploadDocument,
  deleteLinkDocument,
  previewDocument,
  idDocumentUpload,
  isLoadingUploadDocument,
}: IPageRejectProps) => {
  const oldDocument = relatedInfo?.documents?.find((item: ICompanyDocument) => document?.id === item?.id);

  const PreviewDocument = useMemo(() => {
    if (document?.link && Number(document.status) !== EStatusCheckCompanyDocument.REJECT) {
      if (isFileImageType(getTypeFileByURL(document.link))) {
        return <ImgDocument src={document.link} alt="" hasBorder={true} />;
      }
      if (isFilePDFType(getTypeFileByURL(document.link))) {
        return (
          <PreviewPDF width="12.5rem" height="16rem" minHeight="16rem" isViewDocument={true} link={document.link} />
        );
      }
      return (
        <ImgDocument
          src={
            Number(document.status) === EStatusCheckCompanyDocument.VERIFIED
              ? images.companySite.privacyPolicyChecked
              : images.companySite.privacyPolicyNotCheck
          }
          alt=""
        />
      );
    }

    return <></>;
  }, [document]);

  return (
    <ColDocumentWrapper span={8} key={'Document' + index}>
      <RowFlexWrapper>
        <div className="documentName">
          {Number(document.status) === EStatusCheckCompanyDocument.REJECT && (
            <img src={images.companySite.rejectDocument} alt="" />
          )}
          <Tooltip placement="top" title={document?.name}>
            <span>{document?.name}</span>
          </Tooltip>
        </div>
        <DivUploadDocument>
          {PreviewDocument}
          {document?.link &&
            deleteLinkDocument &&
            (!oldDocument?.link ||
              (oldDocument?.link && Number(oldDocument?.status) === EStatusCheckCompanyDocument.REJECT)) && (
              <DeleteDocument
                src={images.common.btnCloseModal}
                alt=""
                onClick={() => deleteLinkDocument(document?.id)}
              />
            )}
          {(!document?.link || Number(document.status) === EStatusCheckCompanyDocument.REJECT) && (
            <DraggerUpload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => {
                return false;
              }}
              multiple={false}
              maxCount={1}
              accept={STRING_FILE_IMAGE_ACCEPT}
              onChange={(info) => uploadDocument(info, document?.id)}
              className={Number(document.status) === EStatusCheckCompanyDocument.REJECT ? 'dragger-position' : ''}
              disabled={relatedInfo?.regulations_status !== EStatusCheckPrivacyPolicy.AGREE || isLoadingUploadDocument}
            >
              {isLoadingUploadDocument && idDocumentUpload === document?.id ? (
                <Spin />
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <UploadBanner width={'6.125rem'} height={'6.125rem'} />
                  </p>
                  <p className="ant-upload-text">{CONST_COMMON.DRAG_OR_DROP}</p>
                  <ButtonUpload
                    disabled={relatedInfo?.regulations_status !== EStatusCheckPrivacyPolicy.AGREE}
                    icon={<img src={images.companySite.uploadDocument} alt={CONST_COMMON.ALT.UPLOAD} />}
                  >
                    {CONST_COMMON.SELECT_FILES}
                  </ButtonUpload>
                </>
              )}
            </DraggerUpload>
          )}
          <Actions>{document?.link && <PreviewIcon onClick={() => previewDocument(document)} />}</Actions>
        </DivUploadDocument>
        <NoteForDocument>
          {!document?.link && CONST_COMPANY_UPLOAD_DOCUMENT.PLEASE_UPLOAD_DOCUMENT}
          {Number(document.status) === EStatusCheckCompanyDocument.REJECT && document?.note}
        </NoteForDocument>
      </RowFlexWrapper>
    </ColDocumentWrapper>
  );
};
