import React, { useCallback, useEffect, useState } from 'react';

import { message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { EBankType } from 'constants/constants';
import { showConfirm } from 'helper/modal-confirm';
import { CONST_COMMON } from 'constants/language';
import { IDetailAgency } from '@pages/AgencySite/ProfileAgency/useProfileAgency';
import { trimSpaceInput } from 'helper';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { onChangeFaxUseForm, onChangePhoneUseForm, stringRegisterCode } from 'helper/formatPhone';
import { MESSAGE_FROM_CODE } from 'constants/errorCode';
import { onBlurInputNumber, toNumber } from 'helper/text';
import { apiAdminEditAgencySiteProfile } from 'api/agency';

export interface IDataEditAgencyInfo {
  full_name: string;
  phone: string;
  bank_code: string;
  bank_name: string;
  bank_id: number;
  bank_branches_code: string;
  bank_branches_name: string;
  bank_branches_id: number;
  bank_type: string;
  account_name: string;
  account_number: string | number;
  address1?: string;
  address2?: string;
  postal_code_1?: string;
  postal_code_2?: string;
  updated_at?: string;
  postal_code?: string;
  seven_user_id?: string;
}
const useEditAgencyInfo = (
  detailAgencyData: IDetailAgency,
  setIsEdit: (isEdit: boolean) => void,
  updateAgencyData: (data: IDataEditAgencyInfo) => void
) => {
  const initialValues = {
    full_name: detailAgencyData.user_root.full_name || '',
    email: detailAgencyData.user_root.email,
    name: detailAgencyData.name,
    code: detailAgencyData.code,
    deposit_fee: detailAgencyData.deposit_fee,
    advance_fee: detailAgencyData.advance_fee,
    phone: detailAgencyData.user_root.phone || '',
    bank_code_custom: detailAgencyData?.agency_bank?.bank_name
      ? `${detailAgencyData?.agency_bank?.bank_name}-${detailAgencyData?.agency_bank?.bank_code}-${detailAgencyData?.agency_bank?.bank_id}`
      : undefined,
    bank_branches_code_custom: detailAgencyData?.agency_bank?.bank_branches_name
      ? `${detailAgencyData?.agency_bank?.bank_branches_name}-${detailAgencyData?.agency_bank?.bank_branches_code}-${detailAgencyData?.agency_bank?.bank_branches_id}`
      : undefined,
    bank_type: detailAgencyData.agency_bank.bank_type || 0,
    account_name: detailAgencyData.agency_bank.account_name,
    account_number: detailAgencyData.agency_bank.account_number,
    postal_code: detailAgencyData.postal_code,
    address1: detailAgencyData.address1,
    address2: detailAgencyData.address2,
    fax: detailAgencyData.fax,
    register_code: detailAgencyData.register_code,
    code_1: detailAgencyData.postal_code?.slice(0, 3) || '',
    code_2: detailAgencyData.postal_code?.slice(3, 7) || '',
  };
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onFinishForm = async (values: any) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const params = {
        full_name: values.full_name,
        phone: values.phone,
        bank_code: values.bank_code_custom,
        bank_id: Number(values.bank_code_custom.split('-')[2]),
        bank_name: values.bank_code_custom.split('-')[0],
        bank_branches_code: values.bank_branches_code_custom,
        bank_branches_name: values.bank_branches_code_custom.split('-')[0],
        bank_branches_id: Number(values.bank_branches_code_custom.split('-')[2]),
        bank_type: values.bank_type,
        account_name: values.account_name,
        account_number: values.account_number,
        postal_code: values?.code_1 + values?.code_2,
        address1: values?.address1,
        address2: values?.address2,
        fax: values.fax,
        register_code: values.register_code,
      };
      const response = await apiAdminEditAgencySiteProfile(params);
      if (responseSuccess(response)) {
        message.success(CONST_COMMON.EDIT_SUCCESS);
        updateAgencyData({ ...params, updated_at: response.data.updated_at });
        setIsEdit(false);
      }
    } catch (error: any) {
      if (error?.response?.data?.message?.phone === 'A013') {
        form.setFields([
          {
            name: 'phone',
            errors: [`${MESSAGE_FROM_CODE.phone.A013}`],
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
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

  const handleRegisterCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldsValue({
        [e.target.name]: stringRegisterCode(e.target.value),
      });
    },
    [form]
  );

  const handleStringToNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldsValue({
        [e.target.name]: toNumber(e.target.value),
      });
      form.setFields([
        {
          name: e.target.name,
          errors: undefined,
        },
      ]);
    },
    [form]
  );

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
  useEffect(() => {
    form.setFieldsValue({
      full_name: detailAgencyData.user_root.full_name || '',
      phone: detailAgencyData.user_root.phone || '',
      bank_code_custom: detailAgencyData?.agency_bank?.bank_name
        ? `${detailAgencyData?.agency_bank?.bank_name}-${detailAgencyData?.agency_bank?.bank_code}-${detailAgencyData?.agency_bank?.bank_id}`
        : undefined,
      bank_branches_code_custom: detailAgencyData?.agency_bank?.bank_branches_name
        ? `${detailAgencyData?.agency_bank?.bank_branches_name}-${detailAgencyData?.agency_bank?.bank_branches_code}-${detailAgencyData?.agency_bank?.bank_branches_id}`
        : undefined,
      bank_type: detailAgencyData.agency_bank.bank_type || EBankType.USUALLY,
      account_name: detailAgencyData.agency_bank.account_name || '',
      account_number: detailAgencyData.agency_bank.account_number || '',
    });
  }, [detailAgencyData, form]);

  const confirmBack = () => {
    showConfirm({
      content: CONST_COMMON.REMOVE_EDIT,
      onOk: () => setIsEdit(false),
    });
  };

  const handleOnChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePhoneUseForm(form, e);
  };

  const handleOnChangeFax = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFaxUseForm(form, e);
  };
  return {
    form,
    isLoading,
    initialValues,
    confirmBack,
    onFinishForm,
    handleTrimSpaceInput,
    handleFormatPhone,
    handleStringToNumber,
    handleRegisterCode,
    handleOnChange,
    handleOnChangePhone,
    handleOnChangeFax,
  };
};

export default useEditAgencyInfo;
