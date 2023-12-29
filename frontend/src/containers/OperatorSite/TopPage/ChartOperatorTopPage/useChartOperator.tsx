import { useState, useEffect, useMemo } from 'react';

import dayjs from 'dayjs';

import { getDaysOfMonth } from 'helper/getAllDayOfMonth/getAllDayOfMonth';
import { apiOperatorGetChartDateMonth, apiOperatorGetChartMonYear } from 'api/operator';

interface IDataChart {
  month: string | number;
  total_request: number;
  total_salary: string | number;
  date?: string;
}
const months: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const useChartOperator = () => {
  const [year, setYear] = useState(dayjs());

  const [selected, setSelected] = useState(1);
  const [selectedSwitchDate, setSelectedSwitchDate] = useState<number>(1);

  const [dataChartOperatorRaw, setDataChartOperatorRaw] = useState<IDataChart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDataChartMonthYear = async () => {
    try {
      setIsLoading(true);
      const response = await apiOperatorGetChartMonYear({
        year: year.format('YYYY'),
      });
      setDataChartOperatorRaw(
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
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const getDataChartDayMonth = async () => {
    try {
      setIsLoading(true);
      const response = await apiOperatorGetChartDateMonth({
        month: year.format('YYYY-MM'),
      });
      const arrDay = getDaysOfMonth(year);
      setDataChartOperatorRaw(
        arrDay.map((element: string) => {
          const find = response?.data?.find((elementFind: IDataChart) => {
            return Number(elementFind?.date?.split('-')[2]) === Number(element);
          });
          if (find) {
            return find;
          }
          return {
            month: element,
            total_request: 0,
            total_salary: 0,
          };
        })
      );
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (selectedSwitchDate === 1) {
      getDataChartMonthYear();
    } else {
      getDataChartDayMonth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, selectedSwitchDate]);
  const dataChartOperatorCurrent = useMemo(() => {
    return dataChartOperatorRaw.map((element: IDataChart) => {
      if (selected === 1) return Number(element.total_salary);
      return element.total_request;
    });
  }, [dataChartOperatorRaw, selected]);

  return {
    selected,
    setSelected,
    selectedSwitchDate,
    setSelectedSwitchDate,
    dataChartOperatorCurrent,
    year,
    setYear,
    isLoading,
  };
};

export default useChartOperator;
