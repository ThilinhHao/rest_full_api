import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import CompanyInvoiceViewTable from '@components/InvoiceTable/InvoiceViewTable/CompanyInvoiceViewTable';
import CompanyInvoiceExportTable from '@components/InvoiceTable/InvoiceExportTable/CompanyInvoiceExportTable';
import useInvoiceDetailSiteCompany from './useInvoiceDetailSiteCompany';

import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { TitleHeaderSetting } from '../SettingPage/settingPageStyle';
import { Container, GrantCard } from '@components/Style/Style';
import { HeaderSettingWrapper } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import { SpaceBase } from 'styles';
import { ControlHeaderWrapper } from '../AttendanceRecord/attendanceRecordStyle';
import { ButtonView } from '@containers/CompanySite/InvoiceItem/invoiceItemStyle';
import { DateInvoice, InvoiceDetailWrapper, LoadingInvoice } from './invoiceDetailSiteCompanyStyle';
import { formatDateCommon } from 'helper/date';
import { MAX_ITEM_PAGE_ONE_COMPANY, MAX_ITEM_PAGE_OTHER_COMPANY } from 'constants/invoice';

export const InvoiceDetailSiteCompany = () => {
  const {
    BREADS,
    invoiceDetail,
    invoiceAllDetail,
    isLoading,
    page,
    changePaging,
    exportInvoicePDF,
    isLoadingExport,
    isLoadingAllDetail,
    invoiceInfo,
  } = useInvoiceDetailSiteCompany();

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard padding="1.25rem 0rem" percentWidth="100%" width={106.25}>
          <div>
            <HeaderSettingWrapper>
              <SettingIcon src={images.companySite.settingTermOfUseCompany} />
              <TitleHeaderSetting>
                {invoiceInfo?.company_name}　{CONST_LIST_INVOICE_COMPANY.INVOICE_CONTENT}
              </TitleHeaderSetting>
            </HeaderSettingWrapper>
            <InvoiceDetailWrapper>
              <ControlHeaderWrapper padding="0.75rem 14.375rem 0.75rem 10.625rem">
                <PaginationRecord
                  right="50rem"
                  current={page.page}
                  total={page.total + (MAX_ITEM_PAGE_OTHER_COMPANY - MAX_ITEM_PAGE_ONE_COMPANY)}
                  pageSize={MAX_ITEM_PAGE_OTHER_COMPANY}
                  onChange={changePaging}
                />
                <ButtonView
                  className="export"
                  width="18.75rem"
                  // icon={<span className="square"></span>}
                  loading={isLoadingExport}
                  disabled={isLoadingAllDetail || !invoiceInfo}
                  onClick={exportInvoicePDF}
                >
                  {CONST_LIST_INVOICE_COMPANY.EXPORT_INVOICE}
                </ButtonView>
              </ControlHeaderWrapper>
              {isLoading && (
                <LoadingInvoice>
                  <SpaceBase height={5} />
                  <Loading />
                </LoadingInvoice>
              )}
              <SpaceBase height={2.5} />
              <DateInvoice>
                {CONST_LIST_INVOICE_COMPANY.INVOICE_CREATED_AT}
                {formatDateCommon(invoiceInfo?.release_date)}
              </DateInvoice>
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
                <CompanyInvoiceExportTable invoiceDetail={invoiceAllDetail || []} invoiceInfo={invoiceInfo} isOperatorCompany/>
              )}
            </InvoiceDetailWrapper>
          </div>
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};
