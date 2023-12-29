import styled from 'styled-components';

export const CompanyRankTopPageWrapper = styled.div`
  margin-left: 0.5rem;
  padding-top: 0.5rem;
  .ant-pagination-item {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
`;
export const RowRankItem = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 1rem;
  div:nth-child(1) {
    width: 16.625rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 1rem;
    cursor: default;
  }
`;
export const PaginationRankTopPageWrapper = styled.div`
  margin-top: 2rem;
  margin-left: -3.3rem;
  position: absolute;
`;
export const HeightList = styled.div`
  height: 16rem;
`;
