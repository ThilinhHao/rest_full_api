import ButtonCustom from '@components/Button';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const DetailWrapper = styled.div<any>`
  padding-top: ${(props) => props?.paddingTop || '0.813rem'};
  padding-left: ${(props) => props?.paddingLeft || '0.625rem'};
  width: 100%;
`;

export const TitlePageWrapper = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 0.063rem solid #333333;
  padding: ${(props) => props?.padding || '0 2.5rem 0.313rem 2.5rem'};
  div:nth-child(2) {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 2.688rem;
    color: #333333;
  }
`;

export const PrefixIcon = styled.img<any>`
  cursor: pointer;
  width: ${(props) => props?.width || '3.125rem'};
  height: ${(props) => props?.height || '3.125rem'};
  margin-right: 0.625rem;
`;

export const ViewFormBase = styled.div<any>`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props?.paddingTop || '2.188rem'};
  min-height: ${(props) => props?.minHeight || 'unset'};
  justify-content: ${(props) => props?.justifyContent || 'unset'};
`;

export const TitleRow = styled.div<any>`
  display: flex;
  padding: ${(props) => props?.padding || '0.313rem 3.125rem'};
  border-bottom: 0.031rem solid #333333;
  align-items: flex-start;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.188rem;
  span {
    margin-right: 1.25rem;
  }
`;

export const FormRow = styled.div<any>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props?.padding || '1.875rem 5.625rem 0 5.625rem'};
  font-size: 1.5rem;
  div:not(:first-child) {
    margin-top: 1.25rem;
    span:first-child {
      width: 14.375rem;
    }
  }
  div {
    display: flex;
    align-items: center;
    span:first-child {
      display: inline-block;
      width: 14.375rem;
    }
    span:last-child {
      display: inline-block;
      width: calc(100% - 14.375rem);
      word-break: break-all;
    }
  }
`;

export const BtnWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: ${(props) => props?.paddingBottom || '2rem'};
  padding-top: ${(props) => props?.paddingTop || '0'};
  button:nth-child(1) {
    margin-right: 1.313rem;
  }
  button:nth-child(2) {
    margin-left: 1.313rem;
  }
`;

export const BtnActionWrapper = styled(ButtonCustom)<any>`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: ${(props) => props?.height || '4.25rem'};
  width: ${(props) => props?.width || '25rem'};
  background: ${(props) => props?.background || 'linear-gradient(270deg, #fd9672 0%, #ffb239 100%)'};
  box-shadow: ${(props) => (props?.boxshadow ? `${props?.boxshadow}` : '0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25)')};
  border-color: ${(props) => props?.borderColor || 'none'};
  font-size: 1.625rem;
  color: ${(props) => props?.color || colors.white};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${(props) => props?.paddingTop || '0'};
  &:hover {
    color: ${(props) => props?.color || colors.white} !important;
    border-color: ${(props) => props?.borderColor || 'none'} !important;
  }
  &:disabled {
    background: ${colors.btnDisabledBG};
    box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.25);
    color: ${(props) => props?.color || colors.white};
  }
`;

export const ItemIcon = styled.img`
  position: absolute;
  left: 0.313rem;
  height: 3.75rem;
  width: 3.75rem;
  top: 0.188rem;
`;

export const SquareIcon = styled.div`
  position: absolute;
  left: 0.313rem;
  height: 3.625rem;
  width: 3.625rem;
  border: 0.125rem solid ${colors.white};
  border-radius: 50%;
  top: 0.188rem;
`;
