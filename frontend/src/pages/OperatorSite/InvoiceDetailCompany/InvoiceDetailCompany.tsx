import React from 'react';

import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import useInvoiceDetailCompany from './useInvoiceDetailCompany';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';

import { CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import { Container } from '@components/Style/Style';
import { SpaceBase } from 'styles';
import { FootstepsHistoryCard } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { ControlHeaderWrapper } from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import {
  ButtonExport,
  DateInvoice,
  HeaderWrapper,
  InvoiceDetailWrapper,
  TitleHeader,
} from './invoiceDetailCompanyStyle';
import images from '@assets/images-base';
import CompanyInvoiceViewTable from '@components/InvoiceTable/InvoiceViewTable/CompanyInvoiceViewTable';
import CompanyInvoiceExportTable from '@components/InvoiceTable/InvoiceExportTable/CompanyInvoiceExportTable';
import { formatDateCommon } from 'helper/date';
import { LoadingInvoice } from '@pages/CompanySite/InvoiceDetailSiteCompany/invoiceDetailSiteCompanyStyle';
import { MAX_ITEM_PAGE_ONE_COMPANY, MAX_ITEM_PAGE_OTHER_COMPANY } from 'constants/invoice';

export const InvoiceDetailCompany = () => {
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
    isLoadingInvoiceAllDetail,
  } = useInvoiceDetailCompany();

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <FootstepsHistoryCard between={true}>
          <div>
            <HeaderWrapper>
              <div>
                <div className="title-page">
                  <img className="header-icon" src={images.sideBar.usageInformation} alt="" />
                  <TitleHeader>
                    {invoiceInfo?.company_name}　{CONST_LIST_INVOICE_COMPANY.INVOICE_CONTENT}
                  </TitleHeader>
                </div>
                <DateInvoice>
                  {CONST_LIST_INVOICE_COMPANY.INVOICE_CREATED_AT}
                  {formatDateCommon(invoiceInfo?.release_date)}
                </DateInvoice>
              </div>
              <ControlHeaderWrapper padding="1rem 0 1rem 33rem">
                <PaginationRecord
                  right="50rem"
                  current={page.page}
                  total={page.total + (MAX_ITEM_PAGE_OTHER_COMPANY - MAX_ITEM_PAGE_ONE_COMPANY)}
                  pageSize={MAX_ITEM_PAGE_OTHER_COMPANY}
                  onChange={changePaging}
                />
                <ButtonExport
                  margin="0 0 0 4.313rem"
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
                <CompanyInvoiceViewTable
                  invoiceDetail={invoiceDetail || []}
                  invoiceInfo={invoiceInfo}
                  currentPage={page.page}
                  pageSize={page.page === 1 ? MAX_ITEM_PAGE_ONE_COMPANY : MAX_ITEM_PAGE_OTHER_COMPANY}
                  isOperatorCompany
                />
              )}
              {invoiceInfo && (
                <CompanyInvoiceExportTable
                  invoiceDetail={invoiceAllDetail || []}
                  invoiceInfo={invoiceInfo}
                  isOperatorCompany
                />
              )}
            </InvoiceDetailWrapper>
          </div>
        </FootstepsHistoryCard>
      </Container>
    </GrantCompanyWrapper>
  );
};
