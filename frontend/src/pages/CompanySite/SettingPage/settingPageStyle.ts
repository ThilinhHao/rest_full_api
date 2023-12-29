import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const SettingCard = styled.div<any>`
  position: relative;
  margin-top: ${(props) => props?.marginTop || '1rem'};
  padding: ${(props) => props?.padding || '0'};
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => props?.width || '106.25rem'};
  height: ${(props) => props?.height || 'calc(100vh - 10rem)'};
  box-shadow: ${(props) => (props?.firstTime ? 'unset' : '0px 3px 6px rgba(0, 0, 0, 0.161)')};
  background-color: ${colors.white};
  overflow: ${(props) => (props?.firstTime ? 'unset' : 'auto')};
`;
export const TitleHeaderSetting = styled.div`
  font-size: 1.875rem;
  font-weight: 600;
  margin-left: 0.625rem;
`;
export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px 2.5rem;
`;
export const ContainerSetting = styled.div`
  padding-left: 12.375rem;
  padding-right: 12.375rem;
`;
export const RenameTxt = styled.div`
  font-size: 1.5rem;
  margin-right: 1.875rem;
  width: 6rem;
`;
