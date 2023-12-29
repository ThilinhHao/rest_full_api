import React from 'react';

import { CONST_COMMON } from 'constants/language';

import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import Loading from '@components/Loading';
import { Container } from '@components/Style/Style';

import useNoticeDetailAgency from './useNoticeDetailAgency';

import { ContentNoticeCompany, HeaderTitleNotice } from '@pages/CompanySite/NoticeDetail/noticeDetailCompanyStyle';
import { FootstepsHistoryCard } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { HeaderNoticeListCompany } from '@pages/CompanySite/NoticeListCompany/NoticeListCompany';
import { LoadingListNoticeCompany } from '@pages/CompanySite/NoticeListCompany/noticeListCompanyStyle';
import { NoDataAttendance } from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';

const NoticeDetailAgency = () => {
  const { detaiLNoticeData, BREADS, isLoading } = useNoticeDetailAgency();

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <FootstepsHistoryCard>
          <HeaderNoticeListCompany />
          {detaiLNoticeData && (
            <>
              <HeaderTitleNotice>
                <div>{detaiLNoticeData.title}</div>
                <div>{detaiLNoticeData.date}</div>
              </HeaderTitleNotice>
              <ContentNoticeCompany>{detaiLNoticeData.content}</ContentNoticeCompany>
            </>
          )}
          {isLoading && (
            <LoadingListNoticeCompany>
              <Loading />
            </LoadingListNoticeCompany>
          )}
          {!detaiLNoticeData && !isLoading && <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>}
        </FootstepsHistoryCard>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default NoticeDetailAgency;
