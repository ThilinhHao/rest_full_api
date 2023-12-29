import React from 'react';

import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import useListInvoiceSiteCompany from './useListInvoiceSiteCompany';

import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { CONST_COMMON, CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { TitleHeaderSetting } from '../SettingPage/settingPageStyle';
import { Container, GrantCard } from '@components/Style/Style';
import { HeaderSettingWrapper } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import { SpaceBase } from 'styles';
import { ControlHeaderWrapper, LoadingAttendance, NoDataAttendance } from '../AttendanceRecord/attendanceRecordStyle';
import images from '@assets/images-base';
import InvoiceItem from '@containers/CompanySite/InvoiceItem/InvoiceItem';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';

export const ListInvoiceSiteCompany = () => {
  const { navigate, BREADS, listInvoice, isLoading, page, changePaging, onChangeMonth, currentMonth } =
    useListInvoiceSiteCompany();

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard padding="1.25rem 0rem" percentWidth="100%" width={106.25}>
          <div>
            <HeaderSettingWrapper>
              <SettingIcon src={images.companySite.settingTermOfUseCompany} />
              <TitleHeaderSetting>{CONST_LIST_INVOICE_COMPANY.CONFIRM_INVOICE}</TitleHeaderSetting>
            </HeaderSettingWrapper>

            <ControlHeaderWrapper padding="2rem 0 0 5.45rem">
              <DatePickerCustom onChangeMonth={onChangeMonth} month={currentMonth} normalPicker={false} />
              <PaginationRecord
                right="50rem"
                current={page.page}
                total={page.total}
                pageSize={page.per_page}
                onChange={changePaging}
              />
            </ControlHeaderWrapper>
            {isLoading && (
              <LoadingAttendance margin="2rem 0 0 0">
                <SpaceBase height={5} />
                <Loading />
              </LoadingAttendance>
            )}
            {listInvoice && listInvoice.length === 0 && !isLoading && (
              <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
            )}
            {listInvoice && listInvoice.length > 0 && (
              <InvoiceItem navigate={navigate} listInvoice={listInvoice} isLoading={isLoading} />
            )}
          </div>
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};
