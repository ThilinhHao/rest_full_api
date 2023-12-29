import styled from 'styled-components';
import Dragger from 'antd/es/upload/Dragger';
import ButtonCustom from '@components/Button';

import { colors } from 'constants/colorsBase';

export const ModalContent = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.padding || '6.25rem 0'};
`;

export const DraggerUpload = styled(Dragger)`
  min-height: 28.75rem;
  .ant-upload-drag {
    background: white;
    border: none;
  }
  .ant-upload {
    padding: 0 !important;
  }
`;

export const GuideText = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin: 4.813rem 0 2.313rem 0;
`;

export const ButtonUpload = styled(ButtonCustom)<any>`
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: ${(props) => props?.width || '31.25rem'};
  height: ${(props) => props?.height || '4.375rem'};
  border-radius: 2.125rem;
  background: ${(props) => props?.background || colors.btnLogin};
  font-size: 2rem;
  font-weight: 400;
  color: ${(props) => props?.color || colors.white} !important;
  border: ${(props) => props?.border || 'unset'};
  margin-top: 1.875rem;
  box-shadow: ${colors.btnLoginShadow};
  &:hover {
    color: ${(props) => props?.color || colors.white} !important;
    transform: translateY(-0.07em);
  }
  svg.icon {
    width: ${(props) => props?.iconWidth || '3.625rem'};
    height: ${(props) => props?.iconHeight || '3.625rem'};
    position: absolute;
    left: 0.375rem;
    top: 0.313rem;
  }
`;

export const ButtonAction = styled(ButtonCustom)<any>`
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: ${(props) => props?.width || '9.125rem'};
  height: ${(props) => props?.height || '3.125rem'};
  border-radius: 0.625rem;
  background: ${(props) => props?.background || colors.btnLogin};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 1.625rem;
  line-height: 1.938rem;
  color: ${(props) => props?.color || colors.white} !important;
  border: ${(props) => props?.border || 'unset'};
  margin-top: 1.875rem;
  box-shadow: ${colors.btnLoginShadow};
  &:hover {
    color: ${(props) => props?.color || colors.white} !important;
    transform: translateY(-0.07em);
  }
`;

export const DivDocuments = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const DivDocument = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  align-items: center;
  margin-bottom: 4rem;
  position: relative;
  div:nth-child(2) {
    word-break: break-all;
    padding: 0 1rem;
  }
`;

export const DeleteDocument = styled.img`
  height: 2.938rem;
  width: 2.938rem;
  position: absolute;
  right: 5rem;
  top: 0.25rem;
  cursor: pointer;
`;

export const Buttons = styled.div<any>`
  display: flex;
  width: ${(props) => props?.width || '56.25rem'};
  justify-content: space-between;
`;
