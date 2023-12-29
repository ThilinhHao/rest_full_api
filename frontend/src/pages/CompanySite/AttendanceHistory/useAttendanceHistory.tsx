/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useRef, useState, useEffect } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import { getMaxPage } from 'helper/attendanceRecord';
import { DAY_OF_WEEK } from 'constants/company';
import { getAllDayOfMonth } from 'helper/getAllDayOfMonth/getAllDayOfMonth';
import { apiGetHistoryAllStaff } from 'api/company';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { EKeyCode } from 'constants/constants';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useLocation, useNavigate } from 'react-router-dom';

dayjs.extend(weekOfYear);
const defaultPage = {
  per_page: 5,
  page: 1,
  total: 0,
};

export interface IStaffHistoryItem {
  staff_id: number;
  total_salary: string;
  tran_date: string;
  transaction_fee: number;
  system_fee: number;
}
export interface IStaffHistory {
  amount_limit_1: number;
  amount_limit_2: number;
  email: string;
  id: number;
  name: string;
  name_kana: string;
  phone: string;
  salary_type: number;
  staff_salary_advance: IStaffHistoryItem[];
  salary_remain: number;
}
const useAttendanceHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const ref = useRef<any>();
  const currentWeekOfMonth = dayjs().week() - dayjs().startOf('month').week() + 1;
  const [month, setMonth] = useState<Dayjs>(dayjs(query.get('date') || dayjs()));
  const [page, setPage] = useState(currentWeekOfMonth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageStaff, setPageStaff] = useState(defaultPage);
  const [listMember, setListMember] = useState<IStaffHistory[] | null>(null);
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
  const onChangeMonth = (e: Dayjs | any) => {
    setMonth(e);
    setPage(1);
    ref.current?.toFirst();
  };

  const preWeek = async () => {
    if (page <= 1) return;
    ref.current?.prePage();
  };
  const nextWeek = async () => {
    if (page >= maxPage) return;
    ref.current?.nextPage();
  };

  const getHistoryList = async (date: Dayjs, pageCall: number) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiGetHistoryAllStaff({
        month: dayjs(date).format('YYYY-MM'),
        per_page: defaultPage.per_page,
        page: pageCall,
        name: valueSearch,
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
      navigate(`${location.pathname}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHistoryList(month, pageStaff.page);
  }, [month, pageStaff.page]);

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === EKeyCode.ENTER) {
      getHistoryList(month, defaultPage.page);
    }
  };

  const changePaging = (pageChange: number) => {
    setPageStaff({
      ...pageStaff,
      page: pageChange,
    });
  };

  return {
    onChangeMonth,
    month,
    page,
    maxPage,
    preWeek,
    nextWeek,
    dayInWeek,
    listDate,
    setPage,
    ref,
    listMember,
    defaultPage,
    changePaging,
    pageStaff,
    isLoading,
    onSearch,
    setValueSearch,
  };
};

export default useAttendanceHistory;
