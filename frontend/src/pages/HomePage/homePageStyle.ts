import styled from 'styled-components';

const HomePageWrapper = styled.div<any>`
  /* background-color: red; */
  padding: ${(props) => (props.firstTime ? '5rem 5rem 0 8.75rem' : '0.625rem 0 0 0.625rem')};
  width: 100%;
  height: 100%;
`;

export default HomePageWrapper;
