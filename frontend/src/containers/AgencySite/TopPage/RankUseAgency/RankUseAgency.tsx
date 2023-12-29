import React from 'react';

import useRankAgencyTopPage from './useRankAgencyTopPage';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';

import { Dayjs } from 'dayjs';
import { Tooltip } from 'antd';
import { paginate } from 'helper/paginate';
import { SpaceBase } from 'styles';
import { ICompanyRank } from '@containers/OperatorSite/TopPage/ChartOperatorTopPage/CompanyRankTopPage/useCompanyRankTopPage';
import { CONST_TOP_PAGE_OPERATOR } from 'constants/language';
import { AgencyHeightList, RowAgencyRankItem } from './rankUseAgencyStyle';

import {
  CompanyRankTopPageWrapper,
  PaginationRankTopPageWrapper,
  RowRankItem,
} from '@containers/OperatorSite/TopPage/ChartOperatorTopPage/CompanyRankTopPage/companyRankTopPageStyle';

const RankUseAgency = ({ setIsLoadingRank, year }: { setIsLoadingRank: (isLoading: boolean) => void; year: Dayjs }) => {
  const { listCompany, pageSetting, changePaging } = useRankAgencyTopPage(setIsLoadingRank, year);

  return (
    <CompanyRankTopPageWrapper>
      <RowRankItem>
        <div>{CONST_TOP_PAGE_OPERATOR.COMPANY_NAME}</div>
        <div>{CONST_TOP_PAGE_OPERATOR.NUMBER_OF_USE}</div>
      </RowRankItem>
      <SpaceBase height={1} />
      <AgencyHeightList>
        {paginate(listCompany, pageSetting.page, pageSetting.perPage).data.map((element: ICompanyRank) => (
          <RowAgencyRankItem key={element.id}>
            <Tooltip title={element.name} placement="left">
              <div>{element.name}</div>
            </Tooltip>
            <div>{element.total_request || 0}</div>
          </RowAgencyRankItem>
        ))}
      </AgencyHeightList>
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

export default RankUseAgency;
