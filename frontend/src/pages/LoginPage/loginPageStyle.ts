import ButtonCustom from '@components/Button';
import InputCustom from '@components/Input';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const LoginPageWrapper = styled.div<any>`
  width: 100vw;
  height: 100vh;
  background: ${(props) => (props.isSiteLoginCompany ? colors.companyBgLogin : colors.bgLogin)};
  display: flex;
`;
export const ManipulationWrapper = styled.div`
  width: 50vw;
  height: 100%;
  padding: 3.75rem;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5.438rem;
  div {
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 1.875rem;
    border: 1px solid ${colors.colorLogin};
  }
  span {
    font-size: 3.125rem;
    color: ${colors.colorLogin};
    margin-left: 2rem;
  }
`;

export const InputLogin = styled(InputCustom)`
  width: 37.5rem;
  height: 4.25rem;
  input::-ms-reveal,
  input::-ms-clear {
    display: none;
  }
  box-shadow: inset 0px 4px 4px rgb(0 0 0 / 25%);
  img {
    height: 2.313rem;
    width: 2.438rem;
  }
  input {
    background: transparent;
  }
`;
export interface ILoginBtn {
  isloading?: boolean | string | undefined | number;
  iconWidth?: string;
  iconHeight?: string;
}
export const ButtonLogin = styled(ButtonCustom)<ILoginBtn>`
  display: flex !important;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (!props?.isloading ? 'pointer' : 'wait')};
  width: 50%;
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
  img {
    width: ${(props) => props?.iconWidth || '3.625rem'};
    height: ${(props) => props?.iconHeight || '3.625rem'};
    position: absolute;
    left: 0.375rem;
    top: 0.2rem;
  }
`;
export const ForgotPassword = styled.span<any>`
  font-size: 1.375rem;
  margin-top: 4.313rem;
  color: ${colors.doveGrey};
  span {
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    text-decoration-thickness: 1px;
    text-decoration-color: ${colors.starDust};
    color: ${(props) => (props.isSiteLoginCompany ? colors.atomicTangerine : colors.doveGrey)};
    padding: 0.625rem;
    margin-left: 0.5rem;
  }
`;
export const LineLogin = styled.div`
  width: 26.25rem;
  height: 1px;
  background-color: ${colors.starDust};
`;
export const ErrorLogin = styled.div`
  margin-top: 0.25rem;
  width: 35.5rem;
  color: ${colors.tomato};
  font-size: 0.875rem;
  margin-left: 0.5rem;
  transition: 0.2s;
  &:empty {
    height: 0;
  }
  &:not(:empty) {
    height: 0.6rem;
  }
`;

export const RightPage = styled.div`
  width: 50vw;
  height: 100%;
  div {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
  }
`;
