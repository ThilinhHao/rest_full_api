import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const HistoryTotalBottomWrapper = styled.div`
  font-size: 1.5rem;
  display: flex;
  padding-bottom: 0.2rem;
  width: 80.5rem;
  margin-left: 11.063rem;
  font-weight: 700;
  color: ${getColorSite()};
  height: 7.5rem;
  border-top: 1px solid ${colors.lineColor};
  align-items: center;
`;
export const HistoryTotalTitle = styled.div`
  width: 18.75rem;
  text-align: center;
  font-weight: 700;
  color: ${getColorSite()};
`;
export const HistoryTotalNumber = styled.div`
  width: 15.625rem;
  text-align: center;
  font-weight: 700;
  color: ${getColorSite()};
`;
