import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import useListInvoiceAgency from './useListInvoiceAgency';
import AgencyInvoiceExportTable from '@components/InvoiceTable/InvoiceExportTable/AgencyInvoiceExportTable';

import {
  ControlHeaderWrapper,
  LoadingAttendance,
  NoDataAttendance,
} from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import { Container } from '@components/Style/Style';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { FootstepsHistoryCard } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { SpaceBase } from 'styles';
import { CONST_COMMON, CONST_LIST_INVOICE_COMPANY, CONST_OPERATOR_INVOICE } from 'constants/language';
import { ButtonExport } from '@pages/AgencySite/InvoiceDetailSiteAgency/invoiceDetailSiteAgencyStyle';
import { HeaderWrapper, TitleHeader } from './listInvoiceAgencyStyle';
import { ListInvoiceAgencyTable } from '@containers/OperatorSite/ListInvoiceTable/ListInvoiceAgencyTable';
import { InputSearchCustom } from '../ListInvoiceCompany/listInvoiceCompanyStyle';
import { IAgencyBasicOperatorInvoice } from 'constants/invoice';
import ModalCommon from '@components/Modal/ModalCommon';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import OTPInput from '@components/OTPInput/OTPInput';
import { EStatusInvoiceAgency } from 'constants/constants';
import CountdownTimer from '@components/CountdownTimer/CountdownTimer';

export const ListInvoiceAgency = () => {
  const {
    navigate,
    listInvoice,
    page,
    changePaging,
    onChangeMonth,
    currentMonth,
    BREADS,
    isLoading,
    listInvoiceAllDetail,
    keyWord,
    onChangeKeyWord,
    onKeyDownKeyWord,
    refeshNumberPage,
    exportAllInvoicePDF,
    isLoadingExport,
    changeStatusInvoice,
    totalPayment,
    isOpenOTP,
    setIsOpenOTP,
    otp,
    setOtp,
    onSubmitOTP,
    isLoadingSubmitOTP,
    dateDownTime,
    onClickTransferAgency,
    invoiceInfo,
    isLoadingTransfer,
  } = useListInvoiceAgency();

  const onFinishCountDown = () => {
    setIsOpenOTP(false);
    setOtp('');
  };

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <FootstepsHistoryCard between={true}>
          <div>
            <HeaderWrapper>
              <TitleHeader>{CONST_OPERATOR_INVOICE.LIST_AGENCY_INVOICE}</TitleHeader>
              <ButtonExport
                loading={isLoadingExport}
                margin="0 0 0 15rem"
                fontWeight="600"
                onClick={exportAllInvoicePDF}
              >
                {CONST_LIST_INVOICE_COMPANY.EXPORT_INVOICE}
              </ButtonExport>
              <InputSearchCustom
                placeholder={CONST_OPERATOR_INVOICE.PLACEHOLDER_SEARCH_AGENCY}
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
                right="50rem"
                current={page.page}
                total={page.total}
                pageSize={page.per_page}
                onChange={changePaging}
              />
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
              <ListInvoiceAgencyTable
                navigate={navigate}
                listInvoice={listInvoice}
                changeStatusInvoice={changeStatusInvoice}
                dateTable={currentMonth.format('YYYY-MM-DD')}
                totalTransferAmount={totalPayment}
                onClickTransferAgency={onClickTransferAgency}
                isLoadingTransfer={isLoadingTransfer}
                invoiceInfo={invoiceInfo}
              />
            )}
            {listInvoiceAllDetail?.map((invoice: IAgencyBasicOperatorInvoice, index: number) => (
              <AgencyInvoiceExportTable
                key={invoice?.id}
                invoiceDetail={invoice?.invoice_detail || []}
                invoiceInfo={invoice}
              />
            ))}
          </div>
        </FootstepsHistoryCard>
      </Container>

      <ModalCommon
        isOpen={isOpenOTP}
        setIsOpen={() => setIsOpenOTP(!isOpenOTP)}
        onClickCancel={() => {
          setIsOpenOTP(false);
          setOtp('');
        }}
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
              <CountdownTimer
                startDate={dateDownTime?.now}
                endDate={dateDownTime?.date_timeout}
                onFinish={onFinishCountDown}
              />
            </div>
          )}
        </ModalContainer>
      </ModalCommon>
    </GrantCompanyWrapper>
  );
};
