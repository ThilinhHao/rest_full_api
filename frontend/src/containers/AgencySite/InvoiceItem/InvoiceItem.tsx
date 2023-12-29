import React from 'react';
import { formatMoney } from 'helper/formatMoney';
import { CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import {
  ButtonView,
  DateInvoice,
  InvoiceContent,
  InvoiceItemWrapper,
  ItemContent,
  ItemHeader,
  ItemInvoice,
  ItemMonth,
  StatusInvoice,
  YenItem,
} from './invoiceItemStyle';
import { formatDateCommon, formatDateJP } from 'helper/date';
import { IAgencyBasicOperatorInvoice } from 'constants/invoice';

interface IInvoiceItemProps {
  navigate: any;
  listInvoice: IAgencyBasicOperatorInvoice[];
}

const STATUS_INVOICE_AGENCY_TEXT = [
  '',
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.UNCOMFIRMED,
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.WAITING_OPERATOR_CONFIRM, // operator confirm
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.WAITING_OPERATOR_APPROVED,
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.WAITING_OPERATOR_APPROVED, // operator verify otp
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.WAITING_OPERATOR_APPROVED, // operator verify otp
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.TRANSFER_IN_PROGRESS, // operator verified, system run job
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.TRANSFER_COMPLETED,
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.TRANSFER_COMPLETED_ERROR,
];

const InvoiceItem = ({ navigate, listInvoice = [] }: IInvoiceItemProps): JSX.Element | null => {
  return (
    <InvoiceItemWrapper>
      {listInvoice.map((item: IAgencyBasicOperatorInvoice) => (
        <ItemInvoice key={item.id}>
          <ItemMonth>{formatDateJP(item.year_month, false)}</ItemMonth>
          <InvoiceContent>
            <ItemHeader>
              <DateInvoice>{CONST_LIST_INVOICE_COMPANY.INVOICE_DATE}</DateInvoice>
              <DateInvoice>{CONST_LIST_INVOICE_COMPANY.TRANSFER_DEADLINE}</DateInvoice>
              <StatusInvoice>{CONST_LIST_INVOICE_COMPANY.PROGRESS}</StatusInvoice>
              <YenItem>{CONST_LIST_INVOICE_COMPANY.AMOUNT_WITH_TAX}</YenItem>
            </ItemHeader>
            <ItemContent>
              <DateInvoice>{formatDateCommon(item.release_date)}</DateInvoice>
              <DateInvoice>{formatDateCommon(item.deadline_transfer)}</DateInvoice>
              <StatusInvoice>{STATUS_INVOICE_AGENCY_TEXT[Number(item.status) || 0]}</StatusInvoice>
              <YenItem>{formatMoney(item.total_payment)}</YenItem>
              <ButtonView
                width="7.5rem"
                height="2.5rem"
                fontSize="1.25rem"
                fontWeight="600"
                borderRadius="0.25rem"
                onClick={() => navigate(`/invoices/detail/${item.id}`)}
              >
                {CONST_LIST_INVOICE_COMPANY.CONFIRM_INVOICE}
              </ButtonView>
            </ItemContent>
          </InvoiceContent>
        </ItemInvoice>
      ))}
    </InvoiceItemWrapper>
  );
};

export default InvoiceItem;
