import { colors } from 'constants/colorsBase';
import { Button } from 'antd';
import styled from 'styled-components';

import { getColorSite } from 'helper/colorSite';

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
  background-color: ${getColorSite()};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 3.125rem;
  width: 18.125rem;
  margin: 0.938rem auto;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.white};
  cursor: ${(props) => (props?.loading ? 'wait !important' : 'pointer')};
  .square {
    border-radius: 2.188rem;
    width: 2.188rem;
    height: 2.188rem;
    border: 1px solid ${colors.white};
    margin-right: 0.625rem;
  }
  &:hover:enabled {
    color: white !important;
    transform: translateY(-0.07em);
  }
  &:disabled {
    color: white;
  }
`;

export const BtnIcon = styled(Button)<any>`
  cursor: ${(props) => (props?.loading ? 'wait !important' : 'pointer')};
  height: fit-content;
  background-color: ${colors.mainColor};
  font-size: 1.625rem;
  color: ${colors.white};
  margin-top: 1rem;
  display: flex;
  padding: 0.375rem 0.813rem;
  justify-content: center;
  align-items: center;
  .icon {
    display: inherit;
    margin-right: 1.563rem;
  }
  &:hover:enabled {
    color: white !important;
    transform: translateY(-0.07em);
  }
  &:disabled {
    color: white;
  }
`;

export const ButtonStyle = styled(Button)`
  &:hover:enabled {
    transform: translateY(-0.07em);
  }
  &:disabled {
    color: white;
  }
`;
