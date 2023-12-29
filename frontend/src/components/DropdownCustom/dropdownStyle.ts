import styled from 'styled-components';
import { Select } from 'antd';
import { colors } from 'constants/colorsBase';

interface IIconDown {
  width?: number;
}
export const IconDown = styled.img<IIconDown>`
  width: ${(props) => `${props?.width || 0.875}rem`};
  height: auto;
  margin-top: 0.15rem;
  margin-right: 0.5rem;
`;
export const DropdownWrapper = styled(Select)<any>`
  width: ${(props) => props?.width || '18.75rem'} !important;
  height: ${(props) => props?.height || 'unset'} !important;
  padding-left: 0 !important;

  .ant-select-selector {
    display: flex;
    align-items: center;
    background: ${(props) => (props?.disabled ? colors.grey : 'unset')} !important;
    color: ${colors.mainText} !important;
    height: ${(props) => props?.height || '2.5rem'} !important;
    font-family: 'Noto Sans JP', sans-serif !important;
    border: none !important;
    .ant-select-selection-item {
      /* color: ${(props) => (props.disabled ? 'white' : 'unset')} !important; */
      padding-left: 0.8rem !important;
    }
    cursor: pointer;
    font-size: 1.375rem;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.15) !important;
    border-radius: 2.125rem;
    padding-left: 1rem !important;
    margin-right: 0;
    div:nth-child(1) {
      padding-left: 1rem !important;
      padding-right: 1.875rem !important;
      width: 100%;
      div:nth-child(1) {
        padding-left: 0;
      }
    }
  }
`;
