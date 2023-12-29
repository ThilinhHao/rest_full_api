import { colors } from 'constants/colorsBase';
import styled from 'styled-components';
import { CardBase } from 'styles';

export const DetailOperatorWrapper = styled.div`
  padding-top: 0.813rem;
  padding-left: 0.625rem;
  width: 100%;
`;

interface ITitleDetailWrapper {
  pLeft?: string;
}
export const TitleDetailWrapper = styled.div<ITitleDetailWrapper>`
  display: flex;
  flex-direction: row;
  align-items: center;
  .full_name {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 2.188rem;
    margin-left: ${(props) => `${props?.pLeft || 5}rem`};
  }
`;

interface IElementCard {
  width?: string;
  paddingLeft?: string;
}
export const FirstItem = styled.div<IElementCard>`
  width: ${(props) => (props?.width ? `${props?.width} !important` : 'unset')};
  padding-left: ${(props) => (props?.paddingLeft ? `${props?.paddingLeft} !important` : 'unset')};
`;
export const ElementCard = styled.div<IElementCard>`
  width: ${(props) => props?.width || '20rem'};
  display: flex;
  flex-direction: row;
  font-size: 1.25rem;
  padding-right: 1rem;
  padding-top: 0.313rem;
  word-break: break-all;
  .space {
    margin: 0 14px;
  }
  .company-fee {
    padding-left: 1.5rem;
  }
`;
export const IconTitle = styled.img`
  width: 3.875rem;
  height: 3.875rem;
`;
export const TitleItem = styled.div`
  display: flex;
  font-size: 1.25rem;
  align-items: center;
`;
export const CardItemOperator = styled.div`
  display: flex;
  padding: 0.938rem 1rem;
  border-bottom: 1px solid ${colors.iron};
  font-size: 1.25rem;
`;
export const ElementCardItemOperator = styled.div`
  width: 16rem;
  display: flex;
  flex-direction: row;
  font-size: 1.25rem;
  padding-right: 1rem;
  padding-top: 0.313rem;
  word-break: break-all;
`;
export const ElementCardItemOperatorData = styled(ElementCardItemOperator)`
  width: 22rem;
`;
export const OperatorBottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10rem;
`;

export const OperatorBottomEditWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 14rem;
`;

export const OperatorGrantCard = styled(CardBase)`
  position: relative;
  margin-top: 1rem;
  padding: 1rem 5.625rem 0.875rem 5.625rem;
  width: 83.75rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;
export const DetailOperatorTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  margin-left: -1rem;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  img {
    margin-right: 1rem;
  }
  .full_name {
    max-width: 85%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 2.188rem;
    margin-top: -0.3rem;
  }
`;
