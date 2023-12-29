import styled from 'styled-components';
import { colors } from '../../constants/colorsBase';

export const UploadButtonWrapper = styled.div`
  background-color: ${colors.mainColor};
  width: 18.75rem;
  height: 2.5rem;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  color: ${colors.white};
  box-shadow: 1px 1px 1px rgba(114, 114, 114, 0.161);
`;
export const UploadWrapper = styled.div`
  .ant-upload-wrapper {
    width: 18.75rem !important;
    height: 2.5rem !important;
    border: none;
  }
  .ant-upload {
    width: 100% !important;
    height: 100% !important;
    border: none !important;
  }
`;
