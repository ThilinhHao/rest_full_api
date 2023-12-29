import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Papa from 'papaparse';
import { message } from 'antd';

import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import { GrantCard } from '@components/Style/Style';

import { CONST_BREADS, CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT, LANGUAGE_COMPANY } from 'constants/language';
import { ECompanyStaffSalaryType } from 'constants/constants';

import ListStaffUpload, { getDataValidate } from './ListStaffUpload';
import ListStaffUploadPreviewError, { resetMessageErrors } from './ListStaffUploadPreviewError';
import UploadFile from './UploadFile';
import UploadFileProgress from './UploadFileProgress';
import UploadSuccess from './UploadSuccess';
import { StaffUploadCeateContainer, StaffUploadCreateWrapper } from './uploadFileStyle';
import { apiCompanyValidateStaffImport } from 'api/company';
import { formatPhoneUploadFile } from 'helper/formatPhone';
import { responseMessage, responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { validateDataFile } from './validateFile';
import { paginate } from 'helper/paginate';
import { IDataStaff } from './interface';

const PER_PAGE = 20;

export const STATE_MANY_PAGE = {
  uploadFile: 1,
  uploadProcess: 2,
  uploadView: 3,
  uploadErrorView: 4,
  uploadSuccess: 5,
};

export const DEFAULT_BREAD: IBread[] = [
  {
    name: CONST_BREADS.COMPANY_SITE.LIST_STAFF,
    path: '/staff-list',
  },
  {
    name: CONST_BREADS.COMPANY_SITE.CREATE_STAFF_MANY,
    path: '/staff-list/upload-staff',
  },
];

const StaffUploadCreate = ({ refStaffUploadCreate, onGetListStaff, onSetHiddenSilde }: any) => {
  const [stateBreads] = useState<IBread[]>(DEFAULT_BREAD);
  const [statePage, setStatePage] = useState<number>(STATE_MANY_PAGE.uploadFile);

  const [percentage, setPercentage] = useState(0);
  const [arrayDataFile, setArrayDataFile] = useState<any>();

  const refreshStaffUPloadCreate = () => {
    setStatePage(STATE_MANY_PAGE.uploadFile);
    setArrayDataFile([]);
    setPercentage(0);
  };

  useImperativeHandle(refStaffUploadCreate, () => {
    return {
      refreshPageStaffUploadCreate: () => {
        refreshStaffUPloadCreate();
      },
    };
  });

  const getArrayPageError = (dataStaff: IDataStaff[], totalDataStaff: number) => {
    let pageError: number[] = [];
    Array.from({ length: Math.ceil(totalDataStaff / PER_PAGE) }).forEach((_, index: number) => {
      const staffPaginte = paginate(dataStaff, index + 1, PER_PAGE);
      staffPaginte?.data.forEach((staff: IDataStaff) => {
        if (staff.status && staff.is_error) {
          pageError = [...pageError, staffPaginte.current];
        }
      });
    });
    return pageError;
  };

  const validateListStaff = async (dataStaffs: any, arrayData: any) => {
    try {
      const response = await apiCompanyValidateStaffImport({ staffs: dataStaffs });
      if (responseSuccess(response)) {
        let _check = true;
        if (arrayData && arrayData?.length) {
          const staffPaginte = paginate(arrayData, 1, PER_PAGE);
          const pageError: number[] = getArrayPageError(arrayData, staffPaginte.total);
          if (pageError.length) {
            setArrayDataFile(arrayData);
            setPercentage(100);
            setStatePage(STATE_MANY_PAGE.uploadErrorView);
            _check = false;
          }
        }

        // importListStaff(dataSubmit, arrayData);
        if (_check) {
          setArrayDataFile(arrayData);
          setPercentage(100);
          setStatePage(STATE_MANY_PAGE.uploadView);
        }
      } else if (responseMessage(response)) {
        let _dataStaffFile: any = arrayData ? [...arrayData] : [];
        _dataStaffFile = resetMessageErrors(_dataStaffFile);
        const dataMesssageValue = Object.values(responseMessage(response));
        const dataMesssageKey = Object.keys(responseMessage(response));
        dataMesssageKey.forEach((item: string) => {
          const arrKey = item.split('.');
          _dataStaffFile[arrKey[1]].is_error = true;
          _dataStaffFile[arrKey[1]].message_errors[arrKey[2]] = [dataMesssageValue[Number(arrKey[1])]];
        });
        setArrayDataFile(_dataStaffFile);
        setPercentage(100);
        setStatePage(STATE_MANY_PAGE.uploadErrorView);
      } else {
        message.error(CONST_COMMON.errorSystemAgain);
        setStatePage(STATE_MANY_PAGE.uploadFile);
      }
      return;
    } catch (error) {
      message.error(CONST_COMMON.errorSystemAgain);
      setStatePage(STATE_MANY_PAGE.uploadFile);
      return error;
    }
  };

  const handleOnSubmitUpload = (file: any) => {
    if (file) {
      setStatePage(STATE_MANY_PAGE.uploadProcess);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        // encoding: 'Shift-JIS',
        beforeFirstChunk(chunk) {
          const rows = chunk.split(/\r\n|\r|\n/);
          if (
            !rows[1] ||
            (rows[1] &&
              rows[1] !==
                '日給者一括登録用,(※必須)氏名,(※必須)フリガナ,電話番号,(※必須)メールアドレス,給与形態,個別設定申請上限額(昼),個別設定申請上限額(夜)' &&
              rows[1] !==
                '月給者一括登録用,(※必須)氏名,(※必須)フリガナ,電話番号,(※必須)メールアドレス,給与形態,個別設定申請上限額(月),個別設定申請上限額(日)')
          ) {
            message.error(LANGUAGE_COMPANY.createStaff.uploadFileFormatError);
            refreshStaffUPloadCreate();
          } else {
            rows[1] = 'stt,name,name_kana,phone,email,salary_type,amount_limit_1,amount_limit_2';
            rows.splice(0, 1);
          }
          return rows.join('\r\n');
        },
        complete(results: any) {
          if (results?.data && results.data.length >= 1) {
            const dataRow = results.data;
            let arrayData: any = [];
            dataRow.forEach((values: any) => {
              values.phone = values?.phone ? formatPhoneUploadFile(values.phone.trim()) : '';
              if (
                values?.name ||
                values?.name_kana ||
                values?.email ||
                values?.phone ||
                values?.amount_limit_1 ||
                values?.amount_limit_2
              ) {
                let itemRow = {
                  name: values?.name ? values.name.trim() : '',
                  name_kana: values?.name_kana ? values.name_kana.trim() : '',
                  phone: values?.phone ? formatPhoneUploadFile(values.phone.trim()) : '',
                  email: values?.email ? values.email.trim() : '',
                  salary_type: values?.salary_type ? values.salary_type.trim() : '',
                  amount_limit_1: values?.amount_limit_1 ? values.amount_limit_1.trim() : '',
                  amount_limit_2: values?.amount_limit_2 ? values.amount_limit_2.trim() : '',
                };

                if (
                  typeof values.salary_type === 'string' &&
                  values.salary_type.trim() === CONST_COMPANY_STAFF_MANAGEMENT.DAILY_SALARY
                ) {
                  itemRow = {
                    ...itemRow,
                    salary_type: ECompanyStaffSalaryType.DAILY_SALARY,
                  };
                } else if (
                  typeof values.salary_type === 'string' &&
                  values.salary_type.trim() === CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_SALARY
                ) {
                  itemRow = {
                    ...itemRow,
                    salary_type: ECompanyStaffSalaryType.MONTHLY_SALARY,
                  };
                } else {
                  itemRow = {
                    ...itemRow,
                    salary_type: 0,
                    amount_limit_1: '',
                    amount_limit_2: '',
                  };
                }
                arrayData = [
                  ...arrayData,
                  {
                    ...itemRow,
                    is_error: false,
                    status: true,
                    message_errors: {
                      name: [],
                      name_kana: [],
                      phone: [],
                      email: [],
                      salary_type: [],
                      amount_limit_1: [],
                      amount_limit_2: [],
                    },
                  },
                ];
              }
            });
            if (arrayData?.length) {
              setArrayDataFile(arrayData);
              const _dataStaff = validateDataFile(arrayData);
              const __dataStaff = getDataValidate(_dataStaff);
              if (__dataStaff?.length) validateListStaff(__dataStaff, _dataStaff);
              else {
                message.error(LANGUAGE_COMPANY.createStaff.uploadFileNoData);
                refreshStaffUPloadCreate();
              }
            } else {
              message.error(LANGUAGE_COMPANY.createStaff.uploadFileNoData);
              refreshStaffUPloadCreate();
            }
          } else {
            message.error(LANGUAGE_COMPANY.createStaff.uploadFileNoData);
            refreshStaffUPloadCreate();
          }
        },
      });
    }
  };

  const handleCancelUpload = () => {
    refreshStaffUPloadCreate();
  };

  useEffect(() => {
    if (statePage >= 3) {
      onSetHiddenSilde(true);
    } else {
      onSetHiddenSilde(false);
    }
  }, [statePage, onSetHiddenSilde]);

  return (
    <StaffUploadCreateWrapper className="wrapper-staff-upload-create">
      <BreadCrumb breads={stateBreads} />

      <StaffUploadCeateContainer>
        <GrantCard padding="2.188rem 0 2.063rem 0" maxWidth={'initial'}>
          {statePage === STATE_MANY_PAGE.uploadFile && (
            <UploadFile onSubmitUploadFile={(event) => handleOnSubmitUpload(event)} />
          )}

          {statePage === STATE_MANY_PAGE.uploadProcess && (
            <UploadFileProgress
              onCancelUpload={handleCancelUpload}
              percentage={percentage}
              onSetStatePage={setStatePage}
            />
          )}

          {statePage === STATE_MANY_PAGE.uploadView && (
            <ListStaffUpload
              dataStaffFile={arrayDataFile}
              onCancelUpload={handleCancelUpload}
              onSetStatePage={setStatePage}
              onSetArrayDataFile={setArrayDataFile}
              onGetListStaff={onGetListStaff}
            />
          )}

          {statePage === STATE_MANY_PAGE.uploadErrorView && (
            <ListStaffUploadPreviewError
              dataStaffFile={arrayDataFile}
              onCancelUpload={handleCancelUpload}
              onSetStatePage={setStatePage}
              onGetListStaff={onGetListStaff}
            />
          )}

          {statePage === STATE_MANY_PAGE.uploadSuccess && <UploadSuccess />}
        </GrantCard>
      </StaffUploadCeateContainer>
    </StaffUploadCreateWrapper>
  );
};

export default forwardRef(StaffUploadCreate);
