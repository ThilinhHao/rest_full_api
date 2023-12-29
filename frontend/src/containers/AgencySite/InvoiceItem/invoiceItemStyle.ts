import { Button } from 'antd';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const InvoiceItemWrapper = styled.div`
  width: 93.75rem;
  margin-left: 6.25rem;
  margin-top: 2.5rem;
  font-size: 1.5rem;
`;

export const ItemInvoice = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemMonth = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.625rem;
  line-height: 1.938rem;
  color: ${getColorSite()};
`;

export const InvoiceContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0 2rem 0;
  border-radius: 0.875rem;
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  margin-left: 3.75rem;
`;

export const ItemHeader = styled.div`
  display: flex;
  padding: 1.375rem 2.5rem;
  background: ${colors.backgroudInvoice};
  width: 100%;
  height: 4.313rem;
  color: ${colors.mainText};
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.5rem;
  border-radius: 0.875rem;
  align-items: center;
`;

export const ItemContent = styled.div`
  display: flex;
  padding: 1.375rem 2.5rem;
  background: ${colors.white};
  width: 100%;
  height: 4.563rem;
  color: ${colors.mainText};
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.5rem;
  border-radius: 0.875rem;
  align-items: center;
`;

export const DateInvoice = styled.div`
  width: 15.125rem;
  padding-right: 1rem;
  font-weight: 500;

  word-break: break-word;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export const StatusInvoice = styled.div`
  width: 16.625rem;
  font-weight: 500;
  padding-left: 2rem;
`;

export const YenItem = styled.div`
  font-weight: 500;
  width: 24rem;
  min-width: 24rem;

  word-break: break-word;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export const ButtonView = styled(Button)<any>`
  height: ${(props) => props.height || '3.125rem'};
  width: ${(props) => props.width || '12.5rem'};
  background: ${colors.white};
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  border: 0.063rem solid ${getColorSite()};
  font-weight: ${(props) => props.fontWeight || '700'};
  font-size: ${(props) => props.fontSize || '1.375rem'};
  line-height: 1.688rem;
  color: ${getColorSite()} !important;
  border-radius: ${(props) => props.borderRadius || '0.625rem'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  &.export {
    position: absolute;
    right: 13.625rem;
  }
  &:hover {
    transform: translateY(-0.07em);
  }
  .square {
    background: ${colors.white};
    min-width: 1.875rem;
    height: 1.875rem;
    width: 1.875rem;
    border-radius: 50%;
    margin-right: 1.375rem;
  }
  .notConfirmBtn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: -1rem;
    top: -1rem;
    background-color: ${colors.deepChestnut};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color: ${colors.white};
    font-size: 0.875rem;
    font-weight: 700;
  }
`;
