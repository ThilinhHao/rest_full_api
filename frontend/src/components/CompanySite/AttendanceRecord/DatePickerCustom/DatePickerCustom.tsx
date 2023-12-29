import React from 'react';
import images from '@assets/images-base';

import { Dayjs } from 'dayjs';
import { IconCalendar } from '@components/Icon';
import { FORMAT_DATE, FORMAT_MONTH } from 'constants/constants';
import { DatePickerCustomWrapper, PreNextIconDate, ReStyleDatePicker, WrapperNextDate } from './datepickerCustomStyle';
import { CONST_OPERATOR_INVOICE } from 'constants/language';

interface IDatePickerCustom {
  onChangeMonth: (day: Dayjs | any) => void;
  month?: Dayjs;
  normalPicker?: boolean;
  isHasBtnChange?: boolean;
  allowClear?: boolean;
  placeholder?: string;
}
const DatePickerCustom = ({
  onChangeMonth,
  month,
  normalPicker,
  isHasBtnChange = true,
  allowClear = true,
  placeholder = CONST_OPERATOR_INVOICE.PLACEHOLDER_CHOOSE_MONTH,
}: IDatePickerCustom) => {
  const currentPicker = !normalPicker ? 'month' : 'date';
  const currentChange = !normalPicker ? 'month' : 'day';
  const isInput = !isHasBtnChange;

  return (
    <DatePickerCustomWrapper>
      {isHasBtnChange && (
        <WrapperNextDate onClick={() => onChangeMonth(month?.add(-1, currentChange))}>
          <PreNextIconDate src={images.companySite.preLeft} />
        </WrapperNextDate>
      )}
      <ReStyleDatePicker
        picker={currentPicker}
        value={month}
        allowClear={allowClear}
        onChange={onChangeMonth}
        format={!normalPicker ? FORMAT_MONTH : FORMAT_DATE}
        suffixIcon={<IconCalendar date={Number(month?.format('MM') || 1)} />}
        isInput={isInput}
        placeholder={placeholder}
      />
      {isHasBtnChange && (
        <WrapperNextDate onClick={() => onChangeMonth(month?.add(+1, currentChange))}>
          <PreNextIconDate src={images.companySite.nextRight} />
        </WrapperNextDate>
      )}
    </DatePickerCustomWrapper>
  );
};
export default DatePickerCustom;
