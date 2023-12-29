import { colors } from 'constants/colorsBase';
import { getButtonColorNotice, getColorSite } from 'helper/colorSite';
import styled from 'styled-components';

export const ItemNoticeCompanyWrapper = styled.div`
  cursor: pointer;
  background: ${getButtonColorNotice()};
  width: 93.75rem;
  border-radius: 0.625rem;
  height: 10rem;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
  margin-bottom: 1.875rem;
  position: relative;
  left: 0;
  top: 0;
  .box_new {
    position: absolute;
    top: -0.625rem;
    left: -0.625rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
`;
export const TitleItemItemNoticeCompany = styled.div`
  cursor: pointer;
  border: 2px solid ${getColorSite()};
  width: 100%;
  height: 3.75rem;
  border-radius: 0.625rem 0.625rem 0 0;
  font-size: 1.625rem;
  display: flex;
  color: ${colors.white};
  align-items: center;
  padding-left: 1.125rem;
  font-weight: 700;
  justify-content: space-between;
  padding-right: 1rem;
`;
export const TimeNotice = styled.span`
  font-weight: 400;
  margin-left: 1.875rem;
  font-size: 1.5rem;
`;
export const ContentItemItemNoticeCompany = styled.div`
  border: 2px solid transparent;
  width: 93.5rem;
  height: 6.125rem;
  margin-left: 0.125rem;
  background-color: #fff;
  border-radius: 0 0 0.625rem 0.625rem;
  padding-left: 3.125rem;
  padding-right: 0.7rem;
  font-size: 1.625rem;
  padding-top: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const TitleItemCompany = styled.div`
  width: 80%;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
