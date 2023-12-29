import { useEffect, useState, useMemo } from 'react';

import dayjs from 'dayjs';

import { ETotalTypeChart } from 'constants/constants';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiCompanyChartTopPage } from 'api/company';

interface IDataChart {
  month: string | number;
  total_request: number;
  total_salary: string | number;
}

const months: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const useChartComponent = () => {
  const [selected, setSelected] = useState<ETotalTypeChart.SALARY | ETotalTypeChart.REQUEST>(ETotalTypeChart.SALARY);
  const [year, setYear] = useState(dayjs());
  const [dataChartRaw, setDataChartRaw] = useState<IDataChart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDataChart = async () => {
    try {
      setIsLoading(true);
      const response = await apiCompanyChartTopPage({
        year: year.format('YYYY'),
      });
      if (responseSuccess(response)) {
        setDataChartRaw(
          months.map((element: number) => {
            const find = response?.data?.find(
              (elementFind: IDataChart) => dayjs(elementFind.month).month() + 1 === element
            );
            if (find) return find;
            return {
              month: element,
              total_request: 0,
              total_salary: 0,
            };
          })
        );
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const dataChartCurrent = useMemo(() => {
    return dataChartRaw.map((element: IDataChart) => {
      if (selected === ETotalTypeChart.SALARY) return Number(element.total_salary);
      return element.total_request;
    });
  }, [dataChartRaw, selected]);

  return { setSelected, dataChartCurrent, isLoading, selected, setYear, year };
};

export default useChartComponent;
