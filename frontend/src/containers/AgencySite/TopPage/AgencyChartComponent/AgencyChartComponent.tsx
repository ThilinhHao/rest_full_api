import React from 'react';

import TopPageCompanyChart from '@containers/OperatorSite/TopPage/ChartOperatorTopPage/TopPageCompanyChart/TopPageCompanyChart';
import DatePickerTopCustom from '@containers/CompanySite/TopPage/ChartComponent/DatePickerTopCustom/DatePickerTopCustom';
import SwitchAgencyTopButton from './SwitchAgencyTopButton/SwitchAgencyTopButton';
import useAgencyChart from './useAgencyChart';

import { SpaceBase } from 'styles';
import {
  AgencyChartWrapper,
  ChartSizeWrapper,
  FilterTopPageWrapper,
  PrepaidUsageAgency,
} from './agencyChartComponentStyle';
import { Dayjs } from 'dayjs';
import { CONST_TOP_PAGE_AGENCY } from 'constants/language';

const AgencyChartComponent = ({
  setIsLoadingChart,
  setYear,
  year,
}: {
  year: Dayjs;
  setYear: (year: Dayjs) => void;
  setIsLoadingChart: (isLoading: boolean) => void;
}) => {
  const { agencyTypeChart, setAgencyTypeChart, dataChartCurrent } = useAgencyChart(setIsLoadingChart, year, setYear);
  const VALUE_CHART = {
    1: CONST_TOP_PAGE_AGENCY.PREPAID_USAGE,
    2: CONST_TOP_PAGE_AGENCY.PREPAID_USAGE_AMOUNT,
    3: CONST_TOP_PAGE_AGENCY.BROKERAGE_FEE,
  };

  return (
    <AgencyChartWrapper>
      <FilterTopPageWrapper>
        <SpaceBase width={4} />
        <DatePickerTopCustom onChangeYear={setYear} year={year} />
        <SwitchAgencyTopButton selected={agencyTypeChart} setSelected={setAgencyTypeChart} />
      </FilterTopPageWrapper>
      <ChartSizeWrapper>
        <PrepaidUsageAgency>{VALUE_CHART[agencyTypeChart]}</PrepaidUsageAgency>
        <TopPageCompanyChart dataChartCurrent={dataChartCurrent} isSelectedDate={false} />
      </ChartSizeWrapper>
    </AgencyChartWrapper>
  );
};

export default AgencyChartComponent;
