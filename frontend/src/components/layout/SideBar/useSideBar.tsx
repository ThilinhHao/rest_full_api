import React, { useMemo } from 'react';
import images from '@assets/images-base';
import { useLocation, useNavigate } from 'react-router-dom';

import CONST_SIDE_BAR from './constants';
import { MenuItemIcon } from './sideBarStyle';
import { getDataPermssionOwner, getFullHostName } from 'helper';
import configs from 'config';
import { USER_PERMISION_ONWER } from 'constants/User';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { EStatusCompany } from 'constants/constants';

interface IMenu {
  key: string;
  icon: any;
  label: string;
  path: string;
  permssion?: string;
}

const MENU_OPERATOR = [
  // {
  //   key: '0',
  //   icon: <MenuItemIcon src={images.sideBar.person} alt="" />,
  //   label: CONST_SIDE_BAR.MENU.EMPLOYEE_ACCOUNT,
  //   path: '/',
  // },
  {
    key: '1',
    icon: <MenuItemIcon src={images.sideBar.management} alt="" />,
    label: CONST_SIDE_BAR.MENU.OPE_MANAGEMENT_ACCOUNT,
    path: '/operator',
  },
  {
    key: '2',
    icon: <MenuItemIcon src={images.sideBar.agencySidebar} alt="" />,
    label: CONST_SIDE_BAR.MENU.OPE_CORPORATE_ACCOUNT,
    path: '/company',
  },
  {
    key: '3',
    icon: <MenuItemIcon src={images.sideBar.agency} alt="" />,
    label: CONST_SIDE_BAR.MENU.OPE_AGENCY_ACCOUNT,
    path: '/agency',
  },
  {
    key: '4',
    icon: <MenuItemIcon src={images.sideBar.messageMenu} alt="" />,
    label: CONST_SIDE_BAR.MENU.OPE_INQUIRY,
    path: '/chat',
  },
  {
    key: '5',
    icon: <MenuItemIcon src={images.sideBar.newPost} alt="" />,
    label: CONST_SIDE_BAR.MENU.NEW_POST,
    path: '/notice',
  },
  {
    key: '6',
    icon: <MenuItemIcon src={images.sideBar.usageInformation} alt="" />,
    label: CONST_SIDE_BAR.MENU.USAGE_INFORMATION,
    path: '/company-invoices',
  },
  {
    key: '7',
    icon: <MenuItemIcon src={images.sideBar.parkSidebar} alt="" />,
    label: CONST_SIDE_BAR.MENU.OPE_AGENCY_PEE,
    path: '/agency-invoices',
  },
  {
    key: '8',
    icon: <MenuItemIcon src={images.sideBar.operationLog} alt="" />,
    label: CONST_SIDE_BAR.MENU.SETTING,
    path: '/setting-page',
  },
];

const MENU_AGENT = [
  {
    key: '1',
    icon: <MenuItemIcon src={images.sideBar.agencySidebar} alt="" />,
    label: CONST_SIDE_BAR.MENU.AGENCY_ACCOUNT,
    path: '/companies',
    permssion: USER_PERMISION_ONWER,
  },
  {
    key: '2',
    icon: <MenuItemIcon src={images.sideBar.newPost} alt="" />,
    label: CONST_SIDE_BAR.MENU.COMPANY_ACCOUNT,
    path: '/notice',
  },
  {
    key: '3',
    icon: <MenuItemIcon src={images.sideBar.parkSidebar} alt="" />,
    label: CONST_SIDE_BAR.MENU.AGENCY_PEE_STATEMENT,
    path: '/invoices',
  },
  {
    key: '4',
    icon: <MenuItemIcon src={images.sideBar.privacyPolicy} alt="" />,
    label: CONST_SIDE_BAR.MENU.VARIOUS_DOCUMENT,
    path: '/term-of-use',
  },
];

const MENU_COMPANY = [
  {
    key: '1',
    icon: <MenuItemIcon src={images.sideBar.companyAgencyAccount} alt="" />,
    label: CONST_SIDE_BAR.MENU.EMPLOYEE_ACCOUNT,
    path: '/staff-list',
  },
  {
    key: '2',
    icon: <MenuItemIcon src={images.sideBar.companyAdminAccount} alt="" />,
    label: CONST_SIDE_BAR.MENU.ADMIN_ACCOUNT,
    path: '/admin-account-list',
  },
  {
    key: '3',
    icon: <MenuItemIcon src={images.sideBar.companyPrePaymentHistory} alt="" />,
    label: CONST_SIDE_BAR.MENU.PREPAYMENT_HISTORY,
    path: '/history',
  },
  {
    key: '4',
    icon: <MenuItemIcon src={images.sideBar.companyAttendanceInfo} alt="" />,
    label: CONST_SIDE_BAR.MENU.ATTENDANCE_INFORMATION,
    path: '/attendance',
  },
  {
    key: '5',
    icon: <MenuItemIcon src={images.sideBar.companyUsageAccount} alt="" />,
    label: CONST_SIDE_BAR.MENU.INVOICE,
    path: '/invoices',
  },
  {
    key: '6',
    icon: <MenuItemIcon src={images.sideBar.yenSideBar} alt="" />,
    label: CONST_SIDE_BAR.MENU.PAYMENT_APPLICATION,
    path: '/approve',
  },
  {
    key: '7',
    icon: <MenuItemIcon src={images.sideBar.companySetting} alt="" />,
    label: CONST_SIDE_BAR.MENU.SETTING,
    path: '/setting-page',
  },
];

const MENU_COMPANY_SUSPEND = [
  {
    key: '1',
    icon: <MenuItemIcon src={images.sideBar.companyPrePaymentHistory} alt="" />,
    label: CONST_SIDE_BAR.MENU.PREPAYMENT_HISTORY,
    path: '/history',
  },
  {
    key: '5',
    icon: <MenuItemIcon src={images.sideBar.companyUsageAccount} alt="" />,
    label: CONST_SIDE_BAR.MENU.INVOICE,
    path: '/invoices',
  },
];

const MENU_B_TO_B_COMPANY = [
  {
    key: '1',
    icon: <MenuItemIcon src={images.sideBar.companyAgencyAccount} alt="" />,
    label: CONST_SIDE_BAR.MENU.EMPLOYEE_ACCOUNT,
    path: '/staff-list',
  },
  {
    key: '2',
    icon: <MenuItemIcon src={images.sideBar.companyAdminAccount} alt="" />,
    label: CONST_SIDE_BAR.MENU.ADMIN_ACCOUNT,
    path: '/admin-account-list',
  },
  {
    key: '3',
    icon: <MenuItemIcon src={images.sideBar.companyPrePaymentHistory} alt="" />,
    label: CONST_SIDE_BAR.MENU.PREPAYMENT_HISTORY,
    path: '/history',
  },
  {
    key: '4',
    icon: <MenuItemIcon src={images.sideBar.companyAttendanceInfo} alt="" />,
    label: CONST_SIDE_BAR.MENU.ATTENDANCE_INFORMATION,
    path: '/attendance',
  },
  {
    key: '5',
    icon: <MenuItemIcon src={images.sideBar.companyUsageAccount} alt="" />,
    label: CONST_SIDE_BAR.MENU.INVOICE,
    path: '/invoices',
  },
];

const useSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = useAppSelector((state) => state.auth.type);
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);

  const ITEM_MENU = useMemo(() => {
    if (getFullHostName() === configs.APP_FRONTEND_OPERATOR) {
      return getDataPermssionOwner(userType, MENU_OPERATOR);
    }
    if (getFullHostName() === configs.APP_FRONTEND_AGENCY) {
      return getDataPermssionOwner(userType, MENU_AGENT);
    }
    if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
      if (authInfo?.company?.status === EStatusCompany.STATUS_SUSPEND) {
        return getDataPermssionOwner(userType, MENU_COMPANY_SUSPEND);
      } else if (companyIdLeague && companyIdLeague !== authInfo?.company?.id) {
        return getDataPermssionOwner(userType, MENU_B_TO_B_COMPANY);
      } else {
        return getDataPermssionOwner(userType, MENU_COMPANY);
      }
    }
    return [];
  }, [userType, authInfo, companyIdLeague]);

  const keyToPath = (key: string) => {
    const path = ITEM_MENU.find((element: IMenu) => element.key === key);
    if (path) {
      if (path.path === location.pathname) {
        navigate(0);
      } else {
        navigate(`${path.path}`);
      }
    }
  };

  const pathToKey = () => {
    const root = location.pathname?.split('/')[1];
    if (!root) {
      return '0';
    }
    const keyMenu = ITEM_MENU.find((element: IMenu) => root === element.path?.split('/')[1])?.key;
    return keyMenu;
  };

  return {
    ITEM_MENU,
    keyToPath,
    pathToKey,
  };
};

export default useSideBar;
