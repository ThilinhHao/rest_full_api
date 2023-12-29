import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

interface IPropsItem {
  isSelected: boolean;
  background?: string;
}

export const ItemCommonWrapper = styled.div<IPropsItem>`
  cursor: pointer;
  display: flex;
  margin-top: 1.125rem;
  font-size: 1.125rem;
  position: relative;
  align-items: center;
  background-color: ${(props) => (props?.isSelected ? colors.white : props?.background || colors.mainColorCompany)};
  color: ${(props) => (props?.isSelected ? props?.background || colors.mainColorCompany : colors.white)};
  border: 1px solid ${(props) => props?.background || colors.mainColorCompany};
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.4rem;
  transition: 0.1s;
  div:nth-child(1) {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0.5rem;
    transition: 0.3s;
  }
  div:nth-child(2) {
    padding: 0.5rem;
    transition: 0.3s;
    width: 14rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:hover {
    -ms-transform: scale(1.02);
    -webkit-transform: scale(1.02);
    transform: scale(1.02);
  }
  img {
    width: 2rem;
    height: 2.125rem;
    margin-right: 0.5rem;
  }
`;
