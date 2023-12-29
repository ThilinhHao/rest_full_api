import Axios from 'axios';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';
import { getURLTopPage, getUseRoleByHostName } from 'helper';
import { handleLogout } from 'helper/storage';
import { store } from 'rootStore';
import { EServerErrorCode } from './networkConstant';
import { message } from 'antd';
import { CONST_COMMON } from 'constants/language';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: process.env.REACT_APP_API_DOMAIN,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const configTemp = { ...config };
    if (configTemp.headers) {
      const assessToken = store.getState().auth.accessToken;
      const companyIdLeague = store.getState().auth.companyIdLeague;
      const authInfo = store.getState().auth.authInfo;
      configTemp.headers.Authorization = `Bearer ${assessToken}`;
      configTemp.headers['Company-B2b-Id'] = authInfo?.company?.id === companyIdLeague ? null : companyIdLeague;
      configTemp.headers['User-Role'] = getUseRoleByHostName();
    }
    return configTemp;
  },
  (error: any) => {
    return error;
  }
);

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error?.response?.status === EServerErrorCode.UNAUTHORIZED) {
      const assessToken = store.getState().auth.accessToken;
      if (assessToken) {
        handleLogout();
      }
    }
    // for admin update regulations
    if (
      error?.response?.status === EServerErrorCode.FORBIDDEN &&
      (error?.response?.data?.code === VALIDATE_ERROR_CODE.REGULATIONS_REFORBIDDEN_CODE ||
        error?.response?.data?.code === VALIDATE_ERROR_CODE.COMPANY_NOT_USING)
    ) {
      handleLogout();
    }
    // for company not verify document
    if (
      error?.response?.status === EServerErrorCode.FORBIDDEN &&
      error?.response?.data?.code === VALIDATE_ERROR_CODE.NOT_VERIFIED_DOCUMENT
    ) {
      handleLogout();
    }
    if (error?.response?.data?.code === VALIDATE_ERROR_CODE.LEAGUE_NO_PERMISSION) {
      handleLogout();
    }

    // not access
    if (
      error?.response?.status === EServerErrorCode.FORBIDDEN &&
      error?.response?.data?.code === VALIDATE_ERROR_CODE.NOT_ACCESS
    ) {
      // back to 403 page
      if ((window as any).location.href !== getURLTopPage() + '403') {
        (window as any).location.href = '/403';
      }
    }

    // system error
    if (error?.response?.status === EServerErrorCode.INTERNAL_SERVER_ERROR) {
      message.error(CONST_COMMON.SYSTEM_ERROR);
    }
    return Promise.reject(error);
  }
);

export const sendGet = (url: string, params?: any) => axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res: any) => res.data)
    .catch((err) => {
      return err;
    });
export const sendPut = (url: string, params?: any) => axiosInstance.put(url, params).then((res: any) => res.data);
export const sendPatch = (url: string, params?: any) => axiosInstance.patch(url, params).then((res: any) => res.data);
export const sendDelete = (url: string, params?: any) =>
  axiosInstance.delete(url, { params }).then((res: any) => res.data);
export const sendFile = (url: string, link: string, name?: string) => {
  const accessToken = store.getState().auth.accessToken;
  const hashLink = link.split('.');
  const fileName = `${name || ''}.${hashLink[hashLink.length - 1]}`;
  fetch(`${process.env.REACT_APP_API_DOMAIN}${url}?link=${link}`, {
    method: 'GET',
    headers: {
      'Content-Type': `application/${hashLink[hashLink.length - 1]}`,
      Authorization: `Bearer ${accessToken}`,
      'User-Role': JSON.stringify(getUseRoleByHostName()),
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const linkDom: any = document.createElement('a');
      linkDom.href = url;
      linkDom.setAttribute('download', `${fileName}`);
      document.body.appendChild(linkDom);
      linkDom.click();
      linkDom.parentNode.removeChild(linkDom);
    });
};

export const getFile = async (url: string, link: string) =>
  fetch(`${process.env.REACT_APP_API_DOMAIN}${url}?link=${link}`, {
    method: 'GET',
    headers: {
      'Content-Type': `application/${link.split('.')[link.split('.').length - 1]}`,
      Authorization: `Bearer ${store.getState().auth.accessToken}`,
      'User-Role': JSON.stringify(getUseRoleByHostName()),
    },
  }).then((response) => response.arrayBuffer());
