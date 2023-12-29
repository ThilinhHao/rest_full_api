import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const MemberTableWrapper = styled.div`
  margin-left: 6rem;
  font-size: 1.5rem;
`;
export const ItemMemberWrapper = styled.div`
  display: flex;
  height: 8rem;
  border-bottom: 1px solid ${colors.lineColor};
  margin-right: 4.5rem;
`;
export const DayWrapperMember = styled.div`
  display: flex;
  align-items: center;
  width: 25rem;
`;
export const DayElement = styled.div`
  font-size: 1.5rem;
  padding-right: 2.813rem;
`;
export const DashboardWrapper = styled.div`
  display: flex;
  height: 8rem;
  align-items: center;
`;
export const ActiveItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 17.063rem;
  margin-left: 2.5rem;
`;
export const ScrollWrapperMemberTable = styled.div`
  height: calc(100vh - 21.8rem);
  overflow: auto;

  background: /* Shadow covers */ linear-gradient(white 10%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    /* Shadows */ radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 50% 0%, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)) 0 0%;
  background-repeat: no-repeat;
  background-size: 100% 400px, 100% 400px, 100% 0.5rem, 100% 0.5rem;
  /* Opera doesn't support this in the shorthand */
  background-attachment: local, local, scroll, scroll;
`;
export const DeadlineForChange = styled.div`
  color: #f65171;
`;
