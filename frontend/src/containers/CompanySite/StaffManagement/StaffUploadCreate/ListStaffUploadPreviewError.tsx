import React, { useEffect, useState } from 'react';

import images from '@assets/images-base';
import ButtonIssuance from '@components/Button/ButtonIssuance';
import DropdownCustom from '@components/DropdownCustom/DropdownCustom';
import { PaginationRecordError } from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import { IconStaffMany } from '@components/Icon';

import { message } from 'antd';
import { paginate } from 'helper/paginate';
import { STATE_MANY_PAGE } from './StaffUploadCreate';
import { validateDataFile } from './validateFile';
import { ECompanyStaffSalaryType } from 'constants/constants';
import { IDataStaff, IDataStaffFile, IDataStaffSubmit } from './interface';
import { getDataSubmit, getDataValidate } from './ListStaffUpload';
import { responseMessage, responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { formatPhone, formatPhoneUploadFile } from 'helper/formatPhone';
import { PrefixIcon, TitlePageWrapper, TitleWrapper } from '../DetailStaff/detailStaffStyle';
import { apiCompanyCreateStaffImport, apiCompanyValidateStaffImport } from 'api/company';
import { CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT, LANGUAGE_COMPANY } from 'constants/language';
import { DropdownCustomIcon, InputUploadFile, ListStaffUploadWrapper, PrefixImg } from './uploadFileStyle';

const PER_PAGE = 20;

const DEFAULT_PAGE = {
  per_page: PER_PAGE,
  page: 1,
  total: 0,
};

export const getDataValidateNotDelete = (dataStaff: IDataStaff[]) => {
  let dataValidate: IDataStaffSubmit[] = [];
  dataStaff?.forEach((staff: IDataStaff) => {
    if (staff.status) {
      dataValidate = [
        ...dataValidate,
        {
          name: staff.name,
          name_kana: staff.name_kana,
          phone: staff.phone,
          email: staff.email,
          salary_type: staff.salary_type,
          amount_limit_1: staff.amount_limit_1,
          amount_limit_2: staff.amount_limit_2,
          delete: !staff.status,
          message_errors: staff?.message_errors,
        },
      ];
    }
  });

  return dataValidate;
};

export const resetMessageErrors = (dataStaffFilePrivew: IDataStaff[]) => {
  if (!dataStaffFilePrivew.length) {
    return [];
  }
  let dataStaffFile: IDataStaff[] = [];
  dataStaffFilePrivew.forEach((item: IDataStaff) => {
    if (item.status) {
      // const _item = {
      //   ...item,
      //   is_error: false,
      //   message_errors: {
      //     name: [],
      //     name_kana: [],
      //     phone: [],
      //     email: [],
      //     salary_type: [],
      //     amount_limit_1: [],
      //     amount_limit_2: [],
      //   },
      // };
      dataStaffFile = [...dataStaffFile, { ...item }];
    } else {
      dataStaffFile = [...dataStaffFile, { ...item }];
    }
  });

  return dataStaffFile;
};

const ListStaffUploadPreviewError = ({
  dataStaffFile,
  onCancelUpload,
  onSetStatePage,
  onGetListStaff,
}: {
  dataStaffFile?: IDataStaffFile[];
  onCancelUpload: () => void;
  onGetListStaff: () => void;
  onSetStatePage: (data: number) => void;
}) => {
  const [pageStaffPrivew, setPageStaffPrivew] = useState(DEFAULT_PAGE);
  const [dataStaffFilePrivew, setdataStaffFilePrivew] = useState<IDataStaff[]>();
  const [numberPageError, setNumberPageError] = useState<number[]>();
  const [staffData, seDatatStaff] = useState<IDataStaff[]>();
  const [isLoadingCreateStaff, setIsLoadingCreateStaff] = useState<boolean>(false);

  useEffect(() => {
    if (staffData && staffData?.length) {
      const staffPaginte = paginate(staffData, pageStaffPrivew.page, pageStaffPrivew.per_page);

      setPageStaffPrivew({
        ...pageStaffPrivew,
        page: staffPaginte.current,
        total: staffPaginte.total,
      });
      setdataStaffFilePrivew(staffPaginte?.data);
    } else {
      setPageStaffPrivew(DEFAULT_PAGE);
      setdataStaffFilePrivew([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageStaffPrivew.page, JSON.stringify(staffData)]);

  const changePaging = (pageChange: number) => {
    setPageStaffPrivew({
      ...pageStaffPrivew,
      page: pageChange,
    });
  };

  const getIndexArr = (index: number) => {
    return pageStaffPrivew.per_page * (pageStaffPrivew.page - 1) + index;
  };

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

  useEffect(() => {
    let dataStaff: any[] = [];
    if (dataStaffFile) {
      dataStaff = dataStaffFile;
      if (dataStaff && dataStaff?.length) {
        const staffPaginte = paginate(dataStaffFile, 1, PER_PAGE);
        const pageError: number[] = getArrayPageError(dataStaff, staffPaginte.total);
        if (pageError.length) {
          setNumberPageError(pageError.filter((item, index) => pageError.indexOf(item) === index));
        }
      }
      seDatatStaff(dataStaff);
    }
  }, [dataStaffFile]);

  const onchangeInput = (event: any, key: string, index: number) => {
    if (staffData?.length) {
      const data = [...staffData];
      data[getIndexArr(index)][key] = event.target.value;
      seDatatStaff(data);
    }
  };

  const onchangeInputFee = (event: any, key: string, index: number) => {
    if (staffData?.length && !Number.isNaN(Number(event.target.value))) {
      let _value = event.target.value;
      if (event.target.value < 0) {
        _value = null;
      }
      const data = [...staffData];
      data[getIndexArr(index)][key] = _value;
      seDatatStaff(data);
    } else {
    }
  };

  const onchangeSelect = (value: any, key: string, index: number) => {
    if (staffData?.length) {
      const data = [...staffData];
      data[getIndexArr(index)][key] = value;
      seDatatStaff(data);
    }
  };

  const handleFormatPhone = (event: any, key: string, index: number) => {
    if (staffData?.length) {
      const data = [...staffData];
      data[getIndexArr(index)][key] = event.target.value;
      seDatatStaff(data);
    }
  };

  const onDeletedRow = (index: number) => {
    if (staffData?.length) {
      const data = [...staffData];
      data[getIndexArr(index)].status = !data[getIndexArr(index)].status;
      seDatatStaff(data);
    }
  };

  const hanldeReponseSubmit = (response: any, staffDataAfterValidate: IDataStaff[]) => {
    let _staffData: any = staffDataAfterValidate ? [...staffDataAfterValidate] : [];
    _staffData = resetMessageErrors(_staffData);
    const dataMesssageValue = Object.values(response);
    const dataMesssageKey = Object.keys(response);
    dataMesssageKey.forEach((item: string) => {
      const arrKey = item.split('.');
      _staffData[arrKey[1]].is_error = true;
      _staffData[arrKey[1]].message_errors[arrKey[2]] = [dataMesssageValue[Number(arrKey[1])]];
    });

    const staffPaginte = paginate(_staffData, 1, PER_PAGE);
    const pageError: number[] = getArrayPageError(_staffData, staffPaginte.total);

    if (pageError.length) {
      setNumberPageError(pageError.filter((item, index) => pageError.indexOf(item) === index));
      seDatatStaff(_staffData);
    }
  };

  const submitImportListStaff = async (dataStaffs: any, staffDataAfterValidate: IDataStaff[]) => {
    setIsLoadingCreateStaff(true);
    try {
      const response = await apiCompanyCreateStaffImport({ staffs: dataStaffs });
      if (responseSuccess(response)) {
        onGetListStaff();
        onSetStatePage(STATE_MANY_PAGE.uploadSuccess);
      } else if (responseMessage(response)) {
        hanldeReponseSubmit(responseMessage(response), staffDataAfterValidate);
      } else {
        message.error(CONST_COMMON.errorSystemAgain);
      }
      return response;
    } catch (error) {
      message.error(CONST_COMMON.errorSystemAgain);
      return error;
    } finally {
      setIsLoadingCreateStaff(false);
    }
  };

  const validateListStaff = async (dataStaffs: any, staffDataAfterValidate: IDataStaff[]) => {
    try {
      const response = await apiCompanyValidateStaffImport({ staffs: dataStaffs });
      if (responseSuccess(response)) {
        let _check = true;
        if (staffDataAfterValidate && staffDataAfterValidate?.length) {
          const staffPaginte = paginate(staffDataAfterValidate, 1, PER_PAGE);
          const pageError: number[] = getArrayPageError(staffDataAfterValidate, staffPaginte.total);
          if (pageError.length) {
            hanldeReponseSubmit(responseMessage(response), staffDataAfterValidate);
            setIsLoadingCreateStaff(false);
            _check = false;
          }
        }
        if (_check) {
          const dataSubmit = getDataSubmit(dataStaffs);
          submitImportListStaff(dataSubmit, staffDataAfterValidate);
        }
      } else if (responseMessage(response)) {
        hanldeReponseSubmit(responseMessage(response), staffDataAfterValidate);
        setIsLoadingCreateStaff(false);
      }
      return;
    } catch (error) {
      message.error(CONST_COMMON.errorSystemAgain);
      setIsLoadingCreateStaff(false);
      return error;
    }
  };

  const onSubmitCreateStaff = () => {
    if (!staffData?.length) {
      return;
    }
    setIsLoadingCreateStaff(true);
    let _staffData = resetMessageErrors(staffData);
    _staffData = validateDataFile(_staffData);
    const __staffData = getDataValidate(_staffData);
    const ___staffData = getDataValidateNotDelete(_staffData);
    if (___staffData && ___staffData?.length) {
      validateListStaff(__staffData, _staffData);
    } else {
      message.error(LANGUAGE_COMPANY.createStaff.uploadFileNoData);
      setIsLoadingCreateStaff(false);
    }
  };

  return (
    <ListStaffUploadWrapper className="wrapper-list-staff-upload wrapper-list-staff-upload-error">
      <TitlePageWrapper>
        <TitleWrapper>
          <PrefixIcon src={images.companySite.createStaffMany} alt={images.companySite.createStaffMany} />
          <div className="title">{LANGUAGE_COMPANY.createStaff.listStaffTitle}</div>
          <div className="top-note">{LANGUAGE_COMPANY.createStaff.listStaffTopNote}</div>
        </TitleWrapper>
      </TitlePageWrapper>
      <div className="content-error">
        <div className="error-txt-icon">
          <img src={images.companySite.errorRed} alt={images.companySite.errorRed} />
          <p className="error-txt-top">{LANGUAGE_COMPANY.createStaff.errorTxtTop}</p>
        </div>
      </div>
      <div className="paginate">
        {dataStaffFilePrivew && (
          <PaginationRecordError
            current={pageStaffPrivew.page}
            total={pageStaffPrivew.total}
            pageSize={pageStaffPrivew.per_page}
            onChange={changePaging}
            errorArr={numberPageError}
          />
        )}
      </div>
      <div className="table-list-staff">
        <div className="table">
          <div className="table-row-top">
            <div className="name">{LANGUAGE_COMPANY.createStaff.tableName}</div>
            <div className="name_kana">{LANGUAGE_COMPANY.createStaff.tableNameKana}</div>
            <div className="phone">{LANGUAGE_COMPANY.createStaff.tablePhone}</div>
            <div className="email">{LANGUAGE_COMPANY.createStaff.tableEmail}</div>
            <div className="type">{LANGUAGE_COMPANY.createStaff.tableType}</div>
            <div className="amount">{LANGUAGE_COMPANY.createStaff.tableAmount}</div>
          </div>
          {dataStaffFilePrivew &&
            !!dataStaffFilePrivew?.length &&
            dataStaffFilePrivew.map((staff: IDataStaff, index: number) => (
              <div
                key={index}
                className={`${staff.status ? 'table-row-group' : 'table-row-group table-row-group-deleted'}`}
              >
                {staff.status ? (
                  <div key={index} className={`${staff.is_error ? 'table-row border-error' : 'table-row'}`}>
                    <div className="name">
                      {staff.message_errors.name?.length ? (
                        <InputUploadFile
                          prefix={<img src={images.companySite.errorRed} alt={images.companySite.errorRed} />}
                          value={staff.name}
                          placeholder={CONST_COMMON.PLACEHOLDER.FULL_NAME}
                          className="input-name"
                          onChange={(event) => onchangeInput(event, 'name', index)}
                        />
                      ) : (
                        staff.name
                      )}
                    </div>
                    <div className="name_kana">
                      {staff.message_errors.name_kana?.length ? (
                        <InputUploadFile
                          prefix={<img src={images.companySite.errorRed} alt={images.companySite.errorRed} />}
                          value={staff.name_kana}
                          placeholder={CONST_COMMON.PLACEHOLDER.FULL_NAME_FURIGANA}
                          onChange={(event) => onchangeInput(event, 'name_kana', index)}
                        />
                      ) : (
                        staff.name_kana
                      )}
                    </div>
                    <div className="phone">
                      {staff.message_errors.phone?.length ? (
                        <InputUploadFile
                          prefix={<img src={images.companySite.errorRed} alt={images.companySite.errorRed} />}
                          value={formatPhoneUploadFile(staff.phone)}
                          type="tel"
                          placeholder={CONST_COMMON.PLACEHOLDER.PHONE_NUMBER}
                          onChange={(event) => handleFormatPhone(event, 'phone', index)}
                        />
                      ) : (
                        formatPhone(formatPhoneUploadFile(staff.phone))
                      )}
                    </div>
                    <div className="email">
                      {staff.message_errors.email?.length ? (
                        <InputUploadFile
                          prefix={<img src={images.companySite.errorRed} alt={images.companySite.errorRed} />}
                          value={staff.email}
                          placeholder={CONST_COMMON.PLACEHOLDER.EMAIL}
                          onChange={(event) => onchangeInput(event, 'email', index)}
                        />
                      ) : (
                        staff.email
                      )}
                    </div>
                    <div className="type">
                      {staff.message_errors.salary_type?.length ? (
                        <DropdownCustomIcon>
                          <PrefixImg src={images.companySite.errorRed} alt={images.companySite.errorRed} />
                          <DropdownCustom
                            width="100%"
                            defaultValue={staff.salary_type}
                            onChange={(event) => onchangeSelect(event, 'salary_type', index)}
                            options={[
                              {
                                value: 0,
                                label: '  ',
                              },
                              {
                                value: ECompanyStaffSalaryType.DAILY_SALARY,
                                label: CONST_COMPANY_STAFF_MANAGEMENT.DAILY_SALARY,
                              },
                              {
                                value: ECompanyStaffSalaryType.MONTHLY_SALARY,
                                label: CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_SALARY,
                              },
                            ]}
                          />
                        </DropdownCustomIcon>
                      ) : (
                        <>
                          {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY &&
                            CONST_COMPANY_STAFF_MANAGEMENT.DAILY_SALARY}
                          {staff.salary_type === ECompanyStaffSalaryType.MONTHLY_SALARY &&
                            CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_SALARY}
                        </>
                      )}
                    </div>
                    <div className="amount">
                      <div>
                        <div className="limit1">
                          {staff.message_errors.salary_type?.length || staff.message_errors.amount_limit_1?.length ? (
                            <InputUploadFile
                              className="input-fee"
                              prefix={<img src={images.companySite.errorRed} alt={images.companySite.errorRed} />}
                              value={staff.amount_limit_1}
                              placeholder={
                                staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
                                  ? LANGUAGE_COMPANY.createStaff.dayTime
                                  : staff.salary_type === ECompanyStaffSalaryType.MONTHLY_SALARY
                                  ? LANGUAGE_COMPANY.createStaff.dayilyTime
                                  : ''
                              }
                              onChange={(event) => onchangeInputFee(event, 'amount_limit_1', index)}
                            />
                          ) : (
                            <>
                              {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY ? (
                                <>
                                  {LANGUAGE_COMPANY.createStaff.dayTime}：{staff.amount_limit_1}
                                </>
                              ) : (
                                <>
                                  {LANGUAGE_COMPANY.createStaff.dayilyTime}：{staff.amount_limit_1}
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div className="limit2">
                          {staff.message_errors.salary_type?.length || staff.message_errors.amount_limit_2?.length ? (
                            <InputUploadFile
                              className="input-fee"
                              prefix={<img src={images.companySite.errorRed} alt={images.companySite.errorRed} />}
                              value={staff.amount_limit_2}
                              placeholder={
                                staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
                                  ? LANGUAGE_COMPANY.createStaff.nightTime
                                  : staff.salary_type === ECompanyStaffSalaryType.MONTHLY_SALARY
                                  ? LANGUAGE_COMPANY.createStaff.monthlyTime
                                  : ''
                              }
                              onChange={(event) => onchangeInputFee(event, 'amount_limit_2', index)}
                            />
                          ) : (
                            <>
                              {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY ? (
                                <>
                                  {LANGUAGE_COMPANY.createStaff.nightTime}：{staff.amount_limit_2}
                                </>
                              ) : (
                                <>
                                  {LANGUAGE_COMPANY.createStaff.monthlyTime}：{staff.amount_limit_2}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`${staff.is_error ? 'table-row border-error' : 'table-row'}`}>
                    <div className="name">{staff.name}</div>
                    <div className="name_kana">{staff.name_kana}</div>
                    <div className="phone">{formatPhone(formatPhoneUploadFile(staff.phone))}</div>
                    <div className="email">{staff.email}</div>
                    <div className="type">
                      {
                        <>
                          {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY &&
                            CONST_COMPANY_STAFF_MANAGEMENT.DAILY_SALARY}
                          {staff.salary_type === ECompanyStaffSalaryType.MONTHLY_SALARY &&
                            CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_SALARY}
                        </>
                      }
                    </div>
                    <div className="amount">
                      <div className="limit1">
                        {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY ? (
                          <>
                            {LANGUAGE_COMPANY.createStaff.dayTime}：{staff.amount_limit_1}
                          </>
                        ) : (
                          <>
                            {LANGUAGE_COMPANY.createStaff.dayilyTime}：{staff.amount_limit_1}
                          </>
                        )}
                      </div>

                      <div className="limit2">
                        {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY ? (
                          <>
                            {LANGUAGE_COMPANY.createStaff.nightTime}：{staff.amount_limit_2}
                          </>
                        ) : (
                          <>
                            {LANGUAGE_COMPANY.createStaff.monthlyTime}：{staff.amount_limit_2}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-deleted">
                  {staff.is_error && (
                    <ButtonIssuance
                      label={
                        staff.status
                          ? LANGUAGE_COMPANY.createStaff.btnDeleteStaff
                          : LANGUAGE_COMPANY.createStaff.btnRestoreStaff
                      }
                      PrefixIcon={'hidden'}
                      className={staff.status ? 'btn-deleted' : 'btn-restore'}
                      onClick={() => onDeletedRow(index)}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="button-group-list-staff">
        <div>
          <ButtonIssuance
            label={LANGUAGE_COMPANY.createStaff.btnSubmitViewStaff}
            PrefixIcon={<IconStaffMany />}
            className="btn-submit"
            onClick={onSubmitCreateStaff}
            loading={isLoadingCreateStaff}
          />
        </div>
        <div>
          <ButtonIssuance
            label={LANGUAGE_COMPANY.createStaff.btnCancelStaff}
            PrefixIcon={'hidden'}
            className="btn-cancel"
            onClick={onCancelUpload}
            disabled={isLoadingCreateStaff}
          />
        </div>
      </div>
    </ListStaffUploadWrapper>
  );
};

export default ListStaffUploadPreviewError;
