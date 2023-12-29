import React from 'react';

import Loading from '@components/Loading';
import originalMoment from 'moment';
import useRangePicker from './useRangePicker';

import { extendMoment } from 'moment-range';
import { formatMoneyNumber } from 'helper/formatMoney';
import {
  AdvancePaymentWrapper,
  DateRangePickerCustom,
  LoadingWrapperRangePicker,
  RangePickerComponentWrapper,
  TailAdvance,
  TitleAdvancePayment,
  ValueAdvance,
} from './rangePickerComponentStyle';

import 'moment/locale/ja';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { CONST_COMMON, CONST_TOP_PAGE_COMPANY } from 'constants/language';
const moment = extendMoment(originalMoment as any);

const RangePickerComponent = () => {
  const { value, setValue, totalRequest, isLoading } = useRangePicker();

  return (
    <RangePickerComponentWrapper>
      {isLoading && (
        <LoadingWrapperRangePicker>
          <Loading />
        </LoadingWrapperRangePicker>
      )}
      <DateRangePickerCustom
        value={value}
        onSelect={(e: any) => setValue(e)}
        locale={moment().locale()}
        singleDateRange={true}
      />
      <AdvancePaymentWrapper>
        <TitleAdvancePayment>{CONST_TOP_PAGE_COMPANY.NUMBER_ADVANCE_PAYMENT}</TitleAdvancePayment>
        <ValueAdvance>
          {totalRequest?.total_request || '000'} <TailAdvance>{CONST_TOP_PAGE_COMPANY.SUBJECT}</TailAdvance>
        </ValueAdvance>
      </AdvancePaymentWrapper>
      <AdvancePaymentWrapper>
        <TitleAdvancePayment>{CONST_TOP_PAGE_COMPANY.USAGE_AMOUNT}</TitleAdvancePayment>
        <ValueAdvance>
          {formatMoneyNumber(totalRequest?.total_salary) || '000'} <TailAdvance>{CONST_COMMON.YEN}</TailAdvance>
        </ValueAdvance>
      </AdvancePaymentWrapper>
    </RangePickerComponentWrapper>
  );
};

export default RangePickerComponent;
