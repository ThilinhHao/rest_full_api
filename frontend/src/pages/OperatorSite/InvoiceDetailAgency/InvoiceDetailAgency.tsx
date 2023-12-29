import React from 'react';

import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import AgencyInvoiceViewTable from '@components/InvoiceTable/InvoiceViewTable/AgencyInvoiceViewTable';
import AgencyInvoiceExportTable from '@components/InvoiceTable/InvoiceExportTable/AgencyInvoiceExportTable';
import useInvoiceDetailAgency from './useInvoiceDetailAgency';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';

import {
  ButtonConfirm,
  ButtonExport,
  DateInvoice,
  HeaderWrapper,
  InvoiceDetailWrapper,
  TitleHeader,
} from './invoiceDetailAgencyStyle';
import { CONST_LIST_INVOICE_COMPANY, CONST_OPERATOR_INVOICE } from 'constants/language';
import { Container } from '@components/Style/Style';
import { SpaceBase } from 'styles';
import { IconFile } from '@components/Icon';
import { FootstepsHistoryCard } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { ControlHeaderWrapper } from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import { LoadingInvoice } from '@pages/CompanySite/InvoiceDetailSiteCompany/invoiceDetailSiteCompanyStyle';
import { EStatusInvoiceAgency } from 'constants/constants';
import { formatDateCommon } from 'helper/date';
import { STATUS_INVOICE_AGENCY_TEXT } from '@containers/OperatorSite/ListInvoiceTable/ListInvoiceAgencyTable';
import { MAX_ITEM_PAGE_ONE_AGENCY, MAX_ITEM_PAGE_OTHER_AGENCY } from 'constants/invoice';
import ModalCommon from '@components/Modal/ModalCommon';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import OTPInput from '@components/OTPInput/OTPInput';
import CountdownTimer from '@components/CountdownTimer/CountdownTimer';

export const InvoiceDetailAgency = () => {
  const {
    BREADS,
    invoiceDetail,
    invoiceAllDetail,
    isLoading,
    page,
    changePaging,
    exportInvoicePDF,
    isLoadingExport,
    invoiceInfo,
    isLoadingConfirm,
    confirmInvoice,
    isLoadingInvoiceAllDetail,
    onSubmitOTP,
    isOpenOTP,
    setIsOpenOTP,
    dateDownTime,
    isLoadingSubmitOTP,
    otp,
    setOtp,
  } = useInvoiceDetailAgency();

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <FootstepsHistoryCard between={true}>
          <div>
            <HeaderWrapper>
              <div>
                <div className="title-page">
                  <TitleHeader>{CONST_LIST_INVOICE_COMPANY.USAGE_INVOICE}</TitleHeader>
                </div>
                <DateInvoice>
                  {CONST_LIST_INVOICE_COMPANY.INVOICE_CREATED_AT}
                  {formatDateCommon(invoiceInfo?.release_date)}
                </DateInvoice>
              </div>
              <ControlHeaderWrapper padding="1rem 0 1rem 42rem">
                <PaginationRecord
                  right="50rem"
                  current={page.page}
                  total={page.total + (MAX_ITEM_PAGE_OTHER_AGENCY - MAX_ITEM_PAGE_ONE_AGENCY)}
                  pageSize={MAX_ITEM_PAGE_OTHER_AGENCY}
                  onChange={changePaging}
                />
                <ButtonConfirm
                  width="10.375rem"
                  disabled={invoiceInfo?.status !== EStatusInvoiceAgency.WAITING_OPERATOR_CONFIRM}
                  loading={isLoadingConfirm}
                  onClick={confirmInvoice}
                  icon={
                    invoiceInfo?.status === EStatusInvoiceAgency.WAITING_OPERATOR_CONFIRM && (
                      <IconFile className="iconFile" />
                    )
                  }
                >
                  {invoiceInfo?.status === EStatusInvoiceAgency.WAITING_OPERATOR_CONFIRM
                    ? CONST_LIST_INVOICE_COMPANY.CONFIRM_INVOICE_BTN
                    : STATUS_INVOICE_AGENCY_TEXT[Number(invoiceInfo?.status) || 0]}
                </ButtonConfirm>
                <ButtonExport
                  loading={isLoadingExport}
                  disabled={isLoadingInvoiceAllDetail || !invoiceInfo}
                  onClick={exportInvoicePDF}
                >
                  {CONST_LIST_INVOICE_COMPANY.EXPORT_INVOICE}
                </ButtonExport>
              </ControlHeaderWrapper>
            </HeaderWrapper>
            <InvoiceDetailWrapper>
              {isLoading && (
                <LoadingInvoice>
                  <SpaceBase height={5} />
                  <Loading />
                </LoadingInvoice>
              )}
              {invoiceInfo && (
                <AgencyInvoiceViewTable
                  invoiceDetail={invoiceDetail || []}
                  invoiceInfo={invoiceInfo}
                  currentPage={page.page}
                  pageSize={page.page === 1 ? MAX_ITEM_PAGE_ONE_AGENCY : MAX_ITEM_PAGE_OTHER_AGENCY}
                />
              )}
              {invoiceInfo && (
                <AgencyInvoiceExportTable invoiceDetail={invoiceAllDetail || []} invoiceInfo={invoiceInfo} />
              )}
            </InvoiceDetailWrapper>
          </div>
        </FootstepsHistoryCard>
      </Container>

      <ModalCommon
        isOpen={isOpenOTP}
        setIsOpen={() => setIsOpenOTP(!isOpenOTP)}
        onClickCancel={() => setIsOpenOTP(false)}
        isShowBtnOk={true}
        isShowBtnCancel={true}
        txtOK={CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.btnOKOTP}
        txtCancel={CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.btnCencal}
        onClickOk={() => onSubmitOTP(otp)}
        isLoadingOK={isLoadingSubmitOTP}
        _className="confirm-opreator-transfer-agency"
      >
        <ModalContainer>
          <div className="title">
            {invoiceInfo?.agency_name ? invoiceInfo.agency_name : invoiceInfo?.agency_representative_name}
          </div>
          <div className="description">{CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.titleDescriptionOTP}</div>
          <div className="otp">
            <OTPInput value={otp} onChange={setOtp} />
          </div>
          {dateDownTime?.status === EStatusInvoiceAgency.WAITING_OPERATOR_VERIFY && dateDownTime?.date_timeout && (
            <div className="count-downtime">
              <CountdownTimer startDate={dateDownTime?.now} endDate={dateDownTime?.date_timeout} />
            </div>
          )}
        </ModalContainer>
      </ModalCommon>
    </GrantCompanyWrapper>
  );
};
