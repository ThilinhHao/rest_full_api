import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ItemListNoticeWrapper = styled.div`
  cursor: pointer;
  padding: 1.25rem 0.625rem;
  border-top: 1px solid ${colors.lineColor};
  :hover {
    background-color: #f1f2f6;
  }
`;
export const TitleWrapper = styled.div`
  color: #40916c;
  display: flex;
  justify-content: space-between;
`;
export const NewTitle = styled.div`
  cursor: pointer;
  font-weight: 700;
  font-size: 1.5rem;
  width: 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const DateTitle = styled.div`
  font-size: 1.25rem;
  margin-left: 1.5rem;
`;
export const ContentItemListNotice = styled.div`
  margin-top: 0.813rem;
  font-size: 1.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
