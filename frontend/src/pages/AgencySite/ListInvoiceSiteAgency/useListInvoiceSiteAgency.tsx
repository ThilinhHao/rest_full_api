import { useState, useEffect, useCallback } from 'react';

import { Dayjs } from 'dayjs';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import { useNavigate } from 'react-router-dom';
import { apiGetListInvoice } from 'api/agency';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { IAgencyBasicOperatorInvoice, IFilterPage, defaultPageInvoiceDetailAgency } from 'constants/invoice';

const useListInvoiceSiteAgency = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listInvoice, setListInvoice] = useState<IAgencyBasicOperatorInvoice[]>();
  const [currentMonth, setCurrentMonth] = useState<Dayjs>();
  const [page, setPage] = useState<IFilterPage>({ ...defaultPageInvoiceDetailAgency, per_page: 10 });

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
      changePaging(defaultPageInvoiceDetailAgency.page);
    },
    [changePaging]
  );

  const getListInvoice = async (pageCall: number, date?: Dayjs) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiGetListInvoice({ date: date?.format('YYYY-MM'), page: pageCall });
      if (responseSuccess(response)) {
        setListInvoice(response.data?.data);
        setPage({
          ...page,
          page: pageCall,
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
  }, [currentMonth, page.page]);

  return {
    navigate,
    BREADS,
    listInvoice,
    currentMonth,
    onChangeMonth,
    page,
    changePaging,
    isLoading,
  };
};

export default useListInvoiceSiteAgency;
