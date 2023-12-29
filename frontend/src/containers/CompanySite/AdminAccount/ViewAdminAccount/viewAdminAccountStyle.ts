import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const ModalContent = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 20rem;
    span {
      /* font-family: 'Inder'; */
      font-style: normal;
      font-weight: 400;
    }
    span:nth-child(1) {
      font-size: 1.75rem;
      line-height: 2.188rem;
      margin-bottom: 4rem;
    }
    span:nth-child(2) {
      font-size: 1.5rem;
      line-height: 1.875rem;
      margin-bottom: 6.25rem;
    }
  }
  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      width: 25rem;
      height: 4.25rem;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.625rem;
      &:hover {
        transform: translateY(-0.07em);
      }
    }
    .delete {
      background: linear-gradient(270deg, #f65171 0%, #f65171 100%);
      color: ${colors.white};
      border: none;
      margin-right: 2.375rem;
    }
    .cancel {
      background: ${colors.white};
      color: ${colors.atomicTangerine};
      border: 1px solid ${colors.atomicTangerine};
      margin-left: 2.375rem;
    }
    .success {
      background: ${colors.btnDefaultCompanySite};
      color: ${colors.white};
      border: none;
    }
  }
`;
