import { useState } from 'react';
import { sendFile } from 'helper/api/axios';
import { apiOperatorSaveDucumentStatus } from 'api/operator';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';

const useFileItem = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onCloseModal = () => setIsOpen(false);
  const onOpenModal = () => setIsOpen(true);

  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);
  const onCloseModalConfirm = () => setIsOpenConfirm(false);
  const onOpenModalConfirm = () => setIsOpenConfirm(true);
  const [dataDocument, setDataDocument] = useState<any>();

  const onDownloadFile = async (link?: string, fileName?: string) => {
    if (!link || isLoading) {
      return;
    }
    setIsLoading(true);
    await sendFile('/v1/s1/company/download-file', link, fileName);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const sendConfirmDoucument = async (data: any) => {
    try {
      const response = await apiOperatorSaveDucumentStatus(data.id, data);
      if (responseSuccess(response)) {
        setIsOpenConfirm(false);
        setDataDocument(data);
      }
      setIsLoadingConfirm(false);
    } catch (error) {
    } finally {
      setIsLoadingConfirm(false);
    }
  };

  const onConfirmDoucument = (data: any) => {
    setIsLoadingConfirm(true);
    sendConfirmDoucument(data);
  };

  return {
    isOpen,
    isLoading,
    onCloseModal,
    onOpenModal,
    onDownloadFile,
    isOpenConfirm,
    isLoadingConfirm,
    onCloseModalConfirm,
    onOpenModalConfirm,
    onConfirmDoucument,
    dataDocument,
  };
};

export default useFileItem;
