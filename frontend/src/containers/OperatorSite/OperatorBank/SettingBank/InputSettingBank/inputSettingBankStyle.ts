import { Form, Input } from 'antd';
import styled from 'styled-components';

export const InputSettingBankWrapper = styled.div`
  margin-left: 13rem;
  padding: 1.375rem 6.5rem 0rem 3.5rem;
  font-size: 1.375rem;
`;
interface IBankInputStyle {
  innitWidth?: number;
}
export const BankInputStyle = styled(Input)<IBankInputStyle>`
  padding: 0.563rem 1.5rem;
  background: #ffffff;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25) !important;
  border-radius: 1.563rem;
  width: ${(props) => `${props?.innitWidth || 25}rem`};
  height: 3.125rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  margin-top: 1.25rem;
`;
export const TitleLabelLine = styled.div`
  width: 59.25rem;
  border-bottom: 1px solid rgb(51, 51, 51, 0.5);
  padding-left: 3.125rem;
  padding-bottom: 0.375rem;
  font-weight: 500;
  line-height: 1.5rem;
  font-size: 1.375rem;
  display: flex;
  .require-span {
    margin-top: -0.2rem !important;
  }
`;
export const TitleLabel = styled.div`
  width: 59.25rem;
  padding-left: 3.125rem;
  font-weight: 400;
  font-size: 1.375rem;
`;
export const WrapperInputBank = styled(Form.Item)`
  margin-left: 3rem;
  margin-bottom: 1rem !important;
  .ant-form-item-explain-error {
    position: absolute;
    font-size: 0.8rem;
  }
`;
