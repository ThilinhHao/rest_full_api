import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EApprovalMethod, EStatusCheckCompanyDocument, EStatusCheckPrivacyPolicy } from 'constants/constants';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiCompanySalaryDetail, apiCompanySalarySetting } from 'api/company';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { useDispatch } from 'react-redux';
import { storeSetAuth } from '@store/auth-reducer';
import { ISalaryAdvanceData } from './interface';
import { CONST_BREADS, CONST_COMMON } from 'constants/language';
import { Form, message } from 'antd';
import { onBlurNumber } from 'helper/text';
import { FormInstance } from 'antd/lib/form/Form';
import { trimSpaceInput } from 'helper';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const SalaryAdvanceDetailDefault: ISalaryAdvanceData = {
  prepaid_salary_morning: undefined,
  prepaid_salary_afternoon: undefined,
  prepaid_salary_month: undefined,
  prepaid_salary_day: undefined,
  salary_type: EApprovalMethod.MANUAL_APPROVAL,
  salary_day: undefined,
};

const useSalaryAdvance = ({ firstTime = false }: { firstTime: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const [form]: FormInstance<any>[] = Form.useForm();

  const [salaryAdvanceData, setSalaryAdvanceData] = useState<ISalaryAdvanceData>(SalaryAdvanceDetailDefault);
  const [isSalaryDayEndMonth, setIsSalaryDayEndMonth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.COMPANY_SITE.SALARY_SETTING,
      path: '',
    },
  ];

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

  const handleStringToNumber = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>, length?: number, nullable?: boolean) => {
      form.setFieldsValue({
        [e.target.name]: onBlurNumber(e.target.value, length) || '',
      });
    },
    [form]
  );

  const handleTrimSpaceInput = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>, length?: number) => {
      form.setFieldsValue({
        [e.target.name]: trimSpaceInput(e.target.value, length),
      });
    },
    [form]
  );

  const onChangeSalaryInputEndMonth = useCallback((e: CheckboxChangeEvent) => {
    setIsSalaryDayEndMonth(e.target.checked);
  }, []);

  const updateSalaryAdvanceSetting = async (data: ISalaryAdvanceData) => {
    try {
      setIsLoading(true);
      const response = await apiCompanySalarySetting(data);
      if (responseSuccess(response)) {
        const dataTemp: any = { ...authInfo };
        const updateAuthInfo = {
          ...dataTemp,
          company: {
            ...dataTemp?.company,
            company_setting: response.data,
          },
        };
        dispatch(storeSetAuth(updateAuthInfo));
        if (firstTime) {
          if (updateAuthInfo?.company?.is_setting_bank) {
            navigate('/');
          } else {
            navigate('/setting/edit/bank');
          }
        } else {
          setSalaryAdvanceData(response.data);
          setIsSalaryDayEndMonth(!!response.data?.salary_day_end_month);
          message.success(CONST_COMMON.SETTING_SUCCESS);
        }
      } else {
        message.error(CONST_COMMON.SYSTEM_ERROR);
      }
    } catch {
      message.error(CONST_COMMON.SYSTEM_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const getBankSettingDetail = async () => {
    try {
      setIsLoading(true);
      const response = await apiCompanySalaryDetail();
      if (responseSuccess(response)) {
        setSalaryAdvanceData(response.data);
        setIsSalaryDayEndMonth(!!response.data?.salary_day_end_month);
      }
    } catch {
      message.error(CONST_COMMON.SYSTEM_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!firstTime) {
      getBankSettingDetail();
    }
  }, [firstTime]);

  const onFinishForm = useCallback(
    async (values: any) => {
      const dataForm: ISalaryAdvanceData = {
        prepaid_salary_morning: values?.prepaid_salary_morning,
        prepaid_salary_afternoon: values?.prepaid_salary_afternoon,
        prepaid_salary_month: values?.prepaid_salary_month,
        prepaid_salary_day: values?.prepaid_salary_day,
        salary_type: values?.salary_type,
        salary_day: values?.salary_day,
        salary_day_end_month: isSalaryDayEndMonth ? 1 : 0,
      };
      await updateSalaryAdvanceSetting(dataForm);
    },
    // eslint-disable-next-line
    [isSalaryDayEndMonth]
  );

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line
  }, [salaryAdvanceData]);

  useEffect(() => {
    if (
      firstTime &&
      (authInfo?.regulations_status !== EStatusCheckPrivacyPolicy.AGREE ||
        authInfo?.company?.documents?.filter(
          (document: any) => document?.status !== EStatusCheckCompanyDocument.VERIFIED
        )?.length > 0)
    ) {
      navigate('/company/upload-document');
    }
  }, [authInfo, firstTime, navigate]);

  return {
    form,
    salaryAdvanceData,
    isLoading,
    navigate,
    handleStringToNumber,
    handleTrimSpaceInput,
    onFinishForm,
    handleOnChange,
    BREADS,
    isSalaryDayEndMonth,
    onChangeSalaryInputEndMonth,
  };
};

export default useSalaryAdvance;
