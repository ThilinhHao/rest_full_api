import { EAccountType } from './constants';
import { CONST_OPERATOR_BANK } from './language';

export interface ISettingData {
  account_name: string;
  account_number: string;
  address1: string | undefined;
  address2: string | undefined;
  advance: string | null;
  advance_type: 1 | 0;
  bank_branches_code: string;
  bank_branches_name: string;
  bank_code: string;
  bank_name: string;
  bank_type: string | undefined;
  code_1: string;
  code_2: string;
  deposit: string | null;
  deposit_type: 1 | 0;
  email: string;
  fax: string;
  name: string;
  phone: string;
  register_code: string;
  user_name: string;
  deposit_percentage?: string | null;
  deposit_yen?: string | null;
  advance_percentage?: string | null;
  advance_yen?: string | null;
  postal_code: string;
  bank_id?: number;
  bank_branches_id?: number;
  seven_user_id?: string;
}

export const OPTION_BANK = [
  {
    value: 1,
    label: '円',
  },

  {
    value: 0,
    label: '％',
  },
];
export const ObJOption = {
  1: '円',
  0: '%',
};
export const OPTION_ACCOUNT_TYPE_BANK = [
  {
    value: EAccountType.USUALLY,
    label: CONST_OPERATOR_BANK.USUALLY,
  },

  {
    value: EAccountType.CURRENT,
    label: CONST_OPERATOR_BANK.CURRENT,
  },
];
export const ERROR_EMPTY_SETTING_BANK: ISettingData | any = {
  bankCode: CONST_OPERATOR_BANK.EMPTY_BANK_CODE,
  bankBranchCode: CONST_OPERATOR_BANK.EMPTY_BANK_BRANCHES_CODE,
  bankType: '',
  accountName: CONST_OPERATOR_BANK.EMPTY_ACCOUNT_NAME,
  accountNumber: CONST_OPERATOR_BANK.EMPTY_ACCOUNT_NUMBER,
};

export const defaultData: ISettingData = {
  account_name: '',
  account_number: '',
  address1: undefined,
  address2: undefined,
  advance: '',
  advance_type: 1,
  bank_branches_code: '',
  bank_branches_name: '',
  bank_code: '',
  bank_name: '',
  bank_type: undefined,
  code_1: '',
  code_2: '',
  deposit: '',
  deposit_type: 1,
  email: '',
  fax: '',
  name: '',
  phone: '',
  register_code: '',
  user_name: '',
  postal_code: '',
};
