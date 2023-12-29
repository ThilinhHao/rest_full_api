import ButtonCustom from '@components/Button';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const DocumentContainerWrapper = styled.div`
  width: 99vw;
  height: 100vh;
  background: ${colors.white};
  padding: 3.125rem 16.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitlePageWrapper = styled.div`
  width: 100%;
  padding-top: 1.875rem;
  padding-bottom: 0.438rem;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 600;
  font-size: 3rem;
  line-height: 4.375rem;
  text-align: center;
  color: ${getColorSite()};
`;

export const TitleNoteUpdate = styled.div`
  color: ${colors.crimson};
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 1.75rem;
  padding-bottom: 0.875rem;
`;

export const DocumentWrapper = styled.div<any>`
  width: 64rem;
  height: ${(props) => props?.height || 'unset'};
  min-height: ${(props) => props?.minHeight || 'unset'};
  padding: ${(props) => props?.padding || '2.5rem 1.5rem'};
  margin-bottom: 4.375rem;
  text-align: left;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161);
  border-radius: 2.5rem;
`;

export const BtnWrapper = styled.div`
  padding-bottom: 2.813rem;
`;

export const ButtonVerifyPrivacy = styled(ButtonCustom)<any>`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 4.25rem;
  width: 25rem;
  background: ${getColorSite()};
  font-size: 1.75rem;
  color: ${colors.white};
  border-radius: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  padding-bottom: 1rem;
  position: relative;
  padding: 0.875rem 0;
`;

export const ParagraphWrapper = styled.div`
  text-align: left;
  height: 100%;
  overflow-y: auto;
  position: sticky;
  padding: 0 2rem;
  word-break: break-all;
  white-space: pre-line;
  overflow-x: hidden;
`;

export const IFrameWrapper = styled.iframe`
  width: 100%;
  height: 100%;
`;

export const IconBack = styled.img`
  position: absolute;
  left: 1.125rem;
  top: 1rem;
  cursor: pointer;
  width: 2.5rem !important;
  height: 2.5rem !important;
`;
