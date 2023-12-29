import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

interface IPropsItem {
  isSelected: boolean;
  custom: {
    color: string;
    background: string;
    shadow: string;
  };
}
export const ItemCompanyWrapper = styled.div<IPropsItem>`
  cursor: pointer;
  display: flex;
  margin-top: 1.125rem;
  font-size: 1.125rem;
  position: relative;
  align-items: center;
  background-color: ${(props) => (props.isSelected ? colors.mainColor : props.custom.background)};
  color: ${(props) => (props.isSelected && props.custom.color === 'unset' ? colors.white : props.custom.color)};
  box-shadow: ${(props) => !props.isSelected && props.custom.shadow};
  border-radius: 0.4rem;
  margin-right: 2rem;
  transition: 0.1s;
  position: relative;
  div:nth-child(1) {
    width: 5.938rem;
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
    margin-top: -0.15rem;
  }
  &:hover {
    background-color: ${colors.mainColorHover};
    color: ${(props) => (props.custom.color === 'unset' ? colors.white : props.custom.color)};
  }
  .waiting-validate {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #b75252;
    color: white;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    margin-top: -0.8rem;
    margin-left: -0.8rem;
  }
`;
