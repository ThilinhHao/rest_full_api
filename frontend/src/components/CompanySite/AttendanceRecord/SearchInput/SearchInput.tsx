import React, { useEffect, useState } from 'react';

import { EKeyCode } from 'constants/constants';
import { SearchProps } from 'antd/es/input';
import { CONST_COMMON } from 'constants/language';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { SearchInputWrapper } from './searchInputStyle';
import { apiCompanyListStaff } from 'api/company';
import textHelpers from 'helper/text';

interface IStaffUser {
  code: string;
  id: number;
  name: string;
  status: number;
}
interface ISearchInput extends SearchProps {
  searchAttendance: (listId: number[]) => void;
}
const SearchInput = ({ searchAttendance, ...props }: ISearchInput) => {
  const [listUser, setListUser] = useState<IStaffUser[] | []>([]);
  const getListUser = async () => {
    const response = await apiCompanyListStaff();
    if (responseSuccess(response)) {
      setListUser(response.data || []);
    }
  };

  useEffect(() => {
    getListUser();
  }, []);

  const onSearch = (searchText: string) => {
    const dataSearch: IStaffUser[] | [] = listUser?.filter(
      (element: IStaffUser) =>
        element.name.replaceAll(/\s/g, '').toLowerCase().includes(searchText.toLowerCase().replaceAll(/\s/g, '')) ||
        textHelpers.searchTextInLongText({
          text: searchText,
          longText: element.name,
        }) ||
        searchText === ''
    );
    searchAttendance(dataSearch.map((element: IStaffUser) => element.id));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === EKeyCode.ENTER) {
      const target = e.target as HTMLTextAreaElement;
      onSearch(target.value);
    }
  };

  return <SearchInputWrapper onKeyDown={onKeyDown} {...props} placeholder={CONST_COMMON.SEARCH_BY_NAME} />;
};

export default SearchInput;
