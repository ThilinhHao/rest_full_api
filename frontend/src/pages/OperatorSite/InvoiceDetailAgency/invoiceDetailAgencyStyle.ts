import { Button } from 'antd';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const InvoiceDetailWrapper = styled.div<any>`
  padding: ${(props) => props?.padding || '0.75rem 14.375rem 0.75rem 10.625rem'};
  display: block;
`;

export const HeaderWrapper = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.mainText};
  display: flex;
  align-items: center;
  padding-left: 5rem;
  img {
    width: 3.125rem;
    height: 3.125rem;
  }
  .title-page {
    display: flex;
  }
`;

export const TitleHeader = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  margin-left: 3.563rem;
`;

export const DateInvoice = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: ${colors.mainText};
  height: 2.25rem;
  display: flex;
  align-items: center;
  margin-left: 3.563rem;
  margin-top: 1rem;
`;

export const ButtonExport = styled(Button)<any>`
  height: ${(props) => props.height || '2.5rem'};
  width: ${(props) => props.width || '18.75rem'};
  background: ${getColorSite()};
  border: none;
  font-style: normal;
  font-weight: ${(props) => props?.fontWeight || '400'};
  font-size: 1.375rem;
  line-height: 1.688rem;
  color: ${colors.white} !important;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.margin || '0 0 0 1.313rem'};
  &:hover {
    transform: translateY(-0.07em);
  }
`;

export const ButtonConfirm = styled(Button)<any>`
  height: ${(props) => props.height || '2.313rem'};
  width: ${(props) => props.width || '9.375rem'};
  background: ${getColorSite()};
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  border: none;
  font-style: normal;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.438rem;
  color: ${colors.white} !important;
  border-radius: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  margin: 0 0 0 9rem;
  &:hover {
    transform: translateY(-0.07em);
  }
  &:disabled {
    span {
      color: ${colors.mainText} !important;
    }
  }
  .iconFile {
    position: absolute;
    width: 1.875rem;
    height: 1.875rem;
    left: 0.438rem;
    top: 0.188rem;
    & + span {
      margin-left: 1.25rem;
    }
  }
`;
