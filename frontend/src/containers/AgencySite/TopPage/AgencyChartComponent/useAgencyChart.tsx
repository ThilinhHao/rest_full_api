/* eslint-disable react-hooks/exhaustive-deps */
import { apiGetChartTopPageAgency } from 'api/agency';
import { ETypeChartAgency } from 'constants/constants';
import dayjs, { Dayjs } from 'dayjs';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { useEffect, useMemo, useState } from 'react';

interface IDataAgencyChart {
  month: string;
  total_agency_tip: number;
  total_request: number;
  total_salary: number;
}

const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const useAgencyChart = (
  setIsLoadingChart: (isLoading: boolean) => void,
  year: Dayjs,
  setYear: (year: Dayjs) => void
) => {
  const [dataAgencyChartRaw, setDataAgencyChartRaw] = useState<IDataAgencyChart[]>([]);

  const [agencyTypeChart, setAgencyTypeChart] = useState<
    ETypeChartAgency.NUMBER_USES | ETypeChartAgency.USAGE_AMOUNT | ETypeChartAgency.BROKERAGE_FEE
  >(ETypeChartAgency.NUMBER_USES);

  const getAgencyDataChart = async () => {
    try {
      setIsLoadingChart(true);
      const response = await apiGetChartTopPageAgency({
        year: year.format('YYYY'),
      });
      if (responseSuccess(response)) {
        setDataAgencyChartRaw(
          months.map((element: number) => {
            const find = response?.data?.find(
              (elementFind: IDataAgencyChart) => dayjs(elementFind.month).month() + 1 === element
            );
            if (find) return find;
            return {
              month: element,
              total_agency_tip: 0,
              total_request: 0,
              total_salary: 0,
            };
          })
        );
      }
    } catch (error) {
    } finally {
      setIsLoadingChart(false);
    }
  };

  useEffect(() => {
    getAgencyDataChart();
  }, [year]);

  const dataChartCurrent = useMemo(() => {
    return dataAgencyChartRaw.map((element: IDataAgencyChart) => {
      if (agencyTypeChart === ETypeChartAgency.NUMBER_USES) return Number(element.total_request);
      if (agencyTypeChart === ETypeChartAgency.BROKERAGE_FEE) return Number(element.total_agency_tip);
      return element.total_salary;
    });
  }, [agencyTypeChart, dataAgencyChartRaw]);

  return { agencyTypeChart, setAgencyTypeChart, year, setYear, dataChartCurrent };
};

export default useAgencyChart;
