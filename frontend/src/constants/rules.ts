import { NumberOfJP, NumberPhone, REGEX_EMAIL, katakanaAccountName } from 'helper/regex';
import { CONST_COMMON } from './language';

export const UsagePlanRules = [
  { required: true, message: 'ご利用プラン料金は必須です。' },
  {
    pattern: NumberOfJP,
    message: 'ご利用プラン料金は整数のみ有効です。',
  },
];
export const NameKanaRules = [
  { required: true, message: '名義人名(カナ)は必須です。' },
  {
    pattern: katakanaAccountName,
    message: CONST_COMMON.KATAKANA_HAF_OPERATOR,
  },
];
export const AccountNumberRules = [
  { required: true, message: '口座番号は必須です。' },
  {
    pattern: NumberOfJP,
    message: '口座番号は整数のみ有効です。',
  },
];
export const FaxRules = [
  // { required: true, message: 'FAXは必須です' },
  {
    pattern: NumberPhone,
    message: 'FAXが間違っています。',
  },
];
export const PhoneRules = [
  { required: true, message: '電話番号は必要です' },
  {
    pattern: NumberPhone,
    message: '運営Telは整数のみ有効です',
  },
  {
    min: 10,
    message: '電話番号が間違っています。',
  },
];
export const MailRules = [
  { required: true, message: 'メールアドレスは必須です' },
  {
    pattern: REGEX_EMAIL,
    message: 'メールアドレスが無効な値です。',
  },
];

export const PhoneRulesMessage = {
  formatPattern: '運営Telは整数のみ有効です',
};

export const FaxRulesMessage = {
  formatPattern: 'Faxは数字とハイフンのみ有効です',
};
