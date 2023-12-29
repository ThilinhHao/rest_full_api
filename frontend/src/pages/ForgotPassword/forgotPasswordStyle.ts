import { colors } from 'constants/colorsBase';
import InputCustom from '@components/Input';
import styled from 'styled-components';

export const SettingWrapper = styled.div`
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161); */
  width: 100%;
  padding: 2.75rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TitleSetting = styled.span`
  color: ${colors.colorLogin};
  font-size: 3rem;
`;
export const InputSetting = styled(InputCustom)`
  width: 37.5rem;
  height: 4.25rem;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const BackIcon = styled.img`
  cursor: pointer;
  top: 0.625rem;
  left: 0.625rem;
  position: absolute;
`;
export const LabelInput = styled.div`
  font-weight: 400;
  font-size: 1.625rem;
  width: 100%;
  margin-bottom: 0.75rem;
`;
