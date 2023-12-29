/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { CONST_ATTENDANCE_COMPANY } from 'constants/language';
import { apiGetHistoryAllStaffDetail } from 'api/company';

export interface ISalaryAdvance {
  tran_date: string;
  total_salary: number;
  system_fee: number;
  transaction_fee: number;
}

const useAttendanceHistoryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const [month, setMonth] = useState<Dayjs>(dayjs(query.get('date') || dayjs()));

  const BREADS: IBread[] = [
    {
      name: CONST_ATTENDANCE_COMPANY.PAYMENT_APPLICATION,
      path: `/history?date=${month.format('YYYY-MM')}`,
    },
    {
      name: CONST_ATTENDANCE_COMPANY.PREPAYMENT_HISTORY,
      path: '',
    },
  ];

  const { idStaff } = useParams();
  const [listSalaryAdvance, setListSalaryAdvance] = useState<ISalaryAdvance[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [staffName, setStaffName] = useState('');

  const getListSalaryAdvance = async (day: Dayjs) => {
    try {
      setIsLoading(true);
      const response = await apiGetHistoryAllStaffDetail(idStaff, {
        month: day.format('YYYY-MM'),
      });
      if (responseSuccess(response)) {
        setListSalaryAdvance(response.data.staff_salary_advance);
        setStaffName(response.data.name);
      }
    } catch (error) {
    } finally {
      navigate(`${location.pathname}`);
      setIsLoading(false);
    }
  };

  const onChangeMonth = (e: Dayjs) => {
    setMonth(e);
  };

  useEffect(() => {
    getListSalaryAdvance(month);
  }, [month]);

  return { listSalaryAdvance, month, isLoading, onChangeMonth, staffName, BREADS };
};

export default useAttendanceHistoryDetail;
