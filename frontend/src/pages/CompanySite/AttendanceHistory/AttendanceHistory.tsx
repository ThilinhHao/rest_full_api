import React from 'react';

import { SpaceBase } from 'styles';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { SearchInputWrapper } from '@components/CompanySite/AttendanceRecord/SearchInput/searchInputStyle';
import { Container, GrantCard } from '@components/Style/Style';
import { HeaderSettingWrapper } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import { ContainerHistoryWrapper } from './attendanceHistoryStyle';
import { CONST_ATTENDANCE_COMPANY, CONST_COMMON } from 'constants/language';
import { ControlHeaderWrapper, LoadingAttendance, NoDataAttendance } from '../AttendanceRecord/attendanceRecordStyle';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import WeekChange from '@components/CompanySite/AttendanceRecord/WeekChange/WeekChange';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import useAttendanceHistory from './useAttendanceHistory';
import AttendanceHistoryContainer from '@containers/CompanySite/AttendanceHistoryContainer/AttendanceHistoryContainer';

const BREADS = [
  {
    name: CONST_ATTENDANCE_COMPANY.PAYMENT_APPLICATION,
    path: '',
  },
];
const AttendanceHistory = () => {
  const {
    month,
    onChangeMonth,
    preWeek,
    nextWeek,
    dayInWeek,
    listDate,
    setPage,
    ref,
    page,
    maxPage,
    listMember,
    pageStaff,
    defaultPage,
    changePaging,
    isLoading,
    onSearch,
    setValueSearch,
  } = useAttendanceHistory();

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard padding="1.25rem 0rem" percentWidth="100%" width={107}>
          <div>
            <HeaderSettingWrapper>
              <SettingIcon src={images.companySite.oClock} />
              <TitleHeaderSetting>{CONST_ATTENDANCE_COMPANY.PAYMENT_APPLICATION}</TitleHeaderSetting>
            </HeaderSettingWrapper>

            <ControlHeaderWrapper>
              <DatePickerCustom onChangeMonth={onChangeMonth} month={month} />
              {/* <SearchInput searchAttendance={() => {}} /> */}
              <SearchInputWrapper
                onKeyDown={onSearch}
                placeholder={CONST_COMMON.SEARCH_BY_NAME}
                onChange={(e) => setValueSearch(e.target.value)}
              />
              <PaginationRecord
                current={pageStaff.page}
                total={pageStaff.total}
                pageSize={defaultPage.per_page}
                onChange={changePaging}
              />
            </ControlHeaderWrapper>

            {isLoading && (
              <LoadingAttendance>
                <SpaceBase height={5} />
                <Loading />
              </LoadingAttendance>
            )}
            <ContainerHistoryWrapper>
              {listMember && listMember.length === 0 && !isLoading && (
                <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
              )}
              {listMember && listMember.length > 0 && (
                <React.Fragment>
                  <WeekChange
                    preWeek={preWeek}
                    dayInWeek={dayInWeek}
                    nextWeek={nextWeek}
                    page={page}
                    maxPage={maxPage}
                  />
                  <AttendanceHistoryContainer
                    month={month}
                    listMember={listMember}
                    listDate={listDate}
                    setPage={setPage}
                    ref={ref}
                    maxPage={maxPage}
                  />
                </React.Fragment>
              )}
            </ContainerHistoryWrapper>
          </div>
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};

export default AttendanceHistory;
