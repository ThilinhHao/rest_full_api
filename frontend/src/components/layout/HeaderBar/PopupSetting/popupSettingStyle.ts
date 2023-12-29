import styled from 'styled-components';
import ButtonCustom from '@components/CompanySite/common/Button';
import { colors } from 'constants/colorsBase';
import { getButtonColorSite } from 'helper/colorSite';
export const PopupSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const IconProfile = styled.img`
  width: 8.125rem;
  height: 8.125rem;
`;
export const TextProfile = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-family: 'Noto Sans JP', sans-serif !important;
  max-width: 14rem;
  white-space: nowrap;
  overflow: hidden;
  word-break: break-all;

  text-overflow: ellipsis;
`;

export const LineProfile = styled.div`
  height: 0.063rem;
  background-color: #455a64;
  width: 16.313rem;
`;
export const BtnProfile = styled(ButtonCustom)`
  width: 15rem;
  height: 2.5rem;
  background: ${getButtonColorSite()};
  font-size: 1.5rem;
  color: ${colors.white};
  display: flex;
  justify-content: center;
  padding: 0;
  border-radius: 1.25rem;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  border: none;
  font-weight: 700;
`;
