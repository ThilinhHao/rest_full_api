import { useEffect, useState } from 'react';

import {
  apiOperatorGetSalaryRequestDay,
  apiOperatorGetSalaryRequestMonth,
  apiOperatorGetSalarySuspend,
} from 'api/operator';

const useStatisticalTopPage = () => {
  const [statisticalData, setStatisticalData] = useState({
    totalDay: 0,
    totalMonth: 0,
    totalSuspend: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const responseDay = await apiOperatorGetSalaryRequestDay();
      const responseMonth = await apiOperatorGetSalaryRequestMonth();
      const responseSuspend = await apiOperatorGetSalarySuspend();

      setStatisticalData({
        totalDay: responseDay.data[0]?.total_request || 0,
        totalMonth: responseMonth.data.total_request,
        totalSuspend: responseSuspend.data.total,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return {
    statisticalData,
    isLoading,
  };
};

export default useStatisticalTopPage;
