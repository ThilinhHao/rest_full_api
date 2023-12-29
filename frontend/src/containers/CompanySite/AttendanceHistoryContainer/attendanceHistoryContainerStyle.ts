import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const WrapperItemHistory = styled.div`
  height: 6rem;
  width: 12.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  div:first-child {
    width: 11.438rem !important;
  }
`;
export const WrapperTotalItemHistory = styled.div`
  height: 6rem;
  width: 10rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
`;

interface IItemHistory {
  styleProps: { background: string; color: string; shadow: string };
}
export const ItemHistory = styled.div<IItemHistory>`
  width: 10rem;
  height: 5rem;
  margin: 0 0.5rem;
  border-radius: 0.313rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  padding-left: 0.25rem;
  font-weight: 505;
  font-size: 1.5rem;

  box-shadow: ${(props) => props.styleProps.shadow};
  color: ${(props) => props.styleProps.color};
  background-color: ${(props) => props.styleProps.background};
`;
export const ItemHistoryTotal = styled(ItemHistory)`
  margin: 0;
`;

export const AmountApplied = styled.div`
  color: ${colors.leaveShift};
  text-align: center;
  margin-top: 0.6rem;
  font-size: 1rem;

  white-space: nowrap;
`;
export const TotalApplication = styled.div`
  position: absolute;
  width: 10rem;
  text-align: center;
  margin-top: -3.1rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.dayShift};
`;
export const TransactionFee = styled.div`
  font-weight: 500;
  font-size: 0.75rem;
`;
export const FeeWrapper = styled.div`
  display: flex;
`;
export const FeeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const Brackets = styled.div`
  font-size: 2.5rem;
  line-height: 1.5rem;
  font-weight: 200;
  user-select: none;
`;
