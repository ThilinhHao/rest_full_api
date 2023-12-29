import React, { useEffect, useMemo, useState } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { message } from 'antd';
import { NumberOfJP } from 'helper/regex';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from 'helper/validateEmail';
import { isStringEmpty } from 'helper/stringEmpty';
import { MESSAGE_SUCCESS } from 'constants/constants';
import { IAgencyResponse } from '../ListAgency/useListAgency';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { MESSAGE_FROM_CODE } from 'constants/errorCode';
import { USER_ROLE_OPERATOR } from 'constants/User';
import { CONST_CREATE_AGENCY } from './constants';
import { showErrorFromResponse } from 'helper/showError';
import { CONST_COMMON, CONST_EDIT_OPERATOR } from 'constants/language';
import { isFormatPhone, phoneStringToNumber, stringToPhoneView } from 'helper/formatPhone';
import { apiOperatorCreateAgency, apiOperatorEditAgency } from 'api/operator';
import textHelpers, { onBlurInputNumber } from 'helper/text';

interface IAgency {
  agencyName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  depositFee: string;
  advanceFee: string;
}
const useCreateAgency = (
  agency?: IAgencyResponse | null,
  setIsEdit?: (isEdit: boolean) => void,
  updateListAgency?: (agencies: IAgencyResponse) => void
) => {
  const navigate = useNavigate();
  const BREADS: IBread[] = [
    {
      name: CONST_CREATE_AGENCY.AGENCY_PAGE,
      path: '/agency',
    },
    {
      name: CONST_CREATE_AGENCY.AGENCY_ISSUANCE,
      path: '',
    },
  ];
  const CONST_MAXLENGTH = {
    FIRST_NAME: 100,
    LAST_NAME: 100,
    PHONE_NUMBER: 13,
    DEPOSIT: 12,
    REIMBURSEMENT: 12,
    DEFAULT: 100,
    NAME: 100,
    INPUT_TEXT: 255,
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agencyData, setAgencyData] = useState<IAgency>({
    agencyName: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    depositFee: '',
    advanceFee: '',
  });
  const [error, setError] = useState<IAgency>({
    agencyName: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    depositFee: '',
    advanceFee: '',
  });

  useEffect(() => {
    if (agency) {
      setAgencyData({
        agencyName: agency?.name || '',
        fullName: agency?.user_root?.full_name || '',
        phoneNumber: agency?.user_root?.phone || '',
        email: agency?.user_root?.email || '',
        depositFee: String(agency.deposit_fee || ''),
        advanceFee: String(agency.advance_fee || ''),
      });
    }
  }, [agency]);

  const isEdited = useMemo(() => {
    if (!agency) return false;
    const primitiveData = JSON.stringify({
      agencyName: agency?.name || '',
      firstName: agency?.user_root?.full_name || '',
      phoneNumber: stringToPhoneView(agency?.user_root?.phone || ''),
      email: agency?.user_root?.email || '',
      depositFee: String(agency?.deposit_fee || ''),
      advanceFee: String(agency?.advance_fee || ''),
    });
    const changeData = JSON.stringify({
      agencyName: agencyData.agencyName,
      firstName: agencyData.fullName,
      phoneNumber: agencyData.phoneNumber,
      email: agencyData.email,
      depositFee: String(agencyData.depositFee || ''),
      advanceFee: String(agencyData.advanceFee || ''),
    });
    if (primitiveData === changeData) return false;
    return true;
  }, [agency, agencyData]);

  // onchange
  const revestError = (key: string) => {
    const newError: any = error;
    if (!newError[`${key}`]) {
      return;
    }
    if (newError[key]) {
      setError({
        ...error,
        [key]: '',
      });
    }
  };
  const onChangeAgencyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgencyData({ ...agencyData, agencyName: e?.target?.value });
    if (error.agencyName) {
      setError({
        ...error,
        agencyName: '',
      });
    }
  };
  const onChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgencyData({ ...agencyData, fullName: e?.target?.value });
    revestError('fullName');
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFormatPhone(e?.target?.value)) {
      setAgencyData({ ...agencyData, phoneNumber: e?.target?.value });
      revestError('phoneNumber');
    }
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgencyData({ ...agencyData, email: e?.target?.value });
    revestError('email');
  };
  const onChangeDepositFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgencyData({ ...agencyData, depositFee: e?.target?.value });
    revestError('depositFee');
  };
  const onChangeAdvanceFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgencyData({ ...agencyData, advanceFee: e?.target?.value });
    revestError('advanceFee');
  };

  const handleBlurDepositFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgencyData({ ...agencyData, depositFee: textHelpers.toHalfWidth(onBlurInputNumber(e?.target?.value, 12)) });
  };
  const handleFormatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setAgencyData({ ...agencyData, phoneNumber: onBlurInputNumber(e?.target?.value, 11, true) });
  };
  const handleBlurAdvanceFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setAgencyData({ ...agencyData, advanceFee: textHelpers.toHalfWidth(onBlurInputNumber(e?.target?.value, 12)) });
  };

  // Function check
  const CheckErrorMail = () => {
    if (isStringEmpty(agencyData.email)) {
      return CONST_CREATE_AGENCY.EMPTY_MAIL;
    }
    if (validateEmail(agencyData.email)) {
      return CONST_CREATE_AGENCY.VALIDATE_MAIL;
    }
    return '';
  };
  const checkPhone = () => {
    if (agencyData.phoneNumber.length > 0 && agencyData.phoneNumber.length < 10) {
      return CONST_COMMON.INCORRECT_PHONE;
    }

    return '';
  };
  const checkDeposit = () => {
    if (isStringEmpty(agencyData.depositFee) && agency) {
      return CONST_CREATE_AGENCY.EMPTY_DEPOSIT_FEE;
    }
    if (!NumberOfJP.test(agencyData.depositFee) && agency) {
      return CONST_CREATE_AGENCY.NOT_NUMBER_DEPOSIT_FEE;
    }

    return '';
  };
  const checkAdvance = () => {
    if (isStringEmpty(agencyData.advanceFee) && agency) {
      return CONST_CREATE_AGENCY.EMPTY_ADVANCE;
    }
    if (!NumberOfJP.test(agencyData.advanceFee) && agency) {
      return CONST_CREATE_AGENCY.NOT_NUMBER_ADVANCE;
    }

    return '';
  };
  const checkError = () => {
    if (
      isStringEmpty(agencyData.fullName) ||
      isStringEmpty(agencyData.email) ||
      validateEmail(agencyData.email) ||
      checkPhone() ||
      checkAdvance() ||
      checkDeposit()
    ) {
      return true;
    }
    return false;
  };
  const setErrorBeforeEdit = () => {
    setError({
      agencyName: '',
      fullName: isStringEmpty(agencyData.fullName) ? CONST_CREATE_AGENCY.EMPTY_FIRST_NAME : '',
      phoneNumber: checkPhone(),
      email: CheckErrorMail(),
      depositFee: checkDeposit(),
      advanceFee: checkAdvance(),
    });
  };
  const onCreateAgency = async () => {
    if (isLoading) {
      return false;
    }
    if (checkError()) {
      setErrorBeforeEdit();
      return;
    }
    try {
      setIsLoading(true);
      const response = await apiOperatorCreateAgency({
        name_agency: agencyData.agencyName,
        full_name: agencyData.fullName,
        email: agencyData.email,
        phone: phoneStringToNumber(agencyData.phoneNumber),
      });
      if (responseSuccess(response)) {
        message.success(MESSAGE_SUCCESS);
        navigate('/agency');
      } else {
        showErrorFromResponse(response);
      }
    } catch {
      message.warning(CONST_CREATE_AGENCY.SAME_EMAIL);
    } finally {
      setIsLoading(false);
    }
  };
  const onEdit = async () => {
    if (isLoading) {
      return false;
    }
    if (checkError()) {
      setErrorBeforeEdit();
      return;
    }
    try {
      setIsLoading(true);
      const response = await apiOperatorEditAgency(agency?.id, {
        name_agency: agencyData.agencyName,
        full_name: agencyData.fullName,
        email: agencyData.email,
        phone: phoneStringToNumber(agencyData.phoneNumber),
        deposit_fee: Number(textHelpers.toHalfWidth(agencyData.depositFee)),
        advance_fee: Number(textHelpers.toHalfWidth(agencyData.advanceFee)),
        user_id: USER_ROLE_OPERATOR,
      });
      if (responseSuccess(response)) {
        message.success(CONST_EDIT_OPERATOR.EDIT_SUCCESS);

        if (setIsEdit && updateListAgency) {
          updateListAgency(response.data);
          setIsEdit(false);
        }
      } else {
        message.warning(CONST_CREATE_AGENCY.SAME_EMAIL);
      }
    } catch (err: any) {
      if (agencyData.phoneNumber && err?.response?.data?.message?.phone) {
        setError({
          ...error,
          phoneNumber: MESSAGE_FROM_CODE.phone.A013,
        });
      } else {
        setError({
          ...error,
          email: CONST_CREATE_AGENCY.SAME_EMAIL,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    BREADS,
    CONST_MAXLENGTH,
    error,
    isLoading,
    agencyData,
    isEdited,
    onChangeAgencyName,
    onChangeFullName,
    onChangePhoneNumber,
    onChangeEmail,
    onCreateAgency,
    onChangeDepositFee,
    onChangeAdvanceFee,
    onEdit,
    handleBlurDepositFee,
    handleFormatPhone,
    handleBlurAdvanceFee,
  };
};

export default useCreateAgency;
