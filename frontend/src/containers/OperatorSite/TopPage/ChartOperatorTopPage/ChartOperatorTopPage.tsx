import React from 'react';

import Loading from '@components/Loading';
import useChartOperator from './useChartOperator';
import SwitchDateButton from './SwitchTopOperatorButton/SwitchDateButton';
import CompanyRankTopPage from './CompanyRankTopPage/CompanyRankTopPage';
import TopPageCompanyChart from './TopPageCompanyChart/TopPageCompanyChart';
import PickerTopPageOperator from './PickerTopPageOperator/PickerTopPageOperator';
import SwitchTopOperatorButton from './SwitchTopOperatorButton/SwitchTopOperatorButton';

import { SpaceBase } from 'styles';
import { VALUE_CHART_TOP_PAGE } from 'constants/constants';
import {
  ChartOperatorTopPageWrapper,
  FilterChartWrapper,
  LoadingOperatorTopPageWrapper,
  PrepaidUsageOperator,
} from './chartOperatorTopPageStyle';

const ChartOperatorTopPage = () => {
  const {
    selected,
    setSelected,
    year,
    selectedSwitchDate,
    setSelectedSwitchDate,
    dataChartOperatorCurrent,
    setYear,
    isLoading,
  } = useChartOperator();
  return (
    <ChartOperatorTopPageWrapper>
      {isLoading && (
        <LoadingOperatorTopPageWrapper>
          <Loading />
        </LoadingOperatorTopPageWrapper>
      )}
      <PrepaidUsageOperator>{VALUE_CHART_TOP_PAGE[selected]}</PrepaidUsageOperator>
      <TopPageCompanyChart
        dataChartCurrent={dataChartOperatorCurrent}
        isSelectedDate={selectedSwitchDate !== 1}
        month={year}
      />
      <FilterChartWrapper>
        <SpaceBase height={6} />

        <PickerTopPageOperator onChangeYear={setYear} year={year} selectedSwitchDate={selectedSwitchDate} />

        <SpaceBase height={3} />
        <SwitchDateButton selected={selectedSwitchDate} setSelected={setSelectedSwitchDate} />
        <SpaceBase height={3.5} />
        <SwitchTopOperatorButton selected={selected} setSelected={setSelected} />
      </FilterChartWrapper>

      <CompanyRankTopPage year={year} selectedSwitchDate={selectedSwitchDate} />
    </ChartOperatorTopPageWrapper>
  );
};

export default ChartOperatorTopPage;
