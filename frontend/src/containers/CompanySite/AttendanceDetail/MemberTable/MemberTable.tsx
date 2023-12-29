import React from 'react';

import { colors } from 'constants/colorsBase';
import { ETimeShift, ETimeShiftFormat, ETimeShiftKeys } from 'constants/constants';
import { StatusItem } from '../AttendanceTable/AttendanceTable';
import { ActiveItem } from '../AttendanceTable/attendanceTableStyle';
import { ITimeAttendance } from '@pages/CompanySite/AttendanceRecord/interface';
import { CONST_ATTENDANCE_COMPANY, CONST_COMMON } from 'constants/language';
import {
  ActiveItemWrapper,
  DashboardWrapper,
  DayElement,
  DayWrapperMember,
  DeadlineForChange,
  ItemMemberWrapper,
  MemberTableWrapper,
  ScrollWrapperMemberTable,
} from './memberTableStyle';

import dayjs from 'dayjs';
import TimeActiveItem from './TimeActiveItem/TimeActiveItem';
import useMemberTable from './useMemberTable';
import MemberHeaderTable from '../MemberHeaderTable/MemberHeaderTable';
import { checkOverDate, shiftTxt } from 'helper/attendanceRecord';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { USER_TYPE_OWNER } from 'constants/User';
import ModalCommon from '@components/Modal/ModalCommon';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { ModalContent } from '@components/common/Modal/style';

interface IActiveItemComponent {
  title: string;
  shift: 'day_shift' | 'night_shift' | 'leave';
  color: string;
  element: ITimeAttendance;
}

const MemberTable = ({
  detailData,
  updateAttendanceMemberData,
}: {
  detailData: ITimeAttendance[];
  updateAttendanceMemberData: (data: ITimeAttendance) => void;
}) => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);
  const isOwner = !(companyIdLeague && companyIdLeague !== authInfo?.company?.id);
  const isRootAdmin = authInfo?.user?.type === USER_TYPE_OWNER;
  const {
    handleAnalysisColorDay,
    changeTime,
    isLoading,
    handleCancelConfirm,
    handleOkConfirm,
    isShowConfirm,
    setIsShowConfirm,
    confirmChanging,
    confirmDate,
    checkIsConfirmed,
  } = useMemberTable(updateAttendanceMemberData, isRootAdmin);

  const ItemSetting = ({ title, element, shift, color }: IActiveItemComponent) => {
    const isActive = element ? element[`${shift}`] : ETimeShift.NOT_ACTIVITY;
    const changeData: ITimeAttendance = {
      staff_id: element.staff_id,
      date: element.date,
      day_shift: element?.day_shift || ETimeShift.NOT_ACTIVITY,
      night_shift: element?.night_shift || ETimeShift.NOT_ACTIVITY,
      leave: element?.leave || ETimeShift.NOT_ACTIVITY,
      [`${shift}`]: isActive ? ETimeShift.NOT_ACTIVITY : ETimeShift.ACTIVITY,
    };
    return (
      <ActiveItemWrapper>
        <ActiveItem
          isLoading={isLoading}
          activeData={handleAnalysisColorDay(changeData, isActive, color, shift, element.date)}
          isOwner={isOwner}
          onClick={() => {
            if (!isOwner) return;
            changeTime(changeData, shift, element.date);
          }}
        >
          {title}
        </ActiveItem>
        <TimeActiveItem
          isConfirmed={checkIsConfirmed(element.date, shift)}
          date={element.date}
          isTimeNoon={shift === ETimeShiftKeys.DAY_SHIFT}
        />
      </ActiveItemWrapper>
    );
  };

  return (
    <MemberTableWrapper>
      <MemberHeaderTable />
      <ScrollWrapperMemberTable>
        {detailData.map((element: ITimeAttendance) => (
          <ItemMemberWrapper key={element.date}>
            <DayWrapperMember>
              <DayElement>{dayjs(element.date).format('MM/DD')}</DayElement>
              <StatusItem element={element} />
            </DayWrapperMember>
            <DashboardWrapper>
              <ItemSetting
                title={CONST_ATTENDANCE_COMPANY.NOON}
                element={element}
                color={colors.dayShift}
                shift={ETimeShiftKeys.DAY_SHIFT}
              />
              <ItemSetting
                title={CONST_ATTENDANCE_COMPANY.NIGHT}
                element={element}
                color={colors.nightShift}
                shift={ETimeShiftKeys.NIGHT_SHIFT}
              />
              <ItemSetting
                title={CONST_ATTENDANCE_COMPANY.REST}
                element={element}
                color={colors.leaveShift}
                shift={ETimeShiftKeys.LEAVE}
              />
              {!checkOverDate(element.date, ETimeShiftFormat.DATE_NIGHT, false) && (
                <DeadlineForChange>{CONST_ATTENDANCE_COMPANY.CHANGEABLE_DEADLINE}</DeadlineForChange>
              )}
            </DashboardWrapper>
          </ItemMemberWrapper>
        ))}
      </ScrollWrapperMemberTable>
      <ModalCommon
        isOpen={isShowConfirm}
        setIsOpen={() => setIsShowConfirm(false)}
        onClickOk={handleOkConfirm}
        onClickCancel={handleCancelConfirm}
        onCancel={handleCancelConfirm}
        txtOK={CONST_COMMON.CHANGE}
        txtCancel={CONST_COMMON.CANCEL}
        _className="confirm-company-pair confirm-attendance"
        btnCancelColor={colors.atomicTangerine}
      >
        <ModalContainer>
          <ModalContent>
            <div className="attendance-date-txt">
              {dayjs(confirmDate).format('MM月DD日')}　　{shiftTxt(confirmChanging)}
            </div>
            <div className="attendance-confirm-txt">{CONST_ATTENDANCE_COMPANY.ATTENDANCE_MODAL_CONFIRM}</div>
          </ModalContent>
        </ModalContainer>
      </ModalCommon>
    </MemberTableWrapper>
  );
};

export default MemberTable;
