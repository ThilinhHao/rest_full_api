import {
  COMPANY_STAFF_STATUS_COLOR,
  ECompanyStaffStatusType,
  COMPANY_STAFF_STATUS_TEXT_LABEL,
} from 'constants/constants';

export const getBackgroupItemStaff = (status?: number) => {
  return COMPANY_STAFF_STATUS_COLOR[status || ECompanyStaffStatusType.NONE];
};

export const getTextStatusStaff = (status?: number) => {
  return COMPANY_STAFF_STATUS_TEXT_LABEL[status || ECompanyStaffStatusType.NONE];
};

export const isDisabledInputEditStaff = (status?: number) => {
  if (status === ECompanyStaffStatusType.STAFF_DISCONNECT) return true;
  else return false;
};

export const isDisabledInputEditBasicInfoStaff = (status?: number) => {
  if (status !== ECompanyStaffStatusType.STAFF_WAITING_APPROVE && status !== ECompanyStaffStatusType.NOT_ACCESS) {
    return true;
  } else return false;
};

export const isDisabledStatusSelectEditStaff = (status?: number) => {
  if (status === ECompanyStaffStatusType.USING || status === ECompanyStaffStatusType.STAFF_NOT_ALLOW_REQUEST_SALARY)
    return false;
  return true;
};
