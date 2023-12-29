import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

import { ITitleCard, ITitleDetailWrapper } from './interface';

export const TitleDetailWrapper = styled.div<ITitleDetailWrapper>`
  display: flex;
  flex-direction: row;
  align-items: center;
  .full_name {
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 2.188rem;
    line-height: 2.625rem;
  }
`;
export const AvatarCompany = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.938rem;
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

export const ContainerDetail = styled.div`
  margin-left: 8.5rem;
  margin-right: 10.5rem;
`;

export const TitleCard = styled.div<ITitleCard>`
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.188rem;
  border-bottom: 0.5px solid ${colors.border};
  padding-left: 3.125rem;
  padding-bottom: 0.125rem;
  margin-top: ${(props) => `${props?.marginTop || 0}rem`};
`;

export const RowCard = styled.div`
  display: flex;
  margin-left: 7.188rem;
  padding: 1.25rem 0 0.125rem 0;
  div {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
  div:first-child {
    width: 17.5rem;
    min-width: 17.5rem;
  }
  div:last-child {
    word-break: break-all;
  }
`;

export const RowCardDate = styled.div`
  display: flex;
  margin-left: 7.188rem;
  font-size: 1.875rem;
  align-items: center;
  padding: 0.938rem 0 0.125rem 0;
  line-height: 3.5rem;
  div:first-child {
    width: 29%;
  }
  div:last-child {
    font-size: 3.125rem;
    color: ${colors.mainColor};
    display: flex;
    align-items: center;
    width: 79%;
    span {
      font-size: 1.875rem;
      margin-left: 2.25rem;
    }
  }
`;

export const RowDate = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.dune};
  margin-top: 1.125rem;
  align-items: center;
  .ant-picker {
    margin-right: 0.938rem;
    width: 20.625rem;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.161));
    border-radius: 10px;
    /* padding: 0.875rem 1.25rem; */
    margin-left: 0.875rem;
  }
  .ant-picker-input {
    input {
      font-size: 1.125rem;
      padding: 0.313rem 0.313rem;
    }
  }
`;

export const ContainerAgency = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
