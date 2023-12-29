import React from 'react';

import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import useInvoiceDetailSiteAgency from './useInvoiceDetailSiteAgency';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';

import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import { Container } from '@components/Style/Style';
import { SpaceBase } from 'styles';
import { IconFile } from '@components/Icon';
import images from '@assets/images-base';
import { FootstepsHistoryCard } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { TitleHeaderSetting } from '@pages/CompanySite/SettingPage/settingPageStyle';
import { ControlHeaderWrapper } from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import {
  ButtonConfirm,
  ButtonExport,
  DateInvoice,
  HeaderWrapper,
  InvoiceDetailWrapper,
} from './invoiceDetailSiteAgencyStyle';
import { formatDateCommon } from 'helper/date';
import AgencyInvoiceViewTable from '@components/InvoiceTable/InvoiceViewTable/AgencyInvoiceViewTable';
import AgencyInvoiceExportTable from '@components/InvoiceTable/InvoiceExportTable/AgencyInvoiceExportTable';
import { EStatusInvoiceAgency } from 'constants/constants';
import { STATUS_INVOICE_AGENCY_TEXT } from '@containers/OperatorSite/ListInvoiceTable/ListInvoiceAgencyTable';
import { LoadingInvoice } from '@pages/CompanySite/InvoiceDetailSiteCompany/invoiceDetailSiteCompanyStyle';
import { MAX_ITEM_PAGE_ONE_AGENCY, MAX_ITEM_PAGE_OTHER_AGENCY } from 'constants/invoice';

export const InvoiceDetailSiteAgency = () => {
  const {
    BREADS,
    invoiceDetail,
    invoiceAllDetail,
    isLoading,
    page,
    changePaging,
    exportInvoicePDF,
    invoiceInfo,
    isLoadingExport,
    isLoadingConfirm,
    confirmInvoice,
  } = useInvoiceDetailSiteAgency();
  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <FootstepsHistoryCard between={true}>
          <div>
            <HeaderWrapper>
              <div>
                <div className="title-page">
                  <SettingIcon src={images.agencySite.agencyInvoice} />
                  <TitleHeaderSetting>{CONST_LIST_INVOICE_COMPANY.USAGE_INVOICE}</TitleHeaderSetting>
                </div>
                <DateInvoice>
                  {CONST_LIST_INVOICE_COMPANY.INVOICE_CREATED_AT}
                  {formatDateCommon(invoiceInfo?.release_date)}
                </DateInvoice>
              </div>
              <ControlHeaderWrapper padding="1rem 0 1rem 43rem">
                <PaginationRecord
                  right="45rem"
                  current={page.page}
                  total={page.total + (MAX_ITEM_PAGE_OTHER_AGENCY - MAX_ITEM_PAGE_ONE_AGENCY)}
                  pageSize={MAX_ITEM_PAGE_OTHER_AGENCY}
                  onChange={changePaging}
                />
                <ButtonConfirm
                  width="10.375rem"
                  disabled={invoiceInfo?.status !== EStatusInvoiceAgency.UNCOMFIRMED}
                  loading={isLoadingConfirm}
                  onClick={confirmInvoice}
                  icon={invoiceInfo?.status === EStatusInvoiceAgency.UNCOMFIRMED && <IconFile className="iconFile" />}
                >
                  {invoiceInfo?.status === EStatusInvoiceAgency.UNCOMFIRMED
                    ? CONST_LIST_INVOICE_COMPANY.CONFIRM_INVOICE_BTN
                    : STATUS_INVOICE_AGENCY_TEXT[Number(invoiceInfo?.status) || 0]}
                </ButtonConfirm>
                <ButtonExport loading={isLoadingExport} disabled={!invoiceAllDetail} onClick={exportInvoicePDF}>
                  {CONST_LIST_INVOICE_COMPANY.EXPORT_INVOICE_FEE}
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
    </GrantCompanyWrapper>
  );
};
