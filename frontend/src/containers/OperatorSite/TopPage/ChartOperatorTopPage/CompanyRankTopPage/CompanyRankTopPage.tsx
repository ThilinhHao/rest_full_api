import React from 'react';
import useCompanyRankTopPage, { ICompanyRank } from './useCompanyRankTopPage';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';

import { SpaceBase } from 'styles';
import { paginate } from 'helper/paginate';
import { CONST_TOP_PAGE_OPERATOR } from 'constants/language';
import {
  CompanyRankTopPageWrapper,
  HeightList,
  PaginationRankTopPageWrapper,
  RowRankItem,
} from './companyRankTopPageStyle';
import { Tooltip } from 'antd';
import { Dayjs } from 'dayjs';

const CompanyRankTopPage = ({ year, selectedSwitchDate }: { year: Dayjs; selectedSwitchDate: number }) => {
  const { listCompany, pageSetting, changePaging } = useCompanyRankTopPage(year, selectedSwitchDate);

  return (
    <CompanyRankTopPageWrapper>
      <RowRankItem>
        <div>{CONST_TOP_PAGE_OPERATOR.COMPANY_NAME}</div>
        <div>{CONST_TOP_PAGE_OPERATOR.NUMBER_OF_USE}</div>
      </RowRankItem>
      <SpaceBase height={1} />
      <HeightList>
        {paginate(listCompany, pageSetting.page, pageSetting.perPage).data.map((element: ICompanyRank) => (
          <RowRankItem key={element.id}>
            <Tooltip title={element.name} placement="left">
              <div>{element.name}</div>
            </Tooltip>
            <div>{element.total_request || 0}</div>
          </RowRankItem>
        ))}
      </HeightList>
      <PaginationRankTopPageWrapper>
        <PaginationRecord
          current={pageSetting.page}
          total={listCompany?.length || 0}
          pageSize={pageSetting.perPage}
          onChange={changePaging}
          noAbsolute={true}
          responsive
          showLessItems
        />
      </PaginationRankTopPageWrapper>
    </CompanyRankTopPageWrapper>
  );
};

export default CompanyRankTopPage;
