import React from 'react';
import images from '@assets/images-base';

import { Dayjs } from 'dayjs';
import { FORMAT_YEAR } from 'constants/constants';
import {
  DatePickerCustomWrapper,
  PreNextIconDate,
  ReStyleDatePicker,
  WrapperNextDate,
} from './pickerTopPageOperatorStyle';
import { FORMAT_MONTH } from 'constants/constants';
import { IconCalendar } from '@components/Icon';

interface IDatePickerCustom {
  onChangeYear: (day: Dayjs | any) => void;
  year: Dayjs;
  selectedSwitchDate?: number;
}
const SELECT_MONTH_FORMAT = 2;

const PickerTopPageOperator = ({ onChangeYear, year, selectedSwitchDate }: IDatePickerCustom) => {
  const format = selectedSwitchDate === SELECT_MONTH_FORMAT ? FORMAT_MONTH : FORMAT_YEAR;
  const onPrev = () => {
    if (selectedSwitchDate === SELECT_MONTH_FORMAT) {
      onChangeYear(year.add(-1, 'month'));
    } else {
      onChangeYear(year.add(-1, 'year'));
    }
  };

  const onNext = () => {
    if (selectedSwitchDate === SELECT_MONTH_FORMAT) {
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
        isMonth={selectedSwitchDate === SELECT_MONTH_FORMAT}
        picker={selectedSwitchDate === SELECT_MONTH_FORMAT ? 'month' : 'year'}
        value={year}
        allowClear={false}
        onChange={onChangeYear}
        format={format}
        suffixIcon={
          <IconCalendar date={selectedSwitchDate === SELECT_MONTH_FORMAT ? Number(year?.format('MM') || 1) : 1} />
        }
      />
      <WrapperNextDate onClick={onNext}>
        <PreNextIconDate src={images.companySite.nextRight} />
      </WrapperNextDate>
    </DatePickerCustomWrapper>
  );
};
export default PickerTopPageOperator;
