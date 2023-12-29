import React, { useCallback, useState } from 'react';

import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { onBlurInputNumber, onInputNumberHaf, toNumber } from 'helper/text';
import { deepEqual } from 'helper/equalObject';
import { showConfirm } from 'helper/modal-confirm';
import { CONST_COMMON } from 'constants/language';
import { trimSpaceInput } from 'helper';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { ICompanyProfile } from '@pages/CompanySite/CompanyProfile/interface';
import { onChangePhoneUseForm } from 'helper/formatPhone';
import { EBankType, USAGE_PLAN } from 'constants/constants';
import { apiAdminEditCompanySiteProfile } from 'api/company';
import { returnErrorFromResponse } from 'helper/showError';
import { DEPOSIT_TYPE } from 'constants/invoice';

export interface IDataEditCompanyInfo {
  full_name: string;
  phone: string;
  bank_code?: string;
  bank_name?: string;
  bank_id?: number;
  bank_branches_code?: string;
  bank_branches_name?: string;
  bank_branches_id?: number;
  bank_type?: string;
  account_name?: string;
  account_number?: string | number;
  seven_user_id?: string;
  address1?: string;
  address2?: string;
  postal_code_1?: string;
  postal_code_2?: string;
  updated_at?: string;
  postal_code?: string;
}

const useEditProfileCompany = (
  companyProfile: ICompanyProfile,
  setIsEdit: (isEdit: boolean) => void,
  updateCompanyData: (data: IDataEditCompanyInfo) => void
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = useForm();
  const initialValues = {
    name: companyProfile.name,
    code: companyProfile.code,
    usage_plan: USAGE_PLAN[Number(companyProfile.usage_plan) - 1 || 0].label,
    agency_code: companyProfile?.agency?.code,
    agency_name: companyProfile?.agency?.name || companyProfile?.agency?.user_root?.full_name,
    operator_id: companyProfile.user_root.code,
    operator_name: companyProfile.user_root.full_name,
    email: companyProfile.user_root.email,
    full_name: companyProfile.user_root.full_name,
    phone: companyProfile.user_root.phone,
    postal_code_1: companyProfile.postal_code?.slice(0, 3) || '',
    postal_code_2: companyProfile.postal_code?.slice(3, 7) || '',
    address1: companyProfile.address1,
    address2: companyProfile.address2,
    bank_code_custom: companyProfile?.bank?.bank_name
      ? `${companyProfile?.bank?.bank_name}-${companyProfile?.bank?.bank_code}-${companyProfile?.bank?.bank_id}`
      : undefined,
    bank_branches_code_custom: companyProfile?.bank?.bank_branches_name
      ? `${companyProfile?.bank?.bank_branches_name}-${companyProfile?.bank?.bank_branches_code}-${companyProfile?.bank?.bank_branches_id}`
      : undefined,
    bank_type: companyProfile?.bank?.bank_type || EBankType.USUALLY,
    account_name: companyProfile?.bank?.account_name || '',
    account_number: companyProfile?.bank?.account_number || '',
    seven_user_id: companyProfile?.bank?.seven_user_id || '',
  };

  const handleTrimSpaceInput = (e: React.FocusEvent<HTMLInputElement, Element>, length?: number) => {
    form.setFieldsValue({
      [e.target.name]: trimSpaceInput(e.target.value, length),
    });
  };

  const handleFormatPhone = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldsValue({
        [e.target.name]: onBlurInputNumber(e.target.value, 11, true),
      });
    },
    [form]
  );

  const handleStringToNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldsValue({
        [e.target.name]: toNumber(e.target.value),
      });
      if (e.target.name === 'postal_code_2') {
        form.setFields([
          {
            name: 'postal_code_1',
            errors: undefined,
          },
        ]);
      }
      form.setFields([
        {
          name: e.target.name,
          errors: undefined,
        },
      ]);
    },
    [form]
  );

  const onChangeFirstPostal = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldsValue({
      [e.target.name]: onInputNumberHaf(e.target.value),
    });
    form.setFields([
      {
        name: e.target.name,
        errors: undefined,
      },
      {
        name: 'postal_code_2',
        errors: undefined,
      },
    ]);
    const nextSibling: any = document.getElementById('focusNext');

    if (form.getFieldValue('postal_code_1') && e.target.value.length === 3) {
      nextSibling.focus();
    }
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

  const onFinishForm = async (values: any) => {
    let params: IDataEditCompanyInfo;
    if (companyProfile.usage_plan === DEPOSIT_TYPE) {
      params = {
        full_name: companyProfile.user_root.full_name,
        phone: values.phone,
        bank_code: values.bank_code_custom.split('-')[1],
        bank_id: Number(values.bank_code_custom.split('-')[2]),
        bank_name: values.bank_code_custom.split('-')[0],
        bank_branches_code: values.bank_branches_code_custom.split('-')[1],
        bank_branches_name: values.bank_branches_code_custom.split('-')[0],
        bank_branches_id: Number(values.bank_branches_code_custom.split('-')[2]),
        bank_type: values.bank_type,
        account_name: values.account_name,
        account_number: values.account_number,
        address1: values.address1,
        address2: values.address2,
        postal_code: `${values.postal_code_1}${values.postal_code_2}`,
        seven_user_id: values.seven_user_id,
      };
    } else {
      params = {
        full_name: companyProfile.user_root.full_name,
        phone: values.phone,
        address1: values.address1,
        address2: values.address2,
        postal_code: `${values.postal_code_1}${values.postal_code_2}`,
      };
    }

    try {
      setIsLoading(true);

      const response = await apiAdminEditCompanySiteProfile(params);
      if (responseSuccess(response)) {
        message.success(CONST_COMMON.EDIT_SUCCESS);
        updateCompanyData(params);
        setIsEdit(false);
      } else {
        form.setFields(returnErrorFromResponse(response));
      }
    } catch (error) {
      form.setFields(returnErrorFromResponse(error));
    } finally {
      setIsLoading(false);
    }
  };

  const confirmBack = () => {
    const currentValue = {
      ...form.getFieldsValue(),
      full_name: companyProfile.user_root.full_name,
    };
    const initValues = initialValues;
    if (!deepEqual(currentValue, initValues)) {
      showConfirm({
        content: CONST_COMMON.REMOVE_EDIT,
        onOk: () => setIsEdit(false),
      });
    } else {
      setIsEdit(false);
    }
  };

  const handleOnChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePhoneUseForm(form, e);
  };

  return {
    form,
    isLoading,
    initialValues,
    onFinishForm,
    handleTrimSpaceInput,
    handleStringToNumber,
    onChangeFirstPostal,
    confirmBack,
    handleFormatPhone,
    handleOnChange,
    handleOnChangePhone,
  };
};

export default useEditProfileCompany;
