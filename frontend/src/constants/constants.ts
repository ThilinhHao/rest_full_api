import { CONST_COMPANY_BANK_SETTING, CONST_OPERATOR_BANK, CONST_COMPANY_STAFF_MANAGEMENT } from './language';

enum STATUS {
  ACTIVE = 1,
  INACTIVE = 0,
}

enum EKeyCode {
  ENTER = 'Enter',
  NUMPAD_ENTER = 'NumpadEnter',
  ALT = 'Alt',
  ALT_GRAPH = 'AltGraph',
  CONTROL = 'Control',
  SHIFT = 'Shift',
  COMMAND = 'Meta',
}
enum EKeyCodeNumber {
  ENTER = 13,
}
enum ESwagger {
  OPERATION = 1,
}
enum EOperatorStatus {
  VERIFY = 1,
  NOT_VERIFY = 2,
}
enum EStatusFile {
  UN_TICKED = 1,
  REJECT = 2,
  REJECT_DRAFT = 3,
  TICKED_DRAFT = 4,
  TICKED = 5,
}
enum EStatusFileConfirm {
  APPROVE = 1,
  REJECT = 2,
  UPLOAD_AGAIN = 3,
}
enum EStatusCompany {
  STATUS_NOTVNVERIFY = 1,
  STATUS_USING = 2,
  STATUS_SUSPEND = 3,
  STATUS_REJECT = 4,
}

enum ETypePasswordPage {
  CHANGE_PASSWORD = '2',
  GIVE_PASSWORD = '1',
}
enum ERegulation {
  OPERATION_COMPANY = 1,
  COMPANY_STAFF = 2,
  OPERATION_AGENCY = 3,
  REGULATION_STAFF = 4,
  PRIVACY_POLICE = 5,
}

const MESSAGE_SUCCESS = '登録が完了しました';

const MAX_LENGTH = {
  INPUT_TEXT: 255,
  INPUT_CODE: 20,
  INPUT_ACCOUNT_NUMBER: 100,
  DEFAULT: 100,
  POSTAL_FIRST: 3,
  POSTAL_END: 4,
  PHONE: 13,
  INPUT_NUMBER: 12,
  INPUT_SALARY: 7,
  INPUT_PHONE_NOT_FORMAT: 11,
};

const VALIDATE_VALUE = {
  SALARY_MIN: 1000,
};

enum ECompanyBankAccountType {
  USUALLY = 1,
  CURRENT = 2,
}

enum EApprovalMethod {
  AUTO_APPROVAL = 1,
  MANUAL_APPROVAL = 2,
}

enum ESalaryType {
  USING = '1',
  REMOVE = '2',
}

enum EAccountType {
  USUALLY = 1,
  CURRENT = 2,
}
enum ECompanyStaffStatusType {
  NONE = 0,
  NOT_ACCESS = 1,
  USING = 2,
  DELETED = 3,
  REJECT = 4,
  STATUS_B2C_COMPANY_CANCEL_INVITE = 5,
  STATUS_B2C_COMPANY_DISCONNECT = 6,
  STAFF_DISCONNECT = 7,
  STAFF_NOT_ALLOW_REQUEST_SALARY = 8,
  STAFF_WAITING_APPROVE = 9,
}

const STATUS_STAFF_ALLOW_DELETE_ARRAY = [
  ECompanyStaffStatusType.NOT_ACCESS,
  ECompanyStaffStatusType.DELETED,
  ECompanyStaffStatusType.REJECT,
  ECompanyStaffStatusType.STAFF_DISCONNECT,
  ECompanyStaffStatusType.STAFF_WAITING_APPROVE,
  ECompanyStaffStatusType.STATUS_B2C_COMPANY_CANCEL_INVITE,
  ECompanyStaffStatusType.STATUS_B2C_COMPANY_DISCONNECT,
];

enum ECompanyStaffSalaryType {
  DAILY_SALARY = 1,
  MONTHLY_SALARY = 2,
}
enum ETypeOperator {
  ROOT = 1,
}

const COMPANY_STAFF_STATUS_COLOR: any = {
  [ECompanyStaffStatusType.NONE]: '#BEBEBE',
  [ECompanyStaffStatusType.NOT_ACCESS]: '#FD9672',
  [ECompanyStaffStatusType.USING]: '#FDAB29',
  [ECompanyStaffStatusType.DELETED]: '#BEBEBE',
  [ECompanyStaffStatusType.REJECT]: '#FD9672',
  [ECompanyStaffStatusType.STAFF_DISCONNECT]: '#BEBEBE',
  [ECompanyStaffStatusType.STAFF_NOT_ALLOW_REQUEST_SALARY]: '#BEBEBE',
  [ECompanyStaffStatusType.STAFF_WAITING_APPROVE]: '#FD9672',
};

const COMPANY_STAFF_STATUS_TEXT_LABEL: any = {
  [ECompanyStaffStatusType.NONE]: '',
  [ECompanyStaffStatusType.NOT_ACCESS]: CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.NOT_ACCESS,
  [ECompanyStaffStatusType.USING]: CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.USING,
  [ECompanyStaffStatusType.DELETED]: CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.DELETED,
  [ECompanyStaffStatusType.REJECT]: CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.REJECT,
  [ECompanyStaffStatusType.STAFF_DISCONNECT]: CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.STAFF_DISCONNECT,
  [ECompanyStaffStatusType.STAFF_NOT_ALLOW_REQUEST_SALARY]:
    CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.STAFF_NOT_ALLOW_REQUEST_SALARY,
  [ECompanyStaffStatusType.STAFF_WAITING_APPROVE]: CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.WAITING_CONFIRM,
};

enum SettingRegulationsEnum {
  TYPE_OPERATOR_COMPANY = 1,
  TYPE_OPERATOR_STAFF = 2,
  TYPE_OPERATOR_AGENCY = 3,
  TYPE_REGULATIONS_STAFF = 4,
  TYPE_REGULATIONS_PRIVACY = 5,
}

const USAGE_PLAN = [
  {
    value: 0,
    label: CONST_OPERATOR_BANK.DEPOSIT_PLAN,
  },
  {
    value: 1,
    label: CONST_OPERATOR_BANK.ADVANCE_PLAN,
  },
];

const COMPANY_BANK_ACCCOUNT_TYPE = [
  {
    value: ECompanyBankAccountType.USUALLY,
    label: CONST_COMPANY_BANK_SETTING.BANK_ACCOUNT_TYPE.USUALLY,
  },
  {
    value: ECompanyBankAccountType.CURRENT,
    label: CONST_COMPANY_BANK_SETTING.BANK_ACCOUNT_TYPE.CURRENT,
  },
];

const BANK_ACCOUNT_LABEL: any = {
  [ECompanyBankAccountType.USUALLY]: CONST_COMPANY_BANK_SETTING.BANK_ACCOUNT_TYPE.USUALLY,
  [ECompanyBankAccountType.CURRENT]: CONST_COMPANY_BANK_SETTING.BANK_ACCOUNT_TYPE.CURRENT,
};

enum EBankType {
  USUALLY = 1,
  CURRENT = 2,
}

const FORMAT_MONTH = 'YYYY年 MM月';
const FORMAT_DATE = 'YYYY年 MM月 DD日';
const FORMAT_YEAR = 'YYYY年';

enum ETimeShift {
  ACTIVITY = 1,
  NOT_ACTIVITY = 0,
}
enum ETimeShiftFormat {
  NOON = '11：59',
  DATE_NOON = 'YYYY/MM/DD 11:59',
  NIGHT = '23：59',
  DATE_NIGHT = 'YYYY/MM/DD 23:59',
}
enum ETimeShiftKeys {
  DAY_SHIFT = 'day_shift',
  NIGHT_SHIFT = 'night_shift',
  LEAVE = 'leave',
}

enum EStatusCheckPrivacyPolicy {
  NEW = 1,
  DISAGREE = 2,
  AGREE = 3,
  UPDATE = 4,
}

enum EStatusCheckCompanyDocument {
  NOT_VERIFY = 1,
  REJECT = 2,
  VERIFIED = 5,
}

enum ECompanyRootUserStatus {
  INACTIVE = 1,
  ACTIVE = 6,
  REJECT = 5,
}
enum EStatusApproveRequest {
  WAITING_TRANSACTION = 3,
  WAITING_OTPED = 2,
  COMPLETE = 6,
  COMPLETE_SUCCESS = 7,
  CANCEL = 5,
}

enum ETypeRequest {
  AUTO = 1,
  HANDMADE = 2,
}

enum ESubjectKey {
  ALL = 1,
  AGENCY = 2,
  DEPOSIT_PLAN = 3,
  REIMBURSEMENT_PLAN = 4,
}
enum ESubjectKeyRequest {
  NOT_SEND = 0,
  SEND = 1,
}

enum EMessageUser {
  UN_VIEW = 1,
  VIEW = 2,
  READ = 3,
}

enum ETotalTypeChart {
  SALARY = 1,
  REQUEST = 2,
}

enum EOptionYenPercentage {
  YEN = 1,
  PERCENTAGE = 0,
}

enum ETypeChartAgency {
  NUMBER_USES = 1,
  USAGE_AMOUNT = 2,
  BROKERAGE_FEE = 3,
}

const REGULATIONS_KEY_NAME = {
  TYPE_OPERATOR_COMPANY: 'type_operator_company',
  TYPE_OPERATOR_STAFF: 'type_operator_staff',
  TYPE_OPERATOR_AGENCY: 'type_operator_agency',
  TYPE_REGULATIONS_STAFF: 'type_regulations_staff',
  TYPE_REGULATIONS_PRIVACY: 'type_regulations_privacy',
};

const REGULATIONS_PATH_NAME_COMPANY = {
  [REGULATIONS_KEY_NAME.TYPE_OPERATOR_COMPANY]: '/company/verify-terms-of-use-contract',
  [REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY]: '/company/verify-privacy-policy',
};

const REGULATIONS_PATH_NAME_AGENCY = {
  [REGULATIONS_KEY_NAME.TYPE_OPERATOR_AGENCY]: '/agency/verify-terms-of-use-contract',
  [REGULATIONS_KEY_NAME.TYPE_REGULATIONS_PRIVACY]: '/agency/verify-privacy-policy',
};

const FILE_IMAGE_ACCEPT = {
  IMAGE: '.jpg,.jpeg,.png',
  EXCEL: '.xlsx,.xls',
  WORD: '.doc,.docx',
  VIDEO: '.mp4,.mov,.webm',
  POWERPOINT: '.ppt,.pptx',
  PDF: '.pdf',
  CSV: '.csv',
  TXT: '.txt',
};

const STRING_FILE_IMAGE_ACCEPT = [
  FILE_IMAGE_ACCEPT.IMAGE,
  FILE_IMAGE_ACCEPT.WORD,
  FILE_IMAGE_ACCEPT.EXCEL,
  FILE_IMAGE_ACCEPT.PDF,
  FILE_IMAGE_ACCEPT.CSV,
].join();

const ARRAY_MIME_FILE_IMAGE_VALIDATE = [
  // csv
  // 'text/csv',
  // 'application/csv',
  // pdf
  'application/pdf',
  'application/x-download',
  'application/acrobat',
  // word
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // excel
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  // image
  'image/jpeg',
  'image/jpg',
  'image/png',
];

const STRING_FILE_IMAGE_ACCEPT_FOR_CHAT = [
  FILE_IMAGE_ACCEPT.IMAGE,
  FILE_IMAGE_ACCEPT.WORD,
  FILE_IMAGE_ACCEPT.EXCEL,
  FILE_IMAGE_ACCEPT.VIDEO,
  FILE_IMAGE_ACCEPT.POWERPOINT,
].join();

const ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_CHAT = [
  // word
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // excel
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  // image
  'image/jpeg',
  'image/jpg',
  'image/png',
  // video
  'video/mp4',
  'video/webm',
  // pdf
  'application/pdf',
  'application/x-download',
  'application/acrobat',
  // powerPoint
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  // csv
  'text/csv',
  'application/csv',
];

const ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_REGULATIONS = [
  // pdf
  'application/pdf',
  'application/x-download',
  'application/acrobat',
];

const ARRAY_MIME_TXT_FILE = ['text/plain', 'application/txt'];

const FILE_UPLOAD_MAX_SIZE_MB = 10;
const FILE_UPLOAD_MAX_COUNT = 20;
const TYPE_INPUT_PASSWORD = 'password';

const FOLDER_UPLOAD = {
  CHAT_MESSAGE: 'chat_messages',
};

enum EStatusInvoiceAgency {
  UNCOMFIRMED = 1,
  WAITING_OPERATOR_CONFIRM = 2,
  OPERATOR_APPROVED = 3,
  WAITING_OPERATOR_VERIFY = 4,
  WAITING_OPERATOR_VERIFIED = 5,
  TRANSFER_IN_PROGRESS = 6,
  TRANSFER_COMPLETED = 7,
  TRANSFER_ERROR = 8,
}

const VALUE_CHART_TOP_PAGE: any = {
  1: '前払い利用金額',
  2: '前払い利用数',
  3: '仲介手数料',
};

enum ERequestAdvance {
  CANCELED = 1,
}

export {
  STATUS,
  EKeyCode,
  ESwagger,
  EOperatorStatus,
  MESSAGE_SUCCESS,
  EStatusFile,
  EStatusCompany,
  ETypePasswordPage,
  ERegulation,
  ECompanyBankAccountType,
  SettingRegulationsEnum,
  EApprovalMethod,
  MAX_LENGTH,
  ESalaryType,
  EAccountType,
  ECompanyStaffStatusType,
  ECompanyStaffSalaryType,
  COMPANY_STAFF_STATUS_COLOR,
  USAGE_PLAN,
  COMPANY_BANK_ACCCOUNT_TYPE,
  EBankType,
  FORMAT_MONTH,
  ETimeShift,
  FORMAT_DATE,
  EStatusCheckPrivacyPolicy,
  EStatusCheckCompanyDocument,
  ECompanyRootUserStatus,
  STRING_FILE_IMAGE_ACCEPT,
  ARRAY_MIME_FILE_IMAGE_VALIDATE,
  ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_CHAT,
  ARRAY_MIME_FILE_IMAGE_VALIDATE_FOR_REGULATIONS,
  ARRAY_MIME_TXT_FILE,
  STRING_FILE_IMAGE_ACCEPT_FOR_CHAT,
  FILE_IMAGE_ACCEPT,
  FILE_UPLOAD_MAX_SIZE_MB,
  FILE_UPLOAD_MAX_COUNT,
  REGULATIONS_KEY_NAME,
  ETimeShiftFormat,
  ETimeShiftKeys,
  TYPE_INPUT_PASSWORD,
  BANK_ACCOUNT_LABEL,
  EStatusApproveRequest,
  ETypeRequest,
  ESubjectKey,
  ESubjectKeyRequest,
  EMessageUser,
  FOLDER_UPLOAD,
  VALIDATE_VALUE,
  EStatusFileConfirm,
  EKeyCodeNumber,
  FORMAT_YEAR,
  ETotalTypeChart,
  EOptionYenPercentage,
  ETypeOperator,
  EStatusInvoiceAgency,
  ETypeChartAgency,
  COMPANY_STAFF_STATUS_TEXT_LABEL,
  VALUE_CHART_TOP_PAGE,
  ERequestAdvance,
  REGULATIONS_PATH_NAME_COMPANY,
  REGULATIONS_PATH_NAME_AGENCY,
  STATUS_STAFF_ALLOW_DELETE_ARRAY,
};
