import { colors } from 'constants/colorsBase';
import { useState, useCallback } from 'react';
import { ETimeShift, ETimeShiftFormat, ETimeShiftKeys } from 'constants/constants';
import { ITimeAttendance } from '@pages/CompanySite/AttendanceRecord/interface';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiAdminSetTimeAttendance } from 'api/company';

import { Dayjs } from 'dayjs';
import { checkCanChangeByRootAdmin, checkOverDate } from 'helper/attendanceRecord';
import { useNavigate } from 'react-router-dom';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';
import { message } from 'antd';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';

const useAttendanceTable = ({
  currentDate,
  updateAttendanceDetailData,
  isRootAdmin,
}: {
  currentDate: Dayjs;
  updateAttendanceDetailData: (data: ITimeAttendance) => void;
  isRootAdmin: boolean;
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
  const [confirmData, setConfirmData] = useState<ITimeAttendance | null>(null);
  const [confirmChanging, setConfirmChanging] = useState<string>('');

  const toDetailMember = (idStaff: number) => {
    navigate(`/attendance/detail/${idStaff}`);
  };

  const handleAnalysisColorDay = (
    changeData: ITimeAttendance,
    dayShift: ETimeShift.ACTIVITY | ETimeShift.NOT_ACTIVITY,
    bgColorActive: string,
    shift: string
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

    if (!checkCanChangeByRootAdmin(changeData, shift, currentDate, isRootAdmin)) {
      data.shadow = colors.shadowInsetFor;
    }
    return data;
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
          updateAttendanceDetailData(newData);
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
    [updateAttendanceDetailData]
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
  };

  const changeTime = async (changeData: ITimeAttendance, changing: string) => {
    if (isLoading) return;
    if (!checkCanChangeByRootAdmin(changeData, changing, currentDate, isRootAdmin)) return;
    // if current date is over date, show confirm popup
    if (
      (checkOverDate(currentDate, ETimeShiftFormat.DATE_NOON, false) && changing === ETimeShiftKeys.DAY_SHIFT) ||
      (checkOverDate(currentDate, ETimeShiftFormat.DATE_NIGHT, false) &&
        (changing === ETimeShiftKeys.NIGHT_SHIFT || changing === ETimeShiftKeys.LEAVE))
    ) {
      setConfirmData(changeData);
      setConfirmChanging(changing);
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
    toDetailMember,
    handleOkConfirm,
    handleCancelConfirm,
    isShowConfirm,
    setIsShowConfirm,
    confirmData,
    confirmChanging,
  };
};

export default useAttendanceTable;
