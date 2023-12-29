import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const TitleHeader = styled.div`
  font-size: 1.625rem;
  font-weight: 400;
  white-space: nowrap;
  font-style: normal;
  line-height: 1.938rem;
  margin-top: 1.375rem;
`;

export const HeaderWrapper = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.mainText};
  display: flex;
  align-items: flex-start;
  padding: 1.688rem 3.125rem 2.375rem 8rem;
  height: 7.5rem;
`;
