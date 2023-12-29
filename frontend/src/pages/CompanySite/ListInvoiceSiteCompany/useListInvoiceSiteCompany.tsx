import { useState, useEffect, useCallback } from 'react';

import { Dayjs } from 'dayjs';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import { useNavigate } from 'react-router-dom';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiGetListInvoice } from 'api/company';
import { ICompanyBasicOperatorInvoice, IFilterPage, defaultPageInvoiceDetailCompany } from 'constants/invoice';

const useListInvoiceSiteCompany = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listInvoice, setListInvoice] = useState<ICompanyBasicOperatorInvoice[] | null>();
  const [currentMonth, setCurrentMonth] = useState<Dayjs>();
  const [page, setPage] = useState<IFilterPage>({ ...defaultPageInvoiceDetailCompany, per_page: 10 });

  const BREADS: IBread[] = [
    {
      name: CONST_LIST_INVOICE_COMPANY.LIST_INVOICE,
      path: '',
    },
  ];

  const changePaging = useCallback(
    (pageChange: number) => {
      setPage({
        ...page,
        page: pageChange,
      });
    },
    [page]
  );

  const onChangeMonth = useCallback(
    (e: Dayjs | any) => {
      setCurrentMonth(e);
      changePaging(defaultPageInvoiceDetailCompany.page);
    },
    [changePaging]
  );

  const getListInvoice = async (pageCall: number, date?: Dayjs) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiGetListInvoice({ page: pageCall, date: date?.format('YYYY-MM') });
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

  useEffect(() => {
    getListInvoice(page.page, currentMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.page, currentMonth]);

  return {
    navigate,
    BREADS,
    listInvoice,
    page,
    changePaging,
    isLoading,
    onChangeMonth,
    currentMonth,
  };
};

export default useListInvoiceSiteCompany;
