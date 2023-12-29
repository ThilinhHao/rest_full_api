import { colors } from 'constants/colorsBase';
import { Input } from 'antd';
import styled from 'styled-components';
import { getColorSite } from 'helper/colorSite';

export const InputWrapper = styled(Input)`
  border-radius: 2.125rem;
  font-size: 1.625rem;
  padding: 0 1.875rem;
  box-shadow: none !important;
  input {
    font-family: 'Noto Sans JP', sans-serif !important;
  }
  .ant-input-affix-wrapper-focused {
    box-shadow: none !important;
    border-color: ${colors.ashGrey};
  }
  .ant-input-affix-wrapper:hover {
    border-color: ${colors.ashGrey};
  }
  .ant-input-affix-wrapper {
    box-shadow: none;
    border-color: ${colors.ashGrey} !important;
  }
  .ant-input-prefix {
    width: 3.125rem;
    margin-left: 0.625rem;
  }
`;
interface IInputCard {
  width?: number;
  height?: number;
  backgroundcolor?: string;
  margincustom?: string;
  isshadow?: string;
}
export const InputCardWrapper = styled(Input)<IInputCard>`
  width: ${(props) => (props?.width ? `${props?.width}rem` : 'unset')};
  height: ${(props) => (props?.height ? `${props?.height}rem` : 'unset')};
  background-color: ${(props) => `${props?.backgroundcolor}`};
  border-radius: 2.125rem;
  margin: ${(props) => `${props?.margincustom}`};
  border: none;
  font-size: 1.25rem;
  padding-left: 1.875rem;
  font-family: 'Noto Sans JP', sans-serif !important;
  box-shadow: ${(props) =>
    props?.isshadow ? '0px 0px 3px 1px rgba(0, 0, 0, 0.15)' : '1px 1px 5px rgba(0, 0, 0, 0.161)'} !important;
  :where(.css-dev-only-do-not-override-yzvl1e).ant-input-disabled,
  :where(.css-dev-only-do-not-override-yzvl1e).ant-input-affix-wrapper-disabled,
  :where(.css-dev-only-do-not-override-yzvl1e).ant-input[disabled] {
    background-color: ${colors.gainsBoro} !important;
    box-shadow: none !important;
    color: ${colors.mainText};
  }
`;
export const SearchCustomWrapper = styled.div<any>`
  display: flex;
  padding: ${(props) => props?.padding || '0.625rem 1.25rem 0.313rem 0.938rem'};
`;
export const InputSearch = styled(Input)<any>`
  width: ${(props) => props?.widthInput || '16.875rem'};
  height: ${(props) => props?.heightInput || '2.5rem'};
  border-radius: 0.25rem;
  font-size: 0.875rem;
  border: none;
  margin-right: 1em;
  padding-left: 1.875rem;
  padding: 0 0.625rem;
  font-family: 'Noto Sans JP', sans-serif !important;
  box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
`;

export const SearchIcon = styled.div`
  cursor: pointer;
  width: 2.313rem;
  height: 2.313rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${getColorSite()};
  border-radius: 0.25rem;
  img {
    width: 1.111rem;
    height: 1.406rem;
  }
`;
