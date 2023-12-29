import { Segmented } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const SwitchButtonWrapper = styled(Segmented)`
  width: 32.188rem;
  border: 1px solid #52b788;
  height: 3.125rem;
  margin-left: 2.688rem;
  border-radius: 1.563rem;
  display: flex;
  align-items: center;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  padding: 0;
  color: #52b788;
  user-select: none;
  /* background-color: ${colors.white}; */
  background: #52b788;
  .ant-segmented {
    padding: 0 !important;
  }
  .ant-segmented {
    :hover {
      color: #52b788;
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
      color: #52b788 !important;
    }
    border-radius: 0;
  }
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
  background: #52b788;
`;
