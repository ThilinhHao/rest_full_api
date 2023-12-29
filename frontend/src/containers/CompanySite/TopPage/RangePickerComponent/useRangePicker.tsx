import { useState, useEffect } from 'react';
import originalMoment from 'moment';

import { extendMoment } from 'moment-range';
import { apiCompanyCalendarTopPage } from 'api/company';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
const moment: any = extendMoment(originalMoment as any);

interface ITotalRequest {
  total_salary: number;
  total_request: number;
}
const useRangePicker = () => {
  const [value, setValue] = useState<any>(
    moment.range(moment().startOf('month').clone(), moment().clone())
  );
  const [totalRequest, setTotalRequest] = useState<ITotalRequest | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDataFromDate = async () => {
    try {
      setIsLoading(true);
      const response = await apiCompanyCalendarTopPage({
        date_start: moment(value.start).format('YYYY-MM-DD'),
        date_end: moment(value.end).format('YYYY-MM-DD'),
      });
      if (responseSuccess(response)) {
        setTotalRequest(response.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { value, setValue, totalRequest, isLoading };
};

export default useRangePicker;
