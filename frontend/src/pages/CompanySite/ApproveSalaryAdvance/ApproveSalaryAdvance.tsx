import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import ApproveTable from '@containers/CompanySite/AttendanceDetail/ApproveTable/ApproveTable';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import useApproveSalaryAdvance from './useApproveSalaryAdvance';

import { SpaceBase } from 'styles';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { SearchInputWrapper } from '@components/CompanySite/AttendanceRecord/SearchInput/searchInputStyle';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { Container, GrantCard } from '@components/Style/Style';
import { HeaderSettingWrapper } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import { CONST_ATTENDANCE_COMPANY, CONST_COMMON } from 'constants/language';
import { ControlHeaderWrapper, LoadingAttendance, NoDataAttendance } from '../AttendanceRecord/attendanceRecordStyle';

const BREADS: IBread[] = [
  {
    name: CONST_ATTENDANCE_COMPANY.PAYMENT_APPLICATION,
    path: '',
  },
];
const ApproveSalaryAdvance = () => {
  const {
    listRequest,
    currentDate,
    isLoading,
    onChangeMonth,
    pageStaff,
    changePaging,
    updateListRequest,
    onSearch,
    setValueSearch,
  } = useApproveSalaryAdvance();
  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard padding="1.25rem 0rem" percentWidth="100%" width={106.25}>
          <div>
            <HeaderSettingWrapper>
              <SettingIcon src={images.companySite.yenIcon} />
              <TitleHeaderSetting>{CONST_ATTENDANCE_COMPANY.PREPAYMENT_APPROVE}</TitleHeaderSetting>
            </HeaderSettingWrapper>

            <ControlHeaderWrapper>
              <DatePickerCustom onChangeMonth={onChangeMonth} month={currentDate} normalPicker={true} />
              {/* <SearchInput searchAttendance={searchMember} /> */}
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
                <SpaceBase height={5} />
                <Loading />
              </LoadingAttendance>
            )}
            {listRequest && listRequest.length === 0 && !isLoading && (
              <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
            )}
            {listRequest && listRequest.length > 0 && (
              <ApproveTable listRequest={listRequest} updateListRequest={updateListRequest} isLoading={isLoading} />
            )}
          </div>
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};

export default ApproveSalaryAdvance;
