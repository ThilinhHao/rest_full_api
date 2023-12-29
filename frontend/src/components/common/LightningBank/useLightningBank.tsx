import { apiGetBankList } from 'api';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { debounce } from 'lodash';
import { useState, useEffect, useRef, useCallback } from 'react';
interface IDropList {
  value: string;
  label: string;
}

const SEVEN_BANK_NAME = 'ｾﾌﾞﾝｷﾞﾝｺｳ';

const useLightningBank = (form: any, onlySevenBank?: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [listBanks, setListBanks] = useState<IDropList[] | null>(null);
  const [valueSearch, setValueSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const getCurrentBank = (list: IDropList[], searchText: string) => {
    if (!form.getFieldsValue().bank_code_custom || searchText) {
      return list;
    }
    const valueForm = form.getFieldsValue().bank_code_custom;
    const valueSearchCustom = list.filter((element) => element.value !== valueForm);
    valueSearchCustom.unshift({
      value: valueForm,
      label: `${valueForm.split('-')[0]} (${valueForm.split('-')[1]})`,
    });
    return valueSearchCustom;
  };
  const pageCurrent = useRef<number>(1);
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
      await form.getFieldsValue()?.bank_code_custom;
      setIsLoadingBottom(true);
      setTimeout(async () => {
        const response = await apiGetBankList({
          key_word: txt,
          page: page,
        });
        if (responseSuccess(response)) {
          let setUpList = listBanks || [];
          if (page === 1) {
            setUpList = [];
          }
          let listBankResponse = response.data.data;
          if (onlySevenBank) {
            listBankResponse = response.data.data.filter((element: any) => element?.half_with_kana === SEVEN_BANK_NAME);
          }
          setListBanks(
            getCurrentBank(
              setUpList.concat(
                listBankResponse.map((element: any) => ({
                  value: `${element?.name}-${element?.code}-${element?.id}`,
                  label: `${element.name} (${element.code})`,
                }))
              ),
              txt
            )
          );
          pageCurrent.current = response.data.page as number;
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
    form.setFieldValue('bank_code_custom', item.value);
    form.setFieldValue('bank_branches_code_custom', undefined);
    form.setFields([
      {
        name: 'bank_code_custom',
        errors: undefined,
      },
    ]);
    setIsOpen(false);
  };

  useEffect(() => {
    getListBankStomp(pageCurrent.current, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default useLightningBank;
