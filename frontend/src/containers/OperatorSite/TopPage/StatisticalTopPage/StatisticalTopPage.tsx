import React from 'react';

import useStatisticalTopPage from './useStatisticalTopPage';
import Loading from '@components/Loading';

import { SpaceBase } from 'styles';
import { formatMoneyNumber } from 'helper/formatMoney';
import {
  RowStatistic,
  StatisticalLoadingWrapper,
  StatisticalWrapper,
  SubjectNumber,
  TitleStatistic,
  TodayNumber,
  TodayNumberSuspended,
  TodayStick,
  TodayStickMonth,
  TodayStickSuspended,
  WrapperTotal,
} from './StatisticalTopPageStyle';
import { CONST_TOP_PAGE_OPERATOR } from 'constants/language';

const StatisticalTopPage = () => {
  const { statisticalData, isLoading } = useStatisticalTopPage();

  return (
    <StatisticalWrapper>
      {isLoading && (
        <StatisticalLoadingWrapper>
          <Loading />
        </StatisticalLoadingWrapper>
      )}
      <TitleStatistic>{CONST_TOP_PAGE_OPERATOR.NUMBER_ADVANCE_PAYMENT}</TitleStatistic>
      <SpaceBase height={1.875} />
      <RowStatistic>
        <TodayStick>{CONST_TOP_PAGE_OPERATOR.NUMBER_APPLICATION_TODAY}</TodayStick>
        <WrapperTotal>
          <TodayNumber>{formatMoneyNumber(statisticalData.totalDay)}</TodayNumber>
          <SubjectNumber>{CONST_TOP_PAGE_OPERATOR.SUBJECT}</SubjectNumber>
        </WrapperTotal>

        <TodayStickMonth>{CONST_TOP_PAGE_OPERATOR.CUMULATIVE_NUMBER}</TodayStickMonth>
        <TodayNumber>{formatMoneyNumber(statisticalData.totalMonth)}</TodayNumber>
        <SubjectNumber>{CONST_TOP_PAGE_OPERATOR.SUBJECT}</SubjectNumber>
      </RowStatistic>
      <SpaceBase height={3.75} />
      <TitleStatistic>{CONST_TOP_PAGE_OPERATOR.SUSPENDED_NUMBER_TITLE}</TitleStatistic>
      <SpaceBase height={1.688} />
      <RowStatistic>
        <TodayStickSuspended>{CONST_TOP_PAGE_OPERATOR.SUSPENDED_NUMBER}</TodayStickSuspended>
        <TodayNumberSuspended>{formatMoneyNumber(statisticalData.totalSuspend)}</TodayNumberSuspended>
        <SubjectNumber>{CONST_TOP_PAGE_OPERATOR.COMPANY}</SubjectNumber>
      </RowStatistic>
    </StatisticalWrapper>
  );
};

export default StatisticalTopPage;
