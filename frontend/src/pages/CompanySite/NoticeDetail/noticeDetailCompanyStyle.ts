import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const HeaderTitleNotice = styled.div`
  width: 78.75rem;
  display: flex;
  justify-content: space-between;
  margin-left: 13.75rem;
  border-bottom: 1px solid ${colors.lineColor};
  margin-top: 3.125rem;
  padding: 0 0.5rem 0.2rem 0.5rem;
  align-items: flex-end;
  div: nth-child(1) {
    font-size: 1.5rem;
    font-weight: 500;
    width: 85%;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  div: nth-child(2) {
    font-size: 1.125rem;
  }
`;
export const ContentNoticeCompany = styled.div`
  width: 70rem;
  margin-left: 16.875rem;
  font-size: 1.25rem;
  margin-top: 2.5rem;
  word-break: break-all;
  white-space: pre-wrap;
`;
