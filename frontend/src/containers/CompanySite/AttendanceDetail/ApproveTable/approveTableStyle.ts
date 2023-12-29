import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ApproveTableWrapper = styled.div`
  width: 80rem;
  margin-left: 12rem;
  margin-top: 2.5rem;
  font-size: 1.5rem;
`;
export const ItemApprove = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.lineColor};
  height: 6.5rem;
  padding: 0 0.75rem;
`;
export const NameItemApprove = styled.div`
  width: 16rem;
  padding-right: 3rem;
  font-weight: 500;
  position: relative;
  word-break: break-word;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export const RequestTime = styled.div`
  width: 10rem;
  padding-right: 3rem;
  font-weight: 500;
`;
export const YenItem = styled.div`
  font-weight: 500;
  width: 12rem;
`;

interface TCancelApproveItem {
  isLoading?: boolean;
}
export const CancelApproveItem = styled.div<TCancelApproveItem>`
  cursor: ${(props) => (props?.isLoading ? 'wait' : 'pointer')};
  color: #868686;
  text-decoration: underline;
  text-underline-offset: 0.2rem;
  text-decoration-thickness: 0.5px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
`;
export const Withdrawn = styled.div`
  color: #ff2727;
  /* position: absolute; */
`;
