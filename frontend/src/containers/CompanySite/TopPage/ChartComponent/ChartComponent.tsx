import React from 'react';

import Loading from '@components/Loading';
import TopPageChart from '@components/common/TopPageChart/TopPageChart';
import SwitchTopButton from './SwitchTopButton/SwitchTopButton';
import useChartComponent from './useChartComponent';
import DatePickerTopCustom from './DatePickerTopCustom/DatePickerTopCustom';

import { ETotalTypeChart, VALUE_CHART_TOP_PAGE } from 'constants/constants';
import { CONST_TOP_PAGE_COMPANY } from 'constants/language';

import {
  ChartComponentWrapper,
  LoadingWrapperChart,
  PrepaidUsage,
  SwitchWrapper,
  WrapperFilter,
} from './chartComponentStyle';

const labelDefault = {
  [ETotalTypeChart.SALARY]: CONST_TOP_PAGE_COMPANY.USAGE_AMOUNT,
  [ETotalTypeChart.REQUEST]: CONST_TOP_PAGE_COMPANY.USER_AMOUNT,
};
const ChartComponent = () => {
  const { setSelected, dataChartCurrent, isLoading, selected, setYear, year } = useChartComponent();

  return (
    <ChartComponentWrapper>
      {isLoading && (
        <LoadingWrapperChart>
          <Loading />
        </LoadingWrapperChart>
      )}
      <PrepaidUsage>{VALUE_CHART_TOP_PAGE[selected]}</PrepaidUsage>
      <TopPageChart dataChartCurrent={dataChartCurrent} label={labelDefault[selected]} fromCompany />
      <WrapperFilter>
        <DatePickerTopCustom onChangeYear={setYear} year={year} />
        <SwitchWrapper>
          <SwitchTopButton selected={selected} setSelected={setSelected} />
        </SwitchWrapper>
      </WrapperFilter>
    </ChartComponentWrapper>
  );
};

export default ChartComponent;
