import { useState, useEffect, useCallback } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { CONST_EXPORT_INVOICE, CONST_LIST_INVOICE_COMPANY } from 'constants/language';
import { createInvoicePDF } from 'helper/export';
import { formatDateCommon } from 'helper/date';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiCompanyInvoiceDetail } from 'api/operator';
import { apiGetCompanyInfoInvoice } from 'api';
import { useParams } from 'react-router-dom';
import {
  ICompanyBasicOperatorInvoice,
  IFilterPage,
  IInvoiceDetailSiteCompany,
  MAX_ITEM_PAGE_ONE_COMPANY,
  MAX_ITEM_PAGE_OTHER_COMPANY,
  defaultPageInvoiceDetailCompany,
} from 'constants/invoice';

const useInvoiceDetailCompany = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingExport, setIsLoadingExport] = useState<boolean>(false);
  const [invoiceInfo, setInvoiceInfo] = useState<ICompanyBasicOperatorInvoice>();
  const [invoiceDetail, setInvoiceDetail] = useState<IInvoiceDetailSiteCompany[]>();
  const [invoiceAllDetail, setInvoiceAllDetail] = useState<IInvoiceDetailSiteCompany[]>();
  const [isLoadingInvoiceAllDetail, setIsLoadingInvoiceAllDetail] = useState<boolean>(false);
  const [page, setPage] = useState<IFilterPage>(defaultPageInvoiceDetailCompany);

  const BREADS: IBread[] = [
    {
      name: CONST_LIST_INVOICE_COMPANY.LIST_INVOICE,
      path: '/company-invoices',
    },
    {
      name: CONST_LIST_INVOICE_COMPANY.INVOICE_DETAIL,
      path: '',
    },
  ];

  const exportInvoicePDF = useCallback(() => {
    if (isLoadingExport || !invoiceInfo) {
      return;
    }
    setIsLoadingExport(true);
    setTimeout(async () => {
      await createInvoicePDF(
        invoiceInfo.id,
        CONST_EXPORT_INVOICE.REQUEST_DATE + formatDateCommon(invoiceInfo?.request_date),
        CONST_EXPORT_INVOICE.EXPORT_FILE_NAME
      );
      setIsLoadingExport(false);
    }, 100);
  }, [invoiceInfo, isLoadingExport]);

  const changePaging = useCallback(
    (pageChange: number) => {
      if (pageChange > 1) {
        setPage({
          ...page,
          page: pageChange,
          per_page: MAX_ITEM_PAGE_OTHER_COMPANY,
          offset: MAX_ITEM_PAGE_ONE_COMPANY + MAX_ITEM_PAGE_OTHER_COMPANY * (pageChange - 2),
        });
      } else {
        setPage({
          ...page,
          page: pageChange,
          per_page: MAX_ITEM_PAGE_ONE_COMPANY,
          offset: 0,
        });
      }
    },
    [page]
  );

  const getInvoiceInfo = async (invoiceId: number) => {
    try {
      const response = await apiGetCompanyInfoInvoice(invoiceId);
      if (responseSuccess(response)) {
        setInvoiceInfo(response.data);
      }
    } catch (error) {
      //
    }
  };

  const getInvoiceAllDetail = useCallback(async () => {
    try {
      setIsLoadingInvoiceAllDetail(true);
      const response = await apiCompanyInvoiceDetail(Number(id), { per_page: page.total });
      if (responseSuccess(response)) {
        setInvoiceAllDetail(response.data?.data);
      }
    } catch (error) {
      //
    } finally {
      setIsLoadingInvoiceAllDetail(false);
    }
  }, [id, page.total]);

  const getInvoiceDetail = useCallback(
    async (filterPage: IFilterPage) => {
      if (isLoading && !Number(id)) {
        return false;
      }
      try {
        setIsLoading(true);
        const response = await apiCompanyInvoiceDetail(Number(id), {
          per_page: filterPage.per_page,
          offset: filterPage.offset,
        });
        if (responseSuccess(response)) {
          setInvoiceDetail(response.data?.data);
          if (filterPage.offset) {
            setPage({
              ...page,
              page: filterPage.page,
            });
          } else {
            setPage({
              ...page,
              page: filterPage.page,
              total: response.data?.total,
            });
          }
        }
      } catch (error) {
        //
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line
    [isLoading, id]
  );

  useEffect(() => {
    if (Number(id)) {
      getInvoiceInfo(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (Number(id) && page.total) {
      getInvoiceAllDetail();
    }
    // eslint-disable-next-line
  }, [id, page.total]);

  useEffect(() => {
    getInvoiceDetail(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page.page]);

  return {
    BREADS,
    invoiceDetail,
    page,
    changePaging,
    isLoading,
    exportInvoicePDF,
    invoiceAllDetail,
    isLoadingExport,
    invoiceInfo,
    isLoadingInvoiceAllDetail,
  };
};

export default useInvoiceDetailCompany;
