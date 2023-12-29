import { colors } from 'constants/colorsBase';
import { Button } from 'antd';
import styled from 'styled-components';

export const ButtonWrapper = styled(Button)`
  &:hover {
    color: white !important;
    transform: translateY(-0.07em);
  }
  font-family: 'Noto Sans JP', sans-serif !important;
`;

export const ButtonIssuanceWrapper = styled(Button)<any>`
  padding: 0;
  font-family: 'Noto Sans JP', sans-serif !important;
  background: ${(props) => props?.background || colors.btnDefaultCompanySite};
  box-shadow: ${(props) => (props?.boxshadow ? `${props?.boxshadow}` : 'unset')};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: ${(props) => props?.height || '3.125rem'};
  width: ${(props) => props?.width || '18.125rem'};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${(props) => props?.color || colors.white};
  .square {
    border-radius: 2.188rem;
    width: 2.188rem;
    height: 2.188rem;
    border: 1px solid ${colors.white};
    margin-right: 0.625rem;
  }
  &:hover {
    color: ${(props) => props?.color || colors.white} !important;
    transform: translateY(-0.07em);
  }
`;
