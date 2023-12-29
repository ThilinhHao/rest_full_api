import { ButtonStyle } from '@components/Button/styled';
import { Button, Input } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const TitleHeaderSetting = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  margin-left: 0.625rem;
`;

export const BoxListCompanyB2B = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  margin-left: 0.625rem;
`;

export const RowRequestB2B = styled.div`
  display: flex;
  color: ${colors.pairB2BColorSilver};
  margin-left: 10.125rem;
  margin-right: 13.75rem;
  justify-content: space-between;
`;

export const ColInputRequestB2B = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.813rem;
  display: flex;
  justify-items: center;
  align-items: center;

  .tile-request {
    margin-right: 1.875rem;
  }
`;
export const ColPagination = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: center;
`;

export const InputB2B = styled(Input)`
  background: ${colors.pairB2BBackgroundWhite};
  box-shadow: inset 1px 1px 4px ${colors.pairB2BBoxShadow};
  border-radius: 5px;
  width: 25rem;
  height: 3.125rem;
  font-size: 1.5rem;
  margin-right: 1.875rem;
`;

export const ButtonB2B = styled(ButtonStyle)`
  filter: drop-shadow(2px 2px 1px ${colors.pairB2BBoxShadow});
  width: 3.125rem;
  height: 3.125rem;
  background: ${colors.pairB2BBtnB2BSubmit};
  border-radius: 50%;
  color: white;
  font-weight: 500;
  font-size: 1.125rem;
  padding: 0px;
`;

export const ButtonPagination = styled(Button)`
  filter: drop-shadow(2px 2px 1px ${colors.pairB2BBoxShadow});
  width: 2.438rem;
  height: 2.438rem;
  border: 1px solid ${colors.pairB2BBorder};
  background: ${colors.pairB2BBackgroundWhite};
  border-radius: 50%;
  color: ${colors.pairB2BColorYellow};
  font-weight: 500;
  font-size: 1.875rem;
  padding: 0px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: 1.875rem;
  &.active {
    box-shadow: inset 0px 4px 4px ${colors.pairB2BBoxShadow};
    color: ${colors.pairB2BColorWhite};
    background: ${colors.pairB2BBackgroundYellow};
  }
  .pre-icon {
    transform: rotate(180deg);
    display: flex;
  }
`;

export const RowCompanyB2B = styled.div`
  margin-left: 12.5rem;
  margin-right: 12.5rem;
  border-bottom: 0.5px solid ${colors.pairB2BColorSilver};
  padding-bottom: 15px;
  padding-top: 2.063rem;
`;

export const ItemCompanyB2B = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 1.25rem;
  margin-right: 1.25rem;

  font-size: 1.5rem;
  line-height: 29px;
  color: ${colors.pairB2BColorSilver};
  .col-left {
    display: flex;
    align-items: center;
  }
  .col-right {
    display: flex;
    align-items: center;
  }
  .view-status {
    width: 11.25rem;
    min-width: 11.25rem;
    height: 3.5rem;
    background: ${colors.pairB2BBackgroundYellow};
    border-radius: 5px;
    font-weight: 500;
    font-size: 1.5rem;
    color: ${colors.pairB2BColorWhite};
    text-align: center;
    line-height: 3.5rem;
    margin-right: 3.125rem;
  }
  .status-request {
    background: ${colors.pairB2BStatusColorRequest};
  }
  .status-confirm {
    background: ${colors.pairB2BStatusColorConfirm};
  }
  .status-reject {
    background: ${colors.pairB2BStatusColorReject};
  }
  .status-paired {
    background: ${colors.pairB2BStatusColorB2Bd};
    min-width: 11rem;
  }
  .status-cancel {
    background: ${colors.pairB2BStatusColorCancel};
  }
  .modal-confirm-pair {
    display: flex;
    padding-top: 6rem;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonActiveB2B = styled(ButtonStyle)`
  background: ${colors.pairB2BBackgroundWhite};
  border: 1px solid ${colors.pairB2BBorderCoral};
  box-shadow: 2px 2px 2px ${colors.pairB2BBoxShadow};
  border-radius: 2.5rem;
  width: 13.125rem;
  height: 3.5rem;
  font-weight: 500;
  font-size: 1.375rem;
  text-align: center;
  color: ${colors.pairB2BColorCoral};
`;

export const ButtonAprovedB2B = styled(ButtonStyle)`
  font-weight: 500;
  font-size: 1.375rem;
  text-align: center;
  color: ${colors.pairB2BColorWhite};
  background: ${colors.pairB2BBtnApproved};
  box-shadow: 2px 2px 4px ${colors.pairB2BBoxShadow};
  border-radius: 2.5rem;
  width: 13.125rem;
  height: 3.5rem;
  margin-right: 1.25rem;
`;
