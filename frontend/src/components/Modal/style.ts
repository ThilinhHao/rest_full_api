import { Button, Modal } from 'antd';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const ModalCustomWrapper = styled(Modal)`
  .ant-modal-content {
    border-radius: 0.25rem;
  }
`;

export const ModalCommonWrapper = styled(Modal)<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: calc(100vh - 2rem);

  .ant-modal-content {
    width: ${(props) => props.width} !important;
    pointer-events: auto;
    padding: 20px 24px;
    border-radius: 15px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  }
  .ant-modal-body {
    text-align: center;
    padding: 1.875rem;
  }
`;

export const ButtonFooter = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
`;

export const ButtonCuttom = styled(Button)<any>`
  cursor: ${(props) => (props?.loading ? 'wait !important' : 'pointer')};
  /* background: ${getColorSite()}; */
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  border-radius: 2.5rem;
  min-height: 3.5rem;
  min-width: 13.125rem;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 2rem;
  padding: 0.313rem;
  margin: 0 0.5rem;
  &.btn-ok {
    color: #fff;
    background-color: #4096ff;
    &:hover:enabled {
      transform: scale(1.05);
      color: #fff;
      background-color: #4096ff;
    }
  }

  &.btn-cancel {
    background-color: #ffffff;
    border-color: ${(props) => props?.btnCancelColor || '#d9d9d9'};
    color: ${(props) => props?.btnCancelColor || '#d9d9d9'};
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    &:hover:enabled {
      transform: scale(1.05);
      color: ${(props) => props?.btnCancelColor || '#4096ff'};
      border-color: ${(props) => props?.btnCancelColor || '#4096ff'};
    }
  }
`;
