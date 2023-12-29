import React from 'react';
import {
  ChangeStatus,
  AgencyName,
  DateInvoice,
  DateListInvoice,
  HeaderTable,
  InvoiceItemWrapper,
  ItemContent,
  ItemHeader,
  ListInvoiceTableWrapper,
  StatusInvoice,
  SwitchStatus,
  TotalAmountTable,
  YenItem,
  SwitchStatusError,
  SwitchStatusVerifyOTP,
} from './listInvoiceTableStyle';
import { CONST_LIST_INVOICE_COMPANY, CONST_OPERATOR_INVOICE } from 'constants/language';
import { ButtonView } from '@containers/AgencySite/InvoiceItem/invoiceItemStyle';
import { formatMoney } from 'helper/formatMoney';
import { formatDateCommon, formatDateJP } from 'helper/date';
import { EStatusInvoiceAgency } from 'constants/constants';
import { Tooltip } from 'antd';
import { IAgencyBasicOperatorInvoice } from 'constants/invoice';
import Loading from '@components/Loading';
// import { showConfirm } from 'helper/modal-confirm';

interface IListInvoiceAgencyTableProps {
  navigate: any;
  listInvoice: IAgencyBasicOperatorInvoice[];
  totalTransferAmount: number;
  dateTable: string;
  changeStatusInvoice: (id: number) => Promise<void>;
  onClickTransferAgency: any;
  isLoadingTransfer: any;
  invoiceInfo: any;
}

export const STATUS_INVOICE_AGENCY_TEXT = [
  CONST_LIST_INVOICE_COMPANY.CONFIRM_INVOICE_BTN,
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.UNCOMFIRMED,
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.WAITING_OPERATOR_CONFIRM, // operator confirm
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.WAITING_OPERATOR_APPROVED,
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.WAITING_OPERATOR_APPROVED, // operator verify otp
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.WAITING_OPERATOR_APPROVED, // operator verifed
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.TRANSFER_IN_PROGRESS, // system run job
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.TRANSFER_COMPLETED,
  CONST_LIST_INVOICE_COMPANY.STATUS_INVOICE_AGENCY.TRANSFER_COMPLETED_ERROR,
];

export const ListInvoiceAgencyTable = ({
  navigate,
  listInvoice,
  dateTable,
  totalTransferAmount,
  changeStatusInvoice,
  onClickTransferAgency,
  isLoadingTransfer,
  invoiceInfo,
}: IListInvoiceAgencyTableProps) => {
  // const confirmStatusInvoice = (id: number, agencyName?: string) => {
  //   showConfirm({
  //     title: agencyName,
  //     content: CONST_OPERATOR_INVOICE.LIST_INVOICE_COMPANY_TABLE.TXT_CONFIRM_TRANSACTION_SUCCESS,
  //     okText: CONST_OPERATOR_INVOICE.LIST_INVOICE_COMPANY_TABLE.TXT_CONFIRM_OK,
  //     cancelText: CONST_OPERATOR_INVOICE.LIST_INVOICE_COMPANY_TABLE.TXT_CONFIRM_CANCEL,
  //     className: 'ConfirmStatusInvoice',
  //     closable: false,
  //     onOk: () => {
  //       changeStatusInvoice(id);
  //     },
  //   });
  // };

  return (
    <ListInvoiceTableWrapper>
      <HeaderTable>
        <DateListInvoice>
          {formatDateJP(dateTable, false, false)}　{CONST_LIST_INVOICE_COMPANY.LIST_INVOICE}
        </DateListInvoice>
        <TotalAmountTable>
          {CONST_OPERATOR_INVOICE.TOTAL_TRANSFER_AMOUNT}：{formatMoney(totalTransferAmount || 0)}
        </TotalAmountTable>
      </HeaderTable>
      <InvoiceItemWrapper>
        <ItemHeader>
          <AgencyName>{CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.COMPANY_NAME}</AgencyName>
          <StatusInvoice>{CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.STATUS}</StatusInvoice>
          <DateInvoice>{CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.BILLING_DATE}</DateInvoice>
          <DateInvoice>{CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.TRANSFER_DEADLINE}</DateInvoice>
          <YenItem>{CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.TRANSFER_AMOUNT}</YenItem>
          <ChangeStatus>{CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.TRANSFER_CHECK}</ChangeStatus>
        </ItemHeader>
        {listInvoice.map((item: IAgencyBasicOperatorInvoice, index: number) => (
          <ItemContent key={item.id} className={index % 2 === 1 ? 'hasBG' : ''}>
            <Tooltip placement="leftTop" title={item?.agency_name || item?.agency_representative_name}>
              <AgencyName>{item?.agency_name || item?.agency_representative_name}</AgencyName>
            </Tooltip>
            <StatusInvoice>{STATUS_INVOICE_AGENCY_TEXT[Number(item.status) || 0]}</StatusInvoice>
            <DateInvoice>{formatDateCommon(item.release_date)}</DateInvoice>
            <DateInvoice>{formatDateCommon(item.deadline_transfer)}</DateInvoice>
            <YenItem>{formatMoney(item.total_payment || 0)}</YenItem>
            <ChangeStatus>
              {isLoadingTransfer && invoiceInfo.id === item.id && <Loading type={true} />}

              {isLoadingTransfer &&
                invoiceInfo.id !== item.id &&
                (item.status < EStatusInvoiceAgency.OPERATOR_APPROVED ||
                  item.status === EStatusInvoiceAgency.WAITING_OPERATOR_VERIFIED ||
                  item.status === EStatusInvoiceAgency.TRANSFER_IN_PROGRESS) && (
                  <SwitchStatus disabled={true} checked={false} />
                )}

              {!isLoadingTransfer && item.status < EStatusInvoiceAgency.OPERATOR_APPROVED && (
                <SwitchStatus disabled={true} checked={false} />
              )}

              {!isLoadingTransfer && item.status === EStatusInvoiceAgency.OPERATOR_APPROVED && (
                <SwitchStatus disabled={false} checked={false} onClick={() => onClickTransferAgency(item)} />
              )}

              {!isLoadingTransfer && item.status === EStatusInvoiceAgency.WAITING_OPERATOR_VERIFY && (
                <SwitchStatusVerifyOTP disabled={false} checked={true} onClick={() => onClickTransferAgency(item)} />
              )}

              {!isLoadingTransfer && item.status === EStatusInvoiceAgency.WAITING_OPERATOR_VERIFIED && (
                <SwitchStatusVerifyOTP disabled={true} checked={true} />
              )}

              {!isLoadingTransfer && item.status === EStatusInvoiceAgency.TRANSFER_COMPLETED && (
                <SwitchStatus disabled={true} checked={true} />
              )}

              {!isLoadingTransfer && item.status === EStatusInvoiceAgency.TRANSFER_ERROR && (
                <SwitchStatusError disabled={false} checked={false} onClick={() => onClickTransferAgency(item)} />
              )}
            </ChangeStatus>
            <ButtonView
              fontSize="1.25rem"
              fontWeight="500"
              height="2.5rem"
              width="7.5rem"
              borderRadius="0.25rem"
              onClick={() => navigate(`/agency-invoices/detail/${item.id}`)}
            >
              {item?.status === EStatusInvoiceAgency.WAITING_OPERATOR_CONFIRM && (
                <span className="notConfirmBtn">1</span>
              )}
              {CONST_LIST_INVOICE_COMPANY.CONFIRM_INVOICE}
            </ButtonView>
          </ItemContent>
        ))}
      </InvoiceItemWrapper>
    </ListInvoiceTableWrapper>
  );
};
