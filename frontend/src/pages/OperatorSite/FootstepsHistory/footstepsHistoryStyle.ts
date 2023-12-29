import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

interface IFootstepsHistoryCard {
  between?: boolean;
}
export const FootstepsHistoryCard = styled.div<IFootstepsHistoryCard>`
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
export const HeaderFootstepsWrapper = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.mainText};
  display: flex;
  align-items: center;
  padding-left: 5rem;
  img {
    width: 3.125rem;
    height: 3.125rem;
  }
`;
export const LoadingFootsteps = styled.div`
  width: 106.25rem;
  height: calc(100vh - 10rem);
  position: absolute;
  background: rgb(255, 255, 255, 0.8);
  z-index: 5;
  display: flex;
  align-items: center;
`;
