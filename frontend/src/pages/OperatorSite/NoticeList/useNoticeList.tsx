/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiOperatorListNotice } from 'api/operator';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';

const BREADS = [
  {
    name: CREATE_NOTIFICATION_OPERATOR.NEW_ARRIVALS,
    path: '/',
  },
];
export interface INotice {
  content: string;
  id: number;
  title: string;
  updated_at: string;
}

const defaultPage = {
  per_page: 10,
  page: 1,
  total: 0,
};

const useNoticeList = () => {
  const navigate = useNavigate();

  const [listNotice, setListNotice] = useState<INotice[]>([]);
  const [pageStaff, setPageStaff] = useState(defaultPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changePaging = (pageChange: number) => {
    setPageStaff({
      ...pageStaff,
      page: pageChange,
    });
  };

  const getListNotice = async (pageCurrent: number) => {
    try {
      setIsLoading(true);
      const response = await apiOperatorListNotice({
        per_page: pageStaff.per_page,
        page: pageCurrent,
      });
      if (responseSuccess(response)) {
        setListNotice(response.data.data);
        setPageStaff({
          ...pageStaff,
          total: response.data.total,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListNotice(pageStaff.page);
  }, [pageStaff.page]);

  const toDetail = (idDetailNotice: number) => {
    navigate(`/notice/detail/${idDetailNotice}`);
  };

  return {
    navigate,
    listNotice,
    BREADS,
    pageStaff,
    changePaging,
    isLoading,
    toDetail,
  };
};

export default useNoticeList;
