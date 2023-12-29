import styled from 'styled-components';

export const StyleLogoText = styled.div`
  img {
    &:first-child {
      width: 14.375rem;
      height: 26.125rem;
      margin-right: 3.75rem;
    }
    &:last-child {
      width: 15.188rem;
      height: 13.438rem;
    }
  }
`;

export const CompanyStyleLogoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3.438rem;
  img {
    &:first-child {
      width: 24.688rem;
      height: 18.063rem;
      margin-bottom: 4.438rem;
    }
    &:last-child {
      width: 46.75rem;
      height: 26.813rem;
    }
  }
`;
