import { useState, useCallback } from 'react';

import { colors } from 'constants/colorsBase';
import { ETimeShift, ETimeShiftFormat, ETimeShiftKeys } from 'constants/constants';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { ITimeAttendance } from '@pages/CompanySite/AttendanceRecord/interface';
import { apiAdminSetTimeAttendance } from 'api/company';
import { checkCanChangeByRootAdmin, checkOverDate } from 'helper/attendanceRecord';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';
import { message } from 'antd';
import { Dayjs } from 'dayjs';

const useMemberTable = (updateAttendanceMemberData: (data: ITimeAttendance) => void, isRootAdmin: boolean) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const [confirmData, setConfirmData] = useState<ITimeAttendance | null>(null);
  const [confirmChanging, setConfirmChanging] = useState<string>('');
  const [confirmDate, setConfirmDate] = useState<string>('');

  const handleAnalysisColorDay = (
    changeData: ITimeAttendance,
    dayShift: ETimeShift.ACTIVITY | ETimeShift.NOT_ACTIVITY,
    bgColorActive: string,
    shift: string,
    date: string
  ) => {
    const data = {
      color: colors.mainText,
      shadow: colors.shadowAttendance,
      background: colors.white,
    };
    if (dayShift === ETimeShift.ACTIVITY) {
      data.background = bgColorActive;
      data.shadow = 'none';
      data.color = colors.white;
    }

    if (!checkCanChangeByRootAdmin(changeData, shift, date, isRootAdmin)) {
      data.shadow = colors.shadowInsetFor;
    }
    return data;
  };

  const checkIsConfirmed = (date: string | Dayjs, changing: string) => {
    if (checkOverDate(date, ETimeShiftFormat.DATE_NOON, false) && changing === ETimeShiftKeys.DAY_SHIFT) return true;
    if (
      checkOverDate(date, ETimeShiftFormat.DATE_NIGHT, false) &&
      (changing === ETimeShiftKeys.NIGHT_SHIFT || changing === ETimeShiftKeys.LEAVE)
    ) {
      return true;
    }
    return false;
  };

  const attendanceMemberData = useCallback(
    async (changeData: ITimeAttendance, changing: string) => {
      try {
        const newData = { ...changeData };
        if ((changing === ETimeShiftKeys.DAY_SHIFT || changing === ETimeShiftKeys.NIGHT_SHIFT) && newData[changing]) {
          newData.leave = ETimeShift.NOT_ACTIVITY;
        }
        if (changing === ETimeShiftKeys.LEAVE && newData[changing]) {
          newData.day_shift = ETimeShift.NOT_ACTIVITY;
          newData.night_shift = ETimeShift.NOT_ACTIVITY;
        }
        const response = await apiAdminSetTimeAttendance(newData);
        if (responseSuccess(response)) {
          updateAttendanceMemberData(newData);
          setIsLoading(false);
        } else {
          if (response?.response?.data?.code === VALIDATE_ERROR_CODE.ATTENDANCE_REQUEST_DATE_INVALID) {
            message.error(CONST_ATTENDANCE_COMPANY.ATTENDANCE_REQUEST_DATE_INVALID);
          }
          if (response?.response?.data?.code === VALIDATE_ERROR_CODE.ATTENDANCE_STAFF_DISCONNECTED) {
            message.error(CONST_ATTENDANCE_COMPANY.ATTENDANCE_STAFF_DISCONNECTED);
          }
          if (response?.response?.data?.code === VALIDATE_ERROR_CODE.ATTENDANCE_STAFF_NOT_ALLOW_REQUEST_SALARY) {
            message.error(CONST_ATTENDANCE_COMPANY.ATTENDANCE_STAFF_NOT_ALLOW_REQUEST_SALARY);
          }
          if (response?.response?.data?.code === VALIDATE_ERROR_CODE.ATTENDANCE_STAFF_BLOCK) {
            message.error(CONST_ATTENDANCE_COMPANY.ATTENDANCE_STAFF_BLOCK);
          }
        }
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    },
    [updateAttendanceMemberData]
  );

  const handleOkConfirm = useCallback(() => {
    if (!confirmData || !confirmChanging) return;
    setIsLoading(true);
    attendanceMemberData(confirmData, confirmChanging);
    setIsShowConfirm(false);
  }, [confirmChanging, confirmData, attendanceMemberData]);

  const handleCancelConfirm = () => {
    setIsShowConfirm(false);
    setConfirmData(null);
    setConfirmChanging('');
    setConfirmDate('');
  };

  const changeTime = async (changeData: ITimeAttendance, changing: string, date: string) => {
    if (!checkCanChangeByRootAdmin(changeData, changing, date, isRootAdmin)) return;
    if (isLoading) return;
    // if current date is over date, show confirm popup
    if (
      (checkOverDate(date, ETimeShiftFormat.DATE_NOON, false) && changing === ETimeShiftKeys.DAY_SHIFT) ||
      (checkOverDate(date, ETimeShiftFormat.DATE_NIGHT, false) &&
        (changing === ETimeShiftKeys.NIGHT_SHIFT || changing === ETimeShiftKeys.LEAVE))
    ) {
      setConfirmData(changeData);
      setConfirmChanging(changing);
      setConfirmDate(date);
      setIsShowConfirm(true);
    } else {
      setIsLoading(true);
      attendanceMemberData(changeData, changing);
    }
  };

  return {
    handleAnalysisColorDay,
    changeTime,
    isLoading,
    isShowConfirm,
    setIsShowConfirm,
    handleOkConfirm,
    handleCancelConfirm,
    confirmChanging,
    confirmData,
    confirmDate,
    checkIsConfirmed,
  };
};

export default useMemberTable;
