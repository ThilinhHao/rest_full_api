import ButtonCustom from '@components/Button';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ControlHeaderWrapper = styled.div<any>`
  padding: ${(props) => props?.padding || '1rem 3.563rem 0 3.563rem'};
  display: flex;
`;
export const ContainerContent = styled.div`
  margin-left: 6.25rem;
`;
export const LoadingAttendance = styled.div<any>`
  width: 105rem;
  height: 100%;
  position: absolute;
  background: rgb(255, 255, 255, 0.8);
  z-index: 1;
  margin: ${(props) => props?.margin || '0'};
`;
export const NoDataAttendance = styled.div`
  margin-top: 5rem;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  height: 20rem;
`;

export const StaffNameWrapper = styled.div`
  font-size: 2rem;
  margin-left: 6.875rem;
  max-width: 106.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BtnToSetting = styled(ButtonCustom)`
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
  margin: auto;
  border: none;
  img {
    margin-top: 0.3rem;
  }
`;
