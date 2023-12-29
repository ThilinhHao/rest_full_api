import React, { useEffect, useState } from 'react';

import images from '@assets/images-base';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import { CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT, LANGUAGE_COMPANY } from 'constants/language';
import { paginate } from 'helper/paginate';

import { IDataStaff, IDataStaffFile, IDataStaffSubmit } from './interface';
import { ListStaffUploadWrapper } from './uploadFileStyle';
import { PrefixIcon, TitlePageWrapper, TitleWrapper } from '../DetailStaff/detailStaffStyle';
import { ECompanyStaffSalaryType } from 'constants/constants';
import ButtonIssuance from '@components/Button/ButtonIssuance';
import { IconStaffMany } from '@components/Icon';
import { STATE_MANY_PAGE } from './StaffUploadCreate';
import { validateDataFile } from './validateFile';
import { apiCompanyCreateStaffImport, apiCompanyValidateStaffImport } from 'api/company';
import { responseMessage, responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { resetMessageErrors } from './ListStaffUploadPreviewError';
import { message } from 'antd';

const DEFAULT_PAGE = {
  per_page: 20,
  page: 1,
  total: 0,
  total_page: 0,
};

export const getDataSubmit = (dataStaff: IDataStaff[]) => {
  let dataSubmit: IDataStaffSubmit[] = [];
  dataStaff?.forEach((staff: IDataStaff) => {
    if (!staff.delete) {
      dataSubmit = [
        ...dataSubmit,
        {
          name: staff.name,
          name_kana: staff.name_kana,
          phone: staff.phone,
          email: staff.email,
          salary_type: staff.salary_type,
          amount_limit_1: staff.amount_limit_1,
          amount_limit_2: staff.amount_limit_2,
        },
      ];
    }
  });

  return dataSubmit;
};

export const getDataValidate = (dataStaff: IDataStaff[]) => {
  let dataValidate: IDataStaffSubmit[] = [];
  dataStaff?.forEach((staff: IDataStaff) => {
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
  });

  return dataValidate;
};

const ListStaffUpload = ({
  dataStaffFile,
  onCancelUpload,
  onSetStatePage,
  onSetArrayDataFile,
  onGetListStaff,
}: {
  dataStaffFile?: IDataStaffFile[];
  onCancelUpload: () => void;
  onGetListStaff: () => void;
  onSetStatePage: (data: number) => void;
  onSetArrayDataFile: (data: IDataStaff) => void;
}) => {
  const [pageStaffPrivew, setPageStaffPrivew] = useState(DEFAULT_PAGE);
  const [dataStaffFilePrivew, setdataStaffFilePrivew] = useState<IDataStaffFile[]>();
  const [isLoadingCreateStaff, setIsLoadingCreateStaff] = useState<boolean>(false);

  useEffect(() => {
    if (dataStaffFile && dataStaffFile?.length) {
      const staffPaginte = paginate(dataStaffFile, pageStaffPrivew.page, pageStaffPrivew.per_page);
      setPageStaffPrivew({
        ...pageStaffPrivew,
        page: staffPaginte.current,
        total_page: staffPaginte.total_page,
        total: staffPaginte.total,
      });
      setdataStaffFilePrivew(staffPaginte?.data);
    } else {
      setPageStaffPrivew(DEFAULT_PAGE);
      setdataStaffFilePrivew([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageStaffPrivew.page, dataStaffFile]);

  const changePaging = (pageChange: number) => {
    setPageStaffPrivew({
      ...pageStaffPrivew,
      page: pageChange,
    });
  };

  const importListStaff = async (dataStaffs: any) => {
    setIsLoadingCreateStaff(true);
    try {
      const response = await apiCompanyCreateStaffImport({ staffs: dataStaffs });

      if (responseSuccess(response)) {
        onGetListStaff();
        onSetStatePage(STATE_MANY_PAGE.uploadSuccess);
      } else if (responseMessage(response)) {
        let _dataStaffFile: any = dataStaffFile ? [...dataStaffFile] : [];
        _dataStaffFile = resetMessageErrors(_dataStaffFile);
        const dataMesssageValue = Object.values(responseMessage(response));
        const dataMesssageKey = Object.keys(responseMessage(response));
        dataMesssageKey.forEach((item: string) => {
          const arrKey = item.split('.');
          _dataStaffFile[arrKey[1]].is_error = true;
          _dataStaffFile[arrKey[1]].message_errors[arrKey[2]] = [dataMesssageValue[Number(arrKey[1])]];
        });

        onSetArrayDataFile(_dataStaffFile);
        onSetStatePage(STATE_MANY_PAGE.uploadErrorView);
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

  const validateListStaff = async (dataStaffs: any) => {
    try {
      const response = await apiCompanyValidateStaffImport({ staffs: dataStaffs });
      if (responseSuccess(response)) {
        const dataSubmit = getDataSubmit(dataStaffs);
        importListStaff(dataSubmit);
      } else if (responseMessage(response)) {
        let _dataStaffFile: any = dataStaffFile ? [...dataStaffFile] : [];
        _dataStaffFile = resetMessageErrors(_dataStaffFile);
        const dataMesssageValue = Object.values(responseMessage(response));
        const dataMesssageKey = Object.keys(responseMessage(response));
        dataMesssageKey.forEach((item: string) => {
          const arrKey = item.split('.');
          _dataStaffFile[arrKey[1]].message_errors[arrKey[2]] = [dataMesssageValue[Number(arrKey[1])]];
        });

        onSetArrayDataFile(_dataStaffFile);
        onSetStatePage(STATE_MANY_PAGE.uploadErrorView);
        setIsLoadingCreateStaff(false);
      } else {
        message.error(CONST_COMMON.errorSystemAgain);
      }
      return;
    } catch (error) {
      message.error(CONST_COMMON.errorSystemAgain);
      setIsLoadingCreateStaff(false);
      return error;
    }
  };

  const onSubmitFile = () => {
    if (dataStaffFile?.length) {
      setIsLoadingCreateStaff(true);
      let dataStaff = validateDataFile(dataStaffFile);
      dataStaff = getDataValidate(dataStaff);

      if (dataStaff?.length) validateListStaff(dataStaff);
      else setIsLoadingCreateStaff(false);
    }
  };

  return (
    <ListStaffUploadWrapper className="wrapper-list-staff-upload">
      <TitlePageWrapper>
        <TitleWrapper>
          <PrefixIcon src={images.companySite.createStaffMany} alt={images.companySite.createStaffMany} />
          <div className="title">{LANGUAGE_COMPANY.createStaff.listStaffTitle}</div>
          <div className="top-note">{LANGUAGE_COMPANY.createStaff.listStaffTopNote}</div>
        </TitleWrapper>
      </TitlePageWrapper>
      <div className="paginate">
        {pageStaffPrivew && (
          <PaginationRecord
            current={pageStaffPrivew.page}
            total={pageStaffPrivew.total}
            pageSize={pageStaffPrivew.per_page}
            onChange={changePaging}
          />
        )}
      </div>
      <div className="table-list-staff table-list-staff-view">
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
            dataStaffFilePrivew.map((staff: IDataStaffFile, index: number) => (
              <div key={index} className="table-row">
                <div className="name">{staff.name}</div>
                <div className="name_kana">{staff.name_kana}</div>
                <div className="phone">{staff.phone}</div>
                <div className="email">{staff.email}</div>
                <div className="type">
                  {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY &&
                    CONST_COMPANY_STAFF_MANAGEMENT.DAILY_SALARY}
                  {staff.salary_type === ECompanyStaffSalaryType.MONTHLY_SALARY &&
                    CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_SALARY}
                </div>
                <div className="amount">
                  <div className="day">
                    {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY && (
                      <>
                        <div className="limit1">
                          {LANGUAGE_COMPANY.createStaff.dayTime}：{staff.amount_limit_1}
                        </div>
                        <div className="limit2">
                          {LANGUAGE_COMPANY.createStaff.nightTime}：{staff.amount_limit_2}
                        </div>
                      </>
                    )}
                    {staff.salary_type === ECompanyStaffSalaryType.MONTHLY_SALARY && (
                      <>
                        <div className="limit1">
                          {LANGUAGE_COMPANY.createStaff.dayilyTime}：{staff.amount_limit_1}
                        </div>
                        <div className="limit2">
                          {LANGUAGE_COMPANY.createStaff.monthlyTime}：{staff.amount_limit_2}
                        </div>
                      </>
                    )}
                  </div>
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
            onClick={onSubmitFile}
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

export default ListStaffUpload;
