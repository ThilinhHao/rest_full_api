import React from 'react';
import { GrantCompanyWrapper } from '../Companies/CreateCompany/createCompanyStyle';
import { Container } from '@components/Style/Style';
import QuickSelect from '@containers/OperatorSite/TopPage/QuickSelect/QuickSelect';
import StatisticalTopPage from '@containers/OperatorSite/TopPage/StatisticalTopPage/StatisticalTopPage';
import { TopPageWrapper } from '@pages/CompanySite/TopPage/topPageStyle';
import ChartOperatorTopPage from '@containers/OperatorSite/TopPage/ChartOperatorTopPage/ChartOperatorTopPage';

const TopPageOperator = () => {
  return (
    <GrantCompanyWrapper>
      <Container>
        <TopPageWrapper>
          <QuickSelect />
          <StatisticalTopPage />
        </TopPageWrapper>
        <ChartOperatorTopPage />
      </Container>
    </GrantCompanyWrapper>
  );
};

export default TopPageOperator;
