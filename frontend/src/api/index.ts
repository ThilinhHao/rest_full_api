import { sendGet, sendPost, sendPut } from 'helper/api/axios';

interface ICompanyChangePassword {
  password: string;
  password_confirm: string;
}

interface ILogin {
  email: string;
  password: string;
  user_role: number;
}
interface ICompanyVerifyPassword {
  email: string;
  user_role: number;
}
export const apiGetListOperator = () => sendGet('/v1/s1/operator/list');
export const apiOperatorVerifyChangePassword = (params: ICompanyVerifyPassword) =>
  sendPost('/v1/api/verify-email-change-password', params);
export const apiCreateOperator = (params: any) => sendPost('/v1/s1/operator/create', params);
export const apiUpdateOperator = (idOperator: number, params: any) =>
  sendPut(`/v1/s1/operator/update/${idOperator}`, params);
export const apiLogin = (params: ILogin) => sendPost('/v1/api/login', params);
export const apiChangePassword = (code: string | null, params: ICompanyChangePassword) =>
  sendPost(`/v1/api/change-password/${code}`, params);
export const apiGetUserRegulations = (type: number) => sendGet('/v1/api/user/regulations-detail', { type });
export const apiAgreeRegulations = (data: FormData) => sendPost('/v1/api/user/agrees-regulations', data);
export const apiGetLastAgreedRegulations = (type: number, companyId?: number, agencyId?: number) =>
  sendGet('/v1/api/user/last-agreed-regulation', { type, company_id: companyId, agency_id: agencyId });
export const apiGetUserRegulationsStatus = () => sendGet('/v1/api/user/regulations-status');

export const apiUploadFile = (data: FormData) => sendPost('/v1/api/file/upload', data);
export const apiSaveFile = (urls: string[]) => sendPost('/v1/api/file/save', { urls });

export const apiReadAllNotifications = () => sendPost('/v1/api/notify/read-all');

export const apiGetUserInfo = () => sendGet('/v1/api/user/info');
export const apiGetBankList = (params: any) => sendGet('/v1/api/bank/list', params);
export const apiGetBankBranchList = (params: any) => sendGet('/v1/api/bank-branch/list', params);

export const apiGetOperatorInfo = () => sendGet('/v1/api/operator/basic-info');

export const apiGetCompanyInfoInvoice = (id: number) => sendGet(`/v1/api/invoice-company/detail/${id}`);
export const apiGetAgencyInfoInvoice = (id: number) => sendGet(`/v1/api/invoice-agency/detail/${id}`);

export const apiCheckForgotPassword = (params: any) => sendPost(`/v1/api/check-link-forgot-password`, params);
