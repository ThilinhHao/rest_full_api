import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const InvoiceDetailWrapper = styled.div<any>`
  padding: ${(props) => props?.padding || '0.75rem 14.375rem 0.75rem 10.625rem'};
  display: block;
`;

export const DateInvoice = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: ${colors.mainText};
  height: 2.25rem;
  display: flex;
  align-items: center;
`;

export const LoadingInvoice = styled.div<any>`
  width: 81.25rem;
  height: 100%;
  position: absolute;
  background: rgb(255, 255, 255, 0.8);
  z-index: 1;
  margin-top: 3.2rem;
`;
