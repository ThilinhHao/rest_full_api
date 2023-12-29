/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { useParams } from 'react-router-dom';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { ITimeAttendance } from '@pages/CompanySite/AttendanceRecord/interface';
import { getDayListOfMonth } from 'helper/getAllDayOfMonth/getAllDayOfMonth';
import { apiAdminGetAttendance } from 'api/company';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { ETimeShift } from 'constants/constants';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { USER_TYPE_OWNER } from 'constants/User';

const BREADS: IBread[] = [
  {
    name: CONST_ATTENDANCE_COMPANY.ATTENDANCE_CONFIRMATION,
    path: '/attendance/detail',
  },
  {
    name: CONST_ATTENDANCE_COMPANY.ATTENDANCE_CONFIRM,
    path: '',
  },
];

const useAttendanceMember = () => {
  const { idStaff } = useParams();
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const isRootAdmin = authInfo?.user?.type === USER_TYPE_OWNER;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [month, setMonth] = useState<Dayjs>(dayjs());
  const [staffName, setStaffName] = useState<string>('');
  const [detailData, setDetailData] = useState<ITimeAttendance[]>([]);
  const [isStaffDisconnected, setIsStaffDisconnected] = useState<boolean>();

  const getAttendance = async (date: Dayjs) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiAdminGetAttendance({
        month: dayjs(date).format('YYYY-MM'),
        per_page: 32,
        page: 1,
        staff_id: [Number(idStaff)],
      });
      if (responseSuccess(response)) {
        setStaffName(response?.data?.data[0].name);
        if (
          response?.data?.data[0].staff_disconnect_time &&
          dayjs(response?.data?.data[0].staff_disconnect_time).format('YYYY-MM') < month.format('YYYY-MM') &&
          !response?.data?.data[0]?.time_attendance?.length
        ) {
          setIsStaffDisconnected(true);
        } else {
          setIsStaffDisconnected(false);
        }
        const arr = getDayListOfMonth(date);
        const newArr: ITimeAttendance[] | [] = arr.map((element: number) => {
          const dateMap: string = dayjs(month.format(`YYYY-MM`) + `${element + 1}`).format('YYYY-MM-DD');
          const find = response?.data?.data[0]?.time_attendance?.find(
            (elementTime: ITimeAttendance) => dateMap === elementTime?.date
          );
          if (find) {
            return find;
          }
          return {
            date: dateMap,
            day_shift: ETimeShift.NOT_ACTIVITY,
            leave: ETimeShift.NOT_ACTIVITY,
            night_shift: ETimeShift.NOT_ACTIVITY,
            staff_id: Number(idStaff),
          };
        });
        setDetailData(newArr);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAttendance(month);
  }, [month]);

  const onChangeMonth = (e: Dayjs | any) => {
    setMonth(e);
  };

  const updateAttendanceMemberData = (dataUpdate: ITimeAttendance) => {
    if (!detailData) return;
    setDetailData(
      detailData?.map((element: ITimeAttendance) => {
        if (element.date === dataUpdate.date) {
          return {
            ...dataUpdate,
          };
        }
        return element;
      })
    );
  };

  return {
    BREADS,
    onChangeMonth,
    isLoading,
    month,
    staffName,
    detailData,
    updateAttendanceMemberData,
    isRootAdmin,
    isStaffDisconnected,
  };
};

export default useAttendanceMember;
