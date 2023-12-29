import { useState, useEffect } from 'react';

import { Dayjs } from 'dayjs';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiOperatorGetRankCompany } from 'api/operator';

export interface ICompanyRank {
  id: string;
  name: string;
  total_salary: number;
  total_request: number;
}

const SELECT_MONTH = 2;

const useCompanyRankTopPage = (year: Dayjs, selectedSwitchDate: number) => {
  const [listCompany, setListCompany] = useState<ICompanyRank[]>([]);
  const [pageSetting, setPageSetting] = useState({
    page: 1,
    perPage: 5,
  });

  const getListRankCompany = async () => {
    try {
      const response = await apiOperatorGetRankCompany({
        year: selectedSwitchDate === SELECT_MONTH ? null : year.format('YYYY'),
        month: selectedSwitchDate === SELECT_MONTH ? year.format('YYYY-MM') : null,
      });
      if (responseSuccess(response)) {
        setListCompany(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListRankCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, selectedSwitchDate]);

  const changePaging = (pageChange: number) => {
    setPageSetting({
      ...pageSetting,
      page: pageChange,
    });
  };

  return { listCompany, pageSetting, changePaging };
};

export default useCompanyRankTopPage;
