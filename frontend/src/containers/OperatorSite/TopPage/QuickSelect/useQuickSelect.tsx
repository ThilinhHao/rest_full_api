import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';
import { apiInvoiceAgencyTotalUnprocessed, apiUnprocessedOperator } from 'api/operator';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

const useQuickSelect = () => {
  const navigate = useNavigate();
  const [totalUnprocessed, seTotalUnprocessed] = useState<number>(0);
  const [totalInvoiceAgencyUnprocessed, setTotalInvoiceAgencyUnprocessed] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authInfo = useAppSelector((state) => state.auth.authInfo);

  const toChart = () => {
    navigate('/chat');
  };
  const toInvoiceCompany = () => {
    navigate('/company-invoices');
  };
  const toInvoiceAgency = () => {
    navigate('/agency-invoices');
  };
  const toListCompany = () => {
    navigate('/company');
  };

  const getUnprocessed = async () => {
    try {
      setIsLoading(true);
      const response = await apiUnprocessedOperator();
      seTotalUnprocessed(response.data.total);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getInvoiceAgencyUnprocessed = async () => {
    try {
      setIsLoading(true);
      const response = await apiInvoiceAgencyTotalUnprocessed();
      setTotalInvoiceAgencyUnprocessed(response.data.total);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUnprocessed();
    getInvoiceAgencyUnprocessed();
  }, []);
  return {
    totalUnprocessed,
    totalInvoiceAgencyUnprocessed,
    isLoading,
    toChart,
    toInvoiceCompany,
    toInvoiceAgency,
    toListCompany,
    authInfo,
  };
};

export default useQuickSelect;
