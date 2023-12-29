import { useState, useEffect, useCallback } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { CONST_EXPORT_INVOICE, CONST_LIST_INVOICE_COMPANY, CONST_OPERATOR_INVOICE } from 'constants/language';
import { createInvoicePDF } from 'helper/export';
import { apiGetInvoiceDetail, apiUpdateStatusInvoice } from 'api/agency';
import { useParams } from 'react-router';
import { responseCode, responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiGetAgencyInfoInvoice } from 'api';
import { formatDateCommon } from 'helper/date';
import { EStatusInvoiceAgency } from 'constants/constants';
import {
  IAgencyBasicOperatorInvoice,
  IFilterPage,
  IInvoiceDetailInvoiceSiteAgency,
  MAX_ITEM_PAGE_ONE_AGENCY,
  MAX_ITEM_PAGE_OTHER_AGENCY,
  defaultPageInvoiceDetailAgency,
} from 'constants/invoice';
import { message } from 'antd';

const useInvoiceDetailSiteAgency = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);
  const [invoiceInfo, setInvoiceInfo] = useState<IAgencyBasicOperatorInvoice>();
  const [invoiceDetail, setInvoiceDetail] = useState<IInvoiceDetailInvoiceSiteAgency[]>();
  const [isLoadingExport, setIsLoadingExport] = useState<boolean>(false);
  const [invoiceAllDetail, setInvoiceAllDetail] = useState<IInvoiceDetailInvoiceSiteAgency[]>();
  const [page, setPage] = useState<IFilterPage>(defaultPageInvoiceDetailAgency);

  const BREADS: IBread[] = [
    {
      name: CONST_LIST_INVOICE_COMPANY.LIST_INVOICE,
      path: '/invoices',
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
        CONST_EXPORT_INVOICE.EXPORT_FILE_NAME,
        true,
        true
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
          per_page: MAX_ITEM_PAGE_OTHER_AGENCY,
          offset: MAX_ITEM_PAGE_ONE_AGENCY + MAX_ITEM_PAGE_OTHER_AGENCY * (pageChange - 2),
        });
      } else {
        setPage({
          ...page,
          page: pageChange,
          per_page: MAX_ITEM_PAGE_ONE_AGENCY,
          offset: 0,
        });
      }
    },
    [page]
  );

  const confirmInvoice = useCallback(async () => {
    if (Number(id) && invoiceInfo) {
      try {
        setIsLoadingConfirm(true);
        const response = await apiUpdateStatusInvoice(Number(id), EStatusInvoiceAgency.WAITING_OPERATOR_CONFIRM);
        if (responseSuccess(response)) {
          setInvoiceInfo({
            ...invoiceInfo,
            status: EStatusInvoiceAgency.WAITING_OPERATOR_CONFIRM,
          });
        }
      } catch (error) {
        if (responseCode(error) === 'K001') {
          message.error(CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.msgCantConfirmInvoice);
        }
      } finally {
        setIsLoadingConfirm(false);
      }
    }
  }, [id, invoiceInfo]);

  const getInvoiceInfo = async (invoiceId: number) => {
    try {
      const response = await apiGetAgencyInfoInvoice(invoiceId);
      if (responseSuccess(response)) {
        setInvoiceInfo(response.data);
      }
    } catch (error) {
      //
    }
  };

  const getInvoiceAllDetail = useCallback(async () => {
    try {
      const response = await apiGetInvoiceDetail(Number(id), { per_page: page.total });
      if (responseSuccess(response)) {
        setInvoiceAllDetail(response.data?.data);
      }
    } catch (error) {
      //
    }
  }, [id, page.total]);

  const getInvoiceDetail = useCallback(
    async (filterPage: IFilterPage) => {
      if (isLoading && !Number(id)) {
        return false;
      }
      try {
        setIsLoading(true);
        const response = await apiGetInvoiceDetail(Number(id), {
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
    isLoadingConfirm,
    confirmInvoice,
  };
};

export default useInvoiceDetailSiteAgency;
