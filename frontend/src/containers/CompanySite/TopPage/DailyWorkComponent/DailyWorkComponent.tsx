import React from 'react';
import {
  CountContainer,
  CountPersonWrapper,
  DailyWorkComponentWrapper,
  HeaderDailyWork,
  IconExclamation,
  IconSpace,
  LabelLeft,
  LoadingWrapperDaily,
  Person,
  PersonData,
} from './dayliWorkComponentStyle';
import images from '@assets/images-base';
import useDailyWork from './useDailyWork';
import { SpaceBase } from 'styles';
import { CONST_TOP_PAGE_COMPANY } from 'constants/language';
import Loading from '@components/Loading';

const DailyWorkComponent = () => {
  const { dataDailyWork, isAuto, isLoading, toApproveScreen, toAttendanceDetail } = useDailyWork();

  return (
    <DailyWorkComponentWrapper>
      <HeaderDailyWork>{CONST_TOP_PAGE_COMPANY.DAILY_WORK}</HeaderDailyWork>
      {isLoading && (
        <LoadingWrapperDaily>
          <Loading />
        </LoadingWrapperDaily>
      )}
      <CountContainer>
        {!isAuto && (
          <CountPersonWrapper>
            <LabelLeft>
              {dataDailyWork.notHandle > 0 ? (
                <IconExclamation src={images.companySite.exclamationMark} />
              ) : (
                <IconSpace />
              )}
              {CONST_TOP_PAGE_COMPANY.PREPAYMENT_APPLICATION}
            </LabelLeft>
            <PersonData onClick={toApproveScreen}>
              &nbsp;{dataDailyWork.notHandle} <Person>件</Person>
            </PersonData>
          </CountPersonWrapper>
        )}
        {isAuto && <SpaceBase height={1} />}
        <CountPersonWrapper>
          <LabelLeft>
            {dataDailyWork.notMark > 0 ? <IconExclamation src={images.companySite.exclamationMark} /> : <IconSpace />}
            {CONST_TOP_PAGE_COMPANY.ATTENDANCE_CONFIRMATION}
          </LabelLeft>
          <PersonData onClick={toAttendanceDetail}>
            &nbsp;{dataDailyWork.notMark} <Person>人</Person>
          </PersonData>
        </CountPersonWrapper>
        {isAuto && <SpaceBase height={3} />}
      </CountContainer>
    </DailyWorkComponentWrapper>
  );
};

export default DailyWorkComponent;
