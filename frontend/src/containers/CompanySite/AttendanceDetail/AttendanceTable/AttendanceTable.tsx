import { IStaff, ITimeAttendance } from '@pages/CompanySite/AttendanceRecord/interface';
import { colors } from 'constants/colorsBase';
import { ETimeShift, ETimeShiftKeys } from 'constants/constants';
import { CONST_ATTENDANCE_COMPANY, CONST_COMMON } from 'constants/language';
import { Dayjs } from 'dayjs';
import React from 'react';
import AttendanceHeaderTable from '../AttendanceHeaderTable/AttendanceHeaderTable';
import {
  AttendanceHeaderTableWrapper,
  DayTable,
  NameTable,
  StatusWorkTable,
} from '../AttendanceHeaderTable/attendanceHeaderTableStyle';
import { ActiveItem, AttendanceTableWrapper, StatusActive, TableName } from './attendanceTableStyle';
import useAttendanceTable from './useAttendanceTable';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { USER_TYPE_IP_SUPPORT, USER_TYPE_OWNER } from 'constants/User';
import ModalCommon from '@components/Modal/ModalCommon';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { ModalContent } from '@components/common/Modal/style';
import { shiftTxt } from 'helper/attendanceRecord';
import { getDayjsByTimeZone } from 'helper/date';

interface IActiveItemComponent {
  title: string;
  shift: 'day_shift' | 'night_shift' | 'leave';
  element: IStaff;
  color: string;
}
interface IAttendanceTable {
  attendanceDetailData: IStaff[];
  currentDate: Dayjs;
  updateAttendanceDetailData: (data: ITimeAttendance) => void;
}

export const StatusItem = ({ element }: { element: { day_shift: number; night_shift: number; leave: number } }) => {
  return (
    <StatusWorkTable>
      {element?.day_shift === ETimeShift.ACTIVITY && (
        <StatusActive color={colors.dayShift}>{CONST_ATTENDANCE_COMPANY.GO_TO_WORK}</StatusActive>
      )}
      {element?.night_shift === ETimeShift.ACTIVITY && (
        <StatusActive color={colors.nightShift}>{CONST_ATTENDANCE_COMPANY.GO_TO_WORK_NIGHT}</StatusActive>
      )}
      {element?.leave === ETimeShift.ACTIVITY && (
        <StatusActive color={colors.leaveShift}>{CONST_ATTENDANCE_COMPANY.HOLIDAY}</StatusActive>
      )}
    </StatusWorkTable>
  );
};

export const AttendanceTable = ({
  attendanceDetailData,
  currentDate,
  updateAttendanceDetailData,
}: IAttendanceTable) => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);
  const isOwner = !(companyIdLeague && companyIdLeague !== authInfo?.company?.id);
  const isRootAdmin = authInfo?.user?.type === USER_TYPE_OWNER;
  const {
    handleAnalysisColorDay,
    changeTime,
    isLoading,
    toDetailMember,
    handleCancelConfirm,
    handleOkConfirm,
    isShowConfirm,
    setIsShowConfirm,
    confirmChanging,
  } = useAttendanceTable({
    currentDate,
    updateAttendanceDetailData,
    isRootAdmin,
  });

  function ActiveItemComponent({ title, shift, element, color }: IActiveItemComponent) {
    const isActive = element?.time_attendance[0] ? element?.time_attendance[0][`${shift}`] : ETimeShift.NOT_ACTIVITY;
    const changeData: ITimeAttendance = {
      staff_id: element.staff_id,
      date: currentDate.format('YYYY-MM-DD'),
      day_shift: element?.time_attendance[0]?.day_shift || ETimeShift.NOT_ACTIVITY,
      night_shift: element?.time_attendance[0]?.night_shift || ETimeShift.NOT_ACTIVITY,
      leave: element?.time_attendance[0]?.leave || ETimeShift.NOT_ACTIVITY,
      [`${shift}`]: isActive ? ETimeShift.NOT_ACTIVITY : ETimeShift.ACTIVITY,
    };
    return (
      <DayTable>
        <ActiveItem
          isLoading={isLoading}
          activeData={handleAnalysisColorDay(changeData, isActive, color, shift)}
          isOwner={isOwner}
          onClick={() => {
            if (isOwner || authInfo?.user.type === USER_TYPE_IP_SUPPORT) {
              changeTime(changeData, shift);
            }
          }}
        >
          {title}
        </ActiveItem>
      </DayTable>
    );
  }

  return (
    <AttendanceTableWrapper>
      <AttendanceHeaderTable currentDate={currentDate} />
      {attendanceDetailData?.map(
        (element: IStaff, index: number) =>
          (element?.time_attendance?.length ||
            !element.staff_disconnect_time ||
            getDayjsByTimeZone(element.staff_disconnect_time).format('YYYY-MM-DD') >=
              currentDate.format('YYYY-MM-DD')) && (
            <AttendanceHeaderTableWrapper
              key={String(element.staff_id)}
              isLastItem={index === attendanceDetailData.length - 1}
            >
              <NameTable>
                <TableName onClick={() => toDetailMember(element.staff_id)}>{element.name}</TableName>
              </NameTable>
              <StatusItem element={element?.time_attendance[0]} />
              <ActiveItemComponent
                element={element}
                title={CONST_ATTENDANCE_COMPANY.NOON}
                color={colors.dayShift}
                shift={ETimeShiftKeys.DAY_SHIFT}
              />
              <ActiveItemComponent
                element={element}
                title={CONST_ATTENDANCE_COMPANY.NIGHT}
                color={colors.nightShift}
                shift={ETimeShiftKeys.NIGHT_SHIFT}
              />
              <ActiveItemComponent
                element={element}
                title={CONST_ATTENDANCE_COMPANY.REST}
                color={colors.leaveShift}
                shift={ETimeShiftKeys.LEAVE}
              />
            </AttendanceHeaderTableWrapper>
          )
      )}
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
              {currentDate.format('MM月DD日')}　　{shiftTxt(confirmChanging)}
            </div>
            <div className="attendance-confirm-txt">{CONST_ATTENDANCE_COMPANY.ATTENDANCE_MODAL_CONFIRM}</div>
          </ModalContent>
        </ModalContainer>
      </ModalCommon>
    </AttendanceTableWrapper>
  );
};
