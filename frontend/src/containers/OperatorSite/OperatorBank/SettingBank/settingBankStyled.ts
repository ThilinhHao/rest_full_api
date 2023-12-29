import ButtonCustom from '@components/Button';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const UsagePlanPricing = styled.div`
  margin-top: 1rem;
  display: flex;
  margin-left: 19.625rem;
  font-size: 1.375rem;
  font-weight: 500;
`;
export const BtnSettingWrapper = styled.div`
  width: 59.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 9.813rem;
`;
export const WrapperSelect = styled.div`
  margin-left: 13rem;
  padding: 1.375rem 6.5rem 0rem 6.5rem;
  .ant-form-item {
    margin-bottom: 1.3rem;
  }
`;

interface IFormInputWrapper {
  isConfirm: boolean;
}
export const FormInputWrapper = styled.div<IFormInputWrapper>`
  height: ${(props) => (props?.isConfirm ? '0' : 'unset')};
  visibility: ${(props) => (props?.isConfirm ? 'hidden' : 'visible')};
  overflow: ${(props) => (props?.isConfirm ? 'hidden' : 'unset')};
`;
export const CancelBtn = styled(ButtonCustom)`
  height: 4.25rem;
  width: 25rem;
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  font-size: 1.625rem;
  color: ${colors.mainColor};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.mainColor};
  :hover {
    color: ${colors.mainColor} !important;
    border: 1px solid ${colors.mainColor} !important;
  }
`;
