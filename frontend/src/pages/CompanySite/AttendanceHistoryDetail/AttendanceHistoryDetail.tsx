import React from 'react';

import Loading from '@components/Loading';
import images from '@assets/images-base';
import HistoryTable from '@containers/CompanySite/AttendanceDetail/HistoryTable/HistoryTable';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import useAttendanceHistoryDetail from './useAttendanceHistoryDetail';

import { SpaceBase } from 'styles';
import { Container } from '@components/Style/Style';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { GrantCardMember } from '../AttendanceMember/attendanceMemberStyle';
import { StaffNameWrapper } from './../AttendanceRecord/attendanceRecordStyle';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { HeaderSettingWrapper } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import { CONST_ATTENDANCE_COMPANY, CONST_COMMON } from 'constants/language';
import { ControlHeaderWrapper, LoadingAttendance, NoDataAttendance } from '../AttendanceRecord/attendanceRecordStyle';

const AttendanceHistoryDetail = () => {
  const { onChangeMonth, month, listSalaryAdvance, isLoading, staffName, BREADS } = useAttendanceHistoryDetail();
  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCardMember width={106.25}>
          <div>
            <HeaderSettingWrapper>
              <SettingIcon src={images.companySite.oClock} />
              <TitleHeaderSetting>{CONST_ATTENDANCE_COMPANY.PAYMENT_APPLICATION}</TitleHeaderSetting>
            </HeaderSettingWrapper>

            <ControlHeaderWrapper>
              <DatePickerCustom onChangeMonth={onChangeMonth} month={month} />
              <StaffNameWrapper>{staffName}</StaffNameWrapper>
            </ControlHeaderWrapper>

            {isLoading && (
              <LoadingAttendance>
                <SpaceBase height={5} />
                <Loading />
              </LoadingAttendance>
            )}
            {listSalaryAdvance && listSalaryAdvance.length === 0 && !isLoading && (
              <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
            )}
            {listSalaryAdvance && listSalaryAdvance.length > 0 && (
              <HistoryTable listSalaryAdvance={listSalaryAdvance} />
            )}
          </div>
        </GrantCardMember>
      </Container>
    </DetailWrapper>
  );
};

export default AttendanceHistoryDetail;
