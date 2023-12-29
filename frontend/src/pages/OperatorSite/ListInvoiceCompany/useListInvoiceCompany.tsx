import { useState, useEffect, useCallback } from 'react';

import { Dayjs } from 'dayjs';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import { useNavigate } from 'react-router-dom';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiCompanyListAllInvoiceDetail, apiCompanyListInvoice } from 'api/operator';
import { EKeyCode } from 'constants/constants';
import { exportPDFsToZipForCompany } from 'helper/export';
import { getDayjsByTimeZone } from 'helper/date';
import {
  DEPOSIT_TYPE,
  ICompanyBasicOperatorInvoice,
  ICompanyOperatorListAllDetailInvoice,
  IFilterPage,
  defaultPageInvoiceDetailCompany,
} from 'constants/invoice';

const useListInvoiceCompany = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingExport, setIsLoadingExport] = useState<boolean>(false);
  const [listInvoice, setListInvoice] = useState<ICompanyBasicOperatorInvoice[]>();
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(getDayjsByTimeZone());
  const [keyWord, setKeyWord] = useState<string>();
  const [page, setPage] = useState<IFilterPage>({ ...defaultPageInvoiceDetailCompany, per_page: 10 });
  const [listInvoiceAllDetail, setListInvoiceAllDetail] = useState<ICompanyOperatorListAllDetailInvoice[]>();
  const [typeCompany, setTypeCompany] = useState<number>(DEPOSIT_TYPE);

  const BREADS: IBread[] = [
    {
      name: CONST_LIST_INVOICE_COMPANY.LIST_INVOICE,
      path: '',
    },
  ];

  const exportAllInvoicePDF = useCallback(async () => {
    if (isLoadingExport) {
      return;
    }
    setIsLoadingExport(true);
    try {
      const response = await apiCompanyListAllInvoiceDetail({
        date: currentMonth?.format('YYYY-MM'),
        key_word: keyWord,
        usage_plan: typeCompany,
      });
      if (responseSuccess(response)) {
        setListInvoiceAllDetail(response.data);
        setTimeout(() => {
          exportPDFsToZipForCompany(response.data);
          setIsLoadingExport(false);
        }, 100);
      }
    } catch (error) {
      //
    }
  }, [isLoadingExport, typeCompany, currentMonth, keyWord]);

  const getListInvoice = async (pageCall: number, usagePlan: number, date?: Dayjs, keyWordCall?: string) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiCompanyListInvoice({
        page: pageCall,
        date: date?.format('YYYY-MM'),
        key_word: keyWordCall,
        usage_plan: usagePlan,
      });
      if (responseSuccess(response)) {
        setListInvoice(response.data?.data);
        setPage({
          ...page,
          total: response.data?.total,
          per_page: response.data?.per_page,
        });
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeTypeCompany = (value: number) => {
    setTypeCompany(value);
    setCurrentMonth(getDayjsByTimeZone());
  };

  const onChangeMonth = (e: Dayjs | any) => {
    setCurrentMonth(e);
  };

  const onChangeKeyWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  };

  const onChangePage = useCallback(() => {
    getListInvoice(page.page, typeCompany, currentMonth, keyWord);
    // eslint-disable-next-line
  }, [page.page, currentMonth, typeCompany, keyWord]);

  const changePaging = useCallback(
    (pageChange: number) => {
      setPage({
        ...page,
        page: pageChange,
      });
    },
    [page]
  );

  const refeshNumberPage = useCallback(() => {
    if (page.page === defaultPageInvoiceDetailCompany.page) {
      getListInvoice(page.page, typeCompany, currentMonth, keyWord);
    } else {
      changePaging(defaultPageInvoiceDetailCompany.page);
    }
    // eslint-disable-next-line
  }, [changePaging, currentMonth, keyWord, page.page, typeCompany]);

  const onKeyDownKeyWord = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === EKeyCode.ENTER) {
        e.preventDefault();
        refeshNumberPage();
      }
    },
    [refeshNumberPage]
  );

  useEffect(() => {
    refeshNumberPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, typeCompany]);

  useEffect(() => {
    onChangePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.page]);

  return {
    navigate,
    BREADS,
    listInvoice,
    currentMonth,
    onChangeMonth,
    page,
    changePaging,
    isLoading,
    typeCompany,
    onChangeTypeCompany,
    listInvoiceAllDetail,
    keyWord,
    onChangeKeyWord,
    onKeyDownKeyWord,
    refeshNumberPage,
    exportAllInvoicePDF,
    isLoadingExport,
  };
};

export default useListInvoiceCompany;
