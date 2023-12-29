import { useEffect, useMemo, useState, useCallback } from 'react';

import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { REGULATION } from 'constants/editRegulation';
import { isStringEmpty } from 'helper/stringEmpty';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { CONST_SETTING_PAGE, LANGUAGE_COMPANY } from 'constants/language';
import { apiOperatorEditPrivacyPolicy, apiOperatorGetRegulations, apiOperatorUploadPrivacyPolicy } from 'api/operator';
import { ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_REGULATIONS, FILE_UPLOAD_MAX_SIZE_MB } from 'constants/constants';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import CONST_SIDE_BAR from '@components/layout/SideBar/constants';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';

const useEditPrivacy = () => {
  const { id } = useParams();
  const [privacyPolicy, setPrivacyPolicy] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGetRegulations, setIsLoadingGetRegulations] = useState<boolean>(false);

  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const titleScreen = useMemo(() => {
    return REGULATION[`${id}`] || '';
  }, [id]);

  const BREADS: IBread[] = [
    {
      name: CONST_SIDE_BAR.MENU.SETTING,
      path: '/setting-page',
    },
    {
      name: titleScreen,
      path: '',
    },
  ];

  const uploadFile = useCallback(async (info: UploadChangeParam<UploadFile>) => {
    setIsLoadingUpload(true);
    const file: any = info.file;
    if (!ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_REGULATIONS.includes(file.type)) {
      message.error(CONST_SETTING_PAGE.ERROR_FILE_TYPE);
      setIsLoadingUpload(false);
      return false;
    }
    if (file.size / 1024 / 1024 > FILE_UPLOAD_MAX_SIZE_MB) {
      message.error(LANGUAGE_COMPANY.createStaff.uploadFile10MB);
      setIsLoadingUpload(false);
      return false;
    }
    const formData: FormData = new FormData();
    formData.append('file', file);
    const response = await apiOperatorUploadPrivacyPolicy(formData);
    if (responseSuccess(response)) {
      setUploadedFile(response.data?.url);
    } else {
      if (response?.response?.data?.message?.file === VALIDATE_ERROR_CODE.FILE_TYPE_INVALID) {
        message.error(CONST_SETTING_PAGE.ERROR_FILE_TYPE);
      }
    }

    setIsLoadingUpload(false);
  }, []);

  const cancelUpload = useCallback(() => {
    setUploadedFile('');
    setIsOpenModal(false);
  }, []);

  const onSavePrivacyPolicy = useCallback(async () => {
    if (isStringEmpty(uploadedFile)) {
      message.warning(CONST_SETTING_PAGE.CONTENT_REQUIRED);
      return;
    }
    setIsLoading(true);
    const response = await apiOperatorEditPrivacyPolicy({
      regulations: uploadedFile,
      type: id,
    });
    if (responseSuccess(response)) {
      message.success(CONST_SETTING_PAGE.EDIT_SUCCESS);
      setIsOpenModal(false);
      setPrivacyPolicy(response.data?.regulations);
      setUploadedFile('');
    }
    setIsLoading(false);
  }, [id, uploadedFile]);

  const getRegulations = async () => {
    setIsLoadingGetRegulations(true);
    const response = await apiOperatorGetRegulations(id);
    setPrivacyPolicy(response.data.regulations);
    setIsLoadingGetRegulations(false);
  };

  useEffect(() => {
    getRegulations();
    // eslint-disable-next-line
  }, []);

  return {
    onSavePrivacyPolicy,
    privacyPolicy,
    setIsEdit,
    isEdit,
    isLoading,
    setIsLoading,
    id,
    titleScreen,
    BREADS,
    isOpenModal,
    setIsOpenModal,
    uploadFile,
    isLoadingUpload,
    setIsLoadingUpload,
    uploadedFile,
    cancelUpload,
    isLoadingGetRegulations,
  };
};

export default useEditPrivacy;
