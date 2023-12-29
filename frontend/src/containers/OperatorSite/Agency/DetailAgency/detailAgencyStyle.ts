import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const RowIntroducedCompany = styled.div`
  display: flex;
  padding-left: 3rem;
  width: 74rem;
  div {
    margin: 0.3rem 0;
  }
  div:nth-child(1) {
    width: 18rem;
    height: 2.5rem;
    display: flex;
    align-items: start;
    flex-direction: row;
    font-size: 1.25rem;
    padding-right: 1rem;
    padding-top: 0.313rem;
    word-break: break-all;
  }
`;
export const ShadowTop = styled.div`
  /* position: absolute; */
  height: 10px;
  z-index: 100;
  width: 100%;
  background: red;
  background: -webkit-linear-gradient(270deg, rgba(0, 0, 0, 0.35), transparent);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.35), transparent);
  opacity: 0;
`;
export const ScrollSubAgency = styled.div`
  max-height: 16rem;
  overflow-x: auto;
  scrollbar-gutter: stable;
  background: /* Shadow covers */ linear-gradient(white 10%, rgba(255, 255, 255, 0)),
    linear-gradient(rgba(255, 255, 255, 0), white 70%) 0 100%,
    /* Shadows */ radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)),
    radial-gradient(farthest-side at 50% 0%, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)) 0 0%;
  background-repeat: no-repeat;
  background-size: 100% 400px, 100% 400px, 100% 0.5rem, 100% 0.5rem;
  /* Opera doesn't support this in the shorthand */
  background-attachment: local, local, scroll, scroll;
  ::-webkit-scrollbar {
    width: 0.375rem;
    position: absolute;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.ashGrey};
  }
`;
export const TitleLineWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  div:nth-child(1) {
    font-size: 1.375rem;
    padding-left: 1.25rem;
    margin-right: 3.563rem;
  }
  div:nth-child(2) {
    width: 64.938rem;
    height: 1px;
    background-color: ${colors.smokeyGrey};
  }
`;

export const StatusUpdate = styled.div`
  font-size: 0.938rem;
  color: ${colors.romance};
  position: absolute;
  right: 0.688rem;
  top: 0.1rem;
  display: flex;
  flex-direction: row;
`;
export const NameWrapper = styled.div`
  max-width: 20rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const DetailItemAgency = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: -2rem;
  img {
    margin-right: 2rem;
  }
  div:last-child {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 2.188rem;
  }
`;
