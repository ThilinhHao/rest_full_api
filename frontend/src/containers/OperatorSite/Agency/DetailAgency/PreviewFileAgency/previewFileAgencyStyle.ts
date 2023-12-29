import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const PreviewFileAgencyWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const FileItemPreview = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  span {
    margin-left: 1.5rem;
    margin-right: 1.875rem;
    font-size: 1.5rem;
  }
`;

interface ITickedIcon {
  pointer: string;
}
export const TickedIcon = styled.img<ITickedIcon>`
  height: 2.125rem;
  width: 2.125rem;
  margin-right: 0.375rem;
  cursor: ${(props) => props.pointer};
`;
export const TitlePreview = styled.div`
  text-align: center;
  font-size: 3rem;
`;

export const CardPreview = styled.div`
  margin-top: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 85.5rem;
  height: calc(100vh - 20rem);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  background-color: ${colors.white};
  overflow: auto;
  padding: 2.5rem 3.125rem 3.75rem 3.125rem;
  word-break: break-all;
  white-space: pre-wrap;
`;
