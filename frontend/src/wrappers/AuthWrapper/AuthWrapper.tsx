import DetailBank from '@containers/OperatorSite/OperatorBank/DetailBank/DetailBank';
import ListAgency from '@pages/OperatorSite/Agencies/ListAgency/ListAgency';
import ListCompany from '@pages/OperatorSite/Companies/ListCompany/ListCompany';
import SettingPage from '@pages/OperatorSite/SettingPage/SettingPage';
import OperatorBank from '@containers/OperatorSite/OperatorBank/OperatorBank';
import CreateAgency from '@pages/OperatorSite/Agencies/CreateAgency/CreateAgency';
import ListOperator from '@pages/OperatorSite/Operators/ListOperator/ListOperator';
import GrantCompany from '@pages/OperatorSite/Companies/CreateCompany/CreateCompany';
import CreateOperator from '@pages/OperatorSite/Operators/CreateOperator/CreateOperator';
import EditPrivacyPolicy from '@pages/OperatorSite/EditPrivacyPolicy/EditPrivacyPolicy';
import OperatorChatManagement from '@pages/OperatorSite/ChatManagement/ChatManagement';

import AgencyListCompany from '@pages/AgencySite/Companies/ListCompany/listCompany';
import ProfileAgency from '@pages/AgencySite/ProfileAgency/ProfileAgency';

import { USER_PERMISION_ONWER } from 'constants/User';

import SalaryAdvance from '@pages/CompanySite/SalaryAdvance/SalaryAdvance';
import StaffManagement from '@pages/CompanySite/StaffManagement/StaffManagement';
import ListAdminAccount from '@pages/CompanySite/ListAdminAccount/ListAdminAccount';
import AttendanceDetail from '@pages/CompanySite/AttendanceDetail/AttendanceDetail';
import AttendanceRecord from '@pages/CompanySite/AttendanceRecord/AttendanceRecord';
import AttendanceMember from '@pages/CompanySite/AttendanceMember/AttendanceMember';
import AttendanceHistory from '@pages/CompanySite/AttendanceHistory/AttendanceHistory';
import CompanyBankSetting from '@pages/CompanySite/BankSetting/BankSetting';
import CompanySettingPage from '@pages/CompanySite/SettingPage/SettingPage';
import { CompanyProfile } from '@pages/CompanySite/CompanyProfile/CompanyProfile';
import ApproveSalaryAdvance from '@pages/CompanySite/ApproveSalaryAdvance/ApproveSalaryAdvance';
import AttendanceHistoryDetail from '@pages/CompanySite/AttendanceHistoryDetail/AttendanceHistoryDetail';
import CompanyChatManagement from '@pages/CompanySite/ChatManagement/ChatManagement';
import CompanyB2B from '@pages/CompanySite/CompanyB2B/CompanyB2B';
import NoticeCreate from '@pages/OperatorSite/NoticeCreate/NoticeCreate';
import NoticeList from '@pages/OperatorSite/NoticeList/NoticeList';
import NoticeDetail from '@pages/OperatorSite/NoticeDetail/NoticeDetail';
import FootstepsHistory from '@pages/OperatorSite/FootstepsHistory/FootstepsHistory';
import NoticeListCompany from '@pages/CompanySite/NoticeListCompany/NoticeListCompany';
import NoticeDetailCompany from '@pages/CompanySite/NoticeDetail/NoticeDetailCompany';
import NoticeListAgency from '@pages/AgencySite/NoticeListAgency/NoticeListAgency';
import NoticeDetailAgency from '@pages/AgencySite/NoticeDetailAgency/NoticeDetailAgency';
import FootstepsHistoryCompany from '@pages/CompanySite/FootstepsHistoryCompany/FootstepsHistoryCompany';
import { TermOfUse } from '@pages/CompanySite/TermOfUse/TermOfUse';
import { TermOfUseAgency } from '@pages/AgencySite/TermOfUseAgency/TermOfUseAgency';
import TopPage from '@pages/CompanySite/TopPage/TopPage';
import { ListInvoiceSiteCompany } from '@pages/CompanySite/ListInvoiceSiteCompany/ListInvoiceSiteCompany';
import { InvoiceDetailSiteCompany } from '@pages/CompanySite/InvoiceDetailSiteCompany/InvoiceDetailSiteCompany';
import { ListInvoiceSiteAgency } from '@pages/AgencySite/ListInvoiceSiteAgency/ListInvoiceSiteAgency';
import { InvoiceDetailSiteAgency } from '@pages/AgencySite/InvoiceDetailSiteAgency/InvoiceDetailSiteAgency';
import { ListInvoiceAgency } from '@pages/OperatorSite/ListInvoiceAgency/ListInvoiceAgency';
import { InvoiceDetailAgency } from '@pages/OperatorSite/InvoiceDetailAgency/InvoiceDetailAgency';
import { ListInvoiceCompany } from '@pages/OperatorSite/ListInvoiceCompany/ListInvoiceCompany';
import { InvoiceDetailCompany } from '@pages/OperatorSite/InvoiceDetailCompany/InvoiceDetailCompany';
import TopPageOperator from '@pages/OperatorSite/TopPageOperator/TopPageOperator';
import TopPageAgency from '@pages/AgencySite/TopPageAgency/TopPageAgency';

export interface RouterItemInterface {
  desktop: any;
  path: string;
  exact: boolean;
  layout: any;
  private: boolean;
  permssion?: string;
}

export const MAIN_ROUTE = [
  {
    desktop: GrantCompany,
    path: '/company/create',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListCompany,
    path: '/company',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListOperator,
    path: '/operator',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: CreateOperator,
    path: '/operator/create',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: CreateAgency,
    path: '/agency/create',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListAgency,
    path: '/agency',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: SettingPage,
    path: '/setting-page',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: EditPrivacyPolicy,
    path: '/setting-page/edit/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: OperatorBank, // import('pages/Home'),
    path: '/setting-page/Bank',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: DetailBank,
    path: '/setting/detailBank',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: NoticeCreate,
    path: '/notice/create',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: NoticeList,
    path: '/notice',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: NoticeDetail,
    path: '/notice/detail/:idNotice',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: FootstepsHistory,
    path: '/setting-page/footsteps',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: OperatorChatManagement,
    path: '/chat/:id?',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListInvoiceAgency,
    path: '/agency-invoices',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: InvoiceDetailAgency,
    path: '/agency-invoices/detail/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListInvoiceCompany,
    path: '/company-invoices',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: InvoiceDetailCompany,
    path: '/company-invoices/detail/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: TopPageOperator,
    path: '/',
    exact: true,
    layout: null,
    private: false,
  },
];

export const MAIN_ROUTE_COMPANY = [
  // {
  //   desktop: CompanyHomePage,
  //   path: '/',
  //   exact: true,
  //   layout: null,
  //   private: false,
  // },
  {
    desktop: ListAdminAccount,
    path: '/admin-account-list/*',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListAdminAccount,
    path: '/admin-account-list/create',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListAdminAccount,
    path: '/admin-account/edit/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: CompanyBankSetting,
    path: '/setting-page/edit/bank',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: CompanySettingPage,
    path: '/setting-page',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: SalaryAdvance,
    path: '/setting-page/edit/salary',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: CompanyB2B,
    path: '/setting-page/company-paired',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: StaffManagement,
    path: '/staff-list/*',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: StaffManagement,
    path: '/staff-list/create',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: StaffManagement,
    path: '/staff-list/upload-staff',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: StaffManagement,
    path: '/staff/edit/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: CompanyProfile,
    path: '/profile-detail',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceRecord,
    path: '/attendance',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceDetail,
    path: '/attendance/detail',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceMember,
    path: '/attendance/detail/:idStaff',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ApproveSalaryAdvance,
    path: '/approve',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceHistory,
    path: '/history',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceHistoryDetail,
    path: '/history/:idStaff',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: CompanyChatManagement,
    path: '/chat',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: NoticeListCompany,
    path: '/setting-page/listNotice',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: NoticeDetailCompany,
    path: '/setting-page/listNotice/detail/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: FootstepsHistoryCompany,
    path: '/setting-page/footsteps',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: TermOfUse,
    path: '/setting-page/term-of-use',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: TopPage,
    path: '/',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListInvoiceSiteCompany,
    path: '/invoices',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: InvoiceDetailSiteCompany,
    path: '/invoices/detail/:id',
    exact: true,
    layout: null,
    private: false,
  },
];

export const MAIN_ROUTE_COMPANY_SUSPEND = [
  {
    desktop: AttendanceHistory,
    path: '/',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceHistory,
    path: '/history',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceHistoryDetail,
    path: '/history/:idStaff',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListInvoiceSiteCompany,
    path: '/invoices',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: InvoiceDetailSiteCompany,
    path: '/invoices/detail/:id',
    exact: true,
    layout: null,
    private: false,
  },
];

export const MAIN_ROUTE_B_TO_B_COMPANY = [
  {
    desktop: ListAdminAccount,
    path: '/admin-account-list/*',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: StaffManagement,
    path: '/staff-list/*',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: StaffManagement,
    path: '/staff/edit/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceRecord,
    path: '/attendance',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceHistory,
    path: '/history',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceHistoryDetail,
    path: '/history/:idStaff',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListInvoiceSiteCompany,
    path: '/invoices',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: InvoiceDetailSiteCompany,
    path: '/invoices/detail/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: TopPage,
    path: '/',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceDetail,
    path: '/attendance/detail',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: AttendanceMember,
    path: '/attendance/detail/:idStaff',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ApproveSalaryAdvance,
    path: '/approve',
    exact: true,
    layout: null,
    private: false,
  },
];

export const MAIN_ROUTE_AGENCY = [
  {
    desktop: AgencyListCompany,
    path: '/companies',
    exact: true,
    layout: null,
    private: false,
    permssion: USER_PERMISION_ONWER,
  },
  {
    desktop: ListAgency,
    path: '/agency',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ProfileAgency,
    path: '/profile',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ProfileAgency,
    path: '/setting/notice',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: NoticeListAgency,
    path: '/notice',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: NoticeDetailAgency,
    path: '/notice/detail/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: TermOfUseAgency,
    path: '/term-of-use',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: ListInvoiceSiteAgency,
    path: '/invoices',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: InvoiceDetailSiteAgency,
    path: '/invoices/detail/:id',
    exact: true,
    layout: null,
    private: false,
  },
  {
    desktop: TopPageAgency,
    path: '/',
    exact: true,
    layout: null,
    private: false,
  },
];
