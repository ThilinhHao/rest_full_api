import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const HeaderFootstepsCompanyWrapper = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.mainText};
  display: flex;
  align-items: center;
  padding-left: 1rem;
  img {
    width: 3.125rem;
    height: 3.125rem;
  }
`;
