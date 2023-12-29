import styled from 'styled-components';

export const ContainerWrapper = styled.div<any>`
  width: 100%;
  height: ${(props) => props?.height || '100%'};
  display: flex;
  padding: ${(props) => props?.padding || '0.625rem 0 0 1.25rem'};
  font-family: 'M PLUS 1' !important;
`;
export const ContainerTermOfUse = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
