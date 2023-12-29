import { sendDelete, sendGet, sendPost, sendPut } from 'helper/api/axios';
import { ICompanyStaffDetailInformation } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { ISalaryAdvanceData } from '@pages/CompanySite/SalaryAdvance/interface';
import { SettingRegulationsEnum } from 'constants/constants';

interface ICompanySaveBank {
  id?: number;
  bank_code: string;
  bank_branches_code: string;
  bank_type: number;
  account_name: string;
  account_number: string;
}
interface ICompanyCreateAdmin {
  id?: number;
  full_name: string;
  name_kana: string;
  email: string;
}
interface ICompanyEditAdmin {
  id?: number;
  full_name: string;
  name_kana: string;
  email: string;
}

export const apiCompanySaveCompanyBank = (params: ICompanySaveBank) =>
  sendPost('/v1/s3/company/save-company-bank', params);
export const apiCompanyBankDetail = () => sendGet('/v1/s3/company/company-bank-detail');
export const apiCompanyAccountList = () => sendGet('/v1/s3/company/account-list');
export const apiCompanyCreateAdmin = (params: ICompanyCreateAdmin) => sendPost('/v1/s3/company/create-account', params);
export const apiCompanyEditAdmin = (id: number | undefined, params: ICompanyEditAdmin) =>
  sendPut(`/v1/s3/company/update-account/${id}`, params);
export const apiCompanyDeleteAdmin = (id: number) => sendDelete(`/v1/s3/company/account/${id}`);
export const apiCompanySalaryDetail = () => sendGet('/v1/s3/company/setting-company-salary/detail');
export const apiCompanySalarySetting = (params: ISalaryAdvanceData) =>
  sendPost('/v1/s3/company/setting-company-salary', params);
export const apiCompanyListStaff = () => sendGet('/v1/s3/company/staff/list');
export const apiCompanyDetailStaff = (id: number) => sendGet(`/v1/s3/company/staff/detail/${id}`);
export const apiCompanyCreateStaff = (params: ICompanyStaffDetailInformation) =>
  sendPost('/v1/s3/company/staff/create', params);
export const apiCompanyRegulationStaff = (id: number) => sendGet(`/v1/s3/company/staff/${id}/regulation`);
export const apiCompanyUpdateStaff = (params: ICompanyStaffDetailInformation) =>
  sendPut(`/v1/s3/company/staff/update/${params.id}`, params);
export const apiCompanyDeleteStaff = (id: number) => sendDelete(`/v1/s3/company/staff/delete/${id}`);
export const apiCompanyGetLastAttendance = (id: number) => sendGet(`/v1/s3/company/staff/last-attendance/${id}`);
export const apiCompanyValidateStaffImport = (params: any) => sendPost('/v1/s3/company/staff/validate-import', params);
export const apiCompanyCreateStaffImport = (params: any) => sendPost('/v1/s3/company/staff/import', params);
export const apiGetCompanyProfile = () => sendGet('/v1/s3/company/info');
export const apiAdminEditCompanySiteProfile = (params: any) => sendPut('/v1/s3/company/update', params);
export const apiAdminGetAttendance = (params: any) => sendGet(`/v1/s3/time-attendance`, params);
export const apiAdminSetTimeAttendance = (params: any) => sendPost(`/v1/s3/time-attendance/create`, params);
export const apiCompanyUploadFile = (data: FormData) => sendPost('/v1/s3/company/upload-file', data);
export const apiCompanySaveDocumentFile = (data: any) => sendPost('/v1/s3/company/save-document-file', data);
export const apiCompanyRelatedInformation = () => sendGet('/v1/s3/company/related-information');

export const apiCompanyB2BByEmail = (email: string) => sendGet(`/v1/s3/company/company/b2b/${email}`);
export const apiCompanyB2BCreate = (params: any) => sendPost('/v1/s3/company-b2b/create', params);
export const apiListCompanyB2B = (params?: any) => sendGet('/v1/s3/company-b2b', params);
export const apiListCompanyB2BPaired = (params?: any) => sendGet('/v1/s3/company-b2b/list', params);
export const apiChangeStatusB2B = (id: number, params?: any) =>
  sendPut(`/v1/s3/company-b2b/status/update/${id}`, params);
export const apiCompanyInviteStaffB2C = (params: { email: string }) => sendPost('/v1/s3/company-b2c/invite', params);
export const apiCompanyDeleteLinkB2C = (id: number) => sendDelete(`/v1/s3/company-b2c/${id}`);

export const apiGetRequestSalary = (params: any) => sendGet('/v1/s3/salary-request/list', params);
export const apiApproveRequestSalary = (params: any) => sendPost('/v1/s3/salary-request/approved', params);
export const apiCancelRequestSalary = (params: any) => sendPost('/v1/s3/salary-request/cancel', params);

export const apiGetHistoryAllStaff = (params: any) => sendGet('/v1/s3/staff/transaction/salary-advance', params);
export const apiGetHistoryAllStaffDetail = (staffId: any, params: any) =>
  sendGet(`/v1/s3/staff/transaction/salary-advance/${staffId}/detail`, params);

export const getCompanyChatMessages = (page: number) => sendGet(`/v1/s3/chat-message/list?page=${page}`);
export const getTotalCompanyChatMessages = () => sendGet('/v1/s3/chat-message/total');
export const getCompanyCountChatMessagesNotRead = () => sendGet('/v1/s3/chat-message/count-message-not-read');
export const readAllCompanyChatMessages = () => sendPost('/v1/s3/chat-message/read-all');

export const apiGetListNoticeCompany = (params: any) => sendGet('/v1/s3/message/list', params);
export const aoiGetDetailNoticeCompany = (id: string | undefined) => sendGet(`/v1/s3/message/${id}`);
export const apiCompanyFootstepsHistory = (params: any) => sendGet('/v1/s3/history-action/list', params);
export const apiCompanyCalendarTopPage = (params: any) => sendGet('/v1/s3/staff/salary-request/total-request', params);

export const apiCompanyTotalNotMark = () => sendGet('/v1/s3/time-attendance/total-not-mark');
export const apiCompanyTotalNotSettingPayment = () => sendGet('/v1/s3/company-b2c/total-not-setting-payment');
export const apiCompanyTotalNotHandle = () => sendGet('/v1/s3/salary-request/total-not-handle');
export const apiCompanyChartTopPage = (prams: any) => sendGet('/v1/s3/staff/salary-request/total-request/month', prams);

export const apiGetListInvoice = (params: any) => sendGet('/v1/s3/invoice/list', params);
export const apiGetInvoiceDetail = (id: number, params: { offset?: number; per_page?: number }) =>
  sendGet(`/v1/s3/invoice/detail/${id}`, params);

export const apiGetDetailRequestCompany = (id: any) => sendGet(`/v1/s3/salary-request/detail/${id}`);
export const apiGetLastAgreedRegulationsOfStaff = (staffId: number) =>
  sendGet('/v1/api/user/last-agreed-regulation', {
    staff_id: staffId,
    type: SettingRegulationsEnum.TYPE_OPERATOR_STAFF,
  });
