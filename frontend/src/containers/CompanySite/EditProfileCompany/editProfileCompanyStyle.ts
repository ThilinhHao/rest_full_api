import ButtonCustom from '@components/CompanySite/common/Button';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const BtnCreateCompany = styled(ButtonCustom)`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 4.25rem;
  width: 25rem;
  background: linear-gradient(270deg, #fd9672 0%, #ffb239 100%);
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  font-size: 1.625rem;
  color: ${colors.white};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6.25rem;
`;
export const CancelEditCompanyBtn = styled(ButtonCustom)`
  height: 4.25rem;
  width: 25rem;
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  font-size: 1.625rem;
  color: ${colors.atomicTangerine};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.atomicTangerine};
  :hover {
    color: ${colors.atomicTangerine} !important;
    border: 1px solid ${colors.atomicTangerine} !important;
  }
`;
export const Strikethrough = styled.div`
  font-weight: bold;
`;
