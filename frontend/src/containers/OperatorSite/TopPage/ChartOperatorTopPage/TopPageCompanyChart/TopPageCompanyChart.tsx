import React, { memo } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getDaysOfMonth } from 'helper/getAllDayOfMonth/getAllDayOfMonth';
import { Dayjs } from 'dayjs';
import { formatMoneyNumber } from 'helper/formatMoney';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartDataLabels
);

const TopPageCompanyChart = ({
  dataChartCurrent,
  fromCompany,
  isSelectedDate,
  month,
}: {
  dataChartCurrent: number[];
  fromCompany?: boolean;
  isSelectedDate?: boolean;
  month?: Dayjs;
}) => {
  const option: any = {
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        min: 0,
        ticks: {
          color: '#868686',
          font: {
            size: 14,
          },
        },
      },
      x: {
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        ticks: {
          color: '#868686',
          font: {
            size: isSelectedDate ? 13 : 16,
            weight: 'bold',
          },
        },
      },

      y1: {
        min: 0,
        type: 'linear',
        display: false,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
      },
      tooltip: {
        intersect: false,
        enabled: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#868686',
        padding: {
          bottom: -1,
        },
        font: {
          lineHeight: 0,
        },
        formatter: function (value: any) {
          return '' + formatMoneyNumber(value || '');
        },
      },
    },
  };

  const dataTest: number[] = dataChartCurrent;
  function findMax(arr: number[]) {
    return Math.max(...arr);
  }
  const max = findMax(dataTest);

  const fillColorTable = (element: any) => {
    if (element.index % 3 === 0) {
      return fromCompany ? '#FDAB29' : '#52B788';
    }
    if (element.index % 3 === 1) {
      return fromCompany ? '#FC9D08' : '#6FC59D';
    }
    if (element.index % 3 === 2) {
      return fromCompany ? '#FD9672' : '#BCF0D8';
    }
    return fromCompany ? '#FDAB29' : '#BCF0D8';
  };

  const labelYear = dataTest?.map((_, index) => {
    if (index < 9) return `0${index + 1}`;
    return index + 1;
  });

  const labelDays = month ? getDaysOfMonth(month) : [];
  const data: any = {
    labels: isSelectedDate ? labelDays : labelYear,
    datasets: [
      {
        type: 'line',
        label: '',
        borderColor: (element: any) => fillColorTable(element),
        backgroundColor: '#fff',
        yAxisID: 'y',
        borderWidth: 2,
        pointRadius: 7,
        fill: false,
        data: dataTest?.map((element) => {
          if (element) return element - max * 0.024;
          return null;
        }),
        datalabels: {
          display: false,
        },
      },
      {
        type: 'bar',
        label: '',
        backgroundColor: (element: any) => fillColorTable(element),
        data: dataTest,
        borderColor: (element: any) => fillColorTable(element),
        borderRadius: 40,
        width: 15,
        borderWidth: 2,
        barThickness: 17,
      },
    ],
  };

  return <Chart options={option} type="bar" data={data} />;
};

export default memo(TopPageCompanyChart);
