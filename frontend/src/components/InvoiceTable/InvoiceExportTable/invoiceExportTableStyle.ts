import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const HeaderExport = styled.table`
  margin: 0 auto;
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: ${colors.mainText};
  border-spacing: 0.625rem;
  &.InvoiceExportLeftHeader,
  &.InvoiceExportRightHeader {
    display: none;
  }
`;

export const TableStyled = styled.table`
  margin: 0 auto;
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: ${colors.mainText};
  border-spacing: 0.625rem;
  &.InvoiceExportTable {
    display: none;
  }
`;
export const HeaderTableWrapper = styled.thead<any>`
  margin: 0 auto;
  width: 76.25rem;
  height: 10px;
  text-align: center;
  font-size: 1.125rem;
  height: 1.875rem;
  td {
    padding: 0.025rem 0;
    background: ${(props) => (props?.isExport ? getColorSite() : colors.backgroudInvoice)} !important;
  }
  td:nth-child(1) {
    width: 51.875rem;
  }
  td:nth-child(2) {
    width: 5rem;
  }
  td:nth-child(3) {
    width: 7.5rem;
  }
  td:nth-child(4) {
    width: 10rem;
  }
`;

export const RowTable = styled.tbody`
  text-align: right;
  height: 2.75rem;
  td {
    div {
      padding: 0.25rem 1rem;
      height: 1.875rem;
      width: 100%;
    }
  }
  td:nth-child(1) {
    width: 51.875rem;
    text-align: left;
  }
  td:nth-child(2) {
    width: 5rem;
  }
  td:nth-child(3) {
    width: 7.5rem;
  }
  td:nth-child(4) {
    width: 10rem;
  }
`;

export const SpaceTable = styled.tbody<any>`
  width: 76.25rem;
  height: ${(props) => (props?.height ? `${props?.height}rem` : '1rem')};
`;
