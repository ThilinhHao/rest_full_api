import ButtonCustom from '@components/Button';
import { Col, Row, Upload } from 'antd';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

const { Dragger } = Upload;

export const StepPageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid #333333;
  z-index: 1;
`;

export const StepDocument = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 8.75rem;
  margin: 0 1rem;
  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => {
      if (props?.block) return colors.brightRed;
      if (props?.done) return colors.deepSaphire;
      if (props?.active) return colors.white;
      return colors.pewter;
    }};
    width: 4.25rem;
    height: 4.25rem;
    border-radius: 100%;
    border: 0.188rem solid
      ${(props) => {
        if (props?.block) return colors.brightRed;
        if (props?.done || props.active) return colors.deepSaphire;
        return colors.pewter;
      }};
    color: ${(props) => (props?.active ? colors.deepSaphire : colors.greyAlice)};
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 2.688rem;
  }
  div:last-child {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.813rem;
    text-align: center;
    margin-top: 0.813rem;
  }
`;

export const RowFlexWrapper = styled(Row)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .documentName {
    display: flex;
    align-items: center;
    img {
      width: 1.75rem;
      height: 1.75rem;
      margin-right: 0.375rem;
    }
    span {
      padding: 2.188rem 0;
      /* font-family: 'M PLUS 1'; */
      font-style: normal;
      font-weight: 500;
      font-size: 1.375rem;
      line-height: 2rem;
      color: ${colors.mainText};
      white-space: nowrap;
      max-width: 20rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const RowFlexDocument = styled(Row)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FormDocumentWrapper = styled.div`
  width: 100%;
  padding: 1.688rem 3.75rem 1.25rem 3.75rem;
  text-align: center;
`;

export const ColDocumentWrapper = styled(Col)`
  display: flex;
  align-items: flex-start;
  .ant-row:first-child {
    width: 100%;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
  }
`;

export const ButtonCheckPrivacy = styled(ButtonCustom)`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 3rem;
  width: 10rem;
  background: ${colors.btnRadialGradientRightCompanySite};
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  font-size: 1.75rem;
  color: ${colors.white};
  border-radius: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 13.2rem;
  left: 10.3rem;
  span {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 500;
    font-size: 1.75rem;
    line-height: 2.563rem;
    color: ${colors.white} !important;
  }
`;

export const ButtonUpload = styled(ButtonCustom)`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 3rem;
  width: 10.125rem;
  background: ${colors.btnRadialGradientRightCompanySite};
  border-radius: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  span {
    /* font-family: 'M PLUS 1'; */
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.438rem;
    color: ${colors.white};
  }
  span.ant-btn-icon {
    margin: 0 !important;
  }
  img {
    width: 1.188rem;
    height: 1.188rem;
    padding: 0 0.313rem 0 0;
  }
`;

export const ImgDocument = styled.img<any>`
  width: 12.5rem;
  height: 16.25rem;
  border-radius: 0.375rem;
  border: ${(props) => (props.hasBorder ? '1px solid #333333' : 'none')};
`;

export const Actions = styled.div<any>`
  position: absolute;
  left: 12.5rem;
  top: 4rem;
  height: 8.375rem;
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  svg {
    width: 3.75rem;
    height: 3.75rem;
    cursor: ${(props) => (props?.isLoadingDownload ? 'wait' : 'pointer')};
    &:hover {
      -ms-transform: scale(1.02);
      -webkit-transform: scale(1.02);
      transform: scale(1.02);
    }
  }
`;

export const DraggerUpload = styled(Dragger)`
  .ant-upload.ant-upload-drag {
    width: 12.5rem;
    height: 16.25rem;
    background: ${colors.whiteSmoke};
    border: 1px solid ${colors.mainText};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
  .ant-upload-drag-icon {
    padding: 0;
    margin: 1rem 0 0 0;
  }
  .ant-upload.ant-upload-btn {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem !important;
    line-height: 1.5rem;
    text-align: center;
    margin-bottom: 0.938rem !important;
  }
  .ant-upload-drag-container {
    display: flex !important;
    flex-direction: column;
    align-items: center;
  }
`;

export const NoteForDocument = styled.div`
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 500;
  font-size: 1.375rem;
  line-height: 2rem;
  text-align: center;
  color: ${colors.crimson};
  margin: 2.25rem 0 1rem 0;
  min-height: 5.25rem;
  width: 100%;
  word-break: break-all;
`;

export const GuideText = styled.div<any>`
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.813rem;
  margin-top: ${(props) => props?.marginTop || '0'};
`;

export const NoteDiv = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props?.center ? 'center' : 'flex-start')};
  margin: 3rem 0 2.625rem 0;
`;

export const NoteText = styled.div<any>`
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.563rem;
  color: ${(props) => props?.color || getColorSite()};
`;

export const DivUploadDocument = styled.div`
  position: relative;
  width: 12.5rem;
  height: 16.25rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const PageRejectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin: 6.25rem 0;
    width: 27.938rem;
    height: 18.688rem;
  }
  div {
    /* font-family: 'Inder'; */
    font-style: normal;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.563rem;
    text-align: center;
  }
`;

export const DeleteDocument = styled.img`
  height: 1.688rem;
  width: 1.688rem;
  position: absolute;
  right: 0.438rem;
  top: 0.25rem;
  cursor: pointer;
`;
