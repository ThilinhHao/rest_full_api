import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ResultTableWrapper = styled.div`
  border: 2px solid #52b788;
  border-radius: 0.625rem;
  width: 50.625rem;
  height: 23.313rem;
  margin-top: 4.188rem;
  margin-left: 4rem;
  overflow: hidden;
`;
export const HeaderTableSearch = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.lineColor};
  font-size: 1.25rem;
  margin: 0 2.375rem;
  margin-top: 1.875rem;
  div {
    width: 50%;
    padding-left: 1.25rem;
  }
`;
export const ItemTableSearch = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.lineColor};
  font-size: 1.25rem;
  min-height: 4rem;
  align-items: center;
  .box {
    width: 50%;
    padding-left: 1.25rem;
    div {
      line-height: 1.5rem;
      margin: 0.25rem 0;
    }
  }
`;
export const ScrollSearchView = styled.div`
  width: 100%;
  padding: 0 2.375rem;
  height: 19rem;
  overflow-y: auto;
`;
