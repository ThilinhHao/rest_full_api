interface ICompanyBankInformation {
  account_name: string;
  account_number: string;
  bank_branches_code: string;
  bank_branches_name: string;
  bank_branches_id: string;
  bank_code: string;
  bank_name: string;
  bank_id: string;
  bank_type: number;
  company_id: number;
  seven_user_id?: string;
}

interface ICompanyDocumentInformation {
  company_id: number;
  link: string;
  name: string;
  status: number;
}

interface ICompanyRootUserInformation {
  id: number;
  code: string;
  company_id: number;
  email: string;
  full_name: string;
  name_kana: string;
  phone: string;
  status: number;
}

interface ICompanyAgencyInformation {
  id: number;
  name: string;
  code: string;
  user_root: {
    id: number;
    full_name: string;
    name_kana: string | null;
  };
}

export interface ICompanyProfile {
  id: number;
  name: string;
  parent_id?: number;
  postal_code: string;
  status: number;
  usage_plan: number;
  is_setting_bank: number;
  address1?: string;
  address2?: string;
  agency?: ICompanyAgencyInformation;
  agency_fee?: number;
  agency_id?: number;
  code: string;
  bank: ICompanyBankInformation;
  documents: ICompanyDocumentInformation[];
  user_root: ICompanyRootUserInformation;
}
