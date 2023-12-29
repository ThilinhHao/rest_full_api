import { useEffect, useState } from 'react';
import textHelpers from 'helper/text';

import { EOperatorStatus } from 'constants/constants';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiGetListOperator } from 'api';
import { apiDeleteOperator } from 'api/operator';
import { showConfirmDelete } from 'helper/modal-confirm';
import { CONST_COMMON } from 'constants/language';
import { CONST_DETAIL_OPERATOR } from '@containers/OperatorSite/Operator/DetailOperator/constants';

export interface IOperator {
  code: string;
  create_at: string;
  id: number;
  full_name: string;
  name_kana: string;
  email: string;
  type: number;
  phone: string;
  status?: EOperatorStatus.VERIFY | EOperatorStatus.NOT_VERIFY;
}

const useListOperator = () => {
  const [listOperator, setListOperator] = useState<IOperator[]>([]);
  const [currentListOperator, setCurrentListOperator] = useState<IOperator[]>([]);
  const [selected, setSelected] = useState<null | IOperator>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const changeOperatorSelected = (operator: IOperator | null) => {
    setSelected(operator);
    setIsEdit(false);
  };

  const onSearch = (searchText: string) => {
    const listSearch = [...listOperator].map((element: IOperator) => element.full_name + element.code);
    const dataSearch: IOperator[] = listOperator.filter(
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
    setCurrentListOperator(dataSearch);
  };

  const getListOperator = async () => {
    try {
      setIsLoading(true);
      const response = await apiGetListOperator();
      if (responseSuccess(response)) {
        setListOperator(response.data);
        setCurrentListOperator([...response.data]);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const updateOperator = (operator: IOperator) => {
    setListOperator(
      listOperator.map((element: IOperator) => {
        if (element.id === operator.id) {
          return {
            ...element,
            ...operator,
          };
        }
        return element;
      })
    );
    setCurrentListOperator(
      currentListOperator.map((element: IOperator) => {
        if (element.id === operator.id) {
          return {
            ...element,
            ...operator,
          };
        }
        return element;
      })
    );
    setSelected(operator);
  };

  useEffect(() => {
    getListOperator();
  }, []);

  const removeOperatorOnList = (id: number) => {
    setListOperator(listOperator.filter((item) => item.id !== id));
    setCurrentListOperator(currentListOperator.filter((item) => item.id !== id));
  };

  const onDeleteOperator = async () => {
    if (!selected) {
      return;
    }
    try {
      const response = await apiDeleteOperator(selected.id);
      if (responseSuccess(response)) {
        removeOperatorOnList(selected.id);
        showConfirmDelete({
          title: selected.full_name,
          content: CONST_DETAIL_OPERATOR.DELETED,
          hiddenOk: true,
          cancelText: CONST_COMMON.BTN_SAVE,
        });
        setSelected(null);
      }
    } catch (error) {}
  };

  const onDelete = () => {
    if (!selected) {
      return;
    }

    showConfirmDelete({
      title: selected.full_name,
      content: CONST_DETAIL_OPERATOR.CONFIRM_DELETE,
      onOk: () => onDeleteOperator(),
    });
  };

  return {
    selected,
    isLoading,
    listOperator,
    currentListOperator,
    isEdit,
    setIsEdit,
    updateOperator,
    onDelete,
    onSearch,
    setSelected,
    changeOperatorSelected,
  };
};

export default useListOperator;
