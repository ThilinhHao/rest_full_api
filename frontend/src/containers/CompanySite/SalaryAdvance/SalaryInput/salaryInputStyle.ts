import { Input } from 'antd';
import styled from 'styled-components';

export const SalaryInputWrapper = styled.div``;

interface ISalaryInputStyle {
  isError?: boolean;
}
export const SalaryInputStyle = styled(Input)<ISalaryInputStyle>`
  padding: 0.563rem 1.5rem;
  background: #ffffff;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1.563rem;
  width: 12.5rem;
  height: 3.125rem;
  font-family: 'M PLUS 1' !important;
  font-style: normal;
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  border: ${(props) => props?.isError && '1px solid tomato !important'};
`;
export const LabelSalaryInput = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;
export const YenTxt = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  margin-left: 1rem;
`;
export const Square = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.625rem;
  background: #ffffff;
  border: 1px solid #fdab29;
  margin-left: 0.625rem;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(0, 0, 0, 0.25);
`;
