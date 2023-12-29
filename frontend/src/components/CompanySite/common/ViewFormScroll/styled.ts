import styled from 'styled-components';

export const ViewFormScroll = styled.div<any>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props?.padding || '0.938rem 11.25rem'};
  margin: ${(props) => props?.margin || '0'};
  .rowHidden {
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s ease-in-out, max-height 0.4s ease-in-out;
    max-height: 0;
  }
  .rowVisible {
    transform: scaleY(1);
    transform-origin: top;
    transition: transform 0.3s ease-in-out, max-height 0.4s ease-in-out;
    max-height: 500rem;
  }
`;
