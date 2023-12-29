import { Segmented } from 'antd';
import styled from 'styled-components';

export const SwitchButtonWrapper = styled(Segmented)`
  width: 18.75rem;
  border: 1px solid #52b788;
  height: 3.125rem;
  border-radius: 1.563rem;
  display: flex;
  align-items: center;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  padding: 0;
  color: #52b788;

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

export const SwitchDateButtonWrapper = styled(SwitchButtonWrapper)<any>`
  width: 12rem;
  .ant-segmented-item-label {
    box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.25) !important;
    height: 3.125rem;
  }
  .ant-segmented-group > label:nth-child(1) > .ant-segmented-item-label {
    border-top-left-radius: 4rem;
    border-bottom-left-radius: 4rem;
  }
  /* .ant-segmented-item-label:nth-child(1) {
    border-top-left-radius: ${(props) => (props?.isLeft ? '4rem' : 'unset')};
    border-bottom-left-radius: ${(props) => (props?.isLeft ? '4rem' : 'unset')};
  } */
  .ant-segmented-item-selected {
    cursor: default;
    .ant-segmented-item-label {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      box-shadow: none !important;
      border-top-left-radius: none !important;
      border-bottom-left-radius: none !important;
      height: 3.125rem;
    }
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
