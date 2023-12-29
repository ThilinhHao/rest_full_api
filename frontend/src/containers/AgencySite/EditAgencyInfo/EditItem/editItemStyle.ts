import { Input, Space } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

interface IInputEditItem {
  inputwidth?: number;
  distance?: string;
  ispostalcode?: string | boolean;
}
export const EditItemWrapper = styled(Space)<IInputEditItem>`
  margin: ${(props) => props?.distance || '1.875rem 3.25rem 0.5rem 3.25rem'};
  display: flex;
  flex-direction: column;
  align-items: start;
  .ant-form-item-explain-error {
    position: ${(props) => (props?.ispostalcode ? 'absolute' : 'unset')};
    font-size: 0.8rem;
    width: ${(props) => (props?.ispostalcode ? '8rem' : 'unset')};
    white-space: nowrap;
  }
`;
export const LabelEditItem = styled.div`
  font-size: 1.5rem;
`;

export const InputEditItem = styled(Input)<IInputEditItem>`
  padding: 0.563rem 2.2rem;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1.563rem;
  width: ${(props) => `${props?.inputwidth || 25}rem`};
  height: 3.125rem;
  font-style: normal;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  font-weight: 500;
  font-family: 'Noto Sans JP', sans-serif !important;
  &:disabled {
    color: ${colors.white} !important;
    background-color: ${colors.grey} !important;
  }
`;
export const InputTailTxt = styled.span`
  margin-left: 1.25rem;
  font-size: 1.5rem;
  margin-top: 0.3rem;
`;
export const RowItemInput = styled.div`
  display: flex;
`;
