import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

interface IAttendanceHeaderTableWrapper {
  isLastItem?: boolean;
}
export const AttendanceHeaderTableWrapper = styled.div<IAttendanceHeaderTableWrapper>`
  display: flex;
  flex-direction: row;
  border-bottom: ${(props) => !props?.isLastItem && `1px solid ${colors.lineColor}`};
  width: 97rem;
  padding-bottom: 0.313rem;
  font-size: 1.5rem;
  height: 7.5rem;
`;
export const NameTable = styled.div`
  width: 19.625rem;
  display: flex;
  align-items: center;
`;
export const StatusWorkTable = styled.div`
  width: 15.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const DayTable = styled.div`
  width: 17rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export const TimeChange = styled.div`
  width: 11.5rem;
`;
export const DateContent = styled.div`
  color: ${colors.crimson};
  text-align: center;
`;
export const Confirmed = styled.div`
  display: flex;
  align-items: end;
  height: 100%;
  color: ${colors.osloGrey};
`;
export const ContentTextHeader = styled.div`
  display: flex;
  align-items: end;
  height: 100%;
`;
