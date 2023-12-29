export interface IDataStaffError {
  name: string[];
  name_kana: string[];
  phone: string[];
  email: string[];
  salary_type: string[];
  amount_limit_1: string[];
  amount_limit_2: string[];
}

export interface IDataStaffFile {
  name: string;
  name_kana: string;
  phone: string | number;
  email: string;
  salary_type: number;
  amount_limit_1: number;
  amount_limit_2: number;
  is_error: boolean;
}

export interface IDataStaff {
  name: string;
  name_kana: string;
  phone: string | number;
  email: string;
  salary_type: number;
  amount_limit_1: number;
  amount_limit_2: number;
  status: boolean;
  [key: string]: any;
  message_errors: IDataStaffError;
}

export interface IDataStaffSubmit {
  name: string;
  name_kana: string;
  phone: string | number;
  email: string;
  salary_type: number;
  amount_limit_1: number;
  amount_limit_2: number;
  delete?: boolean; // validate
  message_errors?: IDataStaffError;
}
export interface IStaffDataPaginate {
  data: IDataStaff[];
  current: number;
  total: number;
  total_page: number;
}
