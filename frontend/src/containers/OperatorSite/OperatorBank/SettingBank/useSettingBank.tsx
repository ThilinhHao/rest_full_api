/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { useForm } from 'antd/es/form/Form';
import { showConfirm } from 'helper/modal-confirm';
import { CONST_COMMON } from 'constants/language';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiOperatorSettingBank } from 'api/operator';
import { defaultData, ISettingData } from 'constants/settingBank';
import {
  formatFax,
  onChangeFaxUseForm,
  onChangePhoneUseForm,
  phoneStringToNumber,
  stringRegisterCode,
  stringToPhoneView,
} from 'helper/formatPhone';
import { trimSpaceInput } from 'helper';
import { useCallback } from 'react';
import { onBlurInputNumber } from 'helper/text';
import { message } from 'antd';
import { EOptionYenPercentage } from 'constants/constants';

const useSettingBank = (
  defaultSetting: ISettingData,
  setDetailBank: (detail: ISettingData) => void,
  setIsEdit: (isEdit: boolean) => void
) => {
  const [form] = useForm();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initFormData = {
    ...defaultData,
    ...defaultSetting,
    deposit: defaultSetting.deposit_percentage || defaultSetting.deposit_yen,
    deposit_type: defaultSetting.deposit_yen ? EOptionYenPercentage.YEN : EOptionYenPercentage.PERCENTAGE,
    advance: defaultSetting.advance_percentage || defaultSetting.advance_yen,
    advance_type: defaultSetting.advance_yen ? EOptionYenPercentage.YEN : EOptionYenPercentage.PERCENTAGE,
    code_1: defaultSetting?.postal_code?.slice(0, 3) || '',
    code_2: defaultSetting?.postal_code?.slice(3, 7) || '',
    phone: defaultSetting?.phone || '',
    fax: stringToPhoneView(defaultSetting.fax),
    bank_code_custom: defaultSetting.bank_name
      ? `${defaultSetting.bank_name}-${defaultSetting.bank_code}-${defaultSetting?.bank_id}`
      : undefined,
    bank_branches_code_custom: defaultSetting.bank_branches_name
      ? `${defaultSetting.bank_branches_name}-${defaultSetting.bank_branches_code}-${defaultSetting?.bank_branches_id}`
      : undefined,
  };
  const toConfirm = () => {
    setIsConfirm(true);
  };

  const onFinishForm = async (values: any) => {
    setIsConfirm(true);
  };
  const onSubmit = async () => {
    if (isLoading) return;
    const values = form.getFieldsValue();
    try {
      setIsLoading(true);
      const data: any = {
        advance_yen: values.advance_type ? values.advance : null,
        advance_percentage: !values.advance_type ? values.advance : null,
        deposit_yen: values.deposit_type ? values.deposit : null,
        deposit_percentage: !values.deposit_type ? values.deposit : null,
        bank_id: Number(values.bank_code_custom.split('-')[2]),
        bank_code: values.bank_code_custom.split('-')[1],
        bank_name: values.bank_code_custom.split('-')[0],
        bank_branches_id: Number(values.bank_branches_code_custom.split('-')[2]),
        bank_branches_code: values.bank_branches_code_custom.split('-')[1],
        bank_branches_name: values.bank_branches_code_custom.split('-')[0],
        bank_type: values.bank_type || 1,
        account_name: values.account_name,
        account_number: values.account_number,
        name: values.name,
        register_code: values.register_code,
        postal_code: values.code_1 + values.code_2,
        address1: values.address1,
        address2: values.address2,
        user_name: values.user_name,
        phone: values.phone,
        fax: values.fax,
        email: values.email,
        seven_user_id: values.seven_user_id,
      };

      const response = await apiOperatorSettingBank(data);
      if (responseSuccess(response)) {
        setDetailBank(data);
        setIsEdit(false);
        message.success(CONST_COMMON.EDIT_SUCCESS);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormatFax = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldsValue({
      [e.target.name]: formatFax(phoneStringToNumber(e.target.value)),
    });
  };

  const confirmBack = () => {
    showConfirm({
      content: CONST_COMMON.REMOVE_EDIT,
      onOk: () => setIsEdit(false),
    });
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
        [e.target.name]: e.target.value,
        // [e.target.name]: stringRegisterCode(e.target.value),
      });
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

  const handleFormatNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, length: number) => {
      form.setFieldsValue({
        [e.target.name]: onBlurInputNumber(e.target.value, length, true),
      });
    },
    [form]
  );

  const handleOnChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePhoneUseForm(form, e);
  };

  const handleOnChangeFax = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFaxUseForm(form, e);
  };

  return {
    form,
    isConfirm,
    isLoading,
    setIsConfirm,
    toConfirm,
    onSubmit,
    confirmBack,
    onFinishForm,
    initFormData,
    handleFormatFax,
    handleOnChangeFax,
    handleTrimSpaceInput,
    handleFormatPhone,
    handleFormatNumber,
    handleRegisterCode,
    handleOnChange,
    handleOnChangePhone,
  };
};

export default useSettingBank;
