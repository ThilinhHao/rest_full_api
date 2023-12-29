export interface IFilterPage {
  page: number;
  per_page: number;
  total: number;
  offset: number;
}

export interface IInvoiceDetailSiteCompany {
  id: number;
  staff_name: string;
  fee?: number;
  number_request: number;
  total_payment: number;
  is_total_request_salary?: boolean;
}

export interface ICompanyBasicOperatorInvoice {
  company_address1: string;
  company_address2: string;
  company_id: number;
  company_name: string;
  company_representative_name: string;
  created_at: string;
  deadline_transfer: string;
  end_date: string;
  id: number;
  operator_account_name: string;
  operator_account_number: string;
  operator_address1: string;
  operator_address2: string;
  operator_bank_name: string;
  operator_bank_branch_name: string;
  operator_bank_type: string;
  operator_company_name: string;
  operator_postal_code: string;
  operator_register_code: string;
  operator_representative_email: string;
  operator_representative_name: string;
  operator_representative_phone: string;
  operator_representative_fax: string;
  release_date: string;
  request_date: string;
  year_month: string;
  salary_request_ids: string;
  start_date: string;
  total_amount: number;
  total_payment: number;
  updated_at: string;
  usage_plan: number;
  vat_fee: number;
}

export interface IAgencyBasicOperatorInvoice {
  admin_id: number;
  agency_account_name: string;
  agency_account_number: string;
  agency_address1: string;
  agency_address2: string;
  agency_bank_branch_name: string;
  agency_bank_id: number;
  agency_bank_name: string;
  agency_bank_type: string;
  agency_fax: string;
  agency_id: number;
  agency_name: string;
  agency_postal_code: string;
  agency_register_code: string;
  agency_representative_email: string;
  agency_representative_name: string;
  agency_representative_phone: string;
  created_at: string;
  deadline_transfer: string;
  id: number;
  operator_address1: string;
  operator_address2: string;
  operator_company_name: string;
  operator_id: number;
  operator_representative_name: string;
  release_date: string;
  request_date: string;
  year_month: string;
  status: number;
  total_amount: number;
  total_payment: number;
  updated_at: string;
  updated_by: number;
  vat_fee: number;
  invoice_detail?: IInvoiceDetailInvoiceSiteAgency[];
}

export interface IInvoiceDetailInvoiceSiteAgency {
  id: number;
  company?: {
    name: string;
  };
  fee: number;
  total_amount: number;
  total_payment: number;
  total_request: number;
}

export interface ICompanyOperatorListAllDetailInvoice {
  invoice: ICompanyBasicOperatorInvoice;
  detail?: IInvoiceDetailSiteCompany[];
}

export const DEPOSIT_TYPE = 1;
export const REIMBURSEMENT_TYPE = 2;
export const MAX_ITEM_PAGE_ONE_COMPANY = 22;
export const MAX_ITEM_PAGE_OTHER_COMPANY = 32;
export const MAX_ITEM_PAGE_ONE_AGENCY = 20;
export const MAX_ITEM_PAGE_OTHER_AGENCY = 32;

export const defaultPageInvoiceDetailCompany: IFilterPage = {
  per_page: MAX_ITEM_PAGE_ONE_COMPANY,
  page: 1,
  total: 0,
  offset: 0,
};

export const defaultPageInvoiceDetailAgency: IFilterPage = {
  per_page: MAX_ITEM_PAGE_ONE_AGENCY,
  page: 1,
  total: 0,
  offset: 0,
};
export interface IDownTime {
  date_timeout: string;
  now: string;
  status: number;
}
