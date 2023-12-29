import React from 'react';

import ChartComponent from '@containers/CompanySite/TopPage/ChartComponent/ChartComponent';
import DailyWorkComponent from '@containers/CompanySite/TopPage/DailyWorkComponent/DailyWorkComponent';
import RangePickerComponent from '@containers/CompanySite/TopPage/RangePickerComponent/RangePickerComponent';
import QuickManagementComponent from '@containers/CompanySite/TopPage/QuickManagementComponent/QuickManagementComponent';

import { SpaceBase } from 'styles';
import { Container } from '@components/Style/Style';
import { TopPageWrapper } from './topPageStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';

const TopPage = () => {
  return (
    <GrantCompanyWrapper>
      <Container>
        <TopPageWrapper>
          <RangePickerComponent />
          <DailyWorkComponent />
        </TopPageWrapper>
        <SpaceBase height={1.25} />
        <TopPageWrapper>
          <ChartComponent />
          <QuickManagementComponent />
        </TopPageWrapper>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default TopPage;
