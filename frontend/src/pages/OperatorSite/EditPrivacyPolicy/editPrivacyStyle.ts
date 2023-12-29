import ButtonCustom from '@components/Button';
import { ILoginBtn } from '@pages/LoginPage/loginPageStyle';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const TitleSettingEdit = styled.div`
  text-align: center;
  font-size: 3rem;
  color: ${getColorSite()};
`;
export const CardSettingEdit = styled.div`
  position: relative;
  margin-top: 1rem;
  border-radius: 1.875rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70.5rem;
  height: calc(100vh - 10rem);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: ${colors.white};
  overflow: auto;
  padding: 2.5rem 3.125rem 2.75rem 3.125rem;
  align-items: center;
`;
export const InputSettingEdit = styled.textarea`
  height: calc(100vh - 27rem) !important;
  width: 100%;
  font-size: 1.125rem !important;
  border: none !important;
  outline: none;
  font-family: 'Noto Sans JP', sans-serif;
  resize: none;
  :disabled {
    background: ${colors.white};
  }
`;
export const ButtonEdit = styled(ButtonCustom)<ILoginBtn>`
  cursor: ${(props) => (props?.isloading ? 'wait' : 'pointer')};
  width: 25rem;
  height: 4.25rem;
  border-radius: 2.125rem;
  background: ${colors.btnLogin};
  font-size: 2rem;
  font-weight: 400;
  color: ${colors.white};
  margin-top: 1.875rem;
  box-shadow: ${colors.btnLoginShadow};
  &:hover {
    color: white !important;
    transform: translateY(-0.07em);
  }
`;
