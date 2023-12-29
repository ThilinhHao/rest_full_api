import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const UploadDocumentWrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  background: ${colors.white};
  padding: 1.875rem 10rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const HeaderPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 106.25rem;
  padding-bottom: 1.313rem;
  border-bottom: 1px solid ${colors.mainText};
  img {
    width: 6.5rem;
    height: 4.625rem;
  }
  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.5rem;
    text-align: center;
    margin-top: 1.688rem;
  }
`;
