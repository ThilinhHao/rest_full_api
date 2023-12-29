import { sendDelete, sendGet, sendPost, sendPut } from 'helper/api/axios';

export const apiOperatorDetailCompanyByCode = (code: string) => sendGet(`/v1/api/agency/detail-code/${code}`);
export const apiOperatorGetListCompany = () => sendGet('/v1/s1/company/list');
export const apiOperatorUpdateCompany = (idCompany: number, params: any) =>
  sendPut(`/v1/s1/company/update/${idCompany}`, params);
export const apiOperatorSequenIdCompany = () => sendGet(`/v1/s1/company/sequen-id`);
export const apiOperatorCreateCompany = (params: any) => sendPost(`/v1/s1/company/create`, params);
export const apiOperatorCreateAgency = (params: any) => sendPost('/v1/s1/agency/create', params);
export const apiOperatorDeleteCompany = (id: number) => sendDelete(`/v1/s1/company/delete/${id}`);
export const apiOperatorEditAgency = (id: number | undefined, params: any) =>
  sendPut(`/v1/s1/agency/update/${id}`, params);
export const apiOperatorAgencyList = () => sendGet('/v1/s1/agency/list');
export const apiOperatorEditPrivacyPolicy = (params: any) =>
  sendPost('/v1/s1/operator/save-setting-regulations', params);
export const apiOperatorUploadPrivacyPolicy = (params: any) => sendPost('/v1/s1/operator/upload-regulations', params);
export const apiOperatorGetRegulations = (id: string | undefined) =>
  sendGet(`/v1/s1/operator/regulations-detail?type=${id}`);
export const apiOperatorSettingBank = (params: any) => sendPost('/v1/s1/operator/update-info', params);
export const apiOperatorDetailSettingBank = () => sendGet('/v1/s1/operator/info');
export const apiOperatorSaveDucumentStatus = (id: number, params: any) =>
  sendPut(`/v1/s1/company/document-status/${id}`, params);
export const apiOperatorDocumentConfirm = (idUser: number, params: any) =>
  sendPut(`/v1/s1/company/document-confirm/${idUser}`, params);
export const apiOperatorCreateNotice = (params: any) => sendPost('/v1/s1/message/create', params);
export const apiOperatorListNotice = (params: any) => sendGet('/v1/s1/message/list', params);
export const apiOperatorDetailNotice = (id: string | undefined) => sendGet(`/v1/s1/message/${id}`);
export const apiOperatorDeleteNotice = (id: string | undefined) => sendDelete(`/v1/s1/message/delete/${id}`);
export const apiOperatorEditNotice = (id: string | undefined, params: any) =>
  sendPut(`/v1/s1/message/update/${id}`, params);

export const getCompanyChatMessages = (params: any) => sendGet('/v1/s1/chat-message/list', params);
export const getTotalCompanyChatMessages = (group_company_id: number) =>
  sendGet('/v1/s1/chat-message/total', { group_company_id });
export const getCompanyCountChatMessagesNotRead = (params?: any) =>
  sendGet('/v1/s1/chat-message/count-message-not-read', params);
export const readAllCompanyChatMessages = (group_company_id: number) =>
  sendPost('/v1/s1/chat-message/read-all', { group_company_id });
export const getListChatGroup = () => sendGet('/v1/s1/chat-message/chat-groups');
export const apiOperatorFootstepsHistory = (params: any) => sendGet('/v1/s1/history-action/list', params);
export const apiDeleteOperator = (id: number) => sendDelete(`/v1/s1/operator/delete/${id}`);

export const apiUnprocessedOperator = () => sendGet(`/v1/s1/company/total-unprocessed-document`);
export const apiOperatorGetSalaryRequestDay = () => sendGet(`/v1/s1/company/salary-request/total-request/day`);
export const apiOperatorGetSalaryRequestMonth = () => sendGet(`/v1/s1/company/salary-request/total-request/month`);
export const apiOperatorGetSalarySuspend = () => sendGet(`/v1/s1/company/total-company-suspen`);
export const apiOperatorGetChartMonYear = (params: any) =>
  sendGet(`/v1/s1/company/salary-request/total-request/month-year`, params);
export const apiOperatorGetChartDateMonth = (params: any) =>
  sendGet(`/v1/s1/company/salary-request/total-request/date-month`, params);
export const apiOperatorGetRankCompany = (params: any) =>
  sendGet(`/v1/s1/company/salary-request/total-request/list-company`, params);
export const apiInvoiceAgencyTotalUnprocessed = (params?: any) =>
  sendGet('/v1/s1/agency/invoice/total-unprocessed', params);

export const apiCompanyListInvoice = (params: any) => sendGet('/v1/s1/invoice-company/list', params);
export const apiCompanyListAllInvoiceDetail = (params: any) => sendGet('/v1/s1/invoice-company/detail-all', params);
export const apiCompanyInvoiceDetail = (id: number, params: { per_page?: number; offset?: number }) =>
  sendGet(`/v1/s1/invoice-company/detail/${id}`, params);
export const apiOperatorDetailCompany = (id: number) => sendGet(`/v1/s1/company/detail/${id}`);
export const apiOperatorDetailAgency = (id: number) => sendGet(`/v1/s1/agency/detail/${id}`);
export const apiAgencyListInvoice = (params: any) => sendGet('/v1/s1/invoice-agency/list', params);
export const apiAgencyListAllInvoiceDetail = (params: any) => sendGet('/v1/s1/invoice-agency/detail-all', params);
export const apiAgencyInvoiceDetail = (id: number, params: { offset?: number; per_page?: number }) =>
  sendGet(`/v1/s1/invoice-agency/detail/${id}`, params);
export const apiUpdateStatusAgencyInvoice = (id: number, status: number) =>
  sendPut(`/v1/s1/invoice-agency/update-status/${id}`, { status });
export const apiOperatorTransferAgency = (id: number, status: number) =>
  sendPut(`/v1/s1/invoice-agency/transfer-agency/${id}`, { status });
export const apiOperatorVerifyOTP = (id: number, params: any) =>
  sendPost(`/v1/s1/invoice-agency/verify-otp/${id}`, params);
