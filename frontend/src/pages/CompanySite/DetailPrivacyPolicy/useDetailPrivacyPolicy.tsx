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
import { apiAgreeRegulations, apiGetUserRegulations } from 'api';

const useDetailPrivacyPolicy = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth.authInfo);

  const [newAuthInfo, setNewAuthInfo] = useState<any>(authInfo);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [detailPrivacyPolicy, setDetailPrivacyPolicy] = useState<string>('');
  const [isLoadingGetDetailPrivacyPolicy, setIsLoadingGetDetailPrivacyPolicy] = useState<boolean>(false);
  const [isLoadingCheckPrivacyPolicy, setIsLoadingCheckPrivacyPolicy] = useState<boolean>(false);

  const isUpdate =
    authInfo?.regulations_confirms?.find((ele: any) => ele?.key_name === REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY)
      ?.regulations_status === 4;

  const handleBack = useCallback(() => {
    navigate('/company/upload-document', {
      state,
    });
  }, [navigate, state]);

  const getDetailPrivacyPolicy = async () => {
    try {
      setIsLoadingGetDetailPrivacyPolicy(true);
      const response = await apiGetUserRegulations(SettingRegulationsEnum.TYPE_REGULATIONS_PRIVACY);
      if (responseSuccess(response)) {
        setDetailPrivacyPolicy(response?.data?.regulations);
      }
    } catch {
    } finally {
      setIsLoadingGetDetailPrivacyPolicy(false);
    }
  };

  const checkPrivacyPolicy = async () => {
    try {
      setIsLoadingCheckPrivacyPolicy(true);
      const formData: FormData = new FormData();
      formData.append('key_name', REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY);
      const response = await apiAgreeRegulations(formData);
      return response;
    } catch {
      //
    } finally {
      setIsLoadingCheckPrivacyPolicy(false);
    }
  };

  const agreePrivacyPolicy = useCallback(async () => {
    const response = await checkPrivacyPolicy();
    if (responseSuccess(response)) {
      let hasPrivacyPolicy = false;
      let checkedTermsOfUse = false;
      let updatedTermsOfUse = false;

      const dataTemp: any = { ...newAuthInfo };
      const regulationsConfirms: any[] = [...(dataTemp?.regulations_confirms || [])];
      regulationsConfirms?.forEach((item: any, index: number) => {
        if (item?.key_name === REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY) {
          hasPrivacyPolicy = true;
          delete regulationsConfirms[index];
          regulationsConfirms.push({
            key_name: REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY,
            regulations_status: EStatusCheckPrivacyPolicy.AGREE,
          });
        }
        if (
          item?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY &&
          item?.regulations_status === EStatusCheckPrivacyPolicy.AGREE
        ) {
          checkedTermsOfUse = true;
        }
        if (
          item?.key_name === REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY &&
          item?.regulations_status === EStatusCheckPrivacyPolicy.UPDATE
        ) {
          updatedTermsOfUse = true;
        }
      });
      if (!hasPrivacyPolicy) {
        regulationsConfirms.push({
          key_name: REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY,
          regulations_status: EStatusCheckPrivacyPolicy.AGREE,
        });
      }
      if (checkedTermsOfUse) {
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
        if (updatedTermsOfUse) {
          navigate('/company/verify-terms-of-use-contract');
        } else {
          handleBack();
        }
      }
    }
  }, [newAuthInfo, navigate, dispatch, handleBack]);

  useEffect(() => {
    if (newAuthInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE) {
      setIsVerified(true);
    } else {
      newAuthInfo?.regulations_confirms?.forEach((item: any) => {
        if (
          item?.key_name === REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY &&
          item?.regulations_status === EStatusCheckPrivacyPolicy.AGREE
        ) {
          setIsVerified(true);
        }
      });
    }
  }, [newAuthInfo]);

  useEffect(() => {
    getDetailPrivacyPolicy();
  }, []);

  return {
    detailPrivacyPolicy,
    isLoadingGetDetailPrivacyPolicy,
    checkPrivacyPolicy,
    agreePrivacyPolicy,
    isLoadingCheckPrivacyPolicy,
    handleBack,
    isVerified,
    isUpdate,
  };
};

export default useDetailPrivacyPolicy;
