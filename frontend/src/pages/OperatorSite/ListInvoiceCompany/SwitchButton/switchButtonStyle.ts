import { Segmented } from 'antd';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const SwitchButtonWrapper = styled(Segmented)`
  display: flex;
  height: 3.125rem;
  width: 18.75rem;
  position: absolute;
  left: 3.125rem;
  border: 1px solid ${getColorSite()};
  border-radius: 1.563rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0;
  background: ${getColorSite()};
  .ant-segmented {
    padding: 0 !important;
  }
  .ant-segmented-item:nth-child(1) {
    border-radius: 0 !important;
    border-top-left-radius: 2rem !important;
    border-bottom-left-radius: 2rem !important;
  }
  .ant-segmented-item:nth-child(2) {
    border-radius: 0 !important;
    border-top-right-radius: 2rem !important;
    border-bottom-right-radius: 2rem !important;
  }
  .ant-segmented-item-label {
    height: 3.125rem !important;
    display: flex;
    align-items: center !important;
    justify-content: center;
    font-size: 1.375rem;
    font-weight: 500;
  }
  .ant-segmented-item-selected {
    background: ${colors.white};
    cursor: default !important;
    box-shadow: inset 0.125rem 0.188rem 0.125rem rgba(0, 0, 0, 0.25);
    .ant-segmented-item-label {
      color: ${getColorSite()} !important;
    }
  }
  /* ant-segmented-thumb-motion-appear ant-segmented-thumb-motion-appear-start ant-segmented-thumb-motion  */
  .ant-segmented-thumb {
    background: ${colors.white};
  }
  .ant-segmented-item-label {
    color: ${colors.white} !important;
  }
`;

interface ISelectedItem {
  isSelected: boolean;
}
export const SelectItem = styled.div<ISelectedItem>`
  cursor: pointer;
  width: 50%;
  text-align: center;
  font-size: 1.375rem;
  font-weight: 500;
  background: linear-gradient(270deg, #fd9670 0.49%, #ffb239 98.06%);
`;
