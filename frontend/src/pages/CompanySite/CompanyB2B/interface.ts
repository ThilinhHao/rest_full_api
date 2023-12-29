export interface IListCompanyB2B {
  id: number;
  status: number;
  company_id: number;
  company_paired_id: number;
  created_at: string;
  updated_at: string;
  company_name: string;
  company_code: string;
  company_b2b_name: string;
  company_b2b_code: string;
}

export interface IDataListCompanyB2B {
  total: number;
  per_page: number;
  page: number;
  last_page: number;
  path: string;
  data?: IListCompanyB2B[];
}

export interface IDataCompanyB2BConfirm {
  pair_info: IListCompanyB2B;
  status: number;
}
