import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import useAttendanceDetail from './useAttendanceDetail';

import { SpaceBase } from 'styles';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { AttendanceTable } from '@containers/CompanySite/AttendanceDetail/AttendanceTable/AttendanceTable';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { SearchInputWrapper } from '@components/CompanySite/AttendanceRecord/SearchInput/searchInputStyle';
import { Container, GrantCard } from '@components/Style/Style';
import { HeaderSettingWrapper, NoteDiv } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import { CONST_ATTENDANCE_COMPANY, CONST_COMMON } from 'constants/language';
import { ControlHeaderWrapper, LoadingAttendance, NoDataAttendance } from '../AttendanceRecord/attendanceRecordStyle';

const AttendanceDetail = () => {
  const {
    BREADS,
    isLoading,
    pageStaff,
    currentDate,
    attendanceDetailData,
    changePaging,
    onChangeMonth,
    updateAttendanceDetailData,
    onSearch,
    setValueSearch,
    isRootAdmin,
  } = useAttendanceDetail();

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard padding="1.25rem 0rem" percentWidth="100%" width={106.25}>
          <div>
            <HeaderSettingWrapper>
              <SettingIcon src={images.companySite.rushIcon} alt="setting" />
              <TitleHeaderSetting>{CONST_ATTENDANCE_COMPANY.ATTENDANCE_CONFIRMATION}</TitleHeaderSetting>
              {isRootAdmin && <NoteDiv>{CONST_ATTENDANCE_COMPANY.ATTENDANCE_NOTE_TEXT}</NoteDiv>}
            </HeaderSettingWrapper>

            <ControlHeaderWrapper>
              <DatePickerCustom onChangeMonth={onChangeMonth} month={currentDate} normalPicker={true} />
              {/* <SearchInput searchAttendance={searchAttendance} /> */}
              <SearchInputWrapper
                onKeyDown={onSearch}
                placeholder={CONST_COMMON.SEARCH_BY_NAME}
                onChange={(e) => setValueSearch(e.target.value)}
              />
              <PaginationRecord
                current={pageStaff.page}
                total={pageStaff.total}
                pageSize={pageStaff.per_page}
                onChange={changePaging}
              />
            </ControlHeaderWrapper>

            {isLoading && (
              <LoadingAttendance>
                <SpaceBase height={10} />
                <Loading />
              </LoadingAttendance>
            )}
            {attendanceDetailData && attendanceDetailData.length === 0 && !isLoading && (
              <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
            )}
            {attendanceDetailData && attendanceDetailData.length > 0 && (
              <AttendanceTable
                attendanceDetailData={attendanceDetailData}
                currentDate={currentDate}
                updateAttendanceDetailData={updateAttendanceDetailData}
              />
            )}
          </div>
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};

export default AttendanceDetail;
