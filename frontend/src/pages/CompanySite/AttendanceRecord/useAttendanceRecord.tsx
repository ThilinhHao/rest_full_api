import { useEffect, useMemo, useRef, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import { IStaff } from './interface';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { getMaxPage } from 'helper/attendanceRecord';
import { DAY_OF_WEEK } from 'constants/company';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { getAllDayOfMonth } from 'helper/getAllDayOfMonth/getAllDayOfMonth';
import { apiAdminGetAttendance } from 'api/company';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { useNavigate } from 'react-router-dom';
import { EKeyCode } from 'constants/constants';

dayjs.extend(weekOfYear);

const BREADS: IBread[] = [
  {
    name: CONST_ATTENDANCE_COMPANY.ATTENDANCE_RECORD,
    path: '',
  },
];
const defaultPage = {
  per_page: 5,
  page: 1,
  total: 0,
};

const useAttendanceRecord = () => {
  const navigate = useNavigate();
  const ref = useRef<any>();
  const currentWeekOfMonth = dayjs().week() - dayjs().startOf('month').week() + 1;

  const [month, setMonth] = useState<Dayjs>(dayjs());
  const [page, setPage] = useState(currentWeekOfMonth);
  const [pageStaff, setPageStaff] = useState(defaultPage);
  const [listMember, setListMember] = useState<IStaff[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>('');

  const maxPage = useMemo(() => {
    return getMaxPage(month);
  }, [month]);

  const listDate = useMemo(() => {
    return getAllDayOfMonth(month);
  }, [month]);

  const dayInWeek = useMemo(() => {
    return [...listDate].slice(DAY_OF_WEEK * (page - 1), DAY_OF_WEEK * page);
  }, [page, listDate]);

  const preWeek = async () => {
    if (page <= 1) return;
    ref.current?.prePage();
  };
  const nextWeek = async () => {
    if (page >= maxPage) return;
    ref.current?.nextPage();
  };

  const onChangeMonth = (e: Dayjs | any) => {
    setMonth(e);
    setPage(1);
    ref.current?.toFirst();
  };

  const getAttendance = async (date: Dayjs, pageCall: number) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiAdminGetAttendance({
        month: dayjs(date).format('YYYY-MM'),
        per_page: defaultPage.per_page,
        page: pageCall,
        key_word: valueSearch,
      });
      if (responseSuccess(response)) {
        setListMember(response.data.data);
        setPageStaff({
          ...pageStaff,
          page: pageCall,
          total: response.data.total,
        });
      } else {
        setListMember([]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === EKeyCode.ENTER) {
      getAttendance(month, defaultPage.page);
    }
  };

  // const searchAttendance = (staff_id: number[]) => {
  //   if (staff_id.length === 0) {
  //     setListMember([]);
  //     return;
  //   }

  //   getAttendance(month, defaultPage.page, valueSearch);
  //   setPageStaff({ ...pageStaff, per_page: defaultPage.per_page, page: defaultPage.page });
  // };

  useEffect(() => {
    getAttendance(month, pageStaff.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, pageStaff.page]);

  const changePaging = (pageChange: number) => {
    setPageStaff({
      ...pageStaff,
      page: pageChange,
    });
  };

  const toSetting = () => {
    navigate('detail');
  };

  return {
    ref,
    month,
    page,
    BREADS,
    maxPage,
    listDate,
    dayInWeek,
    pageStaff,
    isLoading,
    listMember,
    defaultPage,
    setPage,
    preWeek,
    nextWeek,
    toSetting,
    changePaging,
    onChangeMonth,
    onSearch,
    setValueSearch,
  };
};

export default useAttendanceRecord;
