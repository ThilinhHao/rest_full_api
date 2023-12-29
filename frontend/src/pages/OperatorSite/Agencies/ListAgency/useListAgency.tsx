import { useEffect, useState } from 'react';

import textHelpers from 'helper/text';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { showConfirmDelete } from 'helper/modal-confirm';

import { apiOperatorAgencyList, apiOperatorGetRegulations } from 'api/operator';
import { apiOperatorDeleteAgency } from 'api/agency';

import { CONST_LIST_AGENCY } from './constants';
import { CONST_LIST_COMPANY, CONST_COMMON } from 'constants/language';

export interface ICompany {
  admin_id: number;
  agency_id: number;
  code: string;
  fee: number;
  id: number;
  name: string;
  status: number;
  usage_plan: number;
  created_at: string;
}
export interface IAgencyResponse {
  code: string;
  created_at: string;
  id: number;
  name: string;
  status: number;
  deposit_fee: number;
  advance_fee: number;
  updated_at: string;
  user_root: {
    id: number;
    full_name: string;
    name_kana: string;
    email: string;
    status: number;
    phone: string;
    regulations_status: number;
  };
  updated_by: {
    email: string;
    full_name: null;
    id: number;
    name_kana: string;
    phone: null;
    status: number;
  };
  agency_bank: {
    account_name: string;
    account_number: string;
    agency_id: number;
    bank_branches_code: string;
    bank_code: string;
    bank_type: number;
    created_at: string;
    updated_at: string;
    bank_name: string;
    bank_branches_name: string;
  };
  user_id: number;
  companies: ICompany[];
}

const useListAgency = () => {
  const [listAgency, setListAgency] = useState<IAgencyResponse[]>([]);
  const [currentListAgency, setCurrentListAgency] = useState<IAgencyResponse[]>([]);
  const [selected, setSelected] = useState<IAgencyResponse | null>(null);
  const [documents, setDocument] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const changeAgencySelected = (agency: IAgencyResponse | null) => {
    setSelected(agency);
    setIsEdit(false);
  };

  const getListAgency = async () => {
    try {
      setIsLoading(true);
      const response = await apiOperatorAgencyList();
      if (responseSuccess(response)) {
        setListAgency(response.data);
        setCurrentListAgency([...response.data]);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (searchText: string) => {
    const listSearch = [...listAgency].map((element: IAgencyResponse) => element.name + element.code);
    const dataSearch: IAgencyResponse[] = listAgency.filter(
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
    setCurrentListAgency(dataSearch);
  };

  const updateListAgency = (agencies: IAgencyResponse) => {
    setListAgency(
      listAgency.map((element: IAgencyResponse) => {
        if (element.id === agencies.id) {
          return {
            ...element,
            ...agencies,
          };
        }
        return element;
      })
    );
    setCurrentListAgency(
      currentListAgency.map((element: IAgencyResponse) => {
        if (element.id === agencies.id) {
          return {
            ...element,
            ...agencies,
          };
        }
        return element;
      })
    );
    setSelected(agencies);
  };

  useEffect(() => {
    getListAgency();
  }, []);

  const removeAgencyOnList = (id: number) => {
    setListAgency(listAgency.filter((item) => item.id !== id));
    setCurrentListAgency(currentListAgency.filter((item) => item.id !== id));
  };
  const deleteCompany = async () => {
    if (!selected) {
      return;
    }
    const response = await apiOperatorDeleteAgency(selected.id);
    if (responseSuccess(response)) {
      removeAgencyOnList(selected.id);
      showConfirmDelete({
        title: selected.name,
        content: CONST_LIST_COMPANY.DELETED,
        hiddenOk: true,
        cancelText: CONST_COMMON.BTN_SAVE,
      });
      setSelected(null);
    }
  };
  const onDeleteAgency = () => {
    if (!selected) {
      return;
    }

    showConfirmDelete({
      title: selected.name,
      content: CONST_LIST_AGENCY.CONFIRM_DELETE,
      onOk: () => deleteCompany(),
    });
  };

  const getRegulations = async () => {
    try {
      const response = await apiOperatorGetRegulations('3');
      const response2 = await apiOperatorGetRegulations('5');
      setDocument([response.data.regulations, response2.data.regulations]);
    } catch (error) {}
  };

  useEffect(() => {
    getRegulations();
  }, []);

  return {
    currentListAgency,
    listAgency,
    selected,
    isLoading,
    isEdit,
    setIsEdit,
    onSearch,
    setSelected,
    updateListAgency,
    onDeleteAgency,
    changeAgencySelected,
    documents,
  };
};

export default useListAgency;
