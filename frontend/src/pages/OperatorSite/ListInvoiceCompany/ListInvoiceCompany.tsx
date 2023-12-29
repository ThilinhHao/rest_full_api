import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import SwitchButton from './SwitchButton/SwitchButton';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import useListInvoiceCompany from './useListInvoiceCompany';
import CompanyInvoiceExportTable from '@components/InvoiceTable/InvoiceExportTable/CompanyInvoiceExportTable';

import {
  ControlHeaderWrapper,
  LoadingAttendance,
  NoDataAttendance,
} from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import { Container } from '@components/Style/Style';
import { SpaceBase } from 'styles';
import { ButtonExport } from '@pages/AgencySite/InvoiceDetailSiteAgency/invoiceDetailSiteAgencyStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { FootstepsHistoryCard } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { ListInvoiceCompanyTable } from '@containers/OperatorSite/ListInvoiceTable/ListInvoiceCompanyTable';
import { HeaderWrapper, InputSearchCustom, TitleHeader } from './listInvoiceCompanyStyle';
import { CONST_COMMON, CONST_LIST_INVOICE_COMPANY, CONST_OPERATOR_INVOICE } from 'constants/language';
import { ICompanyOperatorListAllDetailInvoice } from 'constants/invoice';

export const ListInvoiceCompany = () => {
  const {
    navigate,
    listInvoice,
    page,
    changePaging,
    onChangeMonth,
    currentMonth,
    BREADS,
    isLoading,
    typeCompany,
    onChangeTypeCompany,
    listInvoiceAllDetail,
    keyWord,
    onChangeKeyWord,
    onKeyDownKeyWord,
    refeshNumberPage,
    exportAllInvoicePDF,
    isLoadingExport,
  } = useListInvoiceCompany();

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <FootstepsHistoryCard between={true}>
          <div>
            <HeaderWrapper>
              <img className="header-icon" src={images.sideBar.usageInformation} alt="" />
              <TitleHeader>{CONST_OPERATOR_INVOICE.LIST_COMPANY_INVOICE}</TitleHeader>
              <ButtonExport
                loading={isLoadingExport}
                margin="0 0 0 15rem"
                fontWeight="600"
                onClick={exportAllInvoicePDF}
              >
                {CONST_LIST_INVOICE_COMPANY.EXPORT_INVOICE}
              </ButtonExport>
              <InputSearchCustom
                placeholder={CONST_OPERATOR_INVOICE.PLACEHOLDER_SEARCH_COMPANY}
                suffix={<img src={images.setting.searchIcon} alt="" onClick={() => refeshNumberPage()} />}
                value={keyWord}
                onChange={onChangeKeyWord}
                onKeyDown={onKeyDownKeyWord}
              />
              <DatePickerCustom
                onChangeMonth={onChangeMonth}
                month={currentMonth}
                normalPicker={false}
                isHasBtnChange={false}
                allowClear={false}
              />
            </HeaderWrapper>
            <ControlHeaderWrapper padding="0.5rem 0 0 5.45rem">
              <PaginationRecord
                right="40rem"
                current={page.page}
                total={page.total}
                pageSize={page.per_page}
                onChange={changePaging}
              />
              <SwitchButton selected={typeCompany} setSelected={onChangeTypeCompany} />
            </ControlHeaderWrapper>
            {isLoading && (
              <LoadingAttendance>
                <SpaceBase height={5} />
                <Loading />
              </LoadingAttendance>
            )}
            {listInvoice && listInvoice.length === 0 && !isLoading && (
              <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
            )}
            {listInvoice && listInvoice.length > 0 && (
              <ListInvoiceCompanyTable
                navigate={navigate}
                listInvoice={listInvoice}
                dateTable={currentMonth?.format('YYYY-MM-DD')}
              />
            )}
            {listInvoiceAllDetail?.map(
              (invoiceDetail: ICompanyOperatorListAllDetailInvoice, index: number) =>
                invoiceDetail && (
                  <CompanyInvoiceExportTable
                    key={invoiceDetail.invoice?.id}
                    invoiceDetail={invoiceDetail.detail || []}
                    invoiceInfo={invoiceDetail.invoice}
                  />
                )
            )}
          </div>
        </FootstepsHistoryCard>
      </Container>
    </GrantCompanyWrapper>
  );
};
