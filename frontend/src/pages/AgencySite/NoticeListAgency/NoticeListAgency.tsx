import React from 'react';

import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import NoticeCompanyList from '@containers/CompanySite/NoticeCompanyList/NoticeCompanyList';
import useNoticeListAgency from './useNoticeListAgency';

import { SpaceBase } from 'styles';
import { Container } from '@components/Style/Style';
import { CONST_COMMON } from 'constants/language';
import { BottomButtonWrapper } from '@containers/OperatorSite/CreateNotice/BottomButton/bottomButtonStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { FootstepsHistoryCard } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { HeaderNoticeListCompany } from '@pages/CompanySite/NoticeListCompany/NoticeListCompany';
import { LoadingListNoticeCompany } from '@pages/CompanySite/NoticeListCompany/noticeListCompanyStyle';
import { NoDataAttendance } from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';

const BREADS = [
  {
    name: CONST_COMMON.NOTICE,
    path: '',
  },
];

const NoticeListAgency = () => {
  const { listNoticeAgency, pageNoticeAgency, changePaging, isLoading } = useNoticeListAgency();

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        {isLoading && (
          <LoadingListNoticeCompany>
            <Loading />
          </LoadingListNoticeCompany>
        )}
        <FootstepsHistoryCard between={true}>
          <div>
            <HeaderNoticeListCompany />
            {listNoticeAgency && listNoticeAgency.length === 0 && !isLoading && (
              <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
            )}
            {listNoticeAgency && <NoticeCompanyList listNoticeCompany={listNoticeAgency} />}
          </div>
          <BottomButtonWrapper>
            <div>
              <PaginationRecord
                current={pageNoticeAgency.page}
                total={pageNoticeAgency.total}
                pageSize={pageNoticeAgency.per_page}
                onChange={changePaging}
                noAbsolute={true}
              />
              <SpaceBase height={2} />
            </div>
          </BottomButtonWrapper>
        </FootstepsHistoryCard>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default NoticeListAgency;
