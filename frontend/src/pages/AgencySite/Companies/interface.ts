import { EStatusCompany } from 'constants/constants';

export interface IListCompany {
  id: number;
  code: string;
  name: string;
}

export interface IDetailUserCompany {
  id: number;
  full_name: string;
  name_kana: string;
}
export interface IDetailCompany {
  agency_fee: number;
  code: string;
  id: number;
  usage_plan: number;
  status: EStatusCompany.STATUS_NOTVNVERIFY | EStatusCompany.STATUS_USING | EStatusCompany.STATUS_SUSPEND;
  name: string;
  updated_at: string;
  updated_by: IDetailUserCompany;
  user_root: IDetailUserCompany;
}

export interface ICompanyStatisticalDate {
  company_id: number;
  total_salary: string;
  total_agency_tip: number;
  total_request: number;
  salary_request_ids: string;
  transaction_histories_ids: string;
  date: string;
}
