import styled from 'styled-components';

interface ISelectCustomWrapper {
  isFocus: boolean;
}
export const SelectContainer = styled.div<ISelectCustomWrapper>`
  width: fit-content;
  box-shadow: ${(props) => (props?.isFocus ? 'inset 1px 1px 4px rgba(0, 0, 0, 0.25)' : 'unset')};
`;
export const SelectCustomWrapper = styled.div`
  border-radius: 25px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  width: fit-content;
  .ant-select-open {
    box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.25);
    height: 3.125rem;
  }
  .ant-select-dropdown {
    margin-top: 30px;
  }
  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
  .ant-select {
    width: 200px;
    border-radius: 25px;
    .ant-select-selector {
      background: transparent !important;
      border: none !important;
      height: 3.125rem;
    }
  }
`;
