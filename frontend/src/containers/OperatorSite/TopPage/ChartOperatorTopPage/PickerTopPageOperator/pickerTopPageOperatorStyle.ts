import styled from 'styled-components';
import { DatePicker } from 'antd';
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
    box-shadow: none;
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
export const ReStyleDatePicker = styled(DatePicker) <any>`
  border: none;
  border-radius: 1.75rem;
  padding: 0.5rem;
  width: 14rem;
  text-align: center;
  height: 2.063rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  .ant-picker-suffix {
    margin: 0;
    width: 2rem;
  }
  input {
    font-size: 1.5rem !important;
    text-align: center;
    font-weight: 500 !important;
    font-family: 'Noto Sans JP', sans-serif !important;
  }
`;
