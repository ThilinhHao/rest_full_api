import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const TopPageAgencyCard = styled.div`
  position: relative;
  margin-top: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 106.25rem;
  height: calc(100vh - 10rem);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: ${colors.white};
  overflow: auto;
`;
export const WrapperFlexRow = styled.div`
  display: flex;
`;
export const LoadingAgencyWrapper = styled.div`
  width: 106.25rem;
  position: absolute;
  height: calc(100vh - 10rem);
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: rgb(255, 255, 255, 0.5);
  z-index: 2;
`;
