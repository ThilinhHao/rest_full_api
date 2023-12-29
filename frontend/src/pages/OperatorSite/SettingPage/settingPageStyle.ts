import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const SettingCard = styled.div`
  position: relative;
  margin-top: 1rem;
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-between;
  width: 106.25rem;
  height: calc(100vh - 10rem);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: ${colors.white};
  overflow: auto;
`;
export const TitleHeaderSetting = styled.div`
  font-size: 1.875rem;
  font-weight: 500;
  margin-left: 0.625rem;
`;
export const LineHeaderSetting = styled.div`
  width: 100%;
  height: 0.063rem;
  background-color: ${colors.mainText};
`;
export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
`;
export const ContainerSetting = styled.div`
  padding-left: 8.938rem;
`;
export const RenameTxt = styled.div`
  font-size: 1.5rem;
  margin-right: 1.875rem;
  width: 6rem;
`;
