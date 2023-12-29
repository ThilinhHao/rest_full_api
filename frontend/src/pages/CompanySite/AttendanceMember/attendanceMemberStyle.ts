import { IGrantCard } from '@components/Style/interface';
import styled from 'styled-components';
import { CardBase } from 'styles';

export const GrantCardMember = styled(CardBase)<IGrantCard>`
  position: relative;
  margin-top: ${(props) => props?.marginTop || '1rem'};
  padding: 1.25rem 0rem 0rem 0rem;
  width: ${(props) => props?.percentWidth || 'unset'};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
`;
export const LoadingAttendanceMember = styled.div`
  width: 105rem;
  height: calc(100vh - 17.6rem);
  position: absolute;
  background: rgb(255, 255, 255, 0.8);
  z-index: 1;
`;
