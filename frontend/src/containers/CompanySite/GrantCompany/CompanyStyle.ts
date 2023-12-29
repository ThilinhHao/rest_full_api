import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const TitleGrant = styled.div`
  font-size: 2.188rem;
  color: ${colors.dune};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0.625rem;
  div:nth-child(1) {
    font-size: 1.375rem;
    padding-left: 1.25rem;
    margin-right: 1rem;
  }
  div:nth-child(2) {
    width: 64.938rem;
    height: 1px;
    background-color: ${colors.smokeyGrey};
  }
`;
export const ItemWrapper = styled.div`
  display: flex;
  margin-right: 1.5rem;
  margin-top: 1rem;
  align-items: center;
`;
export const BtnAddFile = styled.div`
  cursor: pointer;
  background-color: ${colors.mainColor};
  width: 18.75rem;
  height: 2.5rem;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  color: ${colors.white};
  box-shadow: 1px 1px 1px rgba(114, 114, 114, 0.161);
  margin-left: 0.8rem;
  margin-top: 1rem;
`;

interface ITickedIcon {
  isLoading?: boolean;
  disabled?: boolean;
}
export const TickedIcon = styled.img<ITickedIcon>`
  cursor: ${(props) => {
    if (props?.disabled) {
      return 'no-drop';
    }
    return props?.isLoading ? 'wait' : 'pointer';
  }};
  height: 2.125rem;
  width: 2.125rem;
  &.view {
    margin-right: 0.906rem;
  }
`;
export const TickedDefaultIcon = styled.img<ITickedIcon>`
  height: 2.125rem;
  width: 2.125rem;
  &.view {
    margin-right: 0.906rem;
  }
`;
export const WrapperFile = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 3rem;
`;
export const WrapperBrokeragEFee = styled.span`
  width: 7rem;
  padding-left: 0;
`;
export const YenWrapper = styled.div`
  display: flex;
  margin-top: 0.4rem;
  font-size: 1.25rem;
  align-items: start;
`;
export const ErrorCode = styled.div`
  width: 6rem;
  white-space: nowrap;
  margin-top: 0.25rem;
  color: ${colors.tomato};
  font-size: 0.875rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
  &:empty {
    height: 0;
  }
  &:not(:empty) {
    height: 0.6rem;
  }
  transition: 0.2s;
`;
export const BrokeragFeeLabel = styled.div`
  padding-left: 0 !important;
`;

interface IGrantInput {
  margin?: string;
  width?: string;
}

export const CardItemDate = styled.div<any>`
  display: flex;
  padding: ${(props) => props?.paddingHoz || '0.938rem 0'};
  border-bottom: ${(props) => props?.lineBottom && `1px solid ${colors.iron}`};
  font-size: 1.25rem;
  .firstItem {
    padding-left: 4.375rem;
    width: 16rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
  }
  .space {
    height: 2.5rem;
    text-align: center;
    margin: 0 14px;
    display: flex;
    align-items: center;
  }
  .ant-picker {
    width: 15.188rem;
    height: 2.5rem;
    border-radius: 2.125rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 3px 1px inset;
    font-family: 'Noto Sans JP', sans-serif !important;
  }
`;

export const WrapperInputDate = styled.div<IGrantInput>`
  margin: ${(props) => props?.margin};
  width: ${(props) => props?.width || 'unset'};
`;

export const Unit = styled.div`
  margin-left: 0.938rem;
  display: flex;
  align-items: center;
`;
