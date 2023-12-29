import React from 'react';
import {
  CompanyName,
  DateInvoice,
  DateListInvoice,
  HeaderTable,
  InvoiceItemWrapper,
  ItemContent,
  ItemHeader,
  ListInvoiceTableWrapper,
  UsagePlan,
  YenItem,
} from './listInvoiceTableStyle';
import { CONST_LIST_INVOICE_COMPANY, CONST_OPERATOR_INVOICE } from 'constants/language';
import { ButtonView } from '@containers/AgencySite/InvoiceItem/invoiceItemStyle';
import { formatMoney } from 'helper/formatMoney';
import { formatDateCommon, formatDateJP } from 'helper/date';
import { Tooltip } from 'antd';
import { ICompanyBasicOperatorInvoice } from 'constants/invoice';

interface IListInvoiceCompanyTableProps {
  navigate: any;
  listInvoice: ICompanyBasicOperatorInvoice[];
  dateTable?: string;
}

const USAGE_PLAN_AGENCY_TEXT = ['', CONST_OPERATOR_INVOICE.DEPOSIT, CONST_OPERATOR_INVOICE.REIMBURSEMENT];

export const ListInvoiceCompanyTable = ({ navigate, listInvoice, dateTable }: IListInvoiceCompanyTableProps) => {
  return (
    <ListInvoiceTableWrapper>
      <HeaderTable>
        <DateListInvoice>
          {formatDateJP(dateTable, false, false)}　{CONST_LIST_INVOICE_COMPANY.LIST_INVOICE}
        </DateListInvoice>
      </HeaderTable>
      <InvoiceItemWrapper>
        <ItemHeader>
          <CompanyName>{CONST_OPERATOR_INVOICE.LIST_INVOICE_COMPANY_TABLE.COMPANY_NAME}</CompanyName>
          <DateInvoice>{CONST_OPERATOR_INVOICE.LIST_INVOICE_COMPANY_TABLE.BILLING_DATE}</DateInvoice>
          <DateInvoice>{CONST_OPERATOR_INVOICE.LIST_INVOICE_COMPANY_TABLE.TRANSFER_DEADLINE}</DateInvoice>
          <YenItem>{CONST_OPERATOR_INVOICE.LIST_INVOICE_COMPANY_TABLE.TRANSFER_AMOUNT}</YenItem>
          <UsagePlan>{CONST_OPERATOR_INVOICE.LIST_INVOICE_COMPANY_TABLE.USAGE_PLAN}</UsagePlan>
        </ItemHeader>
        {listInvoice.map((item: ICompanyBasicOperatorInvoice, index: number) => (
          <ItemContent key={item.id} className={index % 2 === 1 ? 'hasBG' : ''}>
            <Tooltip placement="leftTop" title={item.company_name}>
              <CompanyName>{item.company_name}</CompanyName>
            </Tooltip>
            <DateInvoice>{formatDateCommon(item.release_date)}</DateInvoice>
            <DateInvoice>{formatDateCommon(item.deadline_transfer)}</DateInvoice>
            <YenItem>{formatMoney(item.total_payment || 0)}</YenItem>
            <UsagePlan>{USAGE_PLAN_AGENCY_TEXT[Number(item.usage_plan) || 0]}</UsagePlan>
            <ButtonView
              fontSize="1.25rem"
              fontWeight="500"
              height="2.5rem"
              width="7.5rem"
              borderRadius="0.25rem"
              onClick={() => navigate(`/company-invoices/detail/${item.id}`)}
            >
              {CONST_LIST_INVOICE_COMPANY.CONFIRM_INVOICE}
            </ButtonView>
          </ItemContent>
        ))}
      </InvoiceItemWrapper>
    </ListInvoiceTableWrapper>
  );
};
