import ButtonCustom from '@components/CompanySite/common/Button';
import { Form, Input } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const DetailWrapper = styled.div`
  padding-top: 0.813rem;
  padding-left: 0.625rem;
  width: 100%;
`;

export const TitlePageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 0.063rem solid #333333;
  padding: 0 2.5rem 0.313rem 2.5rem;
  div:last-child {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 2.688rem;
    color: #333333;
  }
`;

export const PrefixIcon = styled.img`
  cursor: pointer;
  width: 3.125rem;
  height: 3.125rem;
  margin-right: 0.625rem;
`;

export const DetailForm = styled(Form)`
  width: 100%;
  padding: 2.5rem 11.25rem;
`;

export const DetailFormItem = styled(Form.Item)`
  .ant-form-item-label {
    padding: 0rem 3.125rem;
    border-bottom: 0.031rem solid #333333;
    label {
      /* font-family: 'M PLUS 1'; */
      font-style: normal;
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 2.188rem;
      color: #333333;
    }
  }
  .ant-form-item-explain-error {
    margin: 0rem 3.125rem 1.25rem 3.125rem;
    font-size: 1.375rem;
  }
`;

export const DetailInput = styled(Input)`
  margin: 1.875rem 3.125rem 0.625rem 3.125rem;
  padding: 0.563rem 2.5rem;
  background: #ffffff;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1.563rem;
  width: 25rem;
  height: 3.125rem;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  &:disabled {
    background: ${colors.grey};
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
    color: ${colors.white};
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 2rem;
`;

export const BtnCreateWrapper = styled(ButtonCustom)`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 4.25rem;
  width: 25rem;
  background: linear-gradient(270deg, #fd9672 0%, #ffb239 100%);
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  font-size: 1.625rem;
  color: ${colors.white};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BtnCancelWrapper = styled(ButtonCustom)`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 4.25rem;
  width: 25rem;
  background: ${colors.white};
  border: 0.063rem solid #fd9670 !important;
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25) !important;
  font-size: 1.625rem;
  color: ${colors.mainColorCompany} !important;
  border-radius: 2rem;
  :hover {
    color: ${colors.mainColorCompany} !important;
    border: 0.063rem solid #fd9670 !important;
    box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25) !important;
  }
  span:hover {
    color: ${colors.mainColorCompany} !important;
  }
`;

export const ItemIcon = styled.img<any>`
  position: absolute;
  left: ${(props) => props?.left || '0.313rem'};
  height: 3.75rem;
  width: 3.75rem;
  top: ${(props) => props?.top || '0.188rem'};
`;

export const NoticeRequireMust = styled.span`
  color: ${colors.pairB2BStatusColorCancel};
  font-weight: 500;
  font-size: 1rem;
  margin-left: 1.625rem;
`;
