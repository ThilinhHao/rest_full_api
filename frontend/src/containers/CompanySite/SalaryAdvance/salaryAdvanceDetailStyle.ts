import styled from 'styled-components';
import { colors } from 'constants/colorsBase';
import { Checkbox, Form, Input } from 'antd';
import { getColorSite } from 'helper/colorSite';
import { DetailWrapper } from '../BankSetting/BankSettingDetail/bankSettingDetailStyle';

export const TitleLabel = styled.div<any>`
  padding: 0;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props?.marginBottom || '1.5rem'};
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

export const Label = styled.div<any>`
  font-weight: 500;
  font-size: 1.5rem;
  color: ${colors.mainText};
  margin-right: 0.438rem;
`;

export const LabelRequired = styled.div<any>`
  font-weight: 500;
  font-size: 1.5rem;
  color: ${colors.mainText};
  margin-right: 0.625rem;
  ::after {
    content: '*';
    position: absolute;
    top: -0.5rem;
    color: red;
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

export const IconInfo = styled.img`
  width: 1.875rem;
  height: 1.875rem;
`;

export const RowFormItem = styled.div`
  display: flex;
`;

export const BasicFormItem = styled(Form.Item)`
  .ant-form-item-label {
    label {
      /* font-family: 'M PLUS 1'; */
      font-style: normal;
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 1.813rem;
      color: ${colors.mainText};
    }
  }
  .ant-form-item-control-input-content {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 400;
    font-size: 1.375rem;
    line-height: 2rem;
    color: ${colors.mainText};
  }
  .ant-form-item-explain-error {
    font-size: 1.375rem;
    white-space: pre-wrap;
  }
  margin-bottom: 0px;
  width: 12.5rem;
  .ant-form-item-explain-error {
    width: 18.75rem;
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
  color: ${colors.mainText};
  width: 12.5rem;
  &:disabled {
    background: ${colors.grey};
    box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.25);
    color: ${colors.white};
  }
`;

export const DivUnit = styled.div`
  display: flex;
  align-items: flex-start;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 2rem;
  color: ${colors.mainText};
  margin-top: calc(32px + 1.5rem);
  margin-left: 1rem;
`;

export const NoticeRequired = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 15.25rem;
  color: ${colors.crimson} !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
`;

export const ToolTipShow = styled.div<any>`
  position: absolute;
  left: ${(props) => props?.left || '6.875rem'};
  top: ${(props) => props?.top || '-7.5rem'};
  img {
    width: ${(props) => props?.width || '44.813rem'};
    height: ${(props) => props?.height || '8.75rem'};
  }
  .tooltip-text {
    position: absolute;
    left: 3.75rem;
    top: 1.25rem;
    div {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 300;
      font-size: 1rem;
      line-height: 1.05rem;
      color: #000000;
    }
  }
`;

export const ToolTipSevenShow = styled.div<any>`
  position: absolute;
  left: ${(props) => props?.left || '6.875rem'};
  top: ${(props) => props?.top || '-7.5rem'};
  img {
    width: ${(props) => props?.width || '44.813rem'};
    height: ${(props) => props?.height || '8.75rem'};
  }
  .tooltip-text {
    position: absolute;
    left: 3.75rem;
    top: 1.25rem;
    border-radius: 2rem;

    div {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 300;
      font-size: 1rem;
      line-height: 1.05rem;
      color: #000000;
    }
  }
`;

export const CheckboxRadio = styled(Checkbox)<any>`
  margin-left: 1rem;
  .ant-checkbox-inner {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: ${colors.white};
    border: 1px solid ${getColorSite()};
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25), inset 2px 2px 1px rgba(0, 0, 0, 0.25);
  }

  .ant-checkbox-checked:after {
    border: none;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background: ${getColorSite()};
    border: 1px solid ${getColorSite()};
    box-shadow: none;
    &:after {
      opacity: 0;
    }
  }
`;

export const DetailWrapperSalary = styled(DetailWrapper)`
  .ant-form-item-explain-error {
    font-size: 1rem !important;
    line-height: 1.2rem;
    margin-top: 0.2rem;
  }
`;
