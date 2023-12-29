import { useCallback, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { storeSetAuth } from '@store/auth-reducer';
import { CONST_BREADS, CONST_COMMON } from 'constants/language';
import { FormInstance } from 'antd/lib/form/Form';
import { Form, message } from 'antd';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { trimSpaceInput } from 'helper';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { ECompanyBankAccountType } from 'constants/constants';
import { apiCompanyBankDetail, apiCompanySaveCompanyBank } from 'api/company';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { USER_TYPE_OWNER } from 'constants/User';

export interface IBankSettingDetail {
  id?: number;
  bank_type: number;
  account_name: string;
  account_number: string;
  bank_code: string;
  bank_id: number | string;
  bank_name: string;
  bank_branches_code: string;
  bank_branches_name: string;
  bank_branches_id: number | string;
  bank_code_custom?: string;
  bank_branches_code_custom?: string;
  seven_user_id?: string;
}

const BankSettingDetailDefault = {
  bank_type: ECompanyBankAccountType.USUALLY,
  account_name: '',
  account_number: '',
  bank_code: '',
  bank_id: '',
  bank_name: '',
  bank_branches_code: '',
  bank_branches_name: '',
  bank_branches_id: '',
  seven_user_id: '',
};

const useBankSetting = ({ firstTime = false }: { firstTime: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.auth.authInfo);

  const [form]: FormInstance<any>[] = Form.useForm();
  const [bankSetting, setBankSetting] = useState<IBankSettingDetail>(BankSettingDetailDefault);
  const [isLoadingUpdateBankSetting, setIsLoadingUpdateBankSetting] = useState<boolean>(false);
  const [isLoadingGetDetailBank, setIsLoadingGetDetailBank] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.COMPANY_SITE.BANK_SETTING,
      path: '',
    },
  ];

  const handleTrimSpaceInput = (e: React.FocusEvent<HTMLInputElement, Element>, length?: number) => {
    form.setFieldsValue({
      [e.target.name]: trimSpaceInput(e.target.value, length),
    });
  };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFields([
        {
          name: e.target.name,
          errors: undefined,
        },
      ]);
    },
    [form]
  );

  const onFinishForm = (values: any) => {
    const dataForm: IBankSettingDetail = {
      bank_code: values.bank_code_custom.split('-')[1],
      bank_id: Number(values.bank_code_custom.split('-')[2]),
      bank_name: `${values.bank_code_custom.split('-')[0]} (${values.bank_code_custom.split('-')[1]})`,
      bank_branches_code: values.bank_branches_code_custom.split('-')[1],
      bank_branches_name: `${values.bank_branches_code_custom.split('-')[0]} (${
        values.bank_branches_code_custom.split('-')[1]
      })`,
      bank_branches_id: Number(values.bank_branches_code_custom.split('-')[2]),
      bank_type: values?.bank_type,
      account_name: values?.account_name,
      account_number: values?.account_number,
      bank_code_custom: values.bank_code_custom ? values.bank_code_custom : undefined,
      bank_branches_code_custom: values.bank_branches_code_custom ? values.bank_branches_code_custom : undefined,
      seven_user_id: values.seven_user_id ? values.seven_user_id : undefined,
    };
    setBankSetting(dataForm);
    setIsConfirmed(true);
  };

  const onSubmitForm = useCallback(async () => {
    await updateBankSetting(bankSetting);
    // eslint-disable-next-line
  }, [bankSetting]);

  const updateBankSetting = async (data: IBankSettingDetail) => {
    try {
      setIsLoadingUpdateBankSetting(true);
      const response = await apiCompanySaveCompanyBank(data);
      if (responseSuccess(response)) {
        const dataTemp: any = { ...authInfo };
        const updateAuthInfo = {
          ...dataTemp,
          company: {
            ...dataTemp?.company,
            is_setting_bank: 1,
            company_bank: {
              ...response.data,
            },
          },
        };
        dispatch(storeSetAuth(updateAuthInfo));

        if (firstTime) {
          navigate('/');
        } else {
          setBankSetting({
            ...response?.data,
            bank_code_custom: response?.data?.bank_name
              ? `${response.data?.bank_name}-${response.data?.bank_code}-${response.data?.bank_id}`
              : undefined,
            bank_branches_code_custom: response?.data?.bank_branches_name
              ? `${response.data?.bank_branches_name}-${response.data?.bank_branches_code}-${response.data?.bank_branches_id}`
              : undefined,
          });
          setIsConfirmed(false);
          message.success(CONST_COMMON.SETTING_SUCCESS);
        }
      } else {
        message.error(CONST_COMMON.SYSTEM_ERROR);
      }
    } catch {
      message.error(CONST_COMMON.SYSTEM_ERROR);
    } finally {
      setIsLoadingUpdateBankSetting(false);
    }
  };

  const getBankSettingDetail = async () => {
    try {
      setIsLoadingGetDetailBank(true);
      const response = await apiCompanyBankDetail();
      if (responseSuccess(response)) {
        setBankSetting({
          ...BankSettingDetailDefault,
          ...response?.data,
          bank_code_custom: response?.data?.bank_name
            ? `${response.data?.bank_name}-${response.data?.bank_code}-${response.data?.bank_id}`
            : undefined,
          bank_branches_code_custom: response?.data?.bank_branches_name
            ? `${response.data?.bank_branches_name}-${response.data?.bank_branches_code}-${response.data?.bank_branches_id}`
            : undefined,
        });
      }
    } catch {
      message.error(CONST_COMMON.SYSTEM_ERROR);
    } finally {
      setIsLoadingGetDetailBank(false);
    }
  };

  useEffect(() => {
    if (!firstTime) {
      navigate('/404');
    }
  }, [firstTime, navigate]);

  useEffect(() => {
    if (authInfo?.user?.type !== USER_TYPE_OWNER) {
      navigate('/403');
    }
  }, [authInfo, navigate]);

  useEffect(() => {
    getBankSettingDetail();
  }, []);

  useEffect(() => {
    if (firstTime && !authInfo?.company?.company_setting) navigate('/setting/edit/salary');
  }, [authInfo, firstTime, navigate]);

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line
  }, [bankSetting]);

  return {
    form,
    bankSetting,
    updateBankSetting,
    isLoadingUpdateBankSetting,
    isLoadingGetDetailBank,
    isConfirmed,
    onSubmitForm,
    navigate,
    handleTrimSpaceInput,
    handleOnChange,
    onFinishForm,
    setIsConfirmed,
    BREADS,
  };
};

export default useBankSetting;
