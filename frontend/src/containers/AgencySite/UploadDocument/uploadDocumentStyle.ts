import ButtonCustom from '@components/Button';
import { Col, Row } from 'antd';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

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
  padding: 1.688rem 3.75rem 2.25rem 3.75rem;
  text-align: center;
  min-height: 40rem;
`;

export const ColDocumentWrapper = styled(Col)`
  display: flex;
  align-items: center;
  .ant-row:first-child {
    width: 100%;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
  }
`;

export const DivUploadDocument = styled.div`
  width: 12.5rem;
  height: 16.25rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const ButtonCheckPrivacy = styled(ButtonCustom)`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 3rem;
  width: 10rem;
  background: ${getColorSite()};
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

export const ImgDocument = styled.img`
  width: 12.5rem;
  height: 16.25rem;
`;

export const Actions = styled.div<any>`
  position: absolute;
  left: 13.5rem;
  top: 4rem;
  height: 8.375rem;
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
