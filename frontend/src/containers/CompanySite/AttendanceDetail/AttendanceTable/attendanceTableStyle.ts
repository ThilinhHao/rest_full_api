import { colors } from 'constants/colorsBase';
import styled from 'styled-components';
export const AttendanceTableWrapper = styled.div`
  margin-left: 4rem;
`;
export const TableName = styled.div`
  cursor: pointer;
  background-color: #fdab29;
  width: 13.938rem;
  height: 2.625rem;
  color: ${colors.white};
  align-items: center;
  padding-top: 0.15rem;
  font-size: 1.5rem;
  border-radius: 0.313rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
  padding-left: 0.625rem;
  :active {
    box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.25);
  }
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;
`;

interface IStatusActive {
  color: string;
}
export const StatusActive = styled.div<IStatusActive>`
  width: 7.5rem;
  height: 2.125rem;
  border-radius: 4rem;
  border: 1px solid ${(props) => props?.color};
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.313rem;
  color: ${(props) => props?.color};
`;

const checkCursor = (isOwner: boolean, isLoading?: boolean) => {
  if (!isOwner) return 'default';
  if (isLoading) return 'wait';
  return 'pointer';
};

const checkShadow = (shadow: string, isOwner: boolean) => {
  if (!isOwner) return shadow;
  if (shadow === 'none') return 'inset 0px 0px 3px 3px rgba(0, 0, 0, 0.25)';
  return '0px 0px 1px 1px rgba(0, 0, 0, 0.25)';
};

interface IActiveItem {
  activeData: {
    background: string;
    shadow: string;
    color: string;
  };
  isOwner: boolean;
  isLoading?: boolean;
}
export const ActiveItem = styled.div<IActiveItem>`
  cursor: ${(props) => checkCursor(props.isOwner, props?.isLoading)};
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props?.activeData?.background};
  color: ${(props) => props?.activeData?.color};
  box-shadow: ${(props) => props?.activeData?.shadow};
  transition: box-shadow 0.3s ease-in-out;
  transition: all ease 0.2s;
  :active {
    transition: all 0.1s ease-out;
    box-shadow: ${(props) => checkShadow(props?.activeData?.shadow, props.isOwner)};
  }
  user-select: none;
`;
