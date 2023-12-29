import { useCallback, useEffect, useState } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { useLocation, useNavigate } from 'react-router-dom';
import { storeSetAuth } from '@store/auth-reducer';
import {
  EStatusCheckCompanyDocument,
  EStatusCheckPrivacyPolicy,
  REGULATIONS_KEY_NAME,
  SettingRegulationsEnum,
} from 'constants/constants';
import { apiAgreeRegulations, apiGetUserRegulations, apiGetOperatorInfo, apiGetLastAgreedRegulations } from 'api';
import { IAgreedRegulationsSignatureData, createAgreedRegulationsFile } from 'helper/export';
import { CONST_CREATE_COMPANY } from 'constants/language';
import { message } from 'antd';

const useDetailTermsOfUse = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth.authInfo);

  const [newAuthInfo, setNewAuthInfo] = useState<any>(authInfo);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [detailTermsOfUse, setDetailTermsOfUse] = useState<string>('');
  const [isLoadingGetDetailTermsOfUse, setIsLoadingGetDetailTermsOfUse] = useState<boolean>(false);
  const [isLoadingCheckTermsOfUse, setIsLoadingCheckTermsOfUse] = useState<boolean>(false);
  const [agreedRegulationsSignatureData, setAgreedRegulationsSignatureData] =
    useState<IAgreedRegulationsSignatureData>();
  const [isLoadingAgreedRegulationsSignatureData, setIsLoadingAgreedRegulationsSignatureData] =
    useState<boolean>(false);
  const isUpdate =
    authInfo?.regulations_confirms?.find((ele: any) => ele?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY)
      ?.regulations_status === EStatusCheckPrivacyPolicy.UPDATE;
  const isAgreedTermsOfUse =
    authInfo?.regulations_confirms?.find((ele: any) => ele?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY)
      ?.regulations_status === EStatusCheckPrivacyPolicy.AGREE;

  const handleBack = useCallback(() => {
    navigate('/company/upload-document', {
      state,
    });
  }, [navigate, state]);

  const getAgreedRegulationsSignatureData = async () => {
    try {
      setIsLoadingAgreedRegulationsSignatureData(true);
      const response = await apiGetOperatorInfo();
      if (responseSuccess(response)) {
        setAgreedRegulationsSignatureData({
          fileName: CONST_CREATE_COMPANY.TERMS_SERVICE,
          companyName: response.data?.name || '',
          userName: authInfo?.company?.name || '',
        });
      }
    } catch {
      //
    } finally {
      setIsLoadingAgreedRegulationsSignatureData(false);
    }
  };

  const getDetailTermsOfUse = async () => {
    try {
      setIsLoadingGetDetailTermsOfUse(true);
      if (isAgreedTermsOfUse) {
        const responseAgreed = await apiGetLastAgreedRegulations(
          SettingRegulationsEnum.TYPE_OPERATOR_COMPANY,
          authInfo?.company?.id
        );
        if (responseSuccess(responseAgreed)) {
          setDetailTermsOfUse(responseAgreed?.data?.regulations);
        }
      } else {
        const response = await apiGetUserRegulations(SettingRegulationsEnum.TYPE_OPERATOR_COMPANY);
        if (responseSuccess(response)) {
          setDetailTermsOfUse(response?.data?.regulations);
        }
      }
    } catch {
      //
    } finally {
      setIsLoadingGetDetailTermsOfUse(false);
    }
  };

  const checkTermsOfUse = useCallback(async () => {
    try {
      setIsLoadingCheckTermsOfUse(true);
      const formData: FormData = new FormData();
      formData.append('key_name', REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY);
      const fileNew = await createAgreedRegulationsFile(
        detailTermsOfUse,
        agreedRegulationsSignatureData?.fileName || '',
        agreedRegulationsSignatureData?.companyName || '',
        agreedRegulationsSignatureData?.userName || ''
      );
      if (fileNew) {
        formData.append('file', fileNew);
      } else {
        message.error('システムエラー');
      }
      const response = await apiAgreeRegulations(formData);
      return response;
    } catch {
      //
    } finally {
      setIsLoadingCheckTermsOfUse(false);
    }
  }, [detailTermsOfUse, agreedRegulationsSignatureData]);

  const agreeTermsOfUse = useCallback(async () => {
    const response = await checkTermsOfUse();
    if (responseSuccess(response)) {
      let hasTermsOfUse = false;
      let checkedPrivacyPolicy = false;
      let updatedPrivacyPolicy = false;

      const dataTemp: any = { ...newAuthInfo };
      const regulationsConfirms: any[] = [...(dataTemp?.regulations_confirms || [])];
      regulationsConfirms?.forEach((item: any, index: number) => {
        if (item?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY) {
          hasTermsOfUse = true;
          delete regulationsConfirms[index];
          regulationsConfirms.push({
            key_name: REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY,
            regulations_status: EStatusCheckPrivacyPolicy.AGREE,
          });
        }
        if (
          item?.key_name === REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY &&
          item?.regulations_status === EStatusCheckPrivacyPolicy.AGREE
        ) {
          checkedPrivacyPolicy = true;
        }
        if (
          item?.key_name === REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY &&
          item?.regulations_status === EStatusCheckPrivacyPolicy.UPDATE
        ) {
          updatedPrivacyPolicy = true;
        }
      });
      if (!hasTermsOfUse) {
        regulationsConfirms.push({
          key_name: REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY,
          regulations_status: EStatusCheckPrivacyPolicy.AGREE,
        });
      }
      if (checkedPrivacyPolicy) {
        dataTemp!.regulations_status = EStatusCheckPrivacyPolicy.AGREE;
      }

      const updateAuthInfo = { ...dataTemp, regulations_confirms: regulationsConfirms };

      setNewAuthInfo(updateAuthInfo);
      setIsVerified(true);
      dispatch(storeSetAuth(updateAuthInfo));
      if (
        updateAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE &&
        updateAuthInfo?.company?.documents?.filter(
          (document: any) => document?.status !== EStatusCheckCompanyDocument.VERIFIED
        )?.length === 0 &&
        updateAuthInfo?.company?.company_setting &&
        updateAuthInfo?.company?.is_setting_bank
      ) {
        navigate('/');
      } else {
        if (updatedPrivacyPolicy) {
          navigate('/company/verify-privacy-policy');
        } else {
          handleBack();
        }
      }
    }
  }, [newAuthInfo, navigate, dispatch, handleBack, checkTermsOfUse]);

  useEffect(() => {
    if (newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE) {
      setIsVerified(true);
    } else {
      newAuthInfo?.regulations_confirms?.forEach((item: any) => {
        if (
          item?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY &&
          item?.regulations_status === EStatusCheckPrivacyPolicy.AGREE
        ) {
          setIsVerified(true);
        }
      });
    }
  }, [newAuthInfo]);

  useEffect(() => {
    getDetailTermsOfUse();
    getAgreedRegulationsSignatureData();
    // eslint-disable-next-line
  }, []);

  return {
    detailTermsOfUse,
    isLoadingGetDetailTermsOfUse,
    checkTermsOfUse,
    agreeTermsOfUse,
    isLoadingCheckTermsOfUse,
    handleBack,
    isVerified,
    isUpdate,
    agreedRegulationsSignatureData,
    isLoadingAgreedRegulationsSignatureData,
  };
};

export default useDetailTermsOfUse;
