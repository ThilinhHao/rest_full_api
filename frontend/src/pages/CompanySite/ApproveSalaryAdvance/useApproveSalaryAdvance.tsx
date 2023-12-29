import { useState, useEffect } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { apiGetRequestSalary } from 'api/company';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { EKeyCode } from 'constants/constants';

const defaultPage = {
  per_page: 5,
  page: 1,
  total: 0,
};
export interface IRequestAdvance {
  admin_approved_id: null;
  approved_date: null;
  company_id: number;
  date_timeout: string | null;
  id: number;
  request_date: string;
  salary: number;
  send_last_time_otp: string;
  staff_id: number;
  staff_name: string;
  status: number;
  time_send_otp: number;
  type: number;
  is_force_cancel: number;
}
export interface IUpdateRequestData extends IRequestAdvance {}
const useApproveSalaryAdvance = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listRequest, setListRequest] = useState<IRequestAdvance[] | null>(null);
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [pageStaff, setPageStaff] = useState(defaultPage);
  const [valueSearch, setValueSearch] = useState<string>('');

  const onChangeMonth = (e: Dayjs | any) => {
    setCurrentDate(e);
  };

  const changePaging = (pageChange: number) => {
    setPageStaff({
      ...pageStaff,
      page: pageChange,
    });
  };

  const getRequestList = async (date: Dayjs, pageCall: number) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiGetRequestSalary({
        date: dayjs(date).format('YYYY-MM-DD'),
        per_page: defaultPage.per_page,
        page: pageCall,
        key_word: valueSearch,
      });
      if (responseSuccess(response)) {
        setListRequest(response.data.data);
        setPageStaff({
          ...pageStaff,
          page: pageCall,
          total: response.data.total,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRequestList(currentDate, pageStaff.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, pageStaff.page]);

  const updateListRequest = (item: IUpdateRequestData) => {
    if (!listRequest) return;
    const newData = [...listRequest].map((element: IUpdateRequestData) => {
      if (element.id === item.id) {
        return {
          ...element,
          ...item,
        };
      }
      return element;
    });
    setListRequest(newData);
  };

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === EKeyCode.ENTER) {
      getRequestList(currentDate, defaultPage.page);
    }
  };

  // const searchMember = (staff_id: number[]) => {
  //   if (staff_id.length === 0) {
  //     setListRequest([]);
  //     return;
  //   }

  //   getRequestList(currentDate, defaultPage.page, staff_id);
  //   setPageStaff({ ...pageStaff, per_page: defaultPage.per_page, page: defaultPage.page });
  // };

  return {
    listRequest,
    currentDate,
    onChangeMonth,
    pageStaff,
    changePaging,
    updateListRequest,
    isLoading,
    onSearch,
    setValueSearch,
  };
};

export default useApproveSalaryAdvance;
