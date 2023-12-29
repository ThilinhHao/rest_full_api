import { CONST_CREATE_AGENCY } from '@pages/OperatorSite/Agencies/CreateAgency/constants';
import { IDocumentCompany } from '@pages/OperatorSite/Companies/ListCompany/useListCompany';
import { CONST_CREATE_COMPANY } from './language';
import { Dayjs } from 'dayjs';

export interface ICompany {
  companyName: string;
  fullName: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  deposit: string | number;
  status: string | number;
  agencyCode: string;
  brokerageFee: string;
  files?: string;
  postalCodeFirst: string;
  postalCodeEnd: string;
  address1: string;
  address2: string;
  freeStartDate?: Dayjs | undefined;
  freeEndDate?: Dayjs | undefined;
  fee?: string | number;
  errorFreeStartDate?: string;
  errorFreeEndDate?: string;
}
export interface IFile extends IDocumentCompany {
  isError?: boolean | string;
  link?: string;
  company_id?: number;
}
export const ERROR_EMPTY_CREATE_COMPANY: any = {
  companyName: CONST_CREATE_COMPANY.EMPTY_COMPANY_NAME,
  fullName: CONST_CREATE_AGENCY.EMPTY_FULL_NAME,
  phoneNumber: '',
  email: CONST_CREATE_COMPANY.EMPTY_EMAIL,
  postalCodeFirst: CONST_CREATE_COMPANY.REQUIRED_POSTAL_CODE,
  deposit: '',
  agencyCode: '',
  brokerageFee: '',
  address1: CONST_CREATE_COMPANY.REQUIRED_ADDRESS,
};

export const createError: ICompany = {
  companyName: '',
  fullName: '',
  email: '',
  deposit: '',
  agencyCode: '',
  phoneNumber: '',
  brokerageFee: '',
  files: '',
  postalCodeFirst: '',
  postalCodeEnd: '',
  address1: '',
  address2: '',
  status: '',
};

export const createCompany: ICompany = {
  companyName: '',
  fullName: '',
  phoneNumber: '',
  email: '',
  deposit: '1',
  agencyCode: '',
  brokerageFee: '',
  postalCodeFirst: '',
  postalCodeEnd: '',
  address1: '',
  address2: '',
  status: '1',
};

export interface ICompanyInitData {
  companyCode?: string;
  idUserRoot?: string;
  disableEmail: boolean;
}

export const defaultFiles = [
  {
    name: CONST_CREATE_COMPANY.TERMS_SERVICE,
    id: 1000001,
    isError: false,
  },
  {
    name: CONST_CREATE_COMPANY.PRIVACY_POLICY,
    id: 1000002,
    isError: false,
  },
  {
    name: CONST_CREATE_COMPANY.FINANCIAL_STATEMENTS,
    id: 1000003,
    isError: false,
  },
];
export const defaultEdit = [defaultFiles[0], defaultFiles[1]];

export interface IOperatorInfo {
  id: number;
  address1: string;
  address2: string;
  email: string;
  fax: string;
  name: string;
  phone: string;
  postal_code: string;
  register_code: string;
  user_name: string;
  bank?: {
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
