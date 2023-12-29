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

export const LinePage = styled.div`
  width: 28.25rem;
  height: 0.25rem;
  background-color: ${colors.pewter};
  margin: 0 auto;
  position: absolute;
  top: 4rem;
`;
