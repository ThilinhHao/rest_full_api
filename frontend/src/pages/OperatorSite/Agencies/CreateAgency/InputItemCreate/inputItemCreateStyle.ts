import { Input, Space } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const InputItemCreateWrapper = styled(Space)`
  .ant-form-item-explain-error {
    font-size: 0.8rem !important;
  }
  .ant-form-item {
    margin-bottom: 0.9rem;
  }
`;
export const CreateItemTailTxt = styled.div`
  margin-left: 1.25rem;
  font-size: 1.5rem;
  margin-top: -1.5rem;
`;

interface IInputEditItem {
  inputwidth?: number;
  distance?: string;
  ispostalcode?: string | boolean;
  alignright?: string | boolean;
}
export const InputCreateItemAgency = styled(Input)<IInputEditItem>`
  padding: 0.563rem 1.375rem 0.563rem 2.3rem;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1.563rem;
  width: ${(props) => `${props?.inputwidth || 18.75}rem`};
  height: 2.5rem;
  font-style: normal;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  font-weight: 500;
  font-family: 'Noto Sans JP', sans-serif !important;

  text-align: ${(props) => (props.alignright ? 'right' : 'unset')};
  &:disabled {
    color: ${colors.white} !important;
    background-color: ${colors.grey} !important;
  }
`;
