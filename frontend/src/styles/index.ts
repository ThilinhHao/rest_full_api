import { DatePicker } from 'antd';
import configs from 'config';
import { colors } from 'constants/colorsBase';
import { getFullHostName } from 'helper';
import styled, { createGlobalStyle } from 'styled-components';

interface ISpace {
  width?: number;
  height?: number;
}
export const DEVICE_DEFAULT_WIDTH = 1366;
const context = 1639; // defalt context 16

export const StyleGlobal = createGlobalStyle<any>`
  html,
  body, html {
    font-size: ${`${DEVICE_DEFAULT_WIDTH / context}vw`} ;
    color: ${colors.dune};
    margin: 0;
    font-weight: 400;
    font-family:'Noto Sans JP', sans-serif !important;
    div {
      box-sizing: border-box;
    }
    .resize-name {
      font-size: 1.375rem;
    }
    .ant-popover-placement-bottomRight{
      .ant-popover-arrow{
        display:none !important;
      }
      .ant-popconfirm-message-title{
        margin:0
      }
      .ant-popconfirm-buttons{
        display:none !important;
      }
      .ant-popconfirm-message-icon {
        display:none !important;
      }
    }
    .ant-select-item { 
      font-family:'Noto Sans JP', sans-serif !important;
      font-size:  1.25rem;
      .ant-select-item-option-content {
        font-size: 1.25rem;
        font-weight: 400 !important;
      }
    }
    .ant-modal {
      width: fit-content !important;
      top: 2rem;
    }
    .hiddenCancelDeletePopup {
      .ant-btn-default{
        background:${colors.mainColor} !important;
      }
      .ant-btn-primary{
        display:none !important;
      }
    }
    .delete-modal {
      font-family: 'Inter' !important;
      .ant-modal-body {
        padding: 3rem 1.875rem !important;
      }
      .ant-modal-confirm-content {
        margin-inline-start: 1rem !important;
        max-width: 100% !important;
      }
      .ant-modal-confirm-btns {
        width: 40rem !important;
        justify-content: center !important;
        margin: auto;
      }
      .ant-btn-primary {
        background-color: #C74646;
        margin:0 4rem; 
        width: 9.125rem !important;
        border-radius: 0.625rem !important;
        font-weight:700 !important;
        font-size: 1.625rem !important;
        height: 3.125rem;
        :hover{
          background-color: #C74646;
        }
      }
      .ant-btn-default {
        background-color: ${colors.mainColor};
        margin:0 4rem;
        width:9.125rem !important;
        border: none;
        color: white;
        border-radius: 0.625rem !important;
        font-weight:700 !important;
        font-size: 1.625rem !important;
        height: 3.125rem;
        :hover{
          color: #ffff;
        }
      }
    }
    .ant-tooltip-arrow::before {
      background:${getFullHostName() === configs.APP_FRONTEND_COMPANY ? '#fdab29' : 'unset'}  !important;
    }
  }

  iframe:first-of-type {
    display: none;
  }
`;

export const SpaceBase = styled.div<ISpace>`
  width: ${(props) => `${props?.width || 0}rem`};
  height: ${(props) => `${props?.height || 0}rem`};
`;
export const CardBase = styled.div<ISpace>`
  max-width: ${(props) => (props?.width ? `${props?.width}rem` : '83.75rem')};
  height: ${(props) => (props?.height ? `${props?.height}rem` : 'calc(100vh - 9rem)')};
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: ${colors.white};
  overflow: auto;
`;

interface ICardItem {
  lineBottom?: boolean;
  paddingHoz?: string;
}
export const CardItem = styled.div<ICardItem>`
  display: flex;
  padding: ${(props) => props?.paddingHoz || '0.938rem 0'};
  border-bottom: ${(props) => props?.lineBottom && `1px solid ${colors.iron}`};
  font-size: 1.25rem;
  div:nth-child(1) {
    width: 16rem;
    height: 2.5rem;
    padding-left: 4.375rem;
    display: flex;
    align-items: center;
  }
`;

interface IContainerBox {
  padding?: string;
}
export const ContainerBox = styled.div<IContainerBox>`
  padding: ${(props) => props?.padding || 'unset'};
`;

export const RowCenter = styled.div`
  display: flex;
  align-items: center;
`;

interface ITextSize {
  size?: number;
}
export const TextSize = styled.div<ITextSize>`
  font-size: ${(props) => `${props?.size || 1}rem`};
`;

export const DatePickerCustom = styled(DatePicker)`
  padding: 0.563rem 1.5rem;
  background: #ffffff;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1.563rem;
  width: 12.5rem;
  height: 3.125rem;
  font-family: 'M PLUS 1' !important;
  font-style: normal;
  font-weight: 500;
  input {
    font-size: 1.2rem !important;
  }
  font-size: 1.2rem !important;
  line-height: 2rem;
  color: #333333;
`;
export const Require = styled.span`
  color: #f65171 !important;
  margin: 0.5rem 0.313rem 0 0.313rem !important;
`;
export const RequireOperator = styled.span`
  color: #f65171 !important;
  /* margin: 0.5rem 0.313rem 0 0.313rem !important; */
`;
