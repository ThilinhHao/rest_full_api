import { Button } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const InvoiceItemWrapper = styled.div`
  width: 93.75rem;
  margin-left: 6.25rem;
  margin-top: 4.75rem;
  font-size: 1.5rem;
`;
export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.mainColorCompany};
  padding: 0.75rem 1.125rem;
  background: ${colors.mainColorCompany};
  width: 100%;
  height: 3.75rem;
  color: ${colors.white};
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 2.375rem;
  border-top-right-radius: 0.625rem;
  border-top-left-radius: 0.625rem;
`;
export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 6.25rem;
`;
export const ItemInvoice = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.lineColor};
  height: 10rem;
  flex-direction: column;
  background: #ffffff;
  border: 0.125rem solid #fdab29;
  border-radius: 0.625rem;
  margin-bottom: 4.375rem;
`;
export const NameItemInvoice = styled.div`
  width: 24rem;
  padding-right: 1rem;
  font-weight: 500;

  word-break: break-word;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
export const AmountFee = styled.div`
  width: 18rem;
  font-weight: 500;
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
  background: linear-gradient(270deg, #fd9672 0%, #ffb239 100%);
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  border: none;
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.688rem;
  color: ${colors.white} !important;
  border-radius: 0.625rem;
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
`;
