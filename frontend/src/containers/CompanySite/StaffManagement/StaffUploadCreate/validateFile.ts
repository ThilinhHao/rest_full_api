import { CONST_COMMON, CONST_COMPANY_PROFILE, CONST_COMPANY_STAFF_MANAGEMENT } from 'constants/language';
import { MAX_LENGTH, VALIDATE_VALUE } from 'constants/constants';
import { katakana, REGEX_EMAIL } from 'helper/regex';
import { formatPhoneUploadFile } from 'helper/formatPhone';

export const validateDataFile = (arrayDataFile: any) => {
  let dataStaff: any = [];
  let dataStaffEmail: any = [];

  arrayDataFile.forEach((item: any) => {
    // if (item?.name || item?.name_kana || item?.email || item?.phone) {
    let itemFile = {
      ...item,
      is_error: false,
      message_errors: {
        name: [],
        name_kana: [],
        phone: [],
        email: [],
        salary_type: [],
        amount_limit_1: [],
        amount_limit_2: [],
      },
    };
    const errorMessages = { ...itemFile.message_errors };

    // ============= required ===========
    if (!item.name) {
      errorMessages.name = [...errorMessages.name, CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_REQUIRED];
    }
    if (!item.name_kana) {
      errorMessages.name_kana = [
        ...errorMessages.name_kana,
        CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_KATA_REQUIRED,
      ];
    }
    if (!item.email) {
      errorMessages.email = [...errorMessages.email, CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.EMAIL_REQUIRED];
    }
    if (!item.salary_type) {
      errorMessages.salary_type = [
        ...errorMessages.salary_type,
        CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.SALARY_REQUIRED_REQUIRED,
      ];
    } else {
      if (isNaN(+item.amount_limit_1)) {
        itemFile.amount_limit_1 = '';
      }
      if (isNaN(+item.amount_limit_2)) {
        itemFile.amount_limit_2 = '';
      }
    }
    // ============= required ===========

    // ============= maxlength ===========
    if (item.name.length > MAX_LENGTH.DEFAULT) {
      errorMessages.name = [...errorMessages.name, CONST_COMMON.maxLengthName];
    }
    if (item.name_kana.length > MAX_LENGTH.DEFAULT) {
      errorMessages.name_kana = [...errorMessages.name_kana, CONST_COMMON.maxLengthNameKana];
    }
    if (item.phone) {
      itemFile = { ...itemFile, phone: formatPhoneUploadFile(item.phone) };
      item = { ...item, phone: formatPhoneUploadFile(item.phone) };

      if (item.phone.length > MAX_LENGTH.PHONE) {
        errorMessages.phone = [...errorMessages.phone, CONST_COMMON.maxLengthPhone];
      }
      if (item.phone.length < 10) {
        errorMessages.phone = [...errorMessages.phone, CONST_COMPANY_PROFILE.INCORRECT_PHONE];
      }
    }
    if (item.email.length > MAX_LENGTH.INPUT_TEXT) {
      errorMessages.email = [...errorMessages.email, CONST_COMMON.maxLengthEmail];
    }
    if (
      item.amount_limit_1 &&
      (item.amount_limit_1.length > MAX_LENGTH.INPUT_NUMBER || item.amount_limit_1 < VALIDATE_VALUE.SALARY_MIN)
    ) {
      errorMessages.amount_limit_1 = [...errorMessages.amount_limit_1, CONST_COMMON.maxLengthAmount];
    }
    if (
      item.amount_limit_2 &&
      (item.amount_limit_2.length > MAX_LENGTH.INPUT_NUMBER || item.amount_limit_2 < VALIDATE_VALUE.SALARY_MIN)
    ) {
      errorMessages.amount_limit_2 = [...errorMessages.amount_limit_2, CONST_COMMON.maxLengthAmount];
    }
    // ============= maxlength ===========

    // ============= regex ===========
    const nameKanaRegexp = new RegExp(katakana);
    const emailRegexp = new RegExp(REGEX_EMAIL);

    if (!nameKanaRegexp.test(item.name_kana)) {
      errorMessages.name_kana = [
        ...errorMessages.name_kana,
        CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_KATA_REGEX,
      ];
    }
    if (!emailRegexp.test(item.email)) {
      errorMessages.email = [...errorMessages.email, CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.EMAIL_REGEX];
    }

    let is_error = false;
    if (
      errorMessages.name.length ||
      errorMessages.name_kana.length ||
      errorMessages.phone.length ||
      errorMessages.email.length ||
      errorMessages.salary_type.length ||
      errorMessages.amount_limit_1.length ||
      errorMessages.amount_limit_2.length
    ) {
      is_error = true;
    }
    // ============= regex ===========

    // ================ duplicate ================
    if (dataStaffEmail) {
      if (dataStaffEmail.includes(item.email)) {
        is_error = true;
        errorMessages.email = [...errorMessages.email, CONST_COMMON.messageErrorDuplicate];
      }
    }
    dataStaffEmail = [...dataStaffEmail, item.email];
    // ================ duplicate ================

    itemFile = { ...itemFile, message_errors: { ...errorMessages }, is_error };
    dataStaff = [...dataStaff, { ...itemFile }];
    // }
  });

  return dataStaff;
};
