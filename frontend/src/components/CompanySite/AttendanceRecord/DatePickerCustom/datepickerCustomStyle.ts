import styled from 'styled-components';
import { DatePicker } from 'antd';
import { FORMAT_MONTH } from 'constants/constants';
import { getColorSite, getColorSiteHover } from 'helper/colorSite';

export const WrapperNextDate = styled.div`
  user-select: none;
  background-color: ${getColorSite()};
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  margin: 0 0.8rem;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.161);
  :hover {
    background-color: ${getColorSiteHover()};
  }
  :active {
    box-shadow: inset 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;
export const DatePickerCustomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;
export const PreNextIconDate = styled.img`
  width: 0.875rem;
  height: 0.875rem;
  margin-left: 0.1rem;
`;
export const IconDatePicker = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
`;
export const ReStyleDatePicker = styled(DatePicker)<any>`
  border: none;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => (props?.isInput ? '0.625rem' : '1.75rem')};
  width: ${(props) => (props?.isInput ? '20.625rem' : props?.format === FORMAT_MONTH ? '13.813rem' : '17.813rem')};
  height: ${(props) => (props?.isInput ? '3.125rem' : '2.063rem')};
  padding-right: 0.7rem;
  .ant-picker-input {
  }
  .ant-picker-suffix {
    margin: 0;
    width: 2rem;
  }
  .ant-picker-clear {
    inset-inline-end: 2.25rem !important;
  }
  input {
    font-size: ${(props) => (props?.isInput ? '1.125rem' : '1.5rem')} !important;
    font-weight: ${(props) => (props?.isInput ? '500' : '600')} !important;
    font-family: 'Noto Sans JP', sans-serif !important;
    margin-bottom: ${(props) => !props?.value && !props?.isInput && '0.5rem !important'};
    ::-webkit-input-placeholder {
      font-size: 1rem;
    }
    :-ms-input-placeholder {
      font-size: 1rem;
    }
    ::placeholder {
      font-size: 1rem;
    }
  }
`;
