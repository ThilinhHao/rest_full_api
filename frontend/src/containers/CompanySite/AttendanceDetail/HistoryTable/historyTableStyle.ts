import { colors } from 'constants/colorsBase';
import styled from 'styled-components';
import { ScrollWrapperMemberTable } from '../MemberTable/memberTableStyle';

export const HistoryTableWrapper = styled.div`
  margin-top: 2rem;
`;
export const HistoryItemMemberWrapper = styled.div`
  width: 80.5rem;
  margin-left: 11.063rem;
  font-size: 1.5rem;
  display: flex;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid ${colors.lineColor};
  height: 7.5rem;
  align-items: center;
  font-weight: 500;
`;

export const ScrollWrapperHistoryMemberTable = styled(ScrollWrapperMemberTable)`
  height: calc(100vh - 30rem);
`;
