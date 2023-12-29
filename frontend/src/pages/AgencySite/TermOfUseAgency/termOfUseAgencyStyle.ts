import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ContainerWrapper = styled.div<any>`
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
  justify-content: ${(props) => (props?.between ? 'space-between' : 'unset')};
`;
