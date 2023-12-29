import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import useListInvoiceSiteAgency from './useListInvoiceSiteAgency';

import {
  ControlHeaderWrapper,
  LoadingAttendance,
  NoDataAttendance,
} from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import { Container } from '@components/Style/Style';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { TitleHeaderSetting } from '@pages/CompanySite/SettingPage/settingPageStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import {
  FootstepsHistoryCard,
  HeaderFootstepsWrapper,
} from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { SpaceBase } from 'styles';
import { CONST_COMMON, CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import InvoiceItem from '@containers/AgencySite/InvoiceItem/InvoiceItem';

export const ListInvoiceSiteAgency = () => {
  const { navigate, listInvoice, page, changePaging, onChangeMonth, currentMonth, BREADS, isLoading } =
    useListInvoiceSiteAgency();

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <FootstepsHistoryCard between={true}>
          <div>
            <HeaderFootstepsWrapper>
              <SettingIcon src={images.agencySite.agencyInvoice} />
              <TitleHeaderSetting>{CONST_LIST_INVOICE_COMPANY.INVOICE}</TitleHeaderSetting>
            </HeaderFootstepsWrapper>

            <ControlHeaderWrapper padding="1.25rem 0 0 9.2rem">
              <DatePickerCustom onChangeMonth={onChangeMonth} month={currentMonth} normalPicker={false} />
              <PaginationRecord
                right="35rem"
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
            {listInvoice && listInvoice.length > 0 && <InvoiceItem navigate={navigate} listInvoice={listInvoice} />}
          </div>
        </FootstepsHistoryCard>
      </Container>
    </GrantCompanyWrapper>
  );
};
