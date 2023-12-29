import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const QuickManagementComponentWrapper = styled.div`
  width: 30.313rem;
  height: 24.063rem;
  margin-left: 1.875rem;
`;
export const ItemToManager = styled.div`
  cursor: pointer;
  width: 100%;
  height: 6.313rem;
  margin-bottom: 0.5rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3.125rem;
  user-select: none;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
  :hover {
    background: #fdab29;
  }
  :active {
    box-shadow: none;
  }
`;

export const ItemPaymentHistory = styled(ItemToManager)`
  background: radial-gradient(55.26% 297.2% at 23.51% 17.87%, #ffb239 0%, #fd9672 100%);
`;
export const ItemAttendanceRecord = styled(ItemToManager)`
  background: radial-gradient(67.73% 364.29% at 71.96% 50.21%, #ffb239 0%, #fd9672 100%);
`;
export const ItemEmployeeList = styled(ItemToManager)`
  background: radial-gradient(42.47% 228.45% at 35.36% 0%, #ffb239 0%, #fd9672 100%);
`;
export const ItemInvoice = styled(ItemToManager)`
  background: radial-gradient(54.33% 292.21% at 60.31% 178.3%, #ffb239 0%, #fd9672 100%);
`;
export const IconItem = styled.img`
  width: 5rem;
  height: 5rem;
`;
export const TitleButton = styled.div`
  width: 18.75rem;
  text-align: center;
  font-size: 3rem;
  color: ${colors.white};
  font-weight: 500;
`;
