import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const TitleDetailBank = styled.div`
  margin-left: 16.375rem;
  width: 59.25rem;
  border-bottom: 1px solid rgb(51, 51, 51, 0.5);
  padding-left: 3.125rem;
  padding-bottom: 0.375rem;
  font-weight: 500;
  font-size: 1.375rem;
`;
export const ItemBankWrapper = styled.div`
  margin-left: 14.375rem;
  padding: 2.188rem 6.5rem 2.188rem 6.5rem;
  font-size: 1.375rem;
`;
export const HeaderSettingWrapper = styled.div<any>`
  border-bottom: 1px solid ${colors.mainText};
  padding-bottom: ${(props) => props.paddingBottom || '0.375rem'};
  display: flex;
  align-items: center;
  padding-left: ${(props) => props.paddingLeft || '2.5rem'};
  position: relative;
`;
export const DetailBankWrapper = styled.div<any>`
  padding-top: 1.125rem;
  position: relative;
  margin-top: 1rem;
  width: ${(props) => (props.firstTime ? '100%' : '106rem !important')};
  border-radius: 5px;
  height: ${(props) => (props.firstTime ? 'unset' : 'calc(100vh - 11rem)')};
  box-shadow: ${(props) => (props.firstTime ? 'unset' : '0px 3px 6px rgba(0, 0, 0, 0.161)')};
  background-color: ${colors.white};
  overflow-y: auto;
`;
export const NoteDiv = styled.div`
  font-size: 1.125rem;
  position: absolute;
  top: 1.5rem;
  right: 0.5rem;
  color: ${colors.crimson};
`;
