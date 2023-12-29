import { EBankType } from './constants';

export const OPTION_EDIT_PROFILE = [
  {
    value: EBankType.USUALLY,
    label: '普通',
  },
  {
    value: EBankType.CURRENT,
    label: '当座',
  },
];

export interface IAgencyDetailInfo {
  id: number;
  name: string;
  code: string;
  postal_code: string;
  register_code: string;
  address1: string;
  address2: string;
  fax: string;
  user_root?: {
    id: number;
    full_name: string;
    code: string;
    phone: string;
    email: string;
    name_kana: string;
  };
  agency_bank?: {
    account_name: string;
    account_number: string;
    agency_id: number;
    bank_branches_code: string;
    bank_code: string;
    bank_type: number;
    bank_name: string;
    bank_branches_name: string;
  };
}
