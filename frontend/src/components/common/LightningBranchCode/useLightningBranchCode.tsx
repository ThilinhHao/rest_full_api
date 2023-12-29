import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiGetBankBranchList } from 'api';
import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';

interface IDropList {
  value: string;
  label: string;
}
const useLightningBranchCode = (form: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const [listBanks, setListBanks] = useState<IDropList[] | null>(null);

  const getCurrentBank = (list: IDropList[], searchText: string) => {
    if (!form.getFieldsValue().bank_branches_code_custom || searchText || countCall.current > 1) {
      return list;
    }
    const valueForm = form.getFieldsValue().bank_branches_code_custom;
    const valueSearchCustom = list.filter((element) => element.value !== valueForm);
    valueSearchCustom.unshift({
      value: valueForm,
      label: `${valueForm.split('-')[0]} (${valueForm.split('-')[1]})`,
    });
    return valueSearchCustom;
  };
  const pageCurrent = useRef<number>(1);
  const countCall = useRef<number>(1);
  const handleScrollBank = (e: any) => {
    const element = e.target;
    const conditionCall = element.scrollHeight - element.clientHeight - element.scrollTop;
    if (conditionCall <= 40) {
      getListBankStomp(pageCurrent.current + 1, valueSearch);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceDropDown = useCallback(
    debounce((nextValue: any) => getListBankStomp(pageCurrent.current, nextValue), 500),
    []
  );

  const handleSearch = (newValue: string) => {
    pageCurrent.current = 1;
    setValueSearch(newValue);
    debounceDropDown(newValue);
  };

  const getListBankStomp = async (page: number, txt: string) => {
    if (isLoadingBottom) {
      return;
    }
    try {
      await form.getFieldsValue().bank_branches_code_custom;
      const formValueCode = await form.getFieldsValue().bank_code_custom;
      setIsLoadingBottom(true);
      setTimeout(async () => {
        const response = await apiGetBankBranchList({
          key_word: txt,
          page: page,
          bank_code: formValueCode?.split('-')[1] || null,
        });
        if (responseSuccess(response)) {
          let setUpList = listBanks || [];
          if (page === 1) {
            setUpList = [];
          }
          setListBanks(
            getCurrentBank(
              setUpList.concat(
                response.data.data.map((element: any) => ({
                  value: `${element.name}-${element.code}-${element.id}`,
                  label: `${element.name} (${element.code})`,
                }))
              ),
              txt
            )
          );

          pageCurrent.current = response.data.page as number;
          countCall.current += 1;
        }
        setIsLoading(false);
      }, 100);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoadingBottom(false);
      }, 100);
    }
  };

  const onSelectedBank = (item: any) => {
    form.setFieldValue('bank_branches_code_custom', item.value);
    form.setFields([
      {
        name: 'bank_branches_code_custom',
        errors: undefined,
      },
    ]);
    setIsOpen(false);
  };

  useEffect(() => {
    pageCurrent.current = 1;
    setListBanks(null);
    getListBankStomp(pageCurrent.current, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldsValue().bank_code_custom]);

  return {
    listBank: listBanks,
    handleScrollBank,
    getListBankStomp,
    handleSearch,
    isLoading,
    onSelectedBank,
    isOpen,
    setIsOpen,
    isLoadingBottom,
  };
};

export default useLightningBranchCode;
