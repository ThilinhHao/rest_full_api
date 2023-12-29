import React from 'react';
import { SpaceBase } from 'styles';
import {
  DateTxt,
  FooterTableWrapper,
  HeaderExport,
  HeaderTableWrapper,
  LeftHeader,
  LineTable,
  NameRight,
  NotiBill,
  PageNumber,
  RightHeader,
  RowTable,
  SpaceTable,
  SpaceTop,
  TableExportWrapper,
  TableStyled,
  TaxInclude,
  TextAmount,
  TextLeft,
  TextLeftSmaller,
  TextRight,
  TextRightMail,
  TitleTable,
  WrapperBill,
  WrapperMoneyPay,
} from './invoiceViewTableStyle';
import { CONST_EXPORT_INVOICE } from 'constants/language';
import { formatDateCommon, formatDateJP } from 'helper/date';
import { formatMoneyNumber } from 'helper/formatMoney';
import { BANK_ACCOUNT_LABEL, ECompanyBankAccountType } from 'constants/constants';
import { Tooltip } from 'antd';
import { IAgencyBasicOperatorInvoice, IInvoiceDetailInvoiceSiteAgency } from 'constants/invoice';
import { postalCodeFormat } from 'helper/formatPostalCode';

interface IAgencyInvoiceViewTableProps {
  invoiceDetail: IInvoiceDetailInvoiceSiteAgency[];
  invoiceInfo: IAgencyBasicOperatorInvoice;
  currentPage: number;
  pageSize: number;
  isOperatorCompany?: boolean;
}

const AgencyInvoiceViewTable = ({
  invoiceDetail,
  invoiceInfo,
  currentPage,
  pageSize,
  isOperatorCompany,
}: IAgencyInvoiceViewTableProps) => {
  const isFirstPage = currentPage === 1;
  const maxPageSize = pageSize - invoiceDetail.length;
  const RowSpace = () => {
    const menuItems = [];
    for (let i = 0; i < maxPageSize; i++) {
      menuItems.push(
        <RowTable key={String(invoiceDetail.length + i)} index={invoiceDetail.length + i}>
          <tr>
            <td colSpan={1}>
              <div>&nbsp;</div>
            </td>
            <td colSpan={1}>
              <div>&nbsp;</div>
            </td>
            <td colSpan={1}>
              <div>&nbsp;</div>
            </td>
            <td colSpan={1}>
              <div>&nbsp;</div>
            </td>
          </tr>
        </RowTable>
      );
    }
    return <>{menuItems}</>;
  };

  return (
    <>
      <TableExportWrapper>
        <SpaceTop />
        <HeaderExport>
          <LeftHeader>
            <TitleTable>{CONST_EXPORT_INVOICE.TITLE_INVOICE}</TitleTable>
          </LeftHeader>
          {isFirstPage && (
            <RightHeader>
              <DateTxt>
                {CONST_EXPORT_INVOICE.REQUEST_DATE}
                {formatDateCommon(invoiceInfo?.request_date)}
              </DateTxt>
            </RightHeader>
          )}
        </HeaderExport>
        {isFirstPage && (
          <HeaderExport>
            <LeftHeader>
              <TextLeft>&nbsp;</TextLeft>
              <TextLeft>
                {invoiceInfo?.operator_company_name}
                {CONST_EXPORT_INVOICE.YOUR}
              </TextLeft>
              <SpaceBase height={1} />
              <LineTable />

              <TextLeftSmaller>{invoiceInfo?.operator_address1}&nbsp;</TextLeftSmaller>
              <TextLeftSmaller>{invoiceInfo?.operator_address2}&nbsp;</TextLeftSmaller>
              <SpaceBase height={1} />
              <LineTable />

              <NotiBill>{CONST_EXPORT_INVOICE.GUIDE_NOTE_CREATE_BILL}</NotiBill>
              <SpaceBase height={0.813} />

              <WrapperBill>
                <WrapperMoneyPay>
                  <TextLeftSmaller>{CONST_EXPORT_INVOICE.PAY_AMOUNT}</TextLeftSmaller>
                  <SpaceBase width={2.5} />
                  <Tooltip placement="bottomLeft" title={formatMoneyNumber(invoiceInfo?.total_payment || 0)}>
                    <TextAmount>¥ {formatMoneyNumber(invoiceInfo?.total_payment || 0)} -</TextAmount>
                  </Tooltip>
                </WrapperMoneyPay>
                <TaxInclude>{CONST_EXPORT_INVOICE.TAX_INCLUDED}</TaxInclude>
              </WrapperBill>
              <SpaceBase height={0.813} />
              <LineTable />
            </LeftHeader>

            <RightHeader>
              <SpaceBase height={2} />
              {invoiceInfo?.agency_register_code && (
                <TextRight>
                  {CONST_EXPORT_INVOICE.REGISTER_NUMBER}
                  {invoiceInfo?.agency_register_code}
                </TextRight>
              )}
              {invoiceInfo?.agency_name && <NameRight className="resize-name">{invoiceInfo?.agency_name}</NameRight>}
              {invoiceInfo?.agency_representative_name && (
                <TextRight>
                  {isOperatorCompany && CONST_EXPORT_INVOICE.REPRESENTATIVE}
                  {invoiceInfo?.agency_representative_name}&nbsp;
                </TextRight>
              )}
              {invoiceInfo?.agency_postal_code && (
                <TextRight>{postalCodeFormat(invoiceInfo?.agency_postal_code)}&nbsp;</TextRight>
              )}
              {invoiceInfo?.agency_address1 && <TextRight>{invoiceInfo?.agency_address1}&nbsp;</TextRight>}
              {invoiceInfo?.agency_address2 && <TextRight>{invoiceInfo?.agency_address2}&nbsp;</TextRight>}
              {invoiceInfo?.agency_representative_phone && (
                <TextRight>
                  {CONST_EXPORT_INVOICE.PHONE_NUMBER}
                  {invoiceInfo?.agency_representative_phone}
                </TextRight>
              )}
              {invoiceInfo?.agency_fax && (
                <TextRight>
                  {CONST_EXPORT_INVOICE.FAX_NUMBER}
                  {invoiceInfo?.agency_fax}
                </TextRight>
              )}
              {invoiceInfo?.agency_representative_email && (
                <TextRightMail>
                  {CONST_EXPORT_INVOICE.EMAIL}
                  {invoiceInfo?.agency_representative_email}
                </TextRightMail>
              )}
            </RightHeader>
          </HeaderExport>
        )}
        <SpaceBase height={isFirstPage ? 3.125 : 1.5} />
        <TableStyled data-width={10}>
          <HeaderTableWrapper>
            <tr>
              <td colSpan={1}>{CONST_EXPORT_INVOICE.ITEM}</td>
              <td colSpan={1}>{CONST_EXPORT_INVOICE.QUANTITY}</td>
              <td colSpan={1}>{CONST_EXPORT_INVOICE.UNIT_PRICE}</td>
              <td colSpan={1}>{CONST_EXPORT_INVOICE.PRICE}</td>
            </tr>
          </HeaderTableWrapper>
          {invoiceDetail?.map((element: IInvoiceDetailInvoiceSiteAgency, index: number) => (
            <RowTable key={String(index)} index={index}>
              <tr>
                <td colSpan={1}>
                  <div>
                    {element.company?.name}
                    {CONST_EXPORT_INVOICE.SYSTEM_FEE}
                  </div>
                </td>
                <td colSpan={1}>
                  <div>{element.total_request}</div>
                </td>
                <td colSpan={1}>
                  <div>{formatMoneyNumber(element.fee || 0)}</div>
                </td>
                <td colSpan={1}>
                  <div>{formatMoneyNumber(element.total_payment || 0)}</div>
                </td>
              </tr>
            </RowTable>
          ))}
          <RowSpace />
          <SpaceTable />
          {isFirstPage && (
            <FooterTableWrapper>
              <tr>
                <td colSpan={1} rowSpan={3}>
                  <div className="title-footer">
                    <span>{CONST_EXPORT_INVOICE.ABOUT_PAYMENT}</span>
                    <span>
                      &ensp;{formatDateJP(invoiceInfo?.deadline_transfer, true, false)}
                      {CONST_EXPORT_INVOICE.ABOUT_DEADLINE_TRANSFER}
                    </span>
                    <span>
                      &ensp;{CONST_EXPORT_INVOICE.PAYEE}
                      {invoiceInfo?.agency_bank_name} {invoiceInfo?.agency_bank_branch_name} (
                      {BANK_ACCOUNT_LABEL[invoiceInfo?.agency_bank_type || ECompanyBankAccountType.USUALLY]}){' '}
                      {invoiceInfo?.agency_account_number}
                    </span>
                    <span>
                      &ensp;{CONST_EXPORT_INVOICE.ACCOUNT_NAME}
                      {invoiceInfo?.agency_account_name}
                    </span>
                  </div>
                </td>
                <td colSpan={2} className="hasBG">
                  <div className="title">{CONST_EXPORT_INVOICE.SUBTOTAL}</div>
                </td>
                <td colSpan={1} className="hasBG">
                  <div className="amount">{formatMoneyNumber(invoiceInfo?.total_amount || 0)}</div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <div className="title">{CONST_EXPORT_INVOICE.CONSUMPTION_TAX}</div>
                </td>
                <td colSpan={1}>
                  <div className="amount">
                    {formatMoneyNumber(
                      (Number(invoiceInfo?.total_amount || 0) * Number(invoiceInfo?.vat_fee || 0)) / 100
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="hasBG">
                  <div className="title">{CONST_EXPORT_INVOICE.TOTAL_AMOUNT}</div>
                </td>
                <td colSpan={1} className="hasBG">
                  <div className="amount">{formatMoneyNumber(invoiceInfo?.total_payment || 0)}</div>
                </td>
              </tr>
            </FooterTableWrapper>
          )}
        </TableStyled>
        <PageNumber>{currentPage}</PageNumber>
      </TableExportWrapper>
    </>
  );
};

export default AgencyInvoiceViewTable;
