import React from 'react';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import HomePageWrapper from './homePageStyle';
import { CONST_BREADS } from 'constants/language';

const HomePage = () => {
  const BREADS = [
    {
      name: CONST_BREADS.ACCOUNT_LIST_COMPANY_OR_ADMIN,
      path: '/employee',
    },
    {
      name: '企業/管理者アカウント発行',
      path: '/employee/10',
    },
  ];
  return (
    <HomePageWrapper>
      <BreadCrumb breads={BREADS} />
    </HomePageWrapper>
  );
};

export default HomePage;
