import { colors } from 'constants/colorsBase';
import styled from 'styled-components';
import { CardBase } from 'styles';

export const CardCreateAgency = styled(CardBase)`
  position: relative;
  margin-top: 1rem;
  padding: 2.188rem 10rem 2.063rem 10rem;
  width: 105.25rem !important;
  max-width: 105.25rem !important;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-gutter: stable;
`;

interface IRowCreateAgencyWrapper {
  borderNone?: boolean;
}
export const RowCreateAgencyWrapper = styled.div<IRowCreateAgencyWrapper>`
  display: flex;
  align-items: flex-start;
  border-bottom: ${(props) => (props.borderNone ? 'unset' : `1px solid ${colors.lineColor}`)};
  padding-top: 1rem;
`;
export const RoWTitle = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 1rem;
`;
export const LabelLeft = styled.div`
  width: 18.125rem;
  padding-top: 0.3rem;
  font-size: 1.25rem;
  padding-left: 4.438rem;
`;
export const LabelMoney = styled.div`
  width: 25.125rem;
  padding-top: 0.3rem;
  font-size: 1.25rem;
`;
