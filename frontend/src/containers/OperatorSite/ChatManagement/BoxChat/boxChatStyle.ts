import TextArea from '@components/TextArea/TextArea';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const BoxChatContainer = styled.div<any>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const TitleBoxChat = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.625rem;
  line-height: 1.938rem;
  color: ${colors.mainText};
  width: 87.5rem;
  text-align: right;
  margin-bottom: 1.25rem;
`;

export const BoxChatWrapper = styled.div<any>`
  width: 87.5rem;
  height: calc(100% - 4rem);
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161));
  background-color: ${colors.white};
  padding: 1.25rem 2.5rem 2.5rem 2.5rem;
  border-radius: 0.5rem;
`;

export const BoxChatAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
  div {
    display: flex;
    padding: 0.75rem;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${colors.mainColor};
      background-color: ${colors.mainColor} !important;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
      border-radius: 0.313rem;
      cursor: pointer;
    }
    button:nth-child(1) {
      width: 2.313rem;
      height: 1.875rem;
      margin-right: 1.438rem;
      img {
        width: 1.438rem;
        height: 1.625rem;
      }
    }
    button:nth-child(2) {
      width: 5rem;
      height: 1.875rem;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.188rem;
      display: flex;
      align-items: center;
      text-align: center;
      color: ${colors.white} !important;
    }
  }
`;

export const InputChat = styled(TextArea)<any>`
  background: ${colors.white};
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.25);
  border-radius: 0.625rem;
  height: 7.5rem !important;
  min-height: 7.5rem !important;
  max-height: 7.5rem !important;
  cursor: ${(props) => (props?.isLoading ? 'wait' : 'text')};
  opacity: ${(props) => (props?.isLoading ? '0.5' : '1')};
`;
