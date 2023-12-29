import styled from 'styled-components';
import { colors } from 'constants/colorsBase';

export const SideBarOperatorWrapper = styled.div`
  height: 100%;
  width: 22.75rem;
  box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.161);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ListWrapper = styled.div`
  width: 22.75rem;
  /* padding: 0.625rem 1.875rem; */
`;
export const Line = styled.div`
  width: 18.75rem;
  height: 1px;
  background-color: ${colors.iron};
  margin: 0 auto;
`;

interface IPropsItem {
  isSelected: boolean;
}
export const ItemWrapper = styled.div<IPropsItem>`
  cursor: pointer;
  display: flex;
  margin-top: 1.125rem;
  font-size: 1.125rem;
  position: relative;
  align-items: center;
  background-color: ${(props) => props.isSelected && colors.mainColor};
  color: ${(props) => props.isSelected && colors.white};
  border-radius: 0.4rem;
  margin-right: 2rem;
  transition: 0.1s;
  div:nth-child(1) {
    width: 5.938rem;
    padding: 0.5rem;
    transition: 0.3s;
  }
  div:nth-child(2) {
    padding: 0.5rem;
    transition: 0.3s;
    width: 14rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: -0.15rem;
  }
  &:hover {
    background-color: ${colors.mainColorHover};
    color: ${colors.white};
  }
`;

export const NodataWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
export const ScrollWrapper = styled.div`
  height: calc(100vh - 13rem);
  overflow: auto;
  padding: 0.625rem 0rem 0.625rem 1.875rem;
  ::-webkit-scrollbar {
    width: 0.375rem;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.ashGrey};
  }
`;
export const ScrollWrapperAgency = styled.div`
  height: calc(100vh - 7.5rem);
  overflow: auto;
  padding: 0.625rem 0rem 0.625rem 1.875rem;
  ::-webkit-scrollbar {
    width: 0.375rem;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.ashGrey};
  }
`;
