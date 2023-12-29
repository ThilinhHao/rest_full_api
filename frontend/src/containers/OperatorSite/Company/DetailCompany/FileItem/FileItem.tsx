import React, { useEffect, useState } from 'react';
import useFileItem from '../useFileItem';
import { Form, Tooltip } from 'antd';
import { EStatusFile } from 'constants/constants';
import { TickedDefaultIcon, TickedIcon } from '@containers/CompanySite/GrantCompany/CompanyStyle';
import images from '@assets/images-base';
import { FileItemWrapper, FileName, WrapperReject } from '../detailCompanyStyle';
import { SpaceBase } from 'styles';
import ModalCustom from '@components/Modal';
import PreviewFile from '../PreviewFile/PreviewFile';
import {
  ApprovalBtn,
  ButtonPreviewWrapper,
  DenialBtn,
  DivPreviewConfirm,
  TextAreaDocument,
} from '../PreviewFile/previewFileStyle';
import { CONST_LIST_COMPANY } from 'constants/language';
import { IDetailCompany } from '@pages/AgencySite/Companies/interface';

interface IDocument {
  name: string;
  status?: number;
  documentId: number;
  fromConfirm?: boolean;
  link?: string;
  note?: string;
  notShowBtn?: boolean;
  onUpdateDocument?: (document: IDetailCompany) => void;
}
export const FileItem = ({
  name,
  status,
  fromConfirm,
  link,
  documentId,
  note,
  notShowBtn,
  onUpdateDocument,
}: IDocument) => {
  const {
    isOpen,
    onCloseModal,
    onOpenModal,
    onDownloadFile,
    isLoading,
    isOpenConfirm,
    onCloseModalConfirm,
    onOpenModalConfirm,
    onConfirmDoucument,
    isLoadingConfirm,
    dataDocument,
  } = useFileItem();

  const [form] = Form.useForm();
  const [type, setType] = useState<number | undefined>();

  // const [statusDocument, setStatusDocument] = useState<number | undefined>(status);
  const [noteDocument, setNoteDocument] = useState<string | undefined>(note);

  const onConfirmDoucumentForm = (status: number) => {
    setType(status);
    onConfirmDoucument({
      note: form.getFieldValue('note'),
      status,
      id: documentId,
    });
    form.resetFields();
  };

  useEffect(() => {
    setNoteDocument(note);
    form.setFieldValue('note', note);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteDocument(e.target.value);
  };

  useEffect(() => {
    if (dataDocument && documentId === dataDocument.id) {
      setNoteDocument(dataDocument.note);
      if (onUpdateDocument) onUpdateDocument(dataDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDocument, documentId]);

  const getIconFile = (status?: number) => {
    switch (status) {
      case EStatusFile.TICKED:
      case EStatusFile.TICKED_DRAFT:
        return <TickedDefaultIcon alt={images.company.ticked} src={images.company.ticked} />;
      case EStatusFile.REJECT:
      case EStatusFile.REJECT_DRAFT:
        return <TickedDefaultIcon alt={images.company.reject} src={images.company.reject} />;
      default:
        return <TickedDefaultIcon alt={images.company.unTicked} src={images.company.unTicked} />;
    }
  };

  return (
    <FileItemWrapper>
      <div className="item-file">
        {link ? getIconFile(status) : <div className="icon-null" />}

        <Tooltip placement="rightBottom" title={name}>
          <FileName>
            {link ? (
              <TickedIcon
                alt="View document"
                src={images.company.searchFile}
                isLoading={isLoading}
                onClick={!notShowBtn ? onOpenModalConfirm : onOpenModal}
                className="view"
              />
            ) : (
              <div className="icon-null" />
            )}
            <div className="txt-name-document">{name}</div>
          </FileName>
        </Tooltip>

        {link && !fromConfirm && (
          <>
            <SpaceBase width={0.313} />
            <TickedIcon
              alt=""
              src={images.company.download}
              isLoading={isLoading}
              onClick={() => onDownloadFile(link, name)}
            />
          </>
        )}
      </div>
      {link && !fromConfirm && noteDocument && (
        <WrapperReject>
          <div className="view-note-reject">{noteDocument}</div>
        </WrapperReject>
      )}

      <ModalCustom isOpen={isOpen} setIsOpen={onCloseModal}>
        <PreviewFile url={link} onCloseModal={onCloseModal} name={name} />
      </ModalCustom>

      <ModalCustom isOpen={isOpenConfirm} setIsOpen={onCloseModalConfirm}>
        <Form form={form} validateTrigger="onSubmit">
          <DivPreviewConfirm>
            <PreviewFile url={link} onCloseModal={onCloseModalConfirm} name={name} />
            <div className="hindden-bottom-preview" />
            <div className="title">{CONST_LIST_COMPANY.TITLE_TEXTAREA_CONFIRM}</div>
            <Form.Item name="note">
              <TextAreaDocument
                showCount={false}
                maxLength={100}
                style={{ resize: 'none' }}
                autoSize={{ minRows: 5, maxRows: 5 }}
                placeholder={CONST_LIST_COMPANY.PLACEHOLDER_COMPANY_CONFIRM}
                defaultValue={noteDocument}
                onChange={handleChangeTextArea}
              />
            </Form.Item>

            <ButtonPreviewWrapper>
              <Form.Item>
                <ApprovalBtn
                  onClick={() => onConfirmDoucumentForm(EStatusFile.TICKED_DRAFT)}
                  loading={type === EStatusFile.TICKED_DRAFT && isLoadingConfirm}
                  disabled={type === EStatusFile.REJECT && isLoadingConfirm}
                >
                  {CONST_LIST_COMPANY.APPROVAL}
                </ApprovalBtn>
                <DenialBtn
                  onClick={() => onConfirmDoucumentForm(EStatusFile.REJECT_DRAFT)}
                  disabled={!noteDocument || (type === EStatusFile.REJECT_DRAFT && isLoadingConfirm)}
                  className="btn-document-reject"
                  loading={type === EStatusFile.REJECT_DRAFT && isLoadingConfirm}
                >
                  {CONST_LIST_COMPANY.REJECT_DOCUMENT}
                </DenialBtn>
              </Form.Item>
            </ButtonPreviewWrapper>
          </DivPreviewConfirm>
        </Form>
      </ModalCustom>
    </FileItemWrapper>
  );
};
