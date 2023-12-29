import React from 'react';
import images from '@assets/images-base';

import { Dayjs } from 'dayjs';
import { FORMAT_YEAR } from 'constants/constants';
import {
  DatePickerCustomWrapper,
  PreNextIconDate,
  ReStyleDatePicker,
  WrapperNextDate,
} from './datePickerTopCustomStyle';
import { FORMAT_MONTH } from 'constants/constants';

interface IDatePickerCustom {
  onChangeYear: (day: Dayjs | any) => void;
  year: Dayjs;
  selectedSwitchDate?: number;
}
const DatePickerTopCustom = ({ onChangeYear, year, selectedSwitchDate }: IDatePickerCustom) => {
  const format = selectedSwitchDate === 2 ? FORMAT_MONTH : FORMAT_YEAR;
  const onPrev = () => {
    if (selectedSwitchDate === 2) {
      onChangeYear(year.add(-1, 'month'));
    } else {
      onChangeYear(year.add(-1, 'year'));
    }
  };

  const onNext = () => {
    if (selectedSwitchDate === 2) {
      onChangeYear(year.add(+1, 'month'));
    } else {
      onChangeYear(year.add(+1, 'year'));
    }
  };

  return (
    <DatePickerCustomWrapper>
      <WrapperNextDate onClick={onPrev}>
        <PreNextIconDate src={images.companySite.preLeft} />
      </WrapperNextDate>
      <ReStyleDatePicker
        isMonth={selectedSwitchDate === 2}
        picker="year"
        value={year}
        allowClear={false}
        onChange={onChangeYear}
        format={format}
        suffixIcon={false}
      />
      <WrapperNextDate onClick={onNext}>
        <PreNextIconDate src={images.companySite.nextRight} />
      </WrapperNextDate>
    </DatePickerCustomWrapper>
  );
};
export default DatePickerTopCustom;
