import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ShiftItemWrapper = styled.div`
  width: 11rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface IShiftItemStyle {
  color: string | null;
  isWork?: boolean;
}
export const MorningShift = styled.div<IShiftItemStyle>`
  width: 10rem;
  height: 2.5rem;
  background-color: ${(props) => props?.color || colors.white};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => (props?.isWork ? 'inset 2px 2px 2px rgba(0, 0, 0, 0.25)' : 'unset')};
  border-radius: 0.313rem;
  color: ${colors.white};
`;
export const AfternoonShift = styled.div<IShiftItemStyle>`
  width: 10rem;
  height: 2.5rem;
  background-color: ${(props) => props?.color || colors.white};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) => (props?.isWork ? 'inset 2px 2px 2px rgba(0, 0, 0, 0.25)' : 'unset')};
  border-radius: 0.313rem;
  margin-top: 0.313rem;
  color: ${colors.white};
`;
