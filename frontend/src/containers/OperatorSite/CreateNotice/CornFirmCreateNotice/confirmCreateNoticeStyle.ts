import styled from 'styled-components';

export const ConfirmCreateNoticeWrapper = styled.div<any>`
  position: absolute;
  z-index: 4;
  background-color: white;
  visibility: ${(props) => (!props?.isConfirm ? 'hidden' : 'visible')};
  height: ${(props) => (!props?.isConfirm ? '0px' : 'calc(100vh - 14.5rem)')};
  overflow: hidden;
`;
export const ContentConfirmNotice = styled.div`
  font-size: 1.25rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  overflow: auto;
  width: 69rem;
  word-break: break-all;
`;
export const ContentConfirmNoticeFixHeight = styled.div`
  font-size: 1.25rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  height: calc(100vh - 36rem);
  width: 69rem;
  overflow: auto;
  word-break: break-all;
  white-space: pre-wrap;
`;
export const BottomGim = styled.div<any>`
  height: ${(props) => (!props?.isConfirm ? '0px' : 'visible')};
`;
