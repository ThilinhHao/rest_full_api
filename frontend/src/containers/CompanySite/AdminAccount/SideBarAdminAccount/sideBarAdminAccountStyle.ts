import styled from 'styled-components';
import { colors } from 'constants/colorsBase';

export const PrefixIconBtn = styled.img`
  background-color: white;
  border-radius: 50%;
  padding: 0.125rem;
  cursor: pointer;
  width: 1.875rem;
  height: 1.875rem;
  margin-right: 0.938rem;
`;

export const SideBarCompanyWrapper = styled.div`
  height: 100%;
  width: 22.5rem;
  box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ListWrapper = styled.div`
  width: 22.5rem;
  height: calc(100vh - 12.5rem);
`;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.iron};
  margin: 0 auto;
`;

export const NodataWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

export const ScrollWrapper = styled.div`
  height: calc(100vh - 20rem);
  overflow: auto;
  padding: 0.938rem 1.25rem 0.625rem 0.938rem;
  div:first-child {
    margin-top: 0;
  }
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

export const ButtonGroup = styled.div`
  height: 12.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
