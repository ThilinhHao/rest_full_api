export interface IErrorCode {
  code: string;
  message: string;
}
export const ERROR_CODE = [
  {
    code: 'B001',
    message: 'メールアドレスが認証済みです',
  },
];

export const MESSAGE_FROM_CODE: any = {
  name_agency: {
    A001: '企業名は必須です。',
  },
  phone: {
    A001: '電話番号は必須です。',
    A013: '電話番号が存在しています。',
    A015: '電話番号が間違っています。',
  },
  email: {
    A013: 'メールアドレスが既に存在しています。',
    A002: 'メールアドレスが無効な値です',
  },
};

export const VALIDATE_ERROR_CODE = {
  EMAIL_UNIQUE: 'A013',
  REGULATIONS_REFORBIDDEN_CODE: 'B002',
  NOT_ACCEPTTABLE_CODE: 'B001',
  EMAIL_INVITED_CODE: 'I001',
  NOT_VERIFIED_DOCUMENT: 'D004',
  NOT_ACCESS: 'B005',
  FILE_TYPE_INVALID: 'A016',
  LEAGUE_NO_PERMISSION: 'B004',
  NOT_CONFIRM_REGULATIONS: 'C002',
  COMPANY_NOT_USING: 'I002',
  ATTENDANCE_REQUEST_DATE_INVALID: 'B006',
  ATTENDANCE_STAFF_DISCONNECTED: 'B007',
  ATTENDANCE_STAFF_NOT_ALLOW_REQUEST_SALARY: 'B008',
  ATTENDANCE_STAFF_BLOCK: 'B009',
};

export const ERROR_CODE_COMMON: any = {
  company_pair_b2b: {
    B001: 'メールアドレスがシステムに存在していません',
    D005: '企業が既に連携されました',
  },
  settingPassword: {
    B001: 'アカウントが見つかりませんでした',
    B003: 'パスワードが既に認証しました。',
  },
};

export const ERROR_CODE_COMMON_CODE = {
  company_pair: {
    B001: 'B001',
    D005: 'D005',
  },
};
