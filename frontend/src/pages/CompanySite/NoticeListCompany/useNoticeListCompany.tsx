/* eslint-disable react-hooks/exhaustive-deps */
import { apiGetListNoticeCompany } from 'api/company';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { useState, useEffect } from 'react';

export interface INoticeCompany {
  agency_notify: number;
  company_notify: number;
  content: string;
  created_at: string;
  id: number;
  staff_notify: number;
  status: number;
  title: string;
  updated_at: string;
  updated_by: number;
}

const defaultPage = {
  per_page: 10,
  page: 1,
  total: 0,
};
const useNoticeListCompany = () => {
  const [listNoticeCompany, setListNoticeCompany] = useState<INoticeCompany[]>([]);
  const [pageNoticeCompany, setPageNoticeCompany] = useState(defaultPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListNoticeCompany = async (pageCurrent: number) => {
    try {
      setIsLoading(true);
      const response = await apiGetListNoticeCompany({
        per_page: defaultPage.per_page,
        page: pageCurrent,
      });
      if (responseSuccess(response)) {
        setListNoticeCompany(response.data.data);
        setPageNoticeCompany({ ...pageNoticeCompany, total: response.data.total });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListNoticeCompany(pageNoticeCompany.page);
  }, [pageNoticeCompany.page]);

  const changePaging = (pageChange: number) => {
    setPageNoticeCompany({
      ...pageNoticeCompany,
      page: pageChange,
    });
  };
  return { listNoticeCompany, pageNoticeCompany, changePaging, isLoading };
};

export default useNoticeListCompany;
