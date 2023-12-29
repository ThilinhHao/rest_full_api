import styled from 'styled-components';
import { Carousel } from 'antd';
import { colors } from 'constants/colorsBase';

export const ListShiftItemWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 35rem);
`;
export const MemberWrapper = styled.div``;
export const WrapperItem = styled.div`
  height: 6.313rem;
  width: 12.5rem;
  display: flex;
  align-items: center;
`;

export const MemberItem = styled.div`
  width: 12.5rem;
  font-size: 1.5rem;

  padding-left: 1rem;
  /* margin-top: 1rem; */
  margin: auto 0;
  padding-right: 1rem;
  word-break: break-word;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
export const LineShift = styled.div`
  width: 100%;
  height: 0.063rem;
  margin-top: 1rem;
  background-color: ${colors.lineColor};
`;
export const LineMemberShift = styled.div`
  width: 100%;
  height: 0.063rem;
  margin-top: 1rem;
  background-color: ${colors.lineColor};
`;
export const CarouselContainer = styled(Carousel)`
  width: 80rem;
  .slick-dots {
    display: none !important;
  }
`;
