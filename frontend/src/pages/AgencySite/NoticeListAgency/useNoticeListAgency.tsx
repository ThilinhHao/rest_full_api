import { useState, useEffect } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiGetListNoticeAgency } from 'api/agency';
import { INoticeCompany } from '@pages/CompanySite/NoticeListCompany/useNoticeListCompany';

export interface INoticeAgency extends INoticeCompany {}

const defaultPage = {
  per_page: 10,
  page: 1,
  total: 0,
};

const useNoticeListAgency = () => {
  const [listNoticeAgency, setListNoticeAgency] = useState<INoticeAgency[]>([]);
  const [pageNoticeAgency, setPageNoticeAgency] = useState(defaultPage);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getListNoticeAgency = async (pageCurrent: number) => {
    try {
      setIsLoading(true);
      const response = await apiGetListNoticeAgency({
        per_page: defaultPage.per_page,
        page: pageCurrent,
      });
      if (responseSuccess(response)) {
        setListNoticeAgency(response.data.data);
        setPageNoticeAgency({ ...pageNoticeAgency, total: response.data.total });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListNoticeAgency(pageNoticeAgency.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNoticeAgency.page]);

  const changePaging = (pageChange: number) => {
    setPageNoticeAgency({
      ...pageNoticeAgency,
      page: pageChange,
    });
  };
  return { listNoticeAgency, pageNoticeAgency, changePaging, isLoading };
};

export default useNoticeListAgency;
