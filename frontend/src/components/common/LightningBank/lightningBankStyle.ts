import { Input, Select, SelectProps } from 'antd';
import styled from 'styled-components';
import { colors } from 'constants/colorsBase';

interface ISelectBankWrapper extends SelectProps {
  custom: {
    width?: number;
    height?: number;
  };
}
export const SelectBankWrapper = styled(Select)<ISelectBankWrapper | any>`
  padding-left: 0rem !important;
  width: ${(props) => (props?.custom?.width ? `${props?.custom?.width}rem !important` : '100%')};
  height: ${(props) => (props?.custom?.height ? `${props?.custom?.height}rem !important` : '100%')};
  .ant-select-selector {
    width: 100%;
    height: 100% !important;
    border-radius: 2.125rem;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    padding-left: 1.875rem !important;
    input {
      padding-left: 1.2rem !important;
      height: 100% !important;
      font-size: 1.25rem;
    }
    font-family: 'Noto Sans JP', sans-serif !important;
    box-shadow: ${(props) => (props?.disabled ? 'unset' : 'inset 0px 0px 3px 1px rgba(0, 0, 0, 0.15)')} !important;
    background: ${(props) => (props?.disabled ? colors.grey : 'unset')} !important;
    color: ${(props) => (props?.disabled ? '#333333' : 'unset')} !important;
    &:disabled {
      background: ${colors.grey};
      color: ${colors.mainText} !important;
    }
  }
  .ant-select-arrow {
    display: none;
  }
`;
export const SelectBankLoadingWrapper = styled(Input)<ISelectBankWrapper>`
  padding-left: 0rem !important;
  width: ${(props) => (props?.custom?.width ? `${props?.custom?.width}rem !important` : '100%')};
  height: ${(props) => (props?.custom?.height ? `${props?.custom?.height}rem !important` : '100%')};
`;
export const WrapperList = styled.div`
  padding-left: 0rem !important;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
`;
export const ItemBank = styled.div`
  width: 100%;
  max-width: 23rem;
  font-size: 1.25rem;
  padding: 0.5rem;
  cursor: pointer;
  :hover {
    background-color: ${colors.ashGrey};
  }
`;
export const WaitingList = styled.div`
  width: 25rem;
  height: 5rem;
  position: absolute;
  margin-top: -4rem;
`;
export const NoDataBankWrapper = styled.div`
  width: 25rem;
  text-align: center;
  padding-top: 4rem;
  font-size: 1.25rem;
  color: ${colors.mainText};
`;
