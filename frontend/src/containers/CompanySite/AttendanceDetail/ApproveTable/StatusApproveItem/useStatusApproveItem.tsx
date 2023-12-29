import dayjs from 'dayjs';

import { colors } from 'constants/colorsBase';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { ERequestAdvance, EStatusApproveRequest, ETypeRequest } from 'constants/constants';
import { getDateTimeByTimeZone, getDayjsByTimeZone } from 'helper/date';
import { useCallback, useEffect, useState } from 'react';
import { IRequestAdvance, IUpdateRequestData } from '@pages/CompanySite/ApproveSalaryAdvance/useApproveSalaryAdvance';
import { apiApproveRequestSalary, apiCancelRequestSalary, apiGetDetailRequestCompany } from 'api/company';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

const useStatusApproveItem = (element: IRequestAdvance, updateListRequest: (item: IUpdateRequestData) => void) => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);
  const isOwner = !(companyIdLeague && companyIdLeague !== authInfo?.company?.id);
  const checkIsOver = () => {
    if (
      !element.date_timeout ||
      element.status === EStatusApproveRequest.WAITING_TRANSACTION ||
      element.status === EStatusApproveRequest.WAITING_OTPED ||
      element.type === ETypeRequest.AUTO
    ) {
      return false;
    }
    const date1 = getDayjsByTimeZone().format('YYYY-MM-DD HH:mm:ss');
    const date = dayjs(getDateTimeByTimeZone(element.date_timeout)).diff(date1, 'second', true);
    if (date < 0) {
      return true;
    }
    return false;
  };

  const [isOverTime, setIsOverTime] = useState<boolean>(checkIsOver());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTimeUp, setIsLoadingTimeUp] = useState<boolean>(false);

  const getSecondTimeDown = () => {
    if (
      !element.date_timeout ||
      element.status === EStatusApproveRequest.WAITING_TRANSACTION ||
      element.status === EStatusApproveRequest.WAITING_OTPED
    ) {
      return 0;
    }
    const date1 = dayjs(getDayjsByTimeZone().format('YYYY-MM-DD HH:mm:ss'));
    const date = dayjs(getDateTimeByTimeZone(element.date_timeout)).diff(date1, 'second', true);
    return date || 0;
  };

  const styleItem = useCallback(
    (color: string, status: number) => {
      const defaultStyle = { background: colors.white, shadow: colors.shadowAttendance, color };
      if (
        element.status === EStatusApproveRequest.WAITING_TRANSACTION ||
        element.status === EStatusApproveRequest.WAITING_OTPED
      ) {
        defaultStyle.background = colors.white;
        defaultStyle.shadow = colors.shadowAttendance;
      }
      if (element.date_timeout && element.status === status) {
        defaultStyle.background = color;
        defaultStyle.color = colors.white;
        defaultStyle.shadow = colors.shadowActive;
      }

      return defaultStyle;
    },
    [element]
  );

  const statusToColor = () => {
    if (element.is_force_cancel === ERequestAdvance.CANCELED) {
      return colors.cancelAdvance;
    }
    if (
      element.status === EStatusApproveRequest.COMPLETE ||
      element.status === EStatusApproveRequest.COMPLETE_SUCCESS
    ) {
      return colors.dayShift;
    }
    return colors.mediumTurquoise;
  };

  const statusToText = () => {
    if (element.is_force_cancel === ERequestAdvance.CANCELED) {
      return CONST_ATTENDANCE_COMPANY.CANCEL_ALREADY;
    }
    if (
      element.status === EStatusApproveRequest.COMPLETE ||
      element.status === EStatusApproveRequest.COMPLETE_SUCCESS
    ) {
      return CONST_ATTENDANCE_COMPANY.APPROVED;
    }
    return CONST_ATTENDANCE_COMPANY.REJECTED;
  };

  useEffect(() => {
    setIsOverTime(checkIsOver());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  const onChangeStatus = async (status: number) => {
    if (!isOwner) return;
    if (
      element.status !== EStatusApproveRequest.WAITING_TRANSACTION &&
      element.status !== EStatusApproveRequest.WAITING_OTPED
    )
      return;
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await apiApproveRequestSalary({
        salary_request_id: element.id,
        status,
      });
      if (responseSuccess(response)) {
        updateListRequest(response.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onCancelApprove = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await apiCancelRequestSalary({
        salary_request_id: element.id,
      });
      if (responseSuccess(response)) {
        updateListRequest(response.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onTimeUp = async () => {
    if (isLoading) return;
    try {
      setIsLoadingTimeUp(true);
      setTimeout(async () => {
        const response = await apiGetDetailRequestCompany(element.id);
        if (responseSuccess(response)) {
          updateListRequest(response?.data);
          setIsOverTime(true);
          setIsLoadingTimeUp(false);
        } else {
          setIsOverTime(true);
          setIsLoadingTimeUp(false);
        }
      }, 7000);
    } catch (error) {
      setIsOverTime(true);
      setIsLoadingTimeUp(false);
    }
  };

  return {
    isOverTime,
    isLoading,
    statusToText,
    statusToColor,
    styleItem,
    getSecondTimeDown,
    onChangeStatus,
    setIsOverTime,
    onCancelApprove,
    onTimeUp,
    isLoadingTimeUp,
    isOwner,
  };
};

export default useStatusApproveItem;
