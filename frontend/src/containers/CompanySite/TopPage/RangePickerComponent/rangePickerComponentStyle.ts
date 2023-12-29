import images from '@assets/images-base';
import DateRangePicker from 'react-daterange-picker';
import styled from 'styled-components';

export const RangePickerComponentWrapper = styled.div`
  font-size: 0.875rem;
  width: 74.063rem;
  height: 24.063rem;
  background-color: white;
  border-radius: 0.625rem;
  box-shadow: 0.188rem 0.188rem 0.313rem rgba(0, 0, 0, 0.25);
  padding: 1.25rem 3.125rem;
  display: flex;
  position: relative;
`;
export const LoadingWrapperRangePicker = styled.div`
  width: 74.063rem;
  height: 24.063rem;
  background-color: rgb(255, 255, 255, 0.5);
  margin-top: -1.2rem;
  margin-left: -3.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 0.625rem;
  z-index: 2;
`;
export const AdvancePaymentWrapper = styled.div`
  margin-top: 6.75rem;
  margin-left: 5.625rem;
`;
export const TitleAdvancePayment = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  white-space: nowrap;
`;
export const ValueAdvance = styled.div`
  font-size: 3.125rem;
  margin-top: 1rem;
  font-weight: 400;
  color: #fdab29;
  display: flex;
  align-items: center;
`;
export const TailAdvance = styled.div`
  font-size: 1.875rem;
  font-weight: 400;
  margin-left: 1rem;
  margin-top: 0.8rem;
`;
export const DateRangePickerCustom = styled(DateRangePicker)`
  background-color: #fdab29;
  border-radius: 0.625rem;
  width: 27.5rem;
  height: 21.313rem;
  padding-bottom: 1.25rem;
  padding-top: 1rem;
  box-shadow: -0.125rem 0px 0.438rem rgba(0, 0, 0, 0.25), 0.188rem 0.188rem 0.375rem rgba(0, 0, 0, 0.25);
  .DateRangePicker__MonthHeader {
    line-height: 0;
    height: 1.875rem;
    /* letter-spacing: 0.25rem; */
  }
  .DateRangePicker__MonthHeaderLabel {
    line-height: 0;
    font-weight: 500;
  }
  [class^='ant-layout'] {
    font-size: 0 !important;
  }
  .DateRangePicker__WeekdayHeading {
    border-bottom: 0.125rem solid #ffffff;
    border-top: 0.125rem solid #ffffff;
    margin-bottom: 0.313rem;
    padding: 1rem 0;
    line-height: 0;
    font-weight: 500;
    abbr {
      color: white !important;
      font-size: 1.25rem;
    }
  }
  .DateRangePicker__MonthHeader {
    color: white !important;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    select{
      display: none;
    }
    span {
      margin-right: 1rem;
      margin-left: 1rem;
    }
    span:first-child:after {
      content: '年';
      display: flex;
      margin-left: -2rem;
    }
  }

  .DateRangePicker__PaginationArrow:hover {
    background-color: transparent !important;
  }
  .DateRangePicker__Date--today {
    .DateRangePicker__DateLabel {
      background-color: #fd9672;
      box-shadow: inset 0.125rem 0.125rem 0px rgba(0, 0, 0, 0.25);
      border: 1px solid #ffffff;
      color: white;
    }
  }
  .DateRangePicker__PaginationArrow--next {
    right: 8rem;
    top: 0.8rem;
    div {
      visibility: hidden;
    }
    background-image: url(${images.common.timeNext});
    border-radius: 1.25rem;
    background-size: cover;
    border: none;
    width: 1.313rem;
    height: 1.25rem;
    :hover {
      background-color: none;
    }
    box-shadow: 0.125rem 0.125rem 0px rgba(0, 0, 0, 0.25);
    :active {
      box-shadow: none;
    }
  }
  .DateRangePicker__PaginationArrow--previous {
    left: 8rem;
    top: 0.8rem;
    div {
      visibility: hidden;
    }
    background-image: url(${images.common.timePre});
    border-radius: 1.25rem;
    background-size: cover;
    border: none;
    width: 1.313rem;
    height: 1.25rem;
    :hover {
      background-color: none;
    }
    box-shadow: 0.125rem 0.125rem 0px rgba(0, 0, 0, 0.25);
    :active {
      box-shadow: none;
    }
  }
  .DateRangePicker__Weekdays {
    margin-bottom: 0.313rem;
  }
  .DateRangePicker__Date--weekend {
    background-color: #fdab29;
  }

  .DateRangePicker__Month {
    width: 25.375rem;
    margin: 0 1.25rem;
  }
  .DateRangePicker__Date {
    border: none;
    padding: 0.25rem 0;
    width: 2.5rem;
    span {
      margin-top: 0.1rem;
    }
  }
  .DateRangePicker__MonthDates {
    border-bottom: none;
  }
  .DateRangePicker__FullDateStates {
  }
  .DateRangePicker__CalendarSelection {
    height: 2.313rem;
    margin-top: -0.15rem;
    background-color: #ffe5bb;
    top: 0.313rem;

    border: none;
  }
  .DateRangePicker__CalendarSelection--end {
    border-bottom-right-radius: 1.25rem;
    border-left-width: 0;
    border-top-right-radius: 1.25rem;
    right: 0px;
    top: 0.313rem;
  }
  .DateRangePicker__CalendarSelection--start {
    border-bottom-left-radius: 1.25rem;
    border-right-width: 0;
    border-top-left-radius: 1.25rem;
    left: 0;
    top: 0.313rem;
  }
  .DateRangePicker__DateLabel {
    width: 1.875rem;
    height: 1.875rem;
    background-color: white;
    margin-left: 0.938rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 500;
    border-radius: 0.938rem;
    color: #fdab29;
    box-shadow: 0.125rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25);
  }
  .DateRangePicker__CalendarHighlight--single {
    background-color: white;
    opacity: 0.5;
    border: none;
    border-radius: 1.25rem;
    right: 0.313rem;
    height: 2.313rem;
    width: 3.563rem;
    left: 0px;
    top: 0.15rem;
  }
`;
