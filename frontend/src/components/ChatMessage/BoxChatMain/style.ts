import styled from 'styled-components';

import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';

export const BoxChatMainWrapper = styled.div`
  padding: 0.1rem 3.125rem;
  height: calc(100% - 10.5rem);
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  .infiniteScroll {
    display: flex;
    flex-direction: column-reverse;
    .message {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
      span:nth-child(1) {
        margin-bottom: 1.875rem;
        width: 52.625rem;
      }
      .msg {
        padding: 0.813rem 1.25rem 0.813rem 2.5rem;
        border: 1px solid ${getColorSite()};
        border-radius: 2rem;
        width: 52.625rem;
        white-space: pre-wrap;
        word-break: break-all;
        .file {
          display: flex;
          padding: 0.813rem 1.25rem 0.813rem 2.5rem;
          border: 1px solid ${getColorSite()};
          border-radius: 1rem;
          margin: 1rem 0;
          align-items: center;
          img:nth-child(1) {
            width: 3rem;
            height: 3rem;
            margin-right: 1rem;
          }
          img:nth-child(3) {
            width: 2rem;
            height: 2rem;
            margin-left: 0.5rem;
          }
          div {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: ${colors.brilliantAzure};
          }
        }
      }
    }
  }
`;

export const MyMessage = styled.div<any>`
  align-items: flex-end;
  span:nth-child(1) {
    text-align: right;
  }
  .msg {
    border: 1px solid ${getColorSite()};
    background: ${colors.white};
    color: ${colors.mainText};
    .file {
      border: 1px solid ${getColorSite()};
      background: ${colors.white};
    }
  }
`;

export const YourMessage = styled.div<any>`
  align-items: flex-start;
  span:nth-child(1) {
    text-align: left;
  }
  .msg {
    background: ${colors.btnLogin};
    color: ${colors.white};
    .file {
      border: 1px solid ${getColorSite()};
      background: ${colors.white};
    }
  }
`;
