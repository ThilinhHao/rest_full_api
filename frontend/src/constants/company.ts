import { EStatusCompany } from './constants';
import { CONST_LIST_COMPANY } from './language';

export const COMPANY_STATUS = {
  [EStatusCompany.STATUS_NOTVNVERIFY]: CONST_LIST_COMPANY.STATUS_NOTVNVERIFY,
  [EStatusCompany.STATUS_USING]: CONST_LIST_COMPANY.STATUS_USING,
  [EStatusCompany.STATUS_SUSPEND]: CONST_LIST_COMPANY.STATUS_SUSPEND,
  [EStatusCompany.STATUS_REJECT]: CONST_LIST_COMPANY.REJECT_ACCOUNT,
};

export const DAY_OF_WEEK = 7;
export const HASH_WEEK = {
  0: '(日)',
  1: '(月)',
  2: '(火)',
  3: '(水)',
  4: '(木)',
  5: '(金)',
  6: '(土)',
};

export const STATUS_COMPANY_PAIR_B2B = {
  status_new: 1,
  status_cancel: 4,
  status_reject: 5,
  status_pair: 6,
  status_disconnect: 7,
  status_delete: 8,
};

export const STATUS_COMPANY_PAIR_B2B_DELETE = [
  STATUS_COMPANY_PAIR_B2B.status_cancel,
  STATUS_COMPANY_PAIR_B2B.status_disconnect,
  STATUS_COMPANY_PAIR_B2B.status_delete,
];

export const MIN_NUMBER_MESSAGE_IN_PAGE = 15;

export interface ICompanyDetailInfo {
  id: number;
  name: string;
  code: string;
  postal_code: string;
  address1: string;
  address2: string;
  user_root?: {
    id: number;
    full_name: string;
    code: string;
    email: string;
    name_kana: string;
    status: number;
  };
  company_bank?: {
    account_name: string;
    account_number: string;
    agency_id: number;
    bank_branches_code: string;
    bank_code: string;
    bank_type: number;
    bank_name: string;
    bank_branches_name: string;
  };
  company_setting?: {
    id: number;
    created_at: string;
    prepaid_salary_afternoon: number;
    prepaid_salary_month: number;
    prepaid_salary_morning: number;
    salary_day: number;
    salary_type: number;
  };
}

export interface IListCompanyB2BPaired {
  id: number;
  status: number;
  name: string;
  code: string;
  salary_type: number;
}
