import ButtonCustom from '@components/Button';
import styled from 'styled-components';

import { IGrantCard } from './interface';

import { colors } from 'constants/colorsBase';
import { getBgSettingItem, getColorSite } from 'helper/colorSite';
import { CardBase } from 'styles';

export const SettingItemWrapper = styled(ButtonCustom)`
  width: 12.5rem;
  height: 6.25rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
  border: none;
  background: ${getBgSettingItem()};
  font-size: 1.25rem;
  color: ${colors.white};
  border-radius: 0.625rem;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LineHeaderSetting = styled.div`
  width: 100%;
  height: 0.0625rem;
  background-color: ${colors.mainText};
`;

export const IconStyle = styled.svg`
  width: ${(props) => props?.width || '3.125rem'};
  height: ${(props) => props?.height || '3.125rem'};
`;

export const IconCalendarWrapper = styled.div`
  display: flex;
  position: relative;
  width: 2rem;
  height: 1.625rem;
  svg {
    width: 100%;
    height: 100%;
  }
  .number {
    position: absolute;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 0.938rem;
    color: ${getColorSite()};
    top: 0.375rem;
    right: 0.563rem;
  }
`;

export const BtnSettingBank = styled(ButtonCustom)`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 4.25rem;
  width: 25rem;
  background: ${colors.mainColor};
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  font-size: 1.625rem;
  color: ${colors.white};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  border: none;
  font-weight: 600;
`;
export const WrapperPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const DetailWrapperSilder = styled.div`
  padding-top: 0.813rem;
  padding-left: 0.625rem;
  width: 100%;
`;

export const Container = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const GrantCard = styled(CardBase)<IGrantCard>`
  position: relative;
  margin-top: ${(props) => props?.marginTop || '1rem'};
  padding: ${(props) => props?.padding || '2.188rem 1.875rem 2.063rem 1.875rem'};
  width: ${(props) => props?.percentWidth || 'unset'};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props?.justifyContent || 'space-between'};
  overflow-y: auto;
  scrollbar-gutter: stable;
  width: 100%;
  max-width: ${(props) => props?.maxWidth || 'auto'};
`;
