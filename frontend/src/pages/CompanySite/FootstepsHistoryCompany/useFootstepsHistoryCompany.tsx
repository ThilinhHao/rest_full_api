import { IFootstepsHistory } from '@pages/OperatorSite/FootstepsHistory/useFootstepsHistory';
import { apiCompanyFootstepsHistory } from 'api/company';
import { EKeyCode } from 'constants/constants';
import dayjs, { Dayjs } from 'dayjs';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import React, { useEffect, useState } from 'react';

const BREADS = [
  {
    name: '操作ログ',
    path: '',
  },
];

const defaultPage = {
  per_page: 10,
  page: 1,
  total: 0,
};

const useFootstepsHistoryCompany = () => {
  const [pageStaff, setPageStaff] = useState(defaultPage);
  const [month, setMonth] = useState<Dayjs>(dayjs());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listHistory, setListHistory] = useState<IFootstepsHistory[][] | null>(null);
  const [activeKey, setActiveKey] = useState<string[] | string>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const onChangeMonth = (e: Dayjs | any) => {
    setMonth(e);
  };

  const changePaging = (pageChange: number) => {
    setPageStaff({
      ...pageStaff,
      page: pageChange,
    });
  };

  const getListHistory = async (date: Dayjs, pageCall: number, name: string) => {
    try {
      setIsLoading(true);
      const response = await apiCompanyFootstepsHistory({
        date: date.format('YYYY-MM'),
        page: pageCall,
        per_page: defaultPage.per_page,
        key_word: name,
      });
      if (responseSuccess(response)) {
        setListHistory(response.data.data);
        setPageStaff({
          ...pageStaff,
          total: response.data.total,
        });
        if (searchValue) {
          setActiveKey(response.data.data.map((element: IFootstepsHistory[]) => element[0].date));
        }
      }
    } catch (errors) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListHistory(month, pageStaff.page, searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageStaff.page, month]);

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === EKeyCode.ENTER) {
      const target = e.target as HTMLTextAreaElement;
      getListHistory(month, defaultPage.page, target.value);
    }
  };

  return {
    BREADS,
    pageStaff,
    changePaging,
    month,
    onChangeMonth,
    listHistory,
    onSearch,
    isLoading,
    activeKey,
    setActiveKey,
    setSearchValue,
  };
};

export default useFootstepsHistoryCompany;
