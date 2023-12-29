import { Switch } from 'antd';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const ListInvoiceTableWrapper = styled.div`
  width: 99.875rem;
  margin: 3.5rem 3.125rem;
  filter: drop-shadow(0.188rem 0.188rem 0.375rem rgba(0, 0, 0, 0.161));
  border: 0.125rem solid ${getColorSite()};
  border-radius: 0.625rem;
`;

export const HeaderTable = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 2.938rem 0.625rem 2.5rem;
  color: ${getColorSite()};
  font-style: normal;
  font-size: 1.625rem;
  line-height: 1.938rem;
  border-bottom: 0.125rem solid ${getColorSite()};
`;
export const TotalAmountTable = styled.div`
  font-weight: 700;
`;
export const DateListInvoice = styled.div`
  font-weight: 500;
`;

export const InvoiceItemWrapper = styled.div`
  width: 100%;
  padding: 1.438rem 6.25rem;
  font-size: 1.5rem;
  background: ${colors.lightGrey};
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  width: 87.5rem;
  background: ${colors.backgroudInvoice};
  height: 3.75rem;
  padding: 0 3.125rem;
  border-radius: 0.625rem;
  font-weight: 500;
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  width: 87.5rem;
  background: ${colors.white};
  height: 3.75rem;
  padding: 0 3.125rem;
  border-radius: 0.625rem;
  position: relative;
  &.hasBG {
    background: ${colors.colorColumnInvoice};
  }
  .notConfirm {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 1.25rem;
    top: 1.25rem;
    background-color: ${colors.deepChestnut};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color: ${colors.white};
    font-size: 0.875rem;
    font-weight: 700;
  }
`;

export const AgencyName = styled.div`
  width: 15.25rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CompanyName = styled.div`
  width: 23.25rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatusInvoice = styled.div`
  text-align: center;
  width: 10.75rem;
`;

export const DateInvoice = styled.div`
  text-align: center;
  width: 10.75rem;
`;

export const YenItem = styled.div`
  text-align: center;
  width: 13.25rem;

  word-break: break-word;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export const ChangeStatus = styled.div`
  text-align: center;
  width: 11.25rem;
`;

export const UsagePlan = styled.div`
  text-align: center;
  width: 14.25rem;
`;

export const SwitchStatus = styled(Switch)`
  width: 3.125rem;
  height: 0.813rem;
  &.ant-switch-disabled {
    opacity: 1 !important;
  }
  .ant-switch-handle {
    width: 1.625rem;
    height: 1.625rem;
    top: -0.438rem;
    inset-inline-start: -0.813rem !important;
    &::before {
      border-radius: 50%;
    }
  }
  &.ant-switch-checked {
    .ant-switch-handle::before {
      background: ${getColorSite()};
    }
    .ant-switch-inner {
      box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
      background: ${colors.greenCyan};
    }
    .ant-switch-handle {
      inset-inline-start: 2.5rem !important;
    }
  }
`;

export const SwitchStatusError = styled(SwitchStatus)`
  .ant-switch-inner {
    box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
    background: ${colors.reddish};
  }
`;

export const SwitchStatusVerifyOTP = styled(SwitchStatus)`
  .ant-switch-inner {
    box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
    background: #BFBFBF;
  }
  &.ant-switch-checked {
    .ant-switch-handle::before {
      background: #FFFFFF;
    }
    .ant-switch-inner {
      box-shadow: inset 0.063rem 0.063rem 0.25rem rgba(0, 0, 0, 0.25);
      background: #BFBFBF;
    }
  }
`;
