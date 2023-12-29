import React from 'react';

import { SpaceBase } from 'styles';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { SearchInputWrapper } from '@components/CompanySite/AttendanceRecord/SearchInput/searchInputStyle';
import { Container, GrantCard } from '@components/Style/Style';
import { HeaderSettingWrapper } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import { CONST_ATTENDANCE_COMPANY, CONST_COMMON } from 'constants/language';
import {
  BtnToSetting,
  ContainerContent,
  ControlHeaderWrapper,
  LoadingAttendance,
  NoDataAttendance,
} from './attendanceRecordStyle';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import WeekChange from '@components/CompanySite/AttendanceRecord/WeekChange/WeekChange';
import ListShiftItem from '@components/CompanySite/AttendanceRecord/ListShiftItem/ListShiftItem';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import useAttendanceRecord from './useAttendanceRecord';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

const AttendanceRecord = () => {
  const {
    ref,
    month,
    BREADS,
    maxPage,
    listDate,
    dayInWeek,
    pageStaff,
    isLoading,
    listMember,
    defaultPage,
    page,
    setPage,
    preWeek,
    nextWeek,
    toSetting,
    changePaging,
    onChangeMonth,
    onSearch,
    setValueSearch,
  } = useAttendanceRecord();

  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);
  const isOwner = !(companyIdLeague && companyIdLeague !== authInfo?.company?.id);

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard padding="1.25rem 0rem" percentWidth="100%" width={106.25}>
          <div>
            <HeaderSettingWrapper>
              <SettingIcon src={images.companySite.managementTime} alt="setting" />
              <TitleHeaderSetting>{CONST_ATTENDANCE_COMPANY.ATTENDANCE_RECORD}</TitleHeaderSetting>
            </HeaderSettingWrapper>

            <ControlHeaderWrapper>
              <DatePickerCustom onChangeMonth={onChangeMonth} month={month} />
              {/* <SearchInput searchAttendance={searchAttendance} /> */}
              <SearchInputWrapper
                onKeyDown={onSearch}
                placeholder={CONST_COMMON.SEARCH_BY_NAME}
                onChange={(e) => setValueSearch(e.target.value)}
              />
              {listMember && listMember.length > 0 && (
                <PaginationRecord
                  current={pageStaff.page}
                  total={pageStaff.total}
                  pageSize={defaultPage.per_page}
                  onChange={changePaging}
                />
              )}
            </ControlHeaderWrapper>

            {isLoading && (
              <LoadingAttendance>
                <SpaceBase height={5} />
                <Loading />
              </LoadingAttendance>
            )}

            <ContainerContent>
              {listMember && listMember.length === 0 && !isLoading && (
                <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
              )}
              {listMember && listMember.length > 0 && (
                <WeekChange preWeek={preWeek} dayInWeek={dayInWeek} nextWeek={nextWeek} page={page} maxPage={maxPage} />
              )}
              <ListShiftItem
                listDate={listDate}
                listMember={listMember}
                ref={ref}
                maxPage={maxPage}
                setPage={setPage}
                month={month}
              />
            </ContainerContent>

            <SpaceBase height={4} />
            {!isLoading && isOwner && <BtnToSetting onClick={toSetting}>{CONST_COMMON.EDIT}</BtnToSetting>}
            <SpaceBase height={2} />
          </div>
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};

export default AttendanceRecord;
