import React, { useCallback, useEffect, useState } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { EStatusCheckPrivacyPolicy, REGULATIONS_KEY_NAME, SettingRegulationsEnum } from 'constants/constants';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { storeSetAuth } from '@store/auth-reducer';
import useDetailPrivacyPolicy from '../DetailPrivacyPolicy/useDetailPrivacyPolicy';
import { CONST_COMPANY_ADMIN_ACCOUNT } from 'constants/language';
import useDetailTermsOfUse from '../DetailTermsOfUse/useDetailTermsOfUse';
import { apiGetLastAgreedRegulations, apiGetUserRegulationsStatus } from 'api';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { previewPopup } from 'helper/modal-confirm';
import CONST_SIDE_BAR from '@components/layout/SideBar/constants';
import { sendFile } from 'helper/api/axios';
import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';

const useUploadDocument = (isFirst: boolean = true) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth.authInfo);

  const [isVerifiedPrivacyPolicy, setIsVerifiedPrivacyPolicy] = useState<boolean>(false);
  const [isVerifiedTermsOfUse, setVerifiedTermsOfUse] = useState<boolean>(false);

  const [newAuthInfo, setNewAuthInfo] = useState<any>(authInfo);
  const [isLoadingDownloadPrivacyPolicy, setIsLoadingDownloadPrivacyPolicy] = useState<boolean>(false);
  const [isLoadingDownloadTermsOfUse, setIsLoadingDownloadTermsOfUse] = useState<boolean>(false);

  const { detailTermsOfUse } = useDetailTermsOfUse();
  const { detailPrivacyPolicy } = useDetailPrivacyPolicy();
  const [lastAgreedRegulations, setLastAgreedRegulations] = useState<string>();

  const BREADS: IBread[] = [
    {
      name: CONST_SIDE_BAR.MENU.PRIVATE,
      path: '',
    },
  ];

  const navigateToVerifyPrivacyPolicy = () => {
    navigate('/agency/verify-privacy-policy');
  };

  const navigateToTermsOfUseContract = () => {
    navigate('/agency/verify-terms-of-use-contract');
  };

  const navigateToProfileSetting = () => {
    navigate('/setting/profile');
  };

  const getLastAgreedRegulations = useCallback(async () => {
    if (!isFirst) {
      const response = await apiGetLastAgreedRegulations(SettingRegulationsEnum.TYPE_OPERATOR_AGENCY);
      if (responseSuccess(response)) {
        setLastAgreedRegulations(response?.data?.regulations);
      }
    }
  }, [isFirst]);

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

  const previewTermOfUse = useCallback(() => {
    previewPopup({
      content: (
        <PreviewPDF link={lastAgreedRegulations ?? detailTermsOfUse} width="50rem" height="40rem" minHeight="20rem" />
      ),
    });
  }, [detailTermsOfUse, lastAgreedRegulations]);

  const previewPrivacyPolicy = useCallback(() => {
    previewPopup({
      content: <PreviewPDF link={detailPrivacyPolicy} width="50rem" height="40rem" minHeight="20rem" />,
    });
  }, [detailPrivacyPolicy]);

  const getRelatedInformation = useCallback(async () => {
    try {
      const response = await apiGetUserRegulationsStatus();
      if (responseSuccess(response)) {
        const dataTemp: any = { ...newAuthInfo };
        const updateAuthInfo = {
          ...dataTemp,
          regulations_status: response.data.regulations_status,
          regulations_confirms: response.data.regulations_confirms,
        };
        setNewAuthInfo(updateAuthInfo);
        dispatch(storeSetAuth(updateAuthInfo));
      }
    } catch {
    } finally {
    }
  }, [newAuthInfo, dispatch]);

  useEffect(() => {
    const type_regulations_privacy = newAuthInfo?.regulations_confirms?.filter(
      (item: any) => item?.key_name === REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY
    );
    const type_operator_agency = newAuthInfo?.regulations_confirms?.filter(
      (item: any) => item?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY
    );

    setIsVerifiedPrivacyPolicy(
      newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE ||
        (type_regulations_privacy &&
          type_regulations_privacy[0]?.regulations_status === EStatusCheckPrivacyPolicy.AGREE)
    );

    setVerifiedTermsOfUse(
      newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE ||
        (type_operator_agency && type_operator_agency[0]?.regulations_status === EStatusCheckPrivacyPolicy.AGREE)
    );
  }, [newAuthInfo]);

  useEffect(() => {
    getRelatedInformation();
    getLastAgreedRegulations();
    // eslint-disable-next-line
  }, []);

  return {
    isVerifiedPrivacyPolicy,
    isVerifiedTermsOfUse,
    navigateToVerifyPrivacyPolicy,
    navigateToTermsOfUseContract,
    downloadPrivacyPolicy,
    downloadTermsOfUseContract,
    navigate,
    navigateToProfileSetting,
    BREADS,
    previewTermOfUse,
    previewPrivacyPolicy,
    isLoadingDownloadPrivacyPolicy,
    isLoadingDownloadTermsOfUse,
  };
};

export default useUploadDocument;
