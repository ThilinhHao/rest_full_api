import styled from 'styled-components';

export const Container = styled.div<any>`
  width: 100%;
  height: ${(props) => props?.height || 'unset'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
