import styled from 'styled-components';
import ButtonCustom from '@components/Button';

import { colors } from 'constants/colorsBase';
import { CardBase } from 'styles';
import { ILoginBtn } from '@pages/LoginPage/loginPageStyle';

export const GrantCompanyWrapper = styled.div`
  padding: 0.625rem;
  width: 100%;
  height: 100%;
`;
export const Container = styled.div<any>`
  width: 100%;
  height: ${(props) => props?.height || 'unset'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface IGrantCard {
  padding?: string;
  percentWidth?: string;
  justifyContent?: string;
}
export const GrantCard = styled(CardBase)<IGrantCard>`
  position: relative;
  margin-top: 1rem;
  padding: ${(props) => props?.padding || '2.188rem 1.875rem 2.063rem 1.875rem'};
  width: ${(props) => props?.percentWidth || 'unset'};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props?.justifyContent || 'space-between'};
  overflow-y: auto;
  scrollbar-gutter: stable;
`;
export const TitleGrant = styled.div`
  font-size: 2.188rem;
  color: ${colors.dune};
`;
export const TitleCompany = styled.div`
  font-size: 2.188rem;
  color: ${colors.dune};
  text-align: center;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface ICompanyCard {
  width?: number;
}
export const CompanyCard = styled.div<ICompanyCard>`
  position: relative;
  margin-top: 1rem;
  padding: 1rem 1.875rem 0.625rem 1.875rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => `${props?.width || 83.643}rem`};
  height: calc(100vh - 10rem);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: ${colors.white};
  overflow: auto;
`;
export const WrapperConfirm = styled.div`
  position: absolute;
  left: 1rem;
  background-color: ${colors.white};
  width: 82.634rem;
  height: calc(100vh - 11rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  padding: 1rem 0.5rem 0.625rem 1rem;
`;
export const BtnCorrection = styled(ButtonCustom)<ILoginBtn>`
  cursor: ${(props) => (props.isloading ? 'wait' : 'pointer')};
  height: 3.063rem;
  min-width: 9.125rem;
  background-color: ${colors.nobel};
  font-size: 1.625rem;
  color: ${colors.white};
  margin-top: 1rem;
  margin-left: 5rem;
  padding: 0;
  border-radius: 0.625rem;
`;
export const Visible = styled.div<any>`
  visibility: ${(props) => (props?.isHidden ? 'hidden' : 'visible')};
  height: ${(props) => (props?.isHidden ? '0' : 'unset')};
  overflow: ${(props) => (props?.isHidden ? 'hidden' : 'unset')};
`;
export const AvatarTitle = styled.img``;

export const BtnVerificationCreateCompanyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  margin-top: 1rem;
`;
export const ITemMark = styled.div`
  color: #f65171;
  margin-top: 1.2rem;
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 1rem !important;
`;
