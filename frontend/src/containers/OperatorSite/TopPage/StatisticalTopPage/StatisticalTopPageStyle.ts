import images from '@assets/images-base';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const StatisticalWrapper = styled.div`
  padding: 2.25rem 0 2.25rem 2.25rem;
  width: 46.75rem;
  height: 20.875rem;
  background-color: white;
  border-radius: 0.625rem;
  box-shadow: 0.188rem 0.188rem 0.313rem rgba(0, 0, 0, 0.25);
  margin-left: 1.875rem;
  white-space: nowrap;
`;
export const StatisticalLoadingWrapper = styled.div`
  width: 46.75rem;
  height: 20.875rem;
  background: rgb(255, 255, 255, 0.7);
  border-radius: 0.625rem;
  position: absolute;
  margin-left: -2.25rem;
  margin-top: -2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TitleStatistic = styled.div`
  color: #6e6e6e;
  font-size: 1.25rem;
`;
export const TodayStick = styled.div`
  background-image: url(${images.operator.memoryStick});
  width: 8.75rem;
  height: 1.875rem;
  background-size: cover;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${colors.white};
  font-size: 1.125rem;
  padding-left: 1.25rem;
  padding-bottom: 0.1rem;
`;
export const TodayStickSuspended = styled.div`
  background-image: url(${images.operator.memoryStickSuspended});
  width: 8.75rem;
  height: 1.875rem;
  background-size: cover;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${colors.white};
  font-size: 1.125rem;
  padding-left: 1.25rem;
  padding-bottom: 0.1rem;
`;
export const TodayStickMonth = styled.div`
  background-image: url(${images.operator.memoryStickMonth});
  width: 10.938rem;
  height: 1.875rem;
  background-size: cover;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${colors.white};
  font-size: 1.125rem;
  padding-left: 0.75rem;
  padding-bottom: 0.1rem;
  margin-left: 1.5rem;
`;
export const RowStatistic = styled.div`
  display: flex;
  align-items: end;
`;
export const WrapperTotal = styled.div`
  display: flex;
  align-items: end;
  min-width: 8.35rem;
`;
export const TodayNumber = styled.div`
  font-size: 3.125rem;
  color: #52b788;
  line-height: 2.5rem;
  margin-right: 0.625rem;
  margin-left: 1rem;
`;
export const TodayNumberSuspended = styled.div`
  font-size: 3.125rem;
  color: #b75252;
  line-height: 2.5rem;
  margin-right: 0.625rem;
  margin-left: 1rem;
`;
export const SubjectNumber = styled.div`
  font-size: 1.5rem;
  color: #6e6e6e;
  line-height: 1.2rem;
`;
