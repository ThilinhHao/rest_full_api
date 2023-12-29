import { colors } from 'constants/colorsBase';
import ButtonCustom from '@components/Button';
import { ILoginBtn } from '@pages/LoginPage/loginPageStyle';
import styled from 'styled-components';
import ButtonImg from '@components/Button/ButtonImg';
import { CardBase } from 'styles';

export const BtnVerification = styled(ButtonCustom)<ILoginBtn>`
  cursor: ${(props) => (props?.isloading ? 'wait' : 'pointer')};
  height: 3.125rem;
  width: 9.125rem;
  background-color: ${colors.mainColor};
  font-size: 1.625rem;
  color: ${colors.white};
  font-weight: 600;
  margin-top: 1rem;
  border-radius: 0.625rem;
`;
interface IErrorOperator {
  width?: number;
}
export const ErrorOperator = styled.div<IErrorOperator>`
  width: ${(props) => (props?.width ? `${props?.width}rem` : 'unset')};
  margin-top: 0.25rem;
  color: ${colors.tomato};
  font-size: 0.875rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: row;
  &:empty {
    height: 0;
  }
  &:not(:empty) {
    height: ${(props) => (props?.width ? `1.8rem` : '0.6rem')};
  }
  transition: 0.2s;
`;
interface IGrantInput {
  margin?: string;
  width?: string;
}
export const WrapperInput = styled.div<IGrantInput>`
  position: relative;
  margin: ${(props) => props?.margin};
  width: ${(props) => props?.width || 'unset'};
`;
export const BtnVerificationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BtnSubmitFile = styled(ButtonImg)<any>`
  border-radius: 40px;
  padding: 0.375rem 2rem 0.375rem 0.813rem !important;
  box-shadow: 0px 5px 5px ${colors.shadowBtnFile};
  /* &:first-child {
    margin-right: 6.25rem;
  } */
  img {
    width: 3.625rem;
    height: 3.625rem;
    border-radius: 50%;
  }
  &.reject {
    background: ${colors.btnRejectAccont};
  }
  &:disabled {
    background: linear-gradient(90deg, #b3b3b3 0%, #b3b3b3 100%);
  }
`;

export const CardCreateOperator = styled(CardBase)`
  position: relative;
  margin-top: 1rem;
  padding: 2.188rem 13.25rem 2.063rem 13.25rem;
  width: 105.25rem !important;
  max-width: 105.25rem !important;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;
