import { useCallback, useEffect, useState } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { storeSetAuth } from '@store/auth-reducer';
import { EStatusCheckPrivacyPolicy, REGULATIONS_KEY_NAME, SettingRegulationsEnum } from 'constants/constants';
import { apiAgreeRegulations, apiGetLastAgreedRegulations, apiGetOperatorInfo, apiGetUserRegulations } from 'api';
import { IAgreedRegulationsSignatureData, createAgreedRegulationsFile } from 'helper/export';
import { CONST_CREATE_COMPANY } from 'constants/language';
import { message } from 'antd';

const useDetailTermsOfUse = () => {
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
    authInfo?.regulations_confirms?.find((ele: any) => ele?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY)
      ?.regulations_status === EStatusCheckPrivacyPolicy.UPDATE;
  const isAgreedTermsOfUse =
    authInfo?.regulations_confirms?.find((ele: any) => ele?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY)
      ?.regulations_status === EStatusCheckPrivacyPolicy.AGREE;

  const handleBack = () => {
    navigate('/agency/upload-document');
  };

  const getAgreedRegulationsSignatureData = async () => {
    try {
      setIsLoadingAgreedRegulationsSignatureData(true);
      const response = await apiGetOperatorInfo();
      if (responseSuccess(response)) {
        setAgreedRegulationsSignatureData({
          fileName: CONST_CREATE_COMPANY.TERMS_SERVICE,
          companyName: response.data?.name || '',
          userName: authInfo?.agency?.name || authInfo?.user?.full_name || '',
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
          SettingRegulationsEnum.TYPE_OPERATOR_AGENCY,
          undefined,
          authInfo?.agency?.id
        );
        if (responseSuccess(responseAgreed)) {
          setDetailTermsOfUse(responseAgreed?.data?.regulations);
        }
      } else {
        const response = await apiGetUserRegulations(SettingRegulationsEnum.TYPE_OPERATOR_AGENCY);
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
      formData.append('key_name', REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY);
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
        if (item?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY) {
          hasTermsOfUse = true;
          delete regulationsConfirms[index];
          regulationsConfirms.push({
            key_name: REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY,
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
          key_name: REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY,
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
      if (updatedPrivacyPolicy) {
        navigate('/agency/verify-privacy-policy');
      } else {
        navigate('/agency/upload-document');
      }
    }
  }, [newAuthInfo, navigate, dispatch, checkTermsOfUse]);

  useEffect(() => {
    if (newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE) {
      setIsVerified(true);
    } else {
      newAuthInfo?.regulations_confirms?.forEach((item: any) => {
        if (
          item?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY &&
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
