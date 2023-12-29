import { Input } from 'antd';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const TitleHeader = styled.div`
  font-size: 2.188rem;
  font-weight: 400;
  white-space: nowrap;
  font-style: normal;
  line-height: 2.625rem;
  margin-left: 1.25rem;
`;

export const InputSearchCustom = styled(Input)<any>`
  display: flex;
  align-items: center;
  box-shadow: inset 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  width: 25rem;
  height: 3.125rem;
  border-radius: 0.625rem;
  background: ${colors.white};
  padding: 0.875rem 1.25rem;
  margin: 0 1.25rem;
  input {
    background: ${colors.white};
    font-size: 1.125rem !important;
    font-weight: 500;
    font-family: 'Noto Sans JP', sans-serif !important;
    line-height: 1.375rem;
    height: 1.75rem;
  }
  img {
    width: 1.563rem;
    height: 1.563rem;
  }
  .ant-input-suffix {
    z-index: 2;
    cursor: pointer;
  }
`;

export const HeaderWrapper = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.mainText};
  display: flex;
  align-items: flex-start;
  padding: 1.688rem 3.125rem 2.375rem 3.188rem;
  height: 7.5rem;
  .header-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const SwitchType = styled.div`
  display: flex;
  height: 3.125rem;
  width: 18.75rem;
  position: absolute;
  left: 3.125rem;
  div {
    background: ${colors.white};
    color: ${getColorSite()};
    border: 1px solid ${getColorSite()};
    box-shadow: inset 0.125rem 0.188rem 0.125rem rgba(0, 0, 0, 0.25);
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 1.375rem;
    line-height: 1.688rem;
    cursor: pointer;
  }
  div.active {
    background: ${getColorSite()};
    color: ${colors.white};
    box-shadow: 0.063rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25);
  }
  div:nth-child(1) {
    border-top-left-radius: 1.875rem;
    border-bottom-left-radius: 1.875rem;
  }
  div:nth-child(2) {
    border-top-right-radius: 1.875rem;
    border-bottom-right-radius: 1.875rem;
  }
`;
