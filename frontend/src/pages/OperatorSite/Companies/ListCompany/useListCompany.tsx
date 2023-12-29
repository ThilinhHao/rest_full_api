import { useEffect, useState } from 'react';

import { IFile } from 'constants/operatorSite';
import { EStatusCompany, EStatusFile, EStatusFileConfirm } from 'constants/constants';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { showConfirmDelete } from 'helper/modal-confirm';
import { CONST_COMMON, CONST_LIST_COMPANY } from 'constants/language';
import {
  apiOperatorDeleteCompany,
  apiOperatorDocumentConfirm,
  apiOperatorGetListCompany,
  apiOperatorGetRegulations,
} from 'api/operator';

import textHelpers from 'helper/text';
export interface IDocumentCompany {
  company_id?: number;
  id: number;
  link?: any;
  name: string;
  status?: number;
  note?: string;
}
export interface IDetailCompany {
  agency: {
    code: string;
    id: number;
    name: string;
    status: number;
    user_root: {
      id: number;
      full_name: string;
      name_kana: string | null;
    };
  };
  free_start_date: string | null;
  free_end_date: string | null;
  fee: string | null;
  postal_code: string;
  agency_fee: any;
  agency_id: any;
  code: string;
  documents: IDocumentCompany[] | IFile[];
  address1: string;
  address2: string;
  id: number;
  name: string;
  parent_id: number | null;
  regulation_status: number;
  status:
    | EStatusCompany.STATUS_NOTVNVERIFY
    | EStatusCompany.STATUS_USING
    | EStatusCompany.STATUS_SUSPEND
    | EStatusCompany.STATUS_REJECT;
  usage_plan: number;
  updated_at: string;
  updated_by: {
    email: string;
    full_name: null;
    id: number;
    name_kana: string;
    phone: null;
    status: number;
  };
  user_root: {
    code: string;
    company_id: number;
    email: string;
    full_name: string;
    id: number;
    name_kana: string;
    phone: string;
    status: number;
    regulations_status: number;
  };
}
export interface IDefaultFile {
  created_at: string;
  id: number;
  regulations: string;
  type: number;
  updated_at: string;
  updated_by: number;
}
const useListCompany = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [listCompany, setListCompany] = useState<IDetailCompany[]>([]);
  const [selected, setSelected] = useState<IDetailCompany | null>(null);
  const [currentListCompany, setCurrentListCompany] = useState<IDetailCompany[]>([]);
  const [documents, setDocuments] = useState<IDefaultFile[]>([]);

  const [isLoadingOperatorConfirmDocument, setisLoadingOperatorConfirmDocument] = useState<boolean>(false);

  const getListCompany = async () => {
    try {
      setIsLoading(true);
      const response = await apiOperatorGetListCompany();
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
    const listSearch = [...listCompany].map((element: IDetailCompany) => element.name + element.code);
    const dataSearch: IDetailCompany[] = listCompany.filter(
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

  const updateCompany = (company: IDetailCompany) => {
    setListCompany(
      listCompany.map((element: IDetailCompany) => {
        if (element.id === company.id) {
          return {
            ...element,
            ...company,
          };
        }
        return element;
      })
    );
    setCurrentListCompany(
      currentListCompany.map((element: IDetailCompany) => {
        if (element.id === company.id) {
          return {
            ...element,
            ...company,
          };
        }
        return element;
      })
    );
    setSelected(company);
  };

  useEffect(() => {
    getListCompany();
  }, []);

  useEffect(() => {
    if (selected) setIsEdit(false);
  }, [selected]);

  const removeCompanyOnList = (id: number) => {
    setListCompany(listCompany.filter((item) => item.id !== id));
    setCurrentListCompany(currentListCompany.filter((item) => item.id !== id));
  };
  const deleteCompany = async () => {
    if (!selected) {
      return;
    }
    const response = await apiOperatorDeleteCompany(selected.id);
    if (responseSuccess(response)) {
      removeCompanyOnList(selected.id);
      showConfirmDelete({
        title: selected.name,
        content: CONST_LIST_COMPANY.DELETED,
        hiddenOk: true,
        cancelText: CONST_COMMON.BTN_SAVE,
      });
      setSelected(null);
    }
  };

  const onDeleteCompany = () => {
    if (!selected) {
      return;
    }

    showConfirmDelete({
      title: selected.name,
      content: CONST_LIST_COMPANY.CONFIRM_DELETE,
      onOk: () => deleteCompany(),
    });
  };

  const submitDocumentConfirm = async (idUser: number, data: any) => {
    setisLoadingOperatorConfirmDocument(true);
    const response = await apiOperatorDocumentConfirm(idUser, data);
    if (responseSuccess(response)) {
      if (selected) {
        const _doc = data.documents.map((item: IDocumentCompany) => {
          if (item.status === EStatusFile.REJECT_DRAFT) item.status = EStatusFile.REJECT;
          if (item.status === EStatusFile.TICKED_DRAFT) item.status = EStatusFile.TICKED;
          return { ...item };
        });
        const _companySelect = {
          ...selected,
          status: data.status === EStatusFileConfirm.REJECT ? EStatusCompany.STATUS_REJECT : selected.status,
          documents: _doc,
        };
        setSelected(_companySelect);
      }
      getListCompany();
    }
    setisLoadingOperatorConfirmDocument(false);
  };

  const onConfirmOperatorDocument = (data: any) => {
    submitDocumentConfirm(data.user_id, data);
  };

  const getRegulations = async () => {
    try {
      const response = await apiOperatorGetRegulations('1');
      const response2 = await apiOperatorGetRegulations('5');
      setDocuments([response.data, response2.data]);
    } catch (error) {}
  };

  useEffect(() => {
    getRegulations();
  }, []);

  const onSetSelected = (company: any) => {
    setSelected(null);
    setTimeout(() => {
      setSelected(company);
    }, 100);
  };

  return {
    isEdit,
    selected,
    isLoading,
    listCompany,
    currentListCompany,
    documents,
    onSearch,
    setIsEdit,
    onSetSelected,
    updateCompany,
    onDeleteCompany,
    onConfirmOperatorDocument,
    isLoadingOperatorConfirmDocument,
  };
};

export default useListCompany;
