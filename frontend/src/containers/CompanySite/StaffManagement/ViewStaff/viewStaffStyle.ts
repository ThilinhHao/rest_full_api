import ButtonCustom from '@components/CompanySite/common/Button';
import { colors } from 'constants/colorsBase';
import { getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const FormRowEdit = styled.div<any>`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props?.padding || '1.875rem 5.625rem 0 5.625rem'};
  font-size: 1.5rem;
`;

export const FormRowAction = styled.div<any>`
  display: flex;
  padding: ${(props) => props?.padding || '1.875rem 5.625rem 0 5.625rem'};
  font-size: 1.5rem;
  align-items: center;
`;

export const DownloadIcon = styled.img<any>`
  width: 3.75rem;
  height: 3.75rem;
  box-shadow: 0rem 0.313rem 0.313rem rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  margin-left: 1.125rem;
  cursor: ${(props) => (props?.waiting ? 'wait !important' : 'pointer')};
  background: ${getColorSite()};
  &:hover {
    transform: translateY(-0.07em);
  }
`;

export const WarningNote = styled.div`
  color: ${colors.brightRed};
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.813rem;
  margin-left: 2.75rem;
  display: flex;
  align-items: center;
  img {
    width: 2rem;
    height: 2.125rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonBanner = styled(ButtonCustom)<any>`
  cursor: ${(props) => (props?.loading ? 'wait' : 'pointer')};
  height: 14.688rem;
  width: 28rem;
  /* font-family: 'M PLUS 1'; */
  font-style: normal;
  font-weight: 700;
  font-size: 3.125rem;
  line-height: 4.5rem;
  text-align: center;
  color: ${colors.white};
  background: ${(props) => props?.background || colors.btnRadialGradientLeftCompanySite};
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: auto !important;
  }
`;

export const IconBanner = styled.img<any>`
  height: ${(props) => props?.height || '5.625rem'};
  width: ${(props) => props?.width || '5.625rem'};
  margin-right: 1.25rem;
`;

export const DocumentWrapper = styled.div`
  width: 100%;
  padding: 2.5rem;
  margin: 1rem 0 3rem 0;
  text-align: left;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.161);
  border-radius: 2.5rem;
  height: 65vh;
  overflow-y: auto;
`;

export const ParagraphWrapper = styled.div`
  text-align: left;
  word-break: break-all;
  white-space: pre-wrap;
`;
