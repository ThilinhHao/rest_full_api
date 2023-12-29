import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const BreadCrumbWrapper = styled.div<any>`
  display: flex;
  flex-direction: row;
  background-color: ${colors.white};
  width: fit-content;
  border-radius: 200px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.161);
  overflow: hidden;
  margin: ${(props) => props.margin || '0'};
`;
interface IBoxBread {
  isHome?: boolean;
}
export const BoxBread = styled.div<IBoxBread>`
  background-color: ${colors.white};
  padding: ${(props) => (props?.isHome ? '0 0.625rem' : '0 1.063rem 0 0.5rem')};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  margin-left: ${(props) => (props?.isHome ? 'unset' : '4px')};
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;
  box-shadow: 1px 0px 1px rgba(0, 0, 0, 0.161);
`;
export const HomeIcon = styled.img`
  cursor: pointer;
  width: 1.25rem;
  height: 1rem;
`;
interface ITextBread {
  focus?: boolean;
}
export const TextBread = styled.div<ITextBread>`
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: underline;
  /* text-decoration: ${(props) => (props?.focus ? 'underline' : 'unset')}; */
  text-underline-offset: 0.3rem;
  text-decoration-color: ${getColorSite()};
  color: ${colors.davyGrey};
`;
