import React, { useState } from 'react';
import { LoadingAgencyWrapper, TopPageAgencyCard, WrapperFlexRow } from './topPageAgencyStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { Container } from '@components/Style/Style';
import IntroducedCompanySearch from '@containers/AgencySite/TopPage/IntroducedCompanySearch/IntroducedCompanySearch';
import AgencyChartComponent from '@containers/AgencySite/TopPage/AgencyChartComponent/AgencyChartComponent';
import RankUseAgency from '@containers/AgencySite/TopPage/RankUseAgency/RankUseAgency';
import Loading from '@components/Loading';
import dayjs from 'dayjs';

const TopPageAgency = () => {
  const [isLoadingChart, setIsLoadingChart] = useState<boolean>(true);
  const [isLoadingRank, setIsLoadingRank] = useState<boolean>(true);
  const [year, setYear] = useState(dayjs());

  return (
    <GrantCompanyWrapper>
      <Container>
        <TopPageAgencyCard>
          {(isLoadingChart || isLoadingRank) && (
            <LoadingAgencyWrapper>
              <Loading />
            </LoadingAgencyWrapper>
          )}
          <IntroducedCompanySearch />
          <WrapperFlexRow>
            <AgencyChartComponent setIsLoadingChart={setIsLoadingChart} year={year} setYear={setYear} />
            <RankUseAgency setIsLoadingRank={setIsLoadingRank}  year={year} />
          </WrapperFlexRow>
        </TopPageAgencyCard>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default TopPageAgency;
