import { useEffect, useState } from 'react';
import type { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import textHelpers from 'helper/text';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiAdminGetCompanyStatisticalDate, apiAdminGetDetailCompany, apiAdminGetListCompany } from 'api/agency';
import { ICompanyStatisticalDate, IDetailCompany, IListCompany } from '../interface';

const useListCompany = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDetailCompany, setIsLoadingDetailCompany] = useState<boolean>(false);
  const [isLoadingCompanyStatisticalDate, setIsLoadingCompanyStatisticalDate] = useState<boolean>(false);

  const [listCompany, setListCompany] = useState<IListCompany[]>([]);
  const [detailCompany, setDetailCompany] = useState<IDetailCompany | null>(null);
  const [companyStatisticalDate, setCompanyStatisticalDate] = useState<ICompanyStatisticalDate | null>(null);
  const [selected, setSelected] = useState<IListCompany | null>(null);
  const [currentListCompany, setCurrentListCompany] = useState<IListCompany[]>([]);
  const [dateSearch, setDateSearch] = useState<Dayjs>(dayjs());

  const getListCompany = async () => {
    try {
      setIsLoading(true);
      const response = await apiAdminGetListCompany();
      if (responseSuccess(response)) {
        setListCompany(response.data);
        setCurrentListCompany([...response.data]);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (searchText: string) => {
    const listSearch = [...listCompany].map((element: IListCompany) => element.name + element.code);
    const dataSearch: IListCompany[] = listCompany.filter(
      (_, index) =>
        listSearch[index]
          .replaceAll(/\s/g, '')
          .toLowerCase()
          .includes(searchText.toLowerCase().replaceAll(/\s/g, '')) ||
        textHelpers.searchTextInLongText({
          text: searchText,
          longText: listSearch[index],
        }) ||
        searchText === ''
    );
    setCurrentListCompany(dataSearch);
  };

  useEffect(() => {
    getListCompany();
  }, []);

  const getDetailCompany = async (idCompany: number) => {
    const response = await apiAdminGetDetailCompany(idCompany);
    if (responseSuccess(response)) {
      setDetailCompany(response.data);
    }
    setIsLoadingDetailCompany(false);
  };

  const getCompanyStatisticalDate = async (idCompany: number, date?: string) => {
    setIsLoadingCompanyStatisticalDate(true);
    try {
      const response = await apiAdminGetCompanyStatisticalDate(idCompany, date);
      if (responseSuccess(response)) {
        setCompanyStatisticalDate(response.data);
      }
    } catch {
      //
    } finally {
      setIsLoadingCompanyStatisticalDate(false);
    }
  };

  useEffect(() => {
    if (selected) {
      setIsLoadingDetailCompany(true);
      setDetailCompany(null);
      getDetailCompany(selected.id);
    }
  }, [selected]);

  useEffect(() => {
    if (selected) {
      getCompanyStatisticalDate(selected.id, dateSearch?.format('YYYY-MM-DD'));
    }
  }, [selected, dateSearch]);

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDateSearch(date || dayjs());
  };

  return {
    selected,
    isLoading,
    listCompany,
    currentListCompany,
    onSearch,
    setSelected,
    detailCompany,
    isLoadingDetailCompany,
    onChangeDate,
    dateSearch,
    companyStatisticalDate,
    isLoadingCompanyStatisticalDate,
  };
};

export default useListCompany;
