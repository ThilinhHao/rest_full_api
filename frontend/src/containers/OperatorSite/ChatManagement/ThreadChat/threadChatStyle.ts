import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const Container = styled.div<any>`
  width: 100%;
  height: ${(props) => props?.height || 'unset'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ThreadChatWrapper = styled.div`
  height: calc(100vh - 13rem);
  overflow: auto;
  padding: 0.625rem 0rem 0.625rem 1.125rem;
  ::-webkit-scrollbar {
    width: 0.375rem;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.ashGrey};
  }
`;

export const ItemWrapper = styled.div<any>`
  cursor: pointer;
  display: flex;
  margin-top: 1.125rem;
  font-size: 1.125rem;
  position: relative;
  align-items: center;
  background-color: ${(props) => (props.isSelected ? colors.mainColor : props?.suspend && colors.lightGray)};
  color: ${(props) => (props.isSelected ? colors.white : props?.suspend && colors.white)};
  border-radius: 0.4rem;
  transition: 0.1s;
  width: 16.875rem;
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
  span {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -3.75rem;
    background-color: ${colors.deepChestnut};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color: ${colors.white};
    font-size: 0.875rem;
    font-weight: 700;
  }
  &:hover {
    background-color: ${colors.mainColorHover};
    color: ${colors.white};
  }
`;
