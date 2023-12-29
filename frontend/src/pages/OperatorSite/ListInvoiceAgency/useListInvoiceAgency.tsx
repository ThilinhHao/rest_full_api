import { useState, useEffect, useCallback } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { CONST_OPERATOR_INVOICE } from 'constants/language';
import { useNavigate } from 'react-router-dom';
import {
  apiAgencyListAllInvoiceDetail,
  apiAgencyListInvoice,
  apiOperatorTransferAgency,
  apiOperatorVerifyOTP,
  apiUpdateStatusAgencyInvoice,
} from 'api/operator';
import { responseCode, responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { exportPDFsToZipForAgency } from 'helper/export';
import { EKeyCode, EStatusInvoiceAgency } from 'constants/constants';
import { IAgencyBasicOperatorInvoice, IDownTime, IFilterPage, defaultPageInvoiceDetailAgency } from 'constants/invoice';
import { message } from 'antd';

const useListInvoiceAgency = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingExport, setIsLoadingExport] = useState<boolean>(false);
  const [listInvoice, setListInvoice] = useState<IAgencyBasicOperatorInvoice[]>();
  const [listInvoiceAllDetail, setListInvoiceAllDetail] = useState<IAgencyBasicOperatorInvoice[]>();
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [keyWord, setKeyWord] = useState<string>();
  const [page, setPage] = useState<IFilterPage>({ ...defaultPageInvoiceDetailAgency, per_page: 10 });

  const [otp, setOtp] = useState('');
  const [isOpenOTP, setIsOpenOTP] = useState<boolean>(false);
  const [isLoadingSubmitOTP, setLoadingSubmitOTP] = useState<boolean>(false);
  const [isLoadingTransfer, setIsLoadingTransfer] = useState<boolean>(false);
  const [dateDownTime, setDateDownTime] = useState<IDownTime>();
  const [invoiceInfo, setInvoiceInfo] = useState<IAgencyBasicOperatorInvoice>();

  const [totalPayment, setTotalPayment] = useState<number>(0);

  const BREADS: IBread[] = [
    {
      name: CONST_OPERATOR_INVOICE.LIST_AGENCY_INVOICE,
      path: '',
    },
  ];

  const exportAllInvoicePDF = useCallback(async () => {
    if (isLoadingExport) {
      return;
    }
    setIsLoadingExport(true);
    try {
      const response = await apiAgencyListAllInvoiceDetail({
        date: currentMonth?.format('YYYY-MM'),
        key_word: keyWord,
      });
      if (responseSuccess(response)) {
        setListInvoiceAllDetail(response.data);
        setTimeout(() => {
          exportPDFsToZipForAgency(response.data);
          setIsLoadingExport(false);
        }, 100);
      }
    } catch (error) {
      //
    }
  }, [isLoadingExport, currentMonth, keyWord]);

  const changeStatusInvoice = useCallback(
    async (id: number) => {
      setIsLoading(true);
      try {
        const response = await apiUpdateStatusAgencyInvoice(id, EStatusInvoiceAgency.TRANSFER_COMPLETED);
        if (responseSuccess(response)) {
          const dataTemp = [...(listInvoice || [])];
          dataTemp.forEach((ele: IAgencyBasicOperatorInvoice) => {
            if (ele.id === id) {
              ele.status = EStatusInvoiceAgency.TRANSFER_COMPLETED;
            }
          });
          setListInvoice(dataTemp);
        }
      } catch (error) {
        if (responseCode(error) === 'K001') {
          message.error(CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.msgCantConfirmInvoice);
        }
        if (responseCode(error) === 'K002') {
          message.error(CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.msgOperatorNotPhone);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [listInvoice]
  );

  const getListInvoice = async (pageCall: number, date?: Dayjs, keyWordCall?: string) => {
    if (isLoading) {
      return false;
    }
    try {
      setIsLoading(true);
      const response = await apiAgencyListInvoice({
        page: pageCall,
        date: date?.format('YYYY-MM'),
        key_word: keyWordCall,
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

  const getListInvoiceDetailAll = async (date?: Dayjs, keyWordCall?: string) => {
    try {
      const response = await apiAgencyListAllInvoiceDetail({
        date: date?.format('YYYY-MM'),
        key_word: keyWordCall,
      });
      if (responseSuccess(response)) {
        setListInvoiceAllDetail(response.data);
      }
    } catch (error) {
      //
    }
  };

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
    if (page.page === defaultPageInvoiceDetailAgency.page) {
      getListInvoice(page.page, currentMonth, keyWord);
      getListInvoiceDetailAll(currentMonth, keyWord);
    } else {
      changePaging(defaultPageInvoiceDetailAgency.page);
    }
    // eslint-disable-next-line
  }, [changePaging, currentMonth, keyWord, page.page]);

  const onChangePage = useCallback(() => {
    getListInvoice(page.page, currentMonth, keyWord);
    getListInvoiceDetailAll(currentMonth, keyWord);
    // eslint-disable-next-line
  }, [page.page, currentMonth, keyWord]);

  const onKeyDownKeyWord = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === EKeyCode.ENTER) {
        e.preventDefault();
        refeshNumberPage();
      }
    },
    [refeshNumberPage]
  );

  const onChangeMonth = (e: Dayjs | any) => {
    setCurrentMonth(e);
  };

  const onChangeKeyWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.target.value);
  };

  useEffect(() => {
    refeshNumberPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  useEffect(() => {
    onChangePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.page]);

  useEffect(() => {
    if (listInvoiceAllDetail) {
      const sum = listInvoiceAllDetail.reduce((total, item: IAgencyBasicOperatorInvoice) => {
        return total + item.total_payment;
      }, 0);
      setTotalPayment(sum);
    }
  }, [listInvoiceAllDetail]);

  const onClickTransferAgency = useCallback(
    async (invoiceInfo: any) => {
      if (invoiceInfo) {
        setInvoiceInfo(invoiceInfo);
        try {
          setIsLoadingTransfer(true);
          const response = await apiOperatorTransferAgency(
            Number(invoiceInfo.id),
            EStatusInvoiceAgency.WAITING_OPERATOR_VERIFY
          );
          setInvoiceInfo({
            ...invoiceInfo,
            status: EStatusInvoiceAgency.WAITING_OPERATOR_VERIFY,
          });
          if (listInvoice?.length) {
            let _listInvoice: IAgencyBasicOperatorInvoice[] = [];
            listInvoice.forEach((element) => {
              if (element.id === invoiceInfo.id) {
                element.status = EStatusInvoiceAgency.WAITING_OPERATOR_VERIFY;
              }
              _listInvoice.push(element);
            });
            setListInvoice(_listInvoice);
          }
          if (responseSuccess(response)) {
            if (response?.data && response?.data.status === EStatusInvoiceAgency.WAITING_OPERATOR_VERIFY) {
              setDateDownTime(response?.data);
              setIsOpenOTP(true);
              setOtp('');
            }
          }
        } catch (error: any) {
          if (responseCode(error) === 'K002') {
            message.error(CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.msgOperatorNotPhone);
          }
        } finally {
          setIsLoadingTransfer(false);
        }
      }
    },
    [listInvoice]
  );

  const onSubmitOTP = async (otp: any) => {
    try {
      if (invoiceInfo) {
        if (!otp.length) {
          message.error(CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.msgVerifyOTPEmpty);
        } else if (otp.length === 6) {
          setLoadingSubmitOTP(true);
          const response = await apiOperatorVerifyOTP(Number(invoiceInfo.id), { otp: otp });
          if (responseSuccess(response)) {
            setIsOpenOTP(false);
            setOtp('');
            setInvoiceInfo({
              ...invoiceInfo,
              status: EStatusInvoiceAgency.WAITING_OPERATOR_VERIFIED,
            });
            if (listInvoice?.length) {
              let _listInvoice: IAgencyBasicOperatorInvoice[] = [];
              listInvoice.forEach((element) => {
                if (element.id === invoiceInfo.id) {
                  element.status = EStatusInvoiceAgency.WAITING_OPERATOR_VERIFIED;
                }
                _listInvoice.push(element);
              });
              setListInvoice(_listInvoice);
            }
            message.success(CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.msgVerifyOTPSccuess);
          } else {
            if (responseCode(response) === 'G001') {
              message.error(CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.msgVerifyOTPFalse);
            }
          }
        } else {
          message.error(CONST_OPERATOR_INVOICE.LIST_INVOICE_AGENCY_TABLE.msgVerifyOTPNotFull);
        }
      }
    } catch (error) {
    } finally {
      setLoadingSubmitOTP(false);
    }
  };

  return {
    navigate,
    BREADS,
    listInvoice,
    currentMonth,
    onChangeMonth,
    page,
    changePaging,
    isLoading,
    listInvoiceAllDetail,
    keyWord,
    onChangeKeyWord,
    onKeyDownKeyWord,
    refeshNumberPage,
    exportAllInvoicePDF,
    isLoadingExport,
    changeStatusInvoice,
    totalPayment,
    isOpenOTP,
    setIsOpenOTP,
    otp,
    setOtp,
    onSubmitOTP,
    isLoadingSubmitOTP,
    dateDownTime,
    onClickTransferAgency,
    invoiceInfo,
    isLoadingTransfer,
  };
};

export default useListInvoiceAgency;
