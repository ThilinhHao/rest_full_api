import styled from 'styled-components';
import ButtonCustom from '@components/Button';
import { colors } from 'constants/colorsBase';
import TextArea from '@components/TextArea/TextArea';
export const PreviewFileWrapper = styled.div<any>`
  width: ${(props) => (props?.isImg ? '100%' : '62.438rem')};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TitlePreviewFile = styled.div`
  font-size: 1.5rem;
  word-break: break-all;
  text-align: center;
`;
export const ButtonPreviewWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  text-align: center;
  display: block;
`;
export const IFramePreview = styled.iframe<any>`
  /* width: 100% !important; */
  height: ${(props) => props?.height || 'calc(100vh - 16rem)'};
  width: ${(props) => props?.width || '100%'};
  display: block !important;
`;
export const ImagePreview = styled.img<any>`
  min-height: ${(props) => props?.height || 'calc(100vh - 16rem)'};
  /* width: ${(props) => props?.width || '100%'}; */
  max-width: 100%;
  display: block !important;
`;
export const ApprovalBtn = styled(ButtonCustom)`
  cursor: ${(props) => (props?.loading ? 'wait !important' : 'pointer')};
  height: 3.063rem;
  min-width: 8.813rem;
  background-color: ${colors.mainColor};
  font-size: 1.625rem;
  color: ${colors.white};
  margin-top: 1rem;
  margin: 0 1.5rem;
`;
export const DenialBtn = styled(ButtonCustom)`
  cursor: pointer;
  height: 3.063rem;
  min-width: 8.813rem;
  background-color: ${colors.white};
  font-size: 1.625rem;
  color: ${colors.reddishOrange};
  margin-top: 1rem;
  margin: 0 1.5rem;
  :hover {
    color: ${colors.reddishOrange} !important;
  }
  &.btn-document-reject {
    background-color: #c74646;
    box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.25);
    color: white;
    &:disabled {
      color: rgba(0, 0, 0, 0.25);
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`;
export const DivPreviewConfirm = styled.div`
  text-align: center;
  .title {
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 1.063rem;
    margin-top: -38px;
    position: relative;
  }
  .hindden-bottom-preview {
    background: #fdfdfd;
    position: relative;
    top: -1.6rem;
    height: 26px;
    left: -2px;
    border-top: 1.5px solid #8c8c8c;
    width: 100.5%;
  }
`;

export const TextAreaDocument = styled(TextArea)`
  width: 28.188rem;
  height: 6.375rem;
  border: 1px solid ${colors.dune};
  box-shadow: inset 0px 4px 4px ${colors.shadowBtnFile};
  border-radius: 5px;
  margin: 0px auto;
  margin-bottom: 3.938rem;
`;
