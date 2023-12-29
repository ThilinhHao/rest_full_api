import { Segmented } from 'antd';
import styled from 'styled-components';

export const SwitchButtonWrapper = styled(Segmented)`
  width: 18.75rem;
  border: 1px solid #fdab29;
  height: 3.125rem;
  border-radius: 1.563rem;
  display: flex;
  align-items: center;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  padding: 0;
  color: #fdab29;

  background: linear-gradient(270deg, #fd9670 0.49%, #ffb239 99.51%);
  .ant-segmented {
    padding: 0 !important;
  }
  .ant-segmented {
    :hover {
      color: #fdab29;
    }
  }
  .ant-segmented-item-label {
    height: 3.125rem !important;
    display: flex;
    align-items: center !important;
    justify-content: center;
    font-size: 1.375rem;
    font-weight: 500;
    color: white;
  }

  .ant-segmented-item-selected {
    cursor: default;
    background: white !important;
    .ant-segmented-item-label {
      color: #fdab29 !important;
    }
    border-radius: 0;
  }
  /* ant-segmented-thumb-motion-appear ant-segmented-thumb-motion-appear-start ant-segmented-thumb-motion  */
  .ant-segmented-thumb {
    background: white;
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
