import React, { useState, useCallback } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { trimSpaceInput } from 'helper';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { MESSAGE_SUCCESS } from 'constants/constants';
import { CONST_CREATE_AGENCY } from '@pages/OperatorSite/Agencies/CreateAgency/constants';
import { apiOperatorCreateAgency } from 'api/operator';
import { returnErrorFromResponse } from 'helper/showError';
import { onChangePhoneUseForm, phoneStringToNumber } from 'helper/formatPhone';
import { CONST_AGENCY_SITE_DETAIL } from 'constants/language';
import { onBlurInputNumber } from 'helper/text';

const BREADS: IBread[] = [
  {
    name: CONST_AGENCY_SITE_DETAIL.AGENCY_ACCOUNT_LIST,
    path: '/agency',
  },
  {
    name: CONST_CREATE_AGENCY.AGENCY_ISSUED,
    path: '',
  },
];
const useNewCreateAgency = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);

  const handleTrimSpaceInput = (e: React.FocusEvent<HTMLInputElement, Element>, length?: number) => {
    form.setFieldsValue({
      [e.target.name]: trimSpaceInput(e.target.value, length),
    });
  };

  const handleFormatNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, length: number) => {
      form.setFieldsValue({
        [e.target.name]: onBlurInputNumber(e.target.value, length, true),
      });
    },
    [form]
  );

  const onFinishForm = async (values: any) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await apiOperatorCreateAgency({
        name_agency: values.name_agency,
        full_name: values.full_name,
        email: values.email,
        phone: phoneStringToNumber(values.phone),
        deposit_fee: values.deposit_fee,
        advance_fee: values.advance_fee,
      });
      if (responseSuccess(response)) {
        message.success(MESSAGE_SUCCESS);
        navigate('/agency');
      } else {
        form.setFields(returnErrorFromResponse(response));
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePhoneUseForm(form, e);
  };

  return {
    form,
    BREADS,
    isLoading,
    handleTrimSpaceInput,
    onFinishForm,
    handleFormatNumber,
    onChangePhoneNumber,
  };
};

export default useNewCreateAgency;
