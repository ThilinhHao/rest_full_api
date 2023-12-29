import React from 'react';

import { formatMoney } from 'helper/formatMoney';
import { CONST_EXPORT_INVOICE, CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import {
  AmountFee,
  ButtonView,
  InvoiceItemWrapper,
  ItemContent,
  ItemHeader,
  ItemInvoice,
  NameItemInvoice,
  YenItem,
} from './invoiceItemStyle';
import { formatDateJP } from 'helper/date';
import { ICompanyBasicOperatorInvoice } from 'constants/invoice';

interface IInvoiceItemProps {
  navigate: any;
  isLoading: boolean;
  listInvoice: ICompanyBasicOperatorInvoice[];
}

const InvoiceItem = ({ navigate, listInvoice, isLoading }: IInvoiceItemProps) => {
  return (
    <InvoiceItemWrapper>
      {listInvoice.map((element: ICompanyBasicOperatorInvoice) => (
        <ItemInvoice key={String(element.id)}>
          <ItemHeader>
            {formatDateJP(element.start_date, false)}　　{CONST_EXPORT_INVOICE.USAGE_REQUEST} (
            {formatDateJP(element.start_date)} 〜 {formatDateJP(element.end_date)})
          </ItemHeader>
          <ItemContent>
            <NameItemInvoice>{element.company_name}</NameItemInvoice>
            <AmountFee>{CONST_LIST_INVOICE_COMPANY.AMOUT_FEE}</AmountFee>
            <YenItem>{formatMoney(element.total_payment)}</YenItem>
            <ButtonView onClick={() => navigate(`/invoices/detail/${element.id}`)}>
              {CONST_LIST_INVOICE_COMPANY.CONFIRM_INVOICE}
            </ButtonView>
          </ItemContent>
        </ItemInvoice>
      ))}
    </InvoiceItemWrapper>
  );
};

export default InvoiceItem;
