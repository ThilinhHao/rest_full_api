import React from 'react';
import { HeaderExport, HeaderTableWrapper, RowTable, SpaceTable, TableStyled } from './invoiceExportTableStyle';
import { CONST_EXPORT_INVOICE } from 'constants/language';
import { formatMoneyNumber } from 'helper/formatMoney';
import { formatDateJP } from 'helper/date';
import { BANK_ACCOUNT_LABEL, ECompanyBankAccountType } from 'constants/constants';
import {
  IAgencyBasicOperatorInvoice,
  IInvoiceDetailInvoiceSiteAgency,
  MAX_ITEM_PAGE_ONE_AGENCY,
  MAX_ITEM_PAGE_OTHER_AGENCY,
} from 'constants/invoice';
import { postalCodeFormat } from 'helper/formatPostalCode';

interface IAgencyInvoiceExportTableProps {
  invoiceDetail: IInvoiceDetailInvoiceSiteAgency[];
  invoiceInfo: IAgencyBasicOperatorInvoice;
  isAgencySite?: boolean;
}

const AgencyInvoiceExportTable = ({ invoiceDetail, invoiceInfo, isAgencySite }: IAgencyInvoiceExportTableProps) => {
  const maxPageSize = MAX_ITEM_PAGE_ONE_AGENCY - invoiceDetail.length;
  const minRightColumnSpace = 7;

  // count attribute has value in invoiceInfo
  const countAttributeHasValue = () => {
    let count = 0;
    if (invoiceInfo?.agency_register_code) count++;
    if (invoiceInfo?.agency_name) count++;
    if (invoiceInfo?.agency_representative_name) count++;
    if (invoiceInfo?.agency_postal_code) count++;
    if (invoiceInfo?.agency_address1) count++;
    if (invoiceInfo?.agency_address2) count++;
    if (invoiceInfo?.agency_representative_phone) count++;
    if (invoiceInfo?.agency_fax) count++;
    if (invoiceInfo?.agency_representative_email) count++;
    return count;
  };

  // render right column space
  const rightColumnSpace = ({ numberRow }: { numberRow: number }) => {
    if (!numberRow) return <></>;
    const menuItems = [];
    for (let i = 0; i < numberRow; i++) {
      menuItems.push(
        <tr>
          <td>&nbsp;</td>
        </tr>
      );
    }
    return <>{menuItems}</>;
  };

  const RowSpace = ({ numberRow }: { numberRow: number }) => {
    if (!numberRow) return <></>;
    const menuItems = [];
    for (let i = 0; i < numberRow; i++) {
      menuItems.push(
        <tr>
          <td colSpan={10}>
            <div>&nbsp;</div>
          </td>
          <td colSpan={2}>
            <div>&nbsp;</div>
          </td>
          <td colSpan={3}>
            <div>&nbsp;</div>
          </td>
          <td colSpan={4}>
            <div>&nbsp;</div>
          </td>
        </tr>
      );
    }
    return <>{menuItems}</>;
  };
  return (
    <>
      <HeaderExport id={`InvoiceExportLeftHeader${invoiceInfo.id}`} className="InvoiceExportLeftHeader">
        <tbody>
          <tr>
            <td colSpan={4}>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan={4}>
              {invoiceInfo?.operator_company_name}
              {CONST_EXPORT_INVOICE.YOUR}
            </td>
          </tr>
          <tr>
            <td colSpan={4}>——————————————————————————————</td>
          </tr>
          <tr>
            <td colSpan={4}>{invoiceInfo?.operator_address1}&nbsp;</td>
          </tr>
          <tr>
            <td colSpan={4}>{invoiceInfo?.operator_address2}&nbsp;</td>
          </tr>
          <tr>
            <td colSpan={4}>——————————————————————————————</td>
          </tr>
          <tr>
            <td colSpan={4}>{CONST_EXPORT_INVOICE.GUIDE_NOTE_CREATE_BILL}</td>
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td colSpan={1}>{CONST_EXPORT_INVOICE.PAY_AMOUNT}</td>
            <td colSpan={1}>¥ {formatMoneyNumber(invoiceInfo?.total_payment || 0)} -</td>
            <td colSpan={1}>{CONST_EXPORT_INVOICE.TAX_INCLUDED}</td>
          </tr>
          <tr>
            <td colSpan={4}>——————————————————————————————</td>
          </tr>
        </tbody>
      </HeaderExport>
      <HeaderExport id={`InvoiceExportRightHeader${invoiceInfo.id}`} className="InvoiceExportRightHeader">
        <tbody>
          {invoiceInfo?.agency_register_code && (
            <tr>
              <td>
                {CONST_EXPORT_INVOICE.REGISTER_NUMBER}
                {invoiceInfo?.agency_register_code}
              </td>
            </tr>
          )}
          {invoiceInfo?.agency_name && (
            <tr>
              <td className="resize">{invoiceInfo?.agency_name}</td>
            </tr>
          )}
          {invoiceInfo?.agency_representative_name && (
            <tr>
              <td>
                {isAgencySite && CONST_EXPORT_INVOICE.REPRESENTATIVE}
                {invoiceInfo?.agency_representative_name}&nbsp;
              </td>
            </tr>
          )}
          {invoiceInfo?.agency_postal_code && (
            <tr>
              <td>{postalCodeFormat(invoiceInfo?.agency_postal_code)}&nbsp;</td>
            </tr>
          )}
          {invoiceInfo?.agency_address1 && (
            <tr>
              <td>{invoiceInfo?.agency_address1}&nbsp;</td>
            </tr>
          )}
          {invoiceInfo?.agency_address2 && (
            <tr>
              <td>{invoiceInfo?.agency_address2}&nbsp;</td>
            </tr>
          )}
          {invoiceInfo?.agency_representative_phone && (
            <tr>
              <td>
                {CONST_EXPORT_INVOICE.PHONE_NUMBER}
                {invoiceInfo?.agency_representative_phone}
              </td>
            </tr>
          )}
          {invoiceInfo?.agency_fax && (
            <tr>
              <td>
                {CONST_EXPORT_INVOICE.FAX_NUMBER}
                {invoiceInfo?.agency_fax}
              </td>
            </tr>
          )}
          {invoiceInfo?.agency_representative_email && (
            <tr>
              <td>
                {CONST_EXPORT_INVOICE.EMAIL}
                {invoiceInfo?.agency_representative_email}
              </td>
            </tr>
          )}
          {rightColumnSpace({ numberRow: minRightColumnSpace - countAttributeHasValue() })}
        </tbody>
      </HeaderExport>
      <TableStyled id={`InvoiceExportTable${invoiceInfo.id}`} className="InvoiceExportTable" data-width={10}>
        <HeaderTableWrapper isExport={true}>
          <tr>
            <td colSpan={10}>{CONST_EXPORT_INVOICE.ITEM}</td>
            <td colSpan={2}>{CONST_EXPORT_INVOICE.QUANTITY}</td>
            <td colSpan={3}>{CONST_EXPORT_INVOICE.UNIT_PRICE}</td>
            <td colSpan={4}>{CONST_EXPORT_INVOICE.PRICE}</td>
          </tr>
        </HeaderTableWrapper>
        <RowTable>
          {invoiceDetail
            ?.slice(0, MAX_ITEM_PAGE_ONE_AGENCY)
            ?.map((element: IInvoiceDetailInvoiceSiteAgency, index: number) => (
              <tr key={String(index)}>
                <td colSpan={10} className="nameItem">
                  <div>
                    {element.company?.name}
                    {CONST_EXPORT_INVOICE.SYSTEM_FEE}
                  </div>
                </td>
                <td colSpan={2}>
                  <div>{element.total_request}</div>
                </td>
                <td colSpan={3}>
                  <div>{formatMoneyNumber(element.fee || 0)}</div>
                </td>
                <td colSpan={4}>
                  <div>{formatMoneyNumber(element.total_payment || 0)}</div>
                </td>
              </tr>
            ))}
          <RowSpace numberRow={maxPageSize} />
          <tr>
            <td colSpan={10} rowSpan={3}>
              <div>——————————————————————————————————</div>
              <br />
              <div>{CONST_EXPORT_INVOICE.ABOUT_PAYMENT}</div>
              <br />
              <div>
                {' '}
                  {formatDateJP(invoiceInfo?.deadline_transfer, true, false)}
                {CONST_EXPORT_INVOICE.ABOUT_DEADLINE_TRANSFER}
              </div>
              <br />
              <div>
                {' '}
                  {CONST_EXPORT_INVOICE.PAYEE}
                {invoiceInfo?.agency_bank_name} {invoiceInfo?.agency_bank_branch_name} (
                {BANK_ACCOUNT_LABEL[invoiceInfo?.agency_bank_type || ECompanyBankAccountType.USUALLY]}){' '}
                {invoiceInfo?.agency_account_number}
              </div>
              <br />
              <div>
                {' '}
                  {CONST_EXPORT_INVOICE.ACCOUNT_NAME}
                {invoiceInfo?.agency_account_name}
              </div>
              <br />
              <div>——————————————————————————————————</div>
            </td>
            <td className="hasBG" colSpan={5}>
              <div>{CONST_EXPORT_INVOICE.SUBTOTAL}</div>
            </td>
            <td className="hasBG" colSpan={4}>
              <div>{formatMoneyNumber(invoiceInfo?.total_amount || 0)}</div>
            </td>
          </tr>
          <tr>
            <td className="noBG" colSpan={5}>
              <div>{CONST_EXPORT_INVOICE.CONSUMPTION_TAX}</div>
            </td>
            <td className="noBG" colSpan={4}>
              <div>
                {formatMoneyNumber((Number(invoiceInfo?.total_amount || 0) * Number(invoiceInfo?.vat_fee || 0)) / 100)}
              </div>
            </td>
          </tr>
          <tr>
            <td className="hasBG" colSpan={5}>
              <div>{CONST_EXPORT_INVOICE.TOTAL_AMOUNT}</div>
            </td>
            <td className="hasBG" colSpan={4}>
              <div>{formatMoneyNumber(invoiceInfo?.total_payment || 0)}</div>
            </td>
          </tr>
          {invoiceDetail
            ?.slice(MAX_ITEM_PAGE_ONE_AGENCY)
            ?.map((element: IInvoiceDetailInvoiceSiteAgency, index: number) => (
              <tr key={String(index)}>
                <td colSpan={10} className="nameItem">
                  <div>
                    {element.company?.name}
                    {CONST_EXPORT_INVOICE.SYSTEM_FEE}
                  </div>
                </td>
                <td colSpan={2}>
                  <div>{element.total_request}</div>
                </td>
                <td colSpan={3}>
                  <div>{formatMoneyNumber(element.fee || 0)}</div>
                </td>
                <td colSpan={4}>
                  <div>{formatMoneyNumber(Number(element.fee || 0) * Number(element.total_request || 0))}</div>
                </td>
              </tr>
            ))}
          <RowSpace
            numberRow={
              invoiceDetail.length > MAX_ITEM_PAGE_ONE_AGENCY
                ? MAX_ITEM_PAGE_OTHER_AGENCY *
                    Math.ceil((invoiceDetail.length - MAX_ITEM_PAGE_ONE_AGENCY) / MAX_ITEM_PAGE_OTHER_AGENCY) -
                  (invoiceDetail.length - MAX_ITEM_PAGE_ONE_AGENCY)
                : 0
            }
          />
        </RowTable>
        <SpaceTable />
      </TableStyled>
    </>
  );
};

export default AgencyInvoiceExportTable;
