import ButtonCustom from '@components/CompanySite/common/Button';
import { Form, Select } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const DetailWrapper = styled.div<any>`
  padding-top: 0;
  padding-left: 0;
  width: 100%;
`;

export const TitlePageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  border-bottom: 0.063rem solid #333333;
  padding: 1rem 2.5rem 0.313rem 2.5rem;
  div {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 2.688rem;
    color: #333333;
    margin-right: 1.75rem;
  }
  span {
    margin-bottom: 0.313rem;
  }
`;

export const PrefixIcon = styled.img`
  background-color: ${colors.mainColorCompany};
  border-radius: 50%;
  padding: 0.25rem;
  cursor: pointer;
  width: 3.125rem;
  height: 3.125rem;
  margin-right: 0.625rem;
`;

export const DetailForm = styled(Form)`
  width: 100%;
  padding: 2.5rem 14.375rem;
`;

export const DetailFormItem = styled(Form.Item)`
  .ant-form-item-label {
    padding: 0rem 3.125rem;
    border-bottom: 0.031rem solid #333333;
    overflow: visible;
    label {
      height: 2rem;
      div {
        display: flex;
        align-items: flex-start;
        span {
          /* font-family: 'M PLUS 1'; */
          font-style: normal;
          font-weight: 500;
          font-size: 1.5rem;
          line-height: 2.188rem;
          color: #333333;
        }
        img {
          width: 1.875rem;
          height: 2rem;
        }
      }
    }
    .tooltip {
      div {
        display: block;
      }
    }
  }
  .ant-form-item-explain-error {
    margin: 0rem 3.125rem 1.25rem 3.125rem;
    font-size: 1.375rem;
  }
  .detailInput {
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
  }
  .detailInputConfirm {
    padding: 0;
    background: #ffffff;
    border: none;
    box-shadow: none;
    font-size: 1.5rem;
    line-height: 1.875rem;
  }
  .detailSelect {
    margin: 1.875rem 3.125rem 0.625rem 3.125rem;
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.875rem;
    color: #333333;
  }
`;

export const InstructUID = styled.div`
  margin-left: -1rem;
  font-family: 'Noto Sans JP', sans-serif;
`;
export const TitleLabel = styled.div<any>`
  padding: 0;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props?.marginBottom || '1.5rem'};
  padding: 0rem 3.125rem;
  border-bottom: 0.031rem solid ${colors.mainText};
  position: relative;
  .tooltip {
    display: none;
    z-index: 9;
  }
  img.iconInfo {
    z-index: 10;
    :hover {
      + .tooltip {
        display: flex;
      }
    }
  }
`;

export const DetailSelect = styled(Select)`
  margin: 1.875rem 3.125rem 0.625rem 3.125rem;
  width: 25rem !important;
  .ant-select-selector {
    padding: 0 !important;
    font-size: 1.375rem;
    background: #ffffff;
    box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25) !important;
    border-radius: 1.563rem;
    width: 25rem !important;
    height: 3.125rem !important;
    .ant-select-selection-item {
      padding: 0.563rem 2.5rem;
      height: 3.125rem;
      /* font-family: 'M PLUS 1'; */
      font-style: normal;
      font-weight: 400;
      font-size: 1.375rem;
      line-height: 2rem;
      color: #333333;
    }
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
  .square {
    position: absolute;
    left: 0.313rem;
    top: 0.188rem;
    height: 3.75rem;
    width: 3.75rem;
    border-radius: 3.75rem;
    border: 1px solid ${colors.white};
  }
`;

export const ItemIcon = styled.img`
  position: absolute;
  left: 0.313rem;
  height: 3.75rem;
  width: 3.75rem;
  top: 0.188rem;
`;

export const Icon = styled.img`
  height: ${(props) => (props?.width ? `${props?.width}rem` : '1.875rem')};
  width: ${(props) => (props?.height ? `${props?.height}rem` : '1.875rem')};
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  button:nth-child(1) {
    margin-right: 5.063rem;
  }
  button:nth-child(2) {
    margin-left: 5.063rem;
  }
`;

export const BankCodeWrapperCompany = styled.div<any>`
  /* visibility: ${(props) => (props?.isConfirmed ? 'hidden' : 'visible')}; */
  height: ${(props) => (props?.isConfirmed ? '0' : 'unset')};
  overflow: hidden;
  margin-top: 1rem;
  margin-left: 3rem;
`;
