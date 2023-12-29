import ButtonCustom from '@components/Button';
import { Col, Form, Input, Radio, Select } from 'antd';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
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
  justify-content: space-between;
`;

export const InviteStaffWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  div:first-child {
    /* font-family: 'Inder'; */
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.875rem;
    white-space: nowrap;
    margin-right: 1.313rem;
  }
  input {
    background: ${colors.white};
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    width: 20.438rem;
    margin-right: 0.75rem;
    height: 3.125rem;
    font-size: 1.5rem;
    line-height: 1.875rem;
    /* font-family: 'Inder'; */
    font-style: normal;
  }
  button {
    filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.25));
    background: ${colors.pairB2BBtnB2BSubmit};
    border-radius: 50%;
    color: ${colors.white} !important;
    font-style: normal;
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.375rem;
    min-height: 3.75rem;
    min-width: 3.75rem;
    height: 3.75rem;
    width: 3.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      -ms-transform: scale(1.02);
      -webkit-transform: scale(1.02);
      transform: scale(1.02);
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  div:nth-child(2) {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 2.688rem;
    color: #333333;
    margin-bottom: 0.375rem;
  }
`;

export const PrefixIcon = styled.img`
  cursor: pointer;
  width: 3.125rem;
  height: 3.125rem;
  margin-right: 0.625rem;
`;

export const DetailForm = styled(Form)<any>`
  width: 100%;
  padding: ${(props) => props?.padding || '2.5rem 11.25rem'};
`;

export const DetailFormItem = styled(Form.Item)<any>`
  width: ${(props) => props?.width || '100%'};
  .ant-form-item-row {
    width: 100%;
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
  }
`;

export const ColSalaryType = styled(Col)`
  position: relative;
  .required {
    margin: 0.25rem 0 0 3.125rem;
    /* font-family: 'Inder'; */
    font-style: normal;
    font-weight: 400;
    font-size: 1.375rem;
    line-height: 1.75rem;
    color: ${colors.pairB2BStatusColorCancel};
    position: absolute;
    top: calc(32px + 0.25rem);
  }
`;

export const DetailInput = styled(Input)<any>`
  margin: ${(props) => props?.margin || '1.875rem 3.125rem 0.625rem 3.125rem'};
  padding: ${(props) => props?.padding || '0.563rem 2.5rem'};
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

export const DivFormItem = styled.div`
  display: flex;
`;

export const DivUnit = styled.div`
  display: flex;
  align-items: flex-start;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  &:not(.formEdit) {
    margin-top: calc(32px + 1.5rem);
  }
  &.formEdit {
    margin-top: 0.625rem;
    padding-bottom: 24px;
    padding-left: 1rem;
  }
`;

export const BasicFormItem = styled(Form.Item)`
  .ant-form-item-label {
    label {
      /* font-family: 'M PLUS 1'; */
      font-style: normal;
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 1.813rem;
      color: #333333;
    }
  }
  .ant-form-item-control-input-content {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 400;
    font-size: 1.375rem;
    line-height: 2rem;
    color: #333333;
  }
  .ant-form-item-explain-error {
    font-size: 1.375rem;
  }
  &:not(.formEdit) {
    margin-bottom: 0px;
    width: 16.5rem;
    .ant-form-item-label {
      padding: 0rem 3.125rem;
      margin-top: 1rem;
    }
    .ant-form-item-explain-error {
      margin: 0 0 0 3.125rem;
      white-space: nowrap;
    }
  }
  &.formEdit {
    .ant-form-item-label {
      label {
        display: flex;
        align-items: flex-start;
        margin-top: 0.625rem;
      }
    }
    display: flex;
    .ant-form-item-label {
      text-align: start;
      margin-left: 3.125rem;
      width: 9.375rem;
      label {
        height: 100%;
      }
    }
    .ant-form-item-explain-error {
      margin: 0;
    }
  }
`;

export const BasicInput = styled(Input)`
  padding: 0.563rem 2.5rem;
  background: #ffffff;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1.563rem;
  height: 3.125rem;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 2rem;
  color: #333333;
  &:not(.formEdit) {
    margin: 0 0.125rem 0 3.125rem;
    width: 12.5rem;
  }
  &.formEdit {
    margin: 0 0.125rem 0 0.125rem;
    width: 19.438rem;
  }
  &:disabled {
    background: ${colors.grey};
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
    color: ${colors.white};
  }
`;

export const BtnWrapper = styled.div<any>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: ${(props) => props?.paddingBottom || '3.75rem'};
  padding-top: ${(props) => props?.paddingTop || '6.25rem'};
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
  left: 0.313rem;
  height: ${(props) => props?.height || '3.75rem'};
  width: ${(props) => props?.width || '3.75rem'};
  top: 0.188rem;
`;

export const TitleLabel = styled.div<any>`
  padding: ${(props) => props?.padding || '0rem 3.125rem'};
  margin-bottom: ${(props) => props?.marginBottom || '0.625rem'};
  border-bottom: 0.031rem solid #333333;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.188rem;
  color: ${colors.mainText};
`;

export const DetailRadioGroup = styled(Radio.Group)<any>`
  display: flex;
  margin: ${(props) => props?.margin || '1.875rem 3.125rem 0.625rem 3.125rem'};
  label:first-child {
    margin-right: 9.375rem;
  }
`;

export const DetailRadio = styled(Radio)<any>`
  display: flex;
  align-items: center;
  margin-left: ${(props) => props?.marginLeft || '0'};
  span {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 400;
    font-size: 1.375rem;
    line-height: 1rem;
    color: #333333;
  }
  .ant-radio .ant-radio-inner {
    width: 1.25rem;
    height: 1.25rem;
    border-color: ${getColorSite()} !important;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), inset 2px 2px 1px rgba(0, 0, 0, 0.25);
  }
  .ant-radio.ant-radio-checked .ant-radio-inner {
    border-width: 0.7rem !important;
  }
  .ant-radio.ant-radio-checked .ant-radio-inner::after {
    opacity: 0 !important;
  }
  pointer-events: ${(props) => (props.view ? 'none' : 'unset')};
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
      text-align: center;
    }
  }
  &&.ant-select-disabled .ant-select-selector {
    background: ${colors.grey};
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
    .ant-select-selection-item {
      color: ${colors.white};
    }
  }
`;

export const ModalContent = styled.div`
  /* font-family: 'Inder'; */
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 35px;
  color: ${colors.mainText};
  div:nth-child(1) {
    margin-bottom: 0.688rem;
    margin-top: 5rem;
  }
  div:nth-child(2) {
    margin-bottom: 1.875rem;
  }
  div:nth-child(3) {
    margin-bottom: 10.313rem;
  }
`;

export const NoticeRequired = styled.div`
  color: ${colors.pairB2BStatusColorCancel};
  font-weight: 500;
  font-size: 1rem;
  margin-left: 1.625rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  button:nth-child(1) {
    margin-right: 3.125rem;
    img {
      background-color: white;
      border-radius: 50%;
      padding: 0.125rem;
      cursor: pointer;
      width: 3.75rem;
      height: 3.75rem;
      margin-right: 0.938rem;
      position: absolute;
      left: 0.313rem;
      top: 0.188rem;
    }
  }
  button:nth-child(2) {
    margin-left: 3.125rem;
  }
`;

export const ContentAlert = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* font-family: 'Inder'; */
  font-style: normal;
  font-weight: 400;
  font-size: 1.875rem;
  line-height: 2.375rem;
  color: ${colors.mainText};
`;

export const ModalConfirmContent = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 20rem;
    span {
      /* font-family: 'Inder'; */
      font-style: normal;
      font-weight: 400;
    }
    span:nth-child(1),
    span:nth-child(2) {
      font-size: 1.75rem;
      line-height: 2.188rem;
      margin-bottom: 1rem;
    }
    span:nth-child(2) {
      margin-bottom: 4rem;
    }
    span:nth-child(3) {
      font-size: 1.5rem;
      line-height: 1.875rem;
      margin-bottom: 6.25rem;
    }
  }
  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      width: 12rem;
      height: 3rem;
      box-shadow: 0px 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.25rem;
      margin: 0rem 3rem;
      &:hover {
        transform: translateY(-0.07em);
      }
    }
    .delete {
      background: linear-gradient(270deg, #f65171 0%, #f65171 100%);
      color: ${colors.white};
      border: none;
      margin-right: 2.375rem;
    }
    .cancel {
      background: ${colors.white};
      color: ${colors.atomicTangerine};
      border: 0.063rem solid ${colors.atomicTangerine};
      margin-left: 2.375rem;
    }
    .success {
      background: ${colors.btnDefaultCompanySite};
      color: ${colors.white};
      border: none;
    }
  }
`;
