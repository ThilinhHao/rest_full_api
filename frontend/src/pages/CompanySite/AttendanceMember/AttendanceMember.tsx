import React from 'react';

import { SpaceBase } from 'styles';
import { Container } from '@components/Style/Style';
import { SettingIcon } from '@containers/OperatorSite/OperatorBank/DetailBank/detailBankStyle';
import { DetailWrapper } from '@components/CompanySite/common/styled';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { HeaderSettingWrapper, NoteDiv } from '@containers/OperatorSite/OperatorBank/operatorBankStyle';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { ControlHeaderWrapper, StaffNameWrapper } from '../AttendanceRecord/attendanceRecordStyle';
import { GrantCardMember, LoadingAttendanceMember } from './attendanceMemberStyle';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import MemberTable from '@containers/CompanySite/AttendanceDetail/MemberTable/MemberTable';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import useAttendanceMember from './useAttendanceMember';

const AttendanceMember = () => {
  const {
    BREADS,
    onChangeMonth,
    month,
    staffName,
    detailData,
    isLoading,
    updateAttendanceMemberData,
    isRootAdmin,
    isStaffDisconnected,
  } = useAttendanceMember();

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCardMember width={106.25}>
          <div>
            <HeaderSettingWrapper>
              <SettingIcon src={images.companySite.rushIcon} alt="setting" />
              <TitleHeaderSetting>{CONST_ATTENDANCE_COMPANY.ATTENDANCE_CONFIRMATION}</TitleHeaderSetting>
              {isRootAdmin && <NoteDiv>{CONST_ATTENDANCE_COMPANY.ATTENDANCE_NOTE_TEXT}</NoteDiv>}
            </HeaderSettingWrapper>

            <ControlHeaderWrapper>
              <DatePickerCustom onChangeMonth={onChangeMonth} month={month} />
              <StaffNameWrapper>{staffName}</StaffNameWrapper>
            </ControlHeaderWrapper>
            {isLoading && (
              <LoadingAttendanceMember>
                <SpaceBase height={10} />
                <Loading />
              </LoadingAttendanceMember>
            )}
            {!isStaffDisconnected && (
              <MemberTable detailData={detailData} updateAttendanceMemberData={updateAttendanceMemberData} />
            )}
          </div>
        </GrantCardMember>
      </Container>
    </DetailWrapper>
  );
};

export default AttendanceMember;
