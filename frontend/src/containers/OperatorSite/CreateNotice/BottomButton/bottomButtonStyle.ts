import ButtonCustom from '@components/Button';
import { ILoginBtn } from '@pages/LoginPage/loginPageStyle';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const BottomButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

interface IButtonBottom extends ILoginBtn {
  color?: string;
}
export const BtnLeft = styled(ButtonCustom)<IButtonBottom>`
  cursor: ${(props) => (props?.isloading ? 'wait' : 'pointer')};
  height: 3.125rem;
  min-width: 9.125rem;
  background-color: ${colors.mainColor};
  font-size: 1.625rem;
  padding: 0;
  color: ${colors.white};
  font-weight: 600;
  border-radius: 0.625rem;
`;
export const BtnRight = styled(ButtonCustom)<IButtonBottom>`
  cursor: ${(props) => (props?.isloading ? 'wait' : 'pointer')};
  cursor: pointer;
  height: 3.125rem;
  min-width: 9.125rem;
  background-color: ${(props) => props?.color || colors.nobel};
  font-size: 1.625rem;
  color: ${colors.white};
  margin-left: 4.375rem;
  border-radius: 0.625rem;
  font-weight: 600;
  padding: 0;
`;
