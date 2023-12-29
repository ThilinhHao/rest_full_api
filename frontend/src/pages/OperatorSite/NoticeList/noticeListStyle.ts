import { colors } from 'constants/colorsBase';
import styled from 'styled-components';
import ButtonCustom from '@components/Button';

export const ListNoticeCard = styled.div`
  margin-top: 1rem;
  padding: 1rem 5.813rem 0.625rem 5.813rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 106.25rem;
  height: calc(100vh - 10rem);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: ${colors.white};
  overflow: auto;
  scrollbar-gutter: stable;
`;
export const TitleListNoticeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  margin-left: 0.5rem;
`;
export const TextTitle = styled.div`
  cursor: pointer;
  font-size: 1.875rem;
  font-weight: 700;
`;
export const IconBtn = styled.img`
  width: 2.125rem;
  height: 2.125rem;
  margin-right: 0.625rem;
`;
export const BtnCreateNotice = styled(ButtonCustom)`
  margin-left: 1.5rem;
  color: ${colors.white};
  background-color: ${colors.mainColor};
  width: 9.813rem;
  height: 3.125rem;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.161);
  border-radius: 0.625rem;
  font-weight: 600;
  justify-content: center;
`;

export const LoadingListNotice = styled.div`
  margin-top: -1rem;
  width: 106.25rem;
  height: calc(100vh - 10rem);
  position: absolute;
  background: rgb(255, 255, 255, 0.8);
  z-index: 5;
  display: flex;
  align-items: center;
  margin-left: -5.813rem;
`;
export const ContainerNoticeList = styled.div`
   width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
