import React, { useCallback, useEffect, useState } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import {
  ARRAY_MIME_FILE_IMAGE_VALIDATE,
  ECompanyRootUserStatus,
  EStatusCheckCompanyDocument,
  EStatusCheckPrivacyPolicy,
  FILE_UPLOAD_MAX_SIZE_MB,
  REGULATIONS_KEY_NAME,
  SettingRegulationsEnum,
} from 'constants/constants';
import { message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { useLocation, useNavigate } from 'react-router-dom';
import { storeSetAuth } from '@store/auth-reducer';
import { DocumentWrapper } from '@containers/CompanySite/AgreeDocument/agreeDocumentStyle';
import { previewPopup } from 'helper/modal-confirm';
import useDetailPrivacyPolicy from '../DetailPrivacyPolicy/useDetailPrivacyPolicy';
import { CONST_BREADS, CONST_COMPANY_ADMIN_ACCOUNT, CONST_COMPANY_UPLOAD_DOCUMENT } from 'constants/language';
import { ICompanyDocument } from './interface';
import { apiCompanyRelatedInformation, apiCompanySaveDocumentFile, apiCompanyUploadFile } from 'api/company';
import useDetailTermsOfUse from '../DetailTermsOfUse/useDetailTermsOfUse';
import PreviewFile from '@containers/OperatorSite/Company/DetailCompany/PreviewFile/PreviewFile';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';
import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';
import { sendFile } from 'helper/api/axios';
import { apiGetLastAgreedRegulations } from 'api';
import { USER_TYPE_IP_SUPPORT } from 'constants/User';

export const DOCUMENT_STEPS_VALUE = {
  ACCEPT: 1,
  UPLOAD: 2,
  WAIT_REVIEW: 3,
  COMPELE_REVIEW: 4,
  DONE: 5,
};

export const DOCUMENT_STEPS = [
  {
    value: DOCUMENT_STEPS_VALUE.ACCEPT,
    label: CONST_COMPANY_UPLOAD_DOCUMENT.DOCUMENT_STEPS.ACCEPT,
  },
  {
    value: DOCUMENT_STEPS_VALUE.UPLOAD,
    label: CONST_COMPANY_UPLOAD_DOCUMENT.DOCUMENT_STEPS.UPLOAD,
  },
  {
    value: DOCUMENT_STEPS_VALUE.WAIT_REVIEW,
    label: CONST_COMPANY_UPLOAD_DOCUMENT.DOCUMENT_STEPS.WAIT_REVIEW,
  },
  {
    value: DOCUMENT_STEPS_VALUE.COMPELE_REVIEW,
    label: CONST_COMPANY_UPLOAD_DOCUMENT.DOCUMENT_STEPS.COMPELE_REVIEW,
  },
];

const useUploadDocument = (isFirst: boolean = true) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth.authInfo);

  const [isVerifiedPrivacyPolicy, setIsVerifiedPrivacyPolicy] = useState<boolean>(false);
  const [isVerifiedTermsOfUse, setVerifiedTermsOfUse] = useState<boolean>(false);
  const [isCanUploadDocument, setIsCanUploadDocument] = useState<boolean>(false);
  const [isLoadingUploadDocument, setIsLoadingUploadDocument] = useState<boolean>(false);
  const [idDocumentUpload, setIdDocumentUpload] = useState<number>();

  const [newAuthInfo, setNewAuthInfo] = useState<any>(authInfo);
  const [relatedInfo, setRelatedInfo] = useState<any>();
  const [step, setStep] = useState<number>(location?.state?.step || DOCUMENT_STEPS_VALUE.ACCEPT);
  const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(false);
  const [isLoadingDownloadPrivacyPolicy, setIsLoadingDownloadPrivacyPolicy] = useState<boolean>(false);
  const [isLoadingDownloadTermsOfUse, setIsLoadingDownloadTermsOfUse] = useState<boolean>(false);

  const { detailTermsOfUse } = useDetailTermsOfUse();
  const { detailPrivacyPolicy } = useDetailPrivacyPolicy();
  const [lastAgreedRegulations, setLastAgreedRegulations] = useState<string>();

  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.COMPANY_SITE.TERM_OF_USE,
      path: '',
    },
  ];

  const haveRejectDocumentDB =
    relatedInfo?.documents?.filter(
      (document: ICompanyDocument) => document?.status === EStatusCheckCompanyDocument.REJECT
    )?.length > 0;

  const statusReject =
    step === DOCUMENT_STEPS_VALUE.WAIT_REVIEW && newAuthInfo?.user?.status === ECompanyRootUserStatus.REJECT;

  const navigateToVerifyPrivacyPolicy = useCallback(() => {
    navigate('/company/verify-privacy-policy', {
      state: {
        step,
        documents: newAuthInfo?.company?.documents,
      },
    });
  }, [navigate, newAuthInfo, step]);

  const navigateToTermsOfUseContract = useCallback(() => {
    navigate('/company/verify-terms-of-use-contract', {
      state: {
        step,
        documents: newAuthInfo?.company?.documents,
      },
    });
  }, [navigate, newAuthInfo, step]);

  const navigateToSalarySetting = () => {
    navigate('/setting/edit/salary');
  };

  const getGuideTextByStep = (step: number) => {
    switch (step) {
      case DOCUMENT_STEPS_VALUE.ACCEPT:
        return CONST_COMPANY_UPLOAD_DOCUMENT.GUIDE_TEXT.AGREE_AND_UPLOAD_ALL_DOCUMENT;
      case DOCUMENT_STEPS_VALUE.UPLOAD:
        return CONST_COMPANY_UPLOAD_DOCUMENT.GUIDE_TEXT.CONTINUE_AFTER_AGREE_AND_UPLOAD;
      case DOCUMENT_STEPS_VALUE.WAIT_REVIEW:
        if (
          newAuthInfo?.company?.documents?.filter(
            (document: ICompanyDocument) => document?.status === EStatusCheckCompanyDocument.REJECT
          )?.length !== 0
        ) {
          return CONST_COMPANY_UPLOAD_DOCUMENT.GUIDE_TEXT.UPLOAD_REQUIRED_DOCUMENTS;
        }
        return CONST_COMPANY_UPLOAD_DOCUMENT.GUIDE_TEXT.VERIFYING;
      default:
        return '';
    }
  };

  const getLastAgreedRegulations = useCallback(async () => {
    if (!isFirst) {
      let response = null;
      if (authInfo?.user && authInfo.user.type === USER_TYPE_IP_SUPPORT) {
        response = await apiGetLastAgreedRegulations(
          SettingRegulationsEnum.TYPE_OPERATOR_COMPANY,
          authInfo.user.company_id
        );
      } else {
        response = await apiGetLastAgreedRegulations(SettingRegulationsEnum.TYPE_OPERATOR_COMPANY);
      }

      if (response && responseSuccess(response)) {
        setLastAgreedRegulations(response?.data?.regulations);
      }
    }
  }, [isFirst, authInfo]);

  const downloadPrivacyPolicy = async () => {
    if (!detailPrivacyPolicy || isLoadingDownloadPrivacyPolicy) {
      return;
    }
    setIsLoadingDownloadPrivacyPolicy(true);
    await sendFile('/v1/api/file/download', detailPrivacyPolicy, CONST_COMPANY_ADMIN_ACCOUNT.PRIVACY_POLICY_CONTRACT);
    setTimeout(() => {
      setIsLoadingDownloadPrivacyPolicy(false);
    }, 1000);
  };

  const downloadTermsOfUseContract = useCallback(async () => {
    if (!detailTermsOfUse || isLoadingDownloadTermsOfUse) {
      return;
    }
    setIsLoadingDownloadTermsOfUse(true);
    await sendFile(
      '/v1/api/file/download',
      lastAgreedRegulations ?? detailTermsOfUse,
      CONST_COMPANY_ADMIN_ACCOUNT.TERMS_OF_USE_CONTRACT
    );
    setTimeout(() => {
      setIsLoadingDownloadTermsOfUse(false);
    }, 1000);
  }, [detailTermsOfUse, isLoadingDownloadTermsOfUse, lastAgreedRegulations]);

  const previewDocument = (docs: ICompanyDocument) => {
    previewPopup({
      content: (
        <DocumentWrapper>
          <PreviewFile height="calc(90vh - 22rem)" url={docs?.link} name={docs?.name} />
        </DocumentWrapper>
      ),
    });
  };

  const previewTermOfUse = useCallback(() => {
    previewPopup({
      content: (
        <PreviewPDF link={lastAgreedRegulations ?? detailTermsOfUse} width="50rem" height="40rem" minHeight="20rem" />
      ),
    });
  }, [lastAgreedRegulations, detailTermsOfUse]);

  const previewPrivacyPolicy = useCallback(() => {
    previewPopup({
      content: <PreviewPDF link={detailPrivacyPolicy} width="50rem" height="40rem" minHeight="20rem" />,
    });
  }, [detailPrivacyPolicy]);

  const getRelatedInformation = useCallback(async () => {
    try {
      setIsLoadingInfo(true);
      const response = await apiCompanyRelatedInformation();
      if (responseSuccess(response)) {
        const dataTemp: any = { ...newAuthInfo };
        const updateAuthInfo = {
          ...dataTemp,
          user: {
            ...dataTemp?.user,
            status: response.data.user.status,
          },
          company: {
            ...dataTemp?.company,
            documents:
              location?.state?.documents ||
              response.data.documents.sort((a: ICompanyDocument, b: ICompanyDocument) => b.status - a.status),
            company_bank: response.data.company_bank,
            company_setting: response.data.company_setting,
          },
          regulations_status: response.data.regulations_status,
          regulations_confirms: response.data.regulations_confirms,
        };
        setNewAuthInfo(updateAuthInfo);
        setRelatedInfo(response.data);
        dispatch(storeSetAuth(updateAuthInfo));
      }
    } catch {
    } finally {
      setIsLoadingInfo(false);
    }
  }, [newAuthInfo, dispatch, location?.state?.documents]);

  const uploadFile = async (data: FormData) => {
    try {
      const response = await apiCompanyUploadFile(data);
      return response;
    } catch {
    } finally {
    }
  };

  const requestReviewDocument = useCallback(async () => {
    try {
      const documents = newAuthInfo.company?.documents.map((item: ICompanyDocument) => {
        const document = relatedInfo?.documents?.filter((doc: ICompanyDocument) => item.id === doc.id);

        return document && document[0].id === item?.id && document[0].link !== item.link
          ? {
              id: item?.id,
              link: item?.link,
            }
          : null;
      });

      const response = await apiCompanySaveDocumentFile({
        document_file: documents.filter((doc: ICompanyDocument) => doc && doc),
      });
      if (responseSuccess(response)) {
        getRelatedInformation();
        setStep(DOCUMENT_STEPS_VALUE.WAIT_REVIEW);
      }
    } catch {
    } finally {
    }
  }, [newAuthInfo, relatedInfo, getRelatedInformation]);

  const uploadDocument = useCallback(
    async (info: UploadChangeParam<UploadFile>, idDocument: number | undefined) => {
      if (isLoadingUploadDocument) {
        return;
      }
      setIsLoadingUploadDocument(true);
      setIdDocumentUpload(idDocument);
      const file: any = info.file;
      if (!ARRAY_MIME_FILE_IMAGE_VALIDATE.includes(file.type)) {
        message.error(CONST_COMPANY_UPLOAD_DOCUMENT.ERROR_FILE_TYPE);
        setIsLoadingUploadDocument(false);
        return false;
      }
      if (file.size / 1024 / 1024 > FILE_UPLOAD_MAX_SIZE_MB) {
        message.error(`必要書類の容量が${FILE_UPLOAD_MAX_SIZE_MB}MBを超えています。`);
        setIsLoadingUploadDocument(false);
        return false;
      }
      const formData: FormData = new FormData();
      formData.append('file', file);
      const response = await uploadFile(formData);
      if (responseSuccess(response)) {
        const dataTemp: any = { ...newAuthInfo };
        const documents: any[] = [...(dataTemp?.company?.documents || [])];
        const updateDocument: ICompanyDocument[] = [];
        documents?.forEach((item: ICompanyDocument) => {
          const newItem: ICompanyDocument = { ...item };
          if (newItem.id === idDocument && newItem.link !== undefined) {
            newItem!.link = response.data.url;
            newItem!.status = EStatusCheckCompanyDocument.NOT_VERIFY;
          }
          updateDocument.push(newItem);
        });
        const updateAuthInfo = { ...dataTemp, company: { ...dataTemp?.company, documents: updateDocument } };
        setNewAuthInfo(updateAuthInfo);
        dispatch(storeSetAuth(updateAuthInfo));
      } else {
        if (response?.response?.data?.message?.file === VALIDATE_ERROR_CODE.FILE_TYPE_INVALID) {
          message.error(CONST_COMPANY_UPLOAD_DOCUMENT.ERROR_FILE_TYPE);
        }
      }
      setIsLoadingUploadDocument(false);
    },
    [newAuthInfo, dispatch, isLoadingUploadDocument]
  );

  const deleteLinkDocument = (id?: number) => {
    const dataTemp: any = { ...newAuthInfo };
    const documents: any[] = [...(dataTemp?.company?.documents || [])];
    const updateDocument: ICompanyDocument[] = [];
    documents?.forEach((item: ICompanyDocument) => {
      const newItem: ICompanyDocument = { ...item };
      if (newItem.id === id) {
        newItem!.link = '';
        newItem!.status = EStatusCheckCompanyDocument.NOT_VERIFY;
      }
      updateDocument.push(newItem);
    });
    const updateAuthInfo = { ...dataTemp, company: { ...dataTemp?.company, documents: updateDocument } };
    setNewAuthInfo(updateAuthInfo);
    dispatch(storeSetAuth(updateAuthInfo));
  };

  useEffect(() => {
    const type_regulations_privacy = newAuthInfo?.regulations_confirms?.filter(
      (item: any) => item?.key_name === REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY
    );
    const type_operator_company = newAuthInfo?.regulations_confirms?.filter(
      (item: any) => item?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY
    );

    setIsVerifiedPrivacyPolicy(
      newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE ||
        (type_regulations_privacy &&
          type_regulations_privacy[0]?.regulations_status === EStatusCheckPrivacyPolicy.AGREE)
    );

    setVerifiedTermsOfUse(
      newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE ||
        (type_operator_company && type_operator_company[0]?.regulations_status === EStatusCheckPrivacyPolicy.AGREE)
    );

    const isRequestPreview =
      // checked PrivacyPolicy and TernsOfUse
      newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE &&
      // uploaded all documents
      newAuthInfo?.company?.documents?.filter((document: any) => !document?.link)?.length === 0;

    setIsCanUploadDocument(isRequestPreview);

    if (!isRequestPreview && newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE) {
      setStep(DOCUMENT_STEPS_VALUE.UPLOAD);
    } else if (
      newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE &&
      newAuthInfo?.company?.documents?.filter(
        (document: any) => document?.status !== EStatusCheckCompanyDocument.VERIFIED
      )?.length === 0
    ) {
      setStep(DOCUMENT_STEPS_VALUE.DONE);
    }
  }, [newAuthInfo]);

  useEffect(() => {
    const isRequestPreview =
      // checked PrivacyPolicy and TernsOfUse
      newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE &&
      // uploaded all documents
      relatedInfo?.documents?.filter((document: any) => document?.status !== EStatusCheckCompanyDocument.VERIFIED)
        ?.length > 0 &&
      relatedInfo?.documents?.filter((document: any) => !document?.link)?.length === 0;

    if (isRequestPreview) {
      setStep(DOCUMENT_STEPS_VALUE.WAIT_REVIEW);
    }
  }, [newAuthInfo, relatedInfo]);

  useEffect(() => {
    navigate(location.pathname, {});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getRelatedInformation();
    getLastAgreedRegulations();
    // eslint-disable-next-line
  }, []);

  return {
    DOCUMENT_STEPS,
    step,
    newAuthInfo,
    relatedInfo,
    isVerifiedPrivacyPolicy,
    isVerifiedTermsOfUse,
    idDocumentUpload,
    navigateToVerifyPrivacyPolicy,
    navigateToTermsOfUseContract,
    downloadPrivacyPolicy,
    downloadTermsOfUseContract,
    previewDocument,
    navigate,
    uploadDocument,
    isLoadingUploadDocument,
    getGuideTextByStep,
    isCanUploadDocument,
    requestReviewDocument,
    haveRejectDocumentDB,
    navigateToSalarySetting,
    statusReject,
    deleteLinkDocument,
    BREADS,
    previewTermOfUse,
    previewPrivacyPolicy,
    isLoadingInfo,
    isLoadingDownloadPrivacyPolicy,
    isLoadingDownloadTermsOfUse,
  };
};

export default useUploadDocument;
