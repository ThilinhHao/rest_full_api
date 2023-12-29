import ButtonCustom from '@components/Button';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const BtnContainerWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
`;

interface IEditButton {
  isLoading?: boolean;
}
export const EditButton = styled(ButtonCustom)<IEditButton>`
  width: 25rem;
  height: 4.25rem;
  border-radius: 3rem;
  background-color: ${colors.mainColor};
  position: relative;
  font-weight: 500;
  color: ${colors.white};
  font-size: 1.75rem;
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')} !important;
  img {
    position: absolute;
    left: 0.25rem;
    top: 0.25rem;
    width: 3.625rem;
    height: 3.625rem;
  }
`;
export const CancelButton = styled(ButtonCustom)<IEditButton>`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')} !important;
  width: 25rem;
  height: 4.25rem;
  border-radius: 3rem;
  position: relative;
  font-weight: 500;
  color: ${colors.mainColor};
  font-size: 1.75rem;
  border-color: ${colors.mainColor} !important;
  span {
    color: ${colors.mainColor} !important;
  }
`;
