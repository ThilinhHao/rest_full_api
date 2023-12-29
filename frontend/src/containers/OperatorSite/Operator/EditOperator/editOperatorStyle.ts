import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const PasswordViewWrapper = styled.div`
  width: 18.75rem;
  height: 2.5rem;
  background-color: rgb(193, 193, 193);
  color: ${colors.mainText};
  border-radius: 2rem;
  padding-left: 2rem !important;
  span {
    margin-bottom: -0.5rem;
  }
`;

export const ITemMarOperator = styled.div`
  color: #f65171;
  margin-top: 1.1rem;
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 1rem !important;
  white-space: nowrap;
`;

export const ITemMarOperatorEdit = styled.div`
  color: #f65171;
  margin-top: 0.7rem;
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 1rem !important;
  white-space: nowrap;
`;