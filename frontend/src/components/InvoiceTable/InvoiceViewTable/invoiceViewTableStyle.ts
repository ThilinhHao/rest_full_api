import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const TableExportWrapper = styled.div`
  width: 81.25rem;
  background-color: ${colors.white};
  box-shadow: 0 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  padding-bottom: 3.875rem;
`;
export const SpaceTop = styled.div`
  width: 100%;
  background-color: ${colors.backgroudInvoice};
  height: 2.5rem;
`;
export const HeaderExport = styled.div`
  display: flex;
`;
export const LeftHeader = styled.div`
  padding-left: 4.375rem;
  padding-top: 1.25rem;
  width: 52.5rem;
  padding-right: 10rem;
`;
export const RightHeader = styled.div`
  padding-top: 1.438rem;
  width: 28.813rem;
  padding-right: 1rem;
`;
export const TitleTable = styled.div`
  font-weight: 700;
  font-size: 1.875rem;
`;
export const TextLeft = styled.div`
  font-size: 1.625rem;
  margin-left: 1.625rem;
  margin-top: 0.5rem;
`;
export const TextLeftSmaller = styled.div`
  font-size: 1.375rem;
  margin-left: 1.625rem;
  margin-top: 0.5rem;
`;

export const TextAmount = styled.div`
  font-size: 1.375rem;
  margin-left: 1.625rem;
  margin-top: 0.5rem;
  width: auto;
  white-space: nowrap;
  max-width: 19rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TaxInclude = styled.div`
  margin-left: 1.625rem;
  font-size: 1.625rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  min-width: 3.75rem;
`;
export const LineTable = styled.div`
  border-bottom: 1px solid #707070;
  width: 100%;
  background-color: #707070;
`;
export const NotiBill = styled.div`
  padding-top: 1.25rem;
  margin-left: 1.625rem;
  font-size: 1rem;
`;
export const WrapperMoneyPay = styled.div`
  display: flex;
  background-color: ${colors.colorColumnInvoice};
  align-items: center;
  padding-bottom: 0.5rem;
  width: auto;
  white-space: nowrap;
`;
export const WrapperBill = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const TextRight = styled.div`
  font-size: 1.125rem;
  margin-top: 0.5rem;
`;

export const TextRightMail = styled(TextRight)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const NameRight = styled.div`
  font-size: 1.625rem;
  margin-top: 0.5rem;
`;
export const DateTxt = styled.div`
  font-size: 1.5rem;
  text-align: right;
`;

export const TableStyled = styled.table`
  margin: 0 auto;
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: ${colors.mainText};
  border-spacing: 0.625rem;
  &#InvoiceExportTable {
    display: none;
  }
`;
export const HeaderExportHidden = styled.table`
  margin: 0 auto;
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
  td:nth-child(1).longer {
    width: 56.375rem !important;
    max-width: 56.375rem !important;
  }
  td:nth-child(3).longer {
    width: 10rem !important;
    max-width: 10rem !important;
  }
  td:nth-child(1) {
    width: 51.875rem;
    max-width: 51.875rem;
  }
  td:nth-child(2) {
    width: 5rem;
    max-width: 5rem;
  }
  td:nth-child(3) {
    width: 7.5rem;
    max-width: 7.5rem;
  }
  td:nth-child(4) {
    width: 10rem;
    max-width: 10rem;
  }
`;

interface IRowTable {
  index: number;
}
export const RowTable = styled.tbody<IRowTable>`
  text-align: right;
  height: 2.75rem;
  td {
    div {
      padding: 0.25rem 1rem;
      min-height: 1.875rem;
      width: 100%;
      background: ${(props) => (props?.index % 2 === 0 ? '#fff' : colors.colorColumnInvoice)};
      word-break: break-all;
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

export const FooterTableWrapper = styled.tbody`
  width: 76.25rem;
  font-size: 1.125rem;
  td {
    div.title-footer {
      min-height: 9.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-top: 1px solid #707070;
      border-bottom: 1px solid #707070;
      font-style: normal;
      font-weight: 400;
      font-size: 1.375rem;
      line-height: 1.688rem;
      color: ${colors.mainText};
      span {
        word-break: break-all;
      }
    }
    div.title {
      text-align: center;
    }
    div.amount {
      text-align: right;
      padding-right: 0.688rem;
    }
  }
  td.hasBG {
    background: ${colors.colorColumnInvoice};
  }
`;

export const PageNumber = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 6.25rem 0 0 39.375rem;
  background-color: ${getColorSite()};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: ${colors.white};
`;
