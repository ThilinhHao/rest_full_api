/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiAdminGetAttendance } from 'api/company';
import { IStaff, ITimeAttendance } from '@pages/CompanySite/AttendanceRecord/interface';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';

import dayjs, { Dayjs } from 'dayjs';
import { EKeyCode } from 'constants/constants';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { USER_TYPE_OWNER } from 'constants/User';

const defaultPage = {
  per_page: 5,
  page: 1,
  total: 0,
};
const BREADS: IBread[] = [
  {
    name: CONST_ATTENDANCE_COMPANY.ATTENDANCE_CONFIRMATION,
    path: '',
  },
];
const useAttendanceDetail = () => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const isRootAdmin = authInfo?.user?.type === USER_TYPE_OWNER;
  const [attendanceDetailData, setAttendanceDetailData] = useState<IStaff[] | null>(null);
  const [pageStaff, setPageStaff] = useState(defaultPage);
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>('');

  const onChangeMonth = (e: Dayjs | any) => {
    setCurrentDate(e);
  };

  const getAttendance = async (date: Dayjs, pageCall: number) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiAdminGetAttendance({
        day: dayjs(date).format('YYYY-MM-DD'),
        per_page: defaultPage.per_page,
        page: pageCall,
        key_word: valueSearch,
      });
      if (responseSuccess(response)) {
        setAttendanceDetailData(response.data.data);
        setPageStaff({
          ...pageStaff,
          page: pageCall,
          total: response.data.total,
        });
      } else {
        setAttendanceDetailData([]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === EKeyCode.ENTER) {
      getAttendance(currentDate, defaultPage.page);
    }
  };

  // const searchAttendance = (staff_id: number[]) => {
  //   setPageStaff({ ...pageStaff, per_page: defaultPage.per_page, page: defaultPage.page });
  //   if (staff_id.length === 0) {
  //     setAttendanceDetailData([]);
  //     return;
  //   }
  //   getAttendance(currentDate, defaultPage.page, staff_id);
  // };

  useEffect(() => {
    getAttendance(currentDate, pageStaff.page);
  }, [currentDate, pageStaff.page]);

  const changePaging = (pageChange: number) => {
    setPageStaff({
      ...pageStaff,
      page: pageChange,
    });
  };

  const updateAttendanceDetailData = (dataUpdate: ITimeAttendance) => {
    if (!attendanceDetailData) return;
    setAttendanceDetailData(
      attendanceDetailData?.map((element: IStaff) => {
        if (element.staff_id === dataUpdate.staff_id) {
          return {
            ...element,
            time_attendance: [
              {
                date: dataUpdate.date,
                day_shift: dataUpdate.day_shift,
                leave: dataUpdate.leave,
                night_shift: dataUpdate.night_shift,
                staff_id: dataUpdate.staff_id,
              },
            ],
          };
        }
        return element;
      })
    );
  };

  return {
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
  };
};

export default useAttendanceDetail;
