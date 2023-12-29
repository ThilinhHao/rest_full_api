/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { CONST_CREATE_AGENCY } from '@pages/OperatorSite/Agencies/CreateAgency/constants';
import { IDetailCompany } from '@pages/OperatorSite/Companies/ListCompany/useListCompany';

import { message } from 'antd';
import { NumberOfJP } from 'helper/regex';
import { isStringEmpty } from 'helper/stringEmpty';
import { validateEmail } from 'helper/validateEmail';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { MESSAGE_SUCCESS } from 'constants/constants';
import { isFormatPhone, phoneStringToNumber, stringToPhoneView } from 'helper/formatPhone';
import { CONST_EDIT_OPERATOR, CONST_CREATE_COMPANY, CONST_COMMON, CONST_COMPANY_PROFILE } from 'constants/language';
import { apiOperatorCreateCompany, apiOperatorSequenIdCompany, apiOperatorUpdateCompany } from 'api/operator';

import textHelpers, { onBlurInputNumber, onInputNumberHaf, toNumber } from 'helper/text';
import { useNavigate } from 'react-router-dom';
import {
  createCompany,
  createError,
  defaultEdit,
  defaultFiles,
  ERROR_EMPTY_CREATE_COMPANY,
  ICompany,
  ICompanyInitData,
  IFile,
} from 'constants/operatorSite';
import { showConfirm } from 'helper/modal-confirm';
import { deepEqual } from 'helper/equalObject';
import { showErrorFromResponse } from 'helper/showError';
import dayjs, { Dayjs } from 'dayjs';
import { compareDate } from 'helper/date';

const useCreateCompany = (
  company?: IDetailCompany | null,
  isEdit?: boolean,
  setIsEdit?: (isEdit: boolean) => void,
  updateCompany?: (companyProp: IDetailCompany) => void
) => {
  const navigate = useNavigate();
  const BREADS: IBread[] = [
    {
      name: CONST_CREATE_COMPANY.LIST_COMPANY_PAGE,
      path: '/company',
    },
    {
      name: CONST_CREATE_COMPANY.CORPORATE,
      path: '',
    },
  ];

  const [agency, setAgency] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<ICompany>(createCompany);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [error, setError] = useState<ICompany>(createError);
  const [files, setFiles] = useState<IFile[]>(defaultFiles);

  const [companyInitData, setCompanyInitData] = useState<ICompanyInitData>({
    companyCode: '',
    idUserRoot: '',
    disableEmail: false,
  });

  const getSequenId = async () => {
    try {
      setIsLoadingPage(true);
      const response = await apiOperatorSequenIdCompany();
      if (responseSuccess(response)) {
        setCompanyInitData({
          companyCode: response.data?.company_code,
          idUserRoot: response.data?.root_user_code,
          disableEmail: false,
        });
      }
    } catch (error) {
      //
    } finally {
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    getSequenId();
  }, []);

  useEffect(() => {
    if (company) {
      setCompanyData({
        companyName: company?.name,
        fullName: company?.user_root?.full_name || '',
        phoneNumber: stringToPhoneView(company?.user_root?.phone) || '',
        email: company?.user_root?.email,
        deposit: company?.usage_plan,
        agencyCode: company?.agency?.code || '',
        brokerageFee: company.agency_fee || '',
        postalCodeFirst: company?.postal_code?.slice(0, 3) || '',
        postalCodeEnd: company?.postal_code?.slice(3, 7) || '',
        address1: company?.address1 || '',
        address2: company?.address2 || '',
        status: company.status,
        freeStartDate: company?.free_start_date ? dayjs(company.free_start_date) : undefined,
        freeEndDate: company?.free_end_date ? dayjs(company.free_end_date) : undefined,
        fee: company?.fee ? company.fee : '',
      });
      setAgency(company?.agency?.name || company?.agency?.user_root?.full_name);
      setFiles([...defaultEdit, ...company?.documents]);
      setError(createError);
    }
  }, [company, isEdit]);

  const isEdited = () => {
    if (!company) return false;
    const primitiveData = {
      companyName: company?.name || '',
      fullName: company?.user_root?.full_name || '',
      phoneNumber: stringToPhoneView(company.user_root.phone) || '',
      email: company?.user_root?.email || '',
      deposit: company?.usage_plan || '',
      agencyCode: company?.agency?.code || '',
      brokerageFee: company?.agency_fee || '',
      postalCodeFirst: company?.postal_code?.slice(0, 3) || '',
      postalCodeEnd: company?.postal_code?.slice(3, 7) || '',
      address1: company?.address1 || '',
      address2: company?.address2 || '',
      status: company.status,
      freeStartDate: company?.free_start_date ? dayjs(company.free_start_date) : undefined,
      freeEndDate: company?.free_end_date ? dayjs(company.free_end_date) : undefined,
      fee: company?.fee ? company.fee : ''
    };
    const changeData = {
      companyName: companyData.companyName,
      fullName: companyData.fullName || '',
      phoneNumber: companyData.phoneNumber || '',
      email: companyData.email,
      deposit: companyData.deposit,
      agencyCode: companyData?.agencyCode || '',
      brokerageFee: companyData.brokerageFee || '',
      postalCodeFirst: companyData?.postalCodeFirst || '',
      postalCodeEnd: companyData?.postalCodeEnd || '',
      address1: companyData.address1 || '',
      address2: companyData.address2 || '',
      status: companyData.status,
      free_start_date: companyData.freeStartDate ? companyData.freeStartDate.format('YYYY-MM-DD') : null,
      free_end_date: companyData.freeEndDate ? companyData.freeEndDate.format('YYYY-MM-DD') : null,
      fee: companyData.fee,
    };
    if (!deepEqual(primitiveData, changeData)) return true;
    const changeFile = JSON.stringify(
      files
        ?.map((element) => {
          const data: any = document?.getElementById(`element_${element.id}`);
          return data?.value;
        })
        .filter((_, index: number) => index !== 0 && index !== 1)
    );
    const primitiveFile = JSON.stringify(
      company?.documents?.map((element) => {
        return element?.name;
      })
    );
    if (primitiveFile !== changeFile) return true;

    return false;
  };

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

  const onChangeFile = (filesChange: IFile[]) => {
    setFiles(filesChange);
    revestError('file');
  };
  const onChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, companyName: e?.target?.value });
    revestError('companyName');
  };
  const onChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, fullName: e?.target?.value });
    revestError('fullName');
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, email: e?.target?.value });
    revestError('email');
  };
  const onChangeDeposit = (e: number) => {
    setCompanyData({ ...companyData, deposit: e });
    revestError('deposit');
  };
  const onChangeStatus = (e: number) => {
    setCompanyData({ ...companyData, status: e });
    revestError('deposit');
  };
  const onChangeAgencyCode = (e: string, agencyName: string) => {
    setAgency(agencyName);
    setCompanyData({ ...companyData, agencyCode: e });
    revestError('agencyCode');
  };
  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFormatPhone(e?.target?.value)) {
      setCompanyData({ ...companyData, phoneNumber: e?.target?.value });
      revestError('phoneNumber');
    }
  };

  const handleFormatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setCompanyData({ ...companyData, phoneNumber: onBlurInputNumber(e?.target?.value, 11, true) });
  };

  const onChangeBrokerageFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, brokerageFee: toNumber(e?.target?.value) });
    revestError('brokerageFee');
  };
  const onChangePostalCodeFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, postalCodeFirst: onInputNumberHaf(e?.target?.value) });
    const nextSibling: any = document.getElementById('focusOn');
    if (companyData.postalCodeFirst && e.target.value.length === 3) {
      nextSibling.focus();
    }
    revestError('postalCodeFirst');
    revestError('postalCodeEnd');
  };
  const onChangePostalCodeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, postalCodeEnd: toNumber(e?.target?.value) });
    revestError('postalCodeEnd');
    revestError('postalCodeFirst');
  };
  const onChangeAddress1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, address1: e?.target?.value });
    revestError('address1');
  };
  const onChangeAddress2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, address2: e?.target?.value });
    revestError('address2');
  };
  const onChangeFreeStartDate = (e: Dayjs) => {
    setCompanyData({ ...companyData, freeStartDate: e });
    revestError('errorFreeStartDate');
  };
  const onChangeFreeEndDate = (e: Dayjs) => {
    setCompanyData({ ...companyData, freeEndDate: e });
    revestError('errorFreeEndDate');
  };
  const onChangeFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({ ...companyData, fee: toNumber(e?.target?.value) });
  };

  const checkError = () => {
    for (const [key, value] of Object.entries(companyData)) {
      if (key === 'deposit') {
        break;
      }
      if (
        isStringEmpty(value) &&
        key !== 'agencyCode' &&
        key !== 'brokerageFee' &&
        key !== 'phoneNumber' &&
        key !== 'address2'
      ) {
        return true;
      }
    }
    if (isStringEmpty(companyData.address1)) return true;
    if (error.agencyCode) return true;
    if (!NumberOfJP.test(companyData.agencyCode.trim()) && companyData.agencyCode && !error.agencyCode) return true;
    if (!NumberOfJP.test(companyData.brokerageFee) && companyData.brokerageFee) return true;
    if (companyData.phoneNumber?.length > 0 && companyData.phoneNumber?.length < 10) return true;
    if (companyData.agencyCode && !companyData.brokerageFee) return true;
    if (validateEmail(companyData.email)) {
      return CONST_CREATE_AGENCY.VALIDATE_MAIL;
    }
    const postalCode = companyData.postalCodeFirst + companyData.postalCodeEnd;
    if (!companyData.postalCodeFirst || (postalCode?.length > 0 && postalCode.length < 7)) return true;

    let count = 0;
    const newArr: string[] = [];
    files.forEach((element: IFile) => {
      const data: any = document?.getElementById(`element_${element.id}`);
      if (!data?.value || isStringEmpty(data?.value)) {
        count++;
      }
      if (newArr.find((element: string) => data?.value === element)) {
        count++;
      }
      newArr.push(data?.value);
    });
    if (files?.length === 0) return true;
    if (count !== 0) return true;

    return false;
  };

  const checkSetError = () => {
    const newError: any = { ...error };
    for (const [key, value] of Object.entries(companyData)) {
      if (isStringEmpty(value) && key !== 'postalCodeEnd') {
        newError[`${key}`] = ERROR_EMPTY_CREATE_COMPANY[`${key}`];
      }
    }
    if (!NumberOfJP.test(companyData.agencyCode.trim()) && companyData.agencyCode && !error.agencyCode) {
      newError.agencyCode = CONST_CREATE_COMPANY.NOT_NUMBER_AGENCY;
    }
    if (!NumberOfJP.test(companyData.brokerageFee) && companyData.brokerageFee && !error.brokerageFee) {
      newError.brokerageFee = CONST_CREATE_COMPANY.NOT_NUMBER_FEE;
    }

    if (companyData.phoneNumber?.length > 0 && companyData.phoneNumber?.length < 10 && !newError.phoneNumber) {
      newError.phoneNumber = CONST_COMPANY_PROFILE.INCORRECT_PHONE;
    }
    if (validateEmail(companyData.email) && !newError.email) {
      newError.email = CONST_CREATE_COMPANY.VALIDATE_MAIL;
    }
    if (companyData.agencyCode && (isStringEmpty(companyData.brokerageFee) || !companyData.brokerageFee)) {
      newError.brokerageFee = CONST_CREATE_COMPANY.EMPTY_FEE;
    }
    const postalCode = companyData.postalCodeFirst + companyData.postalCodeEnd;
    if (postalCode?.length > 0 && postalCode.length < 7) {
      newError.postalCodeFirst = CONST_COMPANY_PROFILE.WRONG_ZIP_COD;
    }

    const newFiles = files.map((element: IFile) => {
      const data: any = document?.getElementById(`element_${element.id}`);

      return {
        ...element,
        name: data.value,
        isError: !isStringEmpty(data?.value) ? false : CONST_CREATE_COMPANY.NOT_SELECTED_FILE,
      };
    });

    const newFileCheckSame = newFiles.map((element: IFile) => {
      const isSameName =
        [...newFiles].filter(
          (elementFind: IFile) => element?.name === elementFind.name && elementFind.id !== element.id
        )?.length > 0;
      return {
        ...element,
        isError: !element?.isError && isSameName ? CONST_CREATE_COMPANY.DOCUMENT_DUPLICATE : false,
      };
    });

    setFiles(newFileCheckSame);
    if (files?.length === 0 || newFiles.find((element: IFile) => element.isError)) {
      newError.files = CONST_CREATE_COMPANY.EMPTY_FILE;
    } else {
      newError.files = '';
    }
    if (
      companyData.freeEndDate &&
      companyData.freeStartDate &&
      compareDate(companyData.freeStartDate, companyData.freeEndDate) > 0
    ) {
      newError.errorFreeEndDate = CONST_CREATE_COMPANY.END_DATE_GREATER_THAN_STAT_DATE;
    }
    // if(validateEmail(agencyData.email))
    setError(newError);
  };

  const toConFirm = () => {
    if (isLoading) return;
    if (checkError()) {
      checkSetError();
      return;
    }
    setError({
      ...error,
      files: '',
    });
    setIsConfirming(true);
  };

  const onCreateCompany = async () => {
    if (isLoading || !companyInitData?.companyCode || !companyInitData?.idUserRoot) return;
    try {
      setIsLoading(true);
      const response = await apiOperatorCreateCompany({
        company_code: companyInitData.companyCode,
        root_user_code: companyInitData.idUserRoot,
        name_company: companyData.companyName,
        full_name: companyData.fullName,
        postal_code: companyData.postalCodeFirst + companyData.postalCodeEnd,
        address1: companyData.address1 || null,
        address2: companyData.address2 || null,
        email: companyData.email,
        phone: phoneStringToNumber(companyData.phoneNumber),
        usage_plan: companyData.deposit,
        agency_fee: companyData.brokerageFee,
        free_start_date: companyData.freeStartDate ? companyData.freeStartDate.format('YYYY-MM-DD') : null,
        free_end_date: companyData.freeEndDate ? companyData.freeEndDate.format('YYYY-MM-DD') : null,
        fee: companyData.fee,
        name_files: files
          .map((element: IFile) => {
            const data: any = document?.getElementById(`element_${element.id}`);
            return {
              ...element,
              name: data.value,
            };
          })
          .filter((dataFilter: IFile) => dataFilter.id !== defaultFiles[0].id && dataFilter.id !== defaultFiles[1].id),
        agency_id: companyData.agencyCode,
      });
      if (responseSuccess(response)) {
        message.success(MESSAGE_SUCCESS);
        navigate('/company');
      } else {
        showErrorFromResponse(response);
      }
    } catch (error) {
      showErrorFromResponse(error);
    } finally {
      setIsLoading(false);
    }
    // doing
  };

  const onEditCompany = async () => {
    if (isLoading) return;
    if (checkError()) {
      checkSetError();
      return;
    }

    try {
      setIsLoading(true);
      const array1 = company?.documents?.map((elementMap: IFile) => elementMap.id);
      const array2 = files.map((elementMap: IFile) => elementMap.id);
      const array3 = array1?.filter((obj) => {
        return array2.indexOf(obj) === -1;
      });
      if (company?.id) {
        const response = await apiOperatorUpdateCompany(company.id, {
          name_company: companyData.companyName,
          agency_fee: textHelpers.toHalfWidth(companyData.brokerageFee) || null,
          postal_code: companyData.postalCodeFirst + companyData.postalCodeEnd,
          address1: companyData.address1 || null,
          address2: companyData.address2 || null,
          status: companyData.status,
          full_name: companyData.fullName,
          email: companyData.email,
          phone: phoneStringToNumber(companyData.phoneNumber),
          user_id: company?.user_root.id,
          usage_plan: companyData.deposit,
          agency_id: companyData?.agencyCode || null,
          delete_files: array3,
          free_start_date: companyData.freeStartDate ? companyData.freeStartDate.format('YYYY-MM-DD') : null,
          free_end_date: companyData.freeEndDate ? companyData.freeEndDate.format('YYYY-MM-DD') : null,
          fee: companyData.fee,
          name_files: files
            .map((element: IFile) => {
              const data: any = document?.getElementById(`element_${element.id}`);
              return {
                ...element,
                id: element.id >= 1 ? element.id : 0,
                name: data.value,
              };
            })
            .filter(
              (dataFilter: IFile) => dataFilter.id !== defaultFiles[0].id && dataFilter.id !== defaultFiles[1].id
            ),
        });
        if (responseSuccess(response)) {
          message.success(CONST_EDIT_OPERATOR.EDIT_SUCCESS);

          if (setIsEdit && updateCompany) {
            updateCompany(response.data);
            setIsEdit(false);
          }
        } else {
          showErrorFromResponse(response);
        }
      }
    } catch (error) {
      showErrorFromResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmBack = () => {
    const currentData = companyData;
    if (JSON.stringify(currentData) !== JSON.stringify(createCompany)) {
      showConfirm({
        content: CONST_COMMON.REMOVE_EDIT,
        onOk: () => navigate('/company'),
      });
    } else {
      navigate('/company');
    }
  };

  return {
    error,
    files,
    BREADS,
    isLoading,
    companyData,
    isConfirming,
    agency,
    isEdited,
    toConFirm,
    setIsConfirming,
    onChangeFile,
    onChangeEmail,
    onCreateCompany,
    onChangeCompany,
    onChangeDeposit,
    onChangeStatus,
    onChangeFullName,
    onChangeAgencyCode,
    onChangePhoneNumber,
    onChangeBrokerageFee,
    onChangePostalCodeFirst,
    onChangePostalCodeEnd,
    onChangeAddress1,
    onChangeAddress2,
    onChangeFreeStartDate,
    onChangeFreeEndDate,
    onChangeFee,
    onEditCompany,
    confirmBack,
    handleFormatPhone,
    companyInitData,
    isLoadingPage,
  };
};

export default useCreateCompany;
