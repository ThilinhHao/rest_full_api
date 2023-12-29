import { Input } from 'antd';
import styled from 'styled-components';

export const UsagePlanPricingItemWrapper = styled.div`
  width: 28.125rem;
  .ant-form-item-explain-error {
    position: absolute;
    font-size: 0.8rem;
    white-space: nowrap;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .ant-select-selection-item {
    font-size: 1.375rem;
  }
  input {
    font-weight: 500;
    font-family: 'Noto Sans JP', sans-serif !important;
    font-size: 1.375rem;

  }
`;
export const TitleItemPlan = styled.div`
  font-weight: 500;
`;

interface IBankInputStyle {
  isError?: boolean;
}
export const BankInputStyle = styled(Input)<IBankInputStyle>`
  padding: 0.563rem 1.5rem;
  background: #ffffff;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1.563rem;
  width: 10.313rem;
  height: 3.125rem;
  font-family: 'M PLUS 1' !important;
  font-style: normal;
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  font-weight: 500;
  border: ${(props) => props?.isError && '1px solid tomato !important'};
  text-align: right;
`;
