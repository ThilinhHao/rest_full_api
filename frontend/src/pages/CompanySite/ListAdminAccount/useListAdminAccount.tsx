import { useCallback, useEffect, useState } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import textHelpers from 'helper/text';
import { apiCompanyAccountList, apiCompanyCreateAdmin, apiCompanyEditAdmin } from 'api/company';
import { useLocation } from 'react-router-dom';

export interface IAdminAccount {
  id: number;
  full_name: string;
  name_kana: string;
  type?: number;
  email: string;
  created_at: string;
}

export interface IFormDataAdminAccount {
  id?: number;
  full_name: string;
  name_kana: string;
  email: string;
}

export const STATE_PAGE = {
  VIEW: 1,
  EDIT: 2,
  CREATE: 3,
};

const useListAdminAccount = () => {
  const location = useLocation();
  const [allListAdminAccount, setAllListAdminAccount] = useState<IAdminAccount[]>([]);
  const [listAdminAccount, setListAdminAccount] = useState<IAdminAccount[]>([]);
  const [selected, setSelected] = useState<IAdminAccount | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCreateAdminAccount, setIsLoadingCreateAdminAccount] = useState<boolean>(false);
  const [isLoadingEditAdminAccount, setIsLoadingEditAdminAccount] = useState<boolean>(false);

  const [statePage, setStatePage] = useState<number>(STATE_PAGE.VIEW);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const getListAdminAccount = async () => {
    try {
      setIsLoading(true);
      const response = await apiCompanyAccountList();
      if (responseSuccess(response)) {
        setAllListAdminAccount(response.data);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = useCallback(
    (searchText: string) => {
      const listSearch = [...allListAdminAccount].map((element: IAdminAccount) => element.full_name);
      const dataSearch: IAdminAccount[] = allListAdminAccount.filter(
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
      setListAdminAccount(dataSearch);
    },
    [allListAdminAccount]
  );

  const createAdminAccount = async (formData: IFormDataAdminAccount) => {
    try {
      setIsLoadingCreateAdminAccount(true);
      const response = await apiCompanyCreateAdmin(formData);
      if (responseSuccess(response)) {
        getListAdminAccount();
        setSearchText('');
      }
      return response;
    } catch (error) {
      return error;
    } finally {
      setIsLoadingCreateAdminAccount(false);
    }
  };

  const editAdminAccount = async (formData: IFormDataAdminAccount) => {
    try {
      setIsLoadingEditAdminAccount(true);
      const response = await apiCompanyEditAdmin(formData.id, formData);
      if (responseSuccess(response)) {
        getListAdminAccount();
        setSelected(null);
      }
      return response;
    } catch (error) {
      return error;
    } finally {
      setIsLoadingEditAdminAccount(false);
    }
  };

  useEffect(() => {
    getListAdminAccount();
  }, []);

  useEffect(() => {
    if (location.pathname.indexOf('/list') !== -1) setStatePage(STATE_PAGE.VIEW);
    if (location.pathname.indexOf('/edit') !== -1) setStatePage(STATE_PAGE.EDIT);
    if (location.pathname.indexOf('/create') !== -1) setStatePage(STATE_PAGE.CREATE);
  }, [location.pathname]);

  useEffect(() => {
    onSearch(searchText || '');
    // eslint-disable-next-line
  }, [allListAdminAccount, onSearch]);

  return {
    listAdminAccount,
    selected,
    isLoading,
    onSearch,
    setSelected,
    createAdminAccount,
    editAdminAccount,
    isLoadingCreateAdminAccount,
    isLoadingEditAdminAccount,
    statePage,
    setStatePage,
    searchText,
    setSearchText,
    getListAdminAccount,
  };
};

export default useListAdminAccount;
