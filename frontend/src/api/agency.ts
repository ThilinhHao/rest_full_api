import { sendDelete, sendGet, sendPut } from 'helper/api/axios';

export const apiOperatorDeleteAgency = (id: number) => sendDelete(`/v1/s1/agency/delete/${id}`);
export const apiAdminGetListCompany = () => sendGet('/v1/s2/company/list');
export const apiAdminGetDetailCompany = (idCompany: number) => sendGet(`/v1/s2/company/${idCompany}`);
export const apiAdminGetCompanyStatisticalDate = (idCompany: number, date?: string) =>
  sendGet(`/v1/s2/company/statistical-date/${idCompany}`, { date });
export const apiAdminGetDetailAgency = () => sendGet(`/v1/s2/agency/detail`);
export const apiAdminEditAgencySiteProfile = (params: any) => sendPut(`/v1/s2/agency/update`, params);

export const apiGetListNoticeAgency = (params: any) => sendGet('/v1/s2/message/list', params);
export const apiGetDetailNoticeAgency = (id: string | undefined) => sendGet(`/v1/s2/message/${id}`);

export const apiGetListInvoice = (params: { date?: string; page?: number }) => sendGet('/v1/s2/invoice/list', params);
export const apiGetInvoiceDetail = (id: number, params: { offset?: number; per_page?: number }) =>
  sendGet(`/v1/s2/invoice/detail/${id}`, params);
export const apiUpdateStatusInvoice = (id: number, status: number) =>
  sendPut(`/v1/s2/invoice/update-status/${id}`, { status });

export const apiGetChartTopPageAgency = (params: any) => sendGet('/v1/s2/company/total-request/months', params);
export const apiAgencyGetRankCompany = (params: any) => sendGet('/v1/s2/company/total-request/list-company', params);
export const apiAgencyTopPageSearch = (params: any) => sendGet('/v1/s2/company/list', params);
