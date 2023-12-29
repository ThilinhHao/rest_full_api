import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const CreateNoticeCard = styled.div`
  position: relative;
  margin-top: 1rem;
  padding: 1rem 1.875rem 0.625rem 9.438rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 106.25rem;
  height: calc(100vh - 10rem);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: ${colors.white};
  overflow: auto;
`;
export const TitleScreenWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const TitleCreateNotice = styled.div`
  font-size: 2.188rem;
  margin-left: 1.438rem;
`;
export const ImageTitle = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
export const WrapperEdit = styled.div<any>`
  height: ${(props) => (props?.isConfirm ? '0px' : 'visible')};
  overflow: hidden;
`;
