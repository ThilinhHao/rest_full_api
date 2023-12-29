import { useEffect, useState } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiAgencyGetRankCompany } from 'api/agency';
import { Dayjs } from 'dayjs';

const useRankAgencyTopPage = (setIsLoadingRank: (isLoading: boolean) => void, year: Dayjs) => {
  const [listCompany, setListCompany] = useState([]);
  const [pageSetting, setPageSetting] = useState({
    page: 1,
    perPage: 7,
  });

  const getListRankCompany = async () => {
    try {
      setIsLoadingRank(true);
      const response = await apiAgencyGetRankCompany({
        year: year.format('YYYY'),
      });
      if (responseSuccess(response)) {
        setListCompany(response.data);
      }
    } catch (error) {
    } finally {
      setIsLoadingRank(false);
    }
  };

  useEffect(() => {
    getListRankCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const changePaging = (pageChange: number) => {
    setPageSetting({
      ...pageSetting,
      page: pageChange,
    });
  };

  return { listCompany, pageSetting, changePaging };
};

export default useRankAgencyTopPage;
