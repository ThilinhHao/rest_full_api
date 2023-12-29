/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import SideBar from '@components/layout/SideBar/SideBar';
import LoginPage from '@pages/LoginPage/LoginPage';
import EmailPage from '@pages/EmailPage/EmailPage';
import CustomRoute from 'wrappers/AuthWrapper/CustomRouter';
import EmptyLayout from 'components/layout/EmptyLayout';
import Page404 from '@pages/ErrorPage/Page404';
import Page403 from '@pages/ErrorPage/Page403';
import useAgencyRoot from './useAgencyRoot';
import useCompanyRoot from './useCompanyRoot';
import SettingPassword from '@pages/ForgotPassword/ForgotPassword';

import configs from 'config';
import { getDataPermssionOwner, getFullHostName } from 'helper';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import {
  MAIN_ROUTE,
  MAIN_ROUTE_COMPANY,
  MAIN_ROUTE_AGENCY,
  RouterItemInterface,
  MAIN_ROUTE_B_TO_B_COMPANY,
  MAIN_ROUTE_COMPANY_SUSPEND,
} from 'wrappers/AuthWrapper/AuthWrapper';
import { EStatusCompany } from 'constants/constants';
import { PageNull } from '@pages/ErrorPage/PageNull';
import { UrlInvalid } from '@pages/ErrorPage/UrlInvalid';

export default function RootWrapper() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userType = useAppSelector((state) => state.auth.type);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const location = useLocation();
  // check company verify documents
  const { isCompanyNotVerifiedAllDocuments, companyVerifyRoutes } = useCompanyRoot();
  // check agency verify documents
  const { isAgencyNotVerifiedAllDocuments, agencyVerifyRoutes } = useAgencyRoot();
  const navigate = useNavigate();
  const createRouteChild = (item: RouterItemInterface, index: number) => {
    const Component: any = item.desktop;
    const Layout: any = item.layout || EmptyLayout;
    return <React.Fragment key={index}>{CustomRoute({ component: Component, Layout, ...item })}</React.Fragment>;
  };
  const ROUTE = useMemo(() => {
    if (getFullHostName() === configs.APP_FRONTEND_OPERATOR) {
      return getDataPermssionOwner(userType, MAIN_ROUTE);
    }
    if (getFullHostName() === configs.APP_FRONTEND_AGENCY) {
      return getDataPermssionOwner(userType, MAIN_ROUTE_AGENCY);
    }
    if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
      if (authInfo?.company?.status === EStatusCompany.STATUS_SUSPEND) {
        return getDataPermssionOwner(userType, MAIN_ROUTE_COMPANY_SUSPEND);
      }
      if (companyIdLeague && companyIdLeague !== authInfo?.company?.id) {
        return getDataPermssionOwner(userType, MAIN_ROUTE_B_TO_B_COMPANY);
      }
      return getDataPermssionOwner(userType, MAIN_ROUTE_COMPANY);
    }
    return [];
  }, [userType, companyIdLeague, authInfo]);

  const listUploadRoute = [
    '/agency/upload-document',
    '/agency/verify-privacy-policy',
    '/agency/verify-terms-of-use-contract',
    '/company/upload-document',
    '/company/verify-privacy-policy',
    '/company/verify-terms-of-use-contract',
  ];

  const listPatchName = listUploadRoute.concat([
    '/setting/profile',
    // '/setting',
    // '/setting/edit/bank',
  ]);

  useEffect(() => {
    if (!(!accessToken || isCompanyNotVerifiedAllDocuments || isAgencyNotVerifiedAllDocuments)) {
      if (listPatchName.find((element: string) => location.pathname === element)) {
        if (authInfo?.company?.status === EStatusCompany.STATUS_SUSPEND) {
          navigate('/history');
        } else {
          navigate('/');
        }
      }
    }
  }, [
    isCompanyNotVerifiedAllDocuments,
    isAgencyNotVerifiedAllDocuments,
    location,
    accessToken,
    listPatchName,
    navigate,
    authInfo,
  ]);

  return (
    <>
      {!accessToken ||
      isCompanyNotVerifiedAllDocuments ||
      isAgencyNotVerifiedAllDocuments ||
      location.pathname === '/setting' ||
      location.pathname === '/url-invalid' ||
      location.pathname === '/login' ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/setting" element={<SettingPassword />} />
          <Route path="/email" element={<EmailPage />} />

          {/* route for company verify documents */}
          {accessToken && (
            <>
              {companyVerifyRoutes}
              {agencyVerifyRoutes}
            </>
          )}
          <Route path="*" element={<Page404 />} />
          <Route path="/403" element={<Page403 />} />
          <Route path="/url-invalid" element={<UrlInvalid />} />
        </Routes>
      ) : (
        <SideBar
          content={
            <Routes>
              {ROUTE.map(createRouteChild)}
              <Route path="*" element={<Page404 />} />
              <Route path="/setting/edit/salary" element={<PageNull />} />
              <Route path="/setting/edit/bank" element={<PageNull />} />
              <Route path="/403" element={<Page403 />} />
              <Route path="/url-invalid" element={<UrlInvalid />} />
            </Routes>
          }
        />
      )}
    </>
  );
}
