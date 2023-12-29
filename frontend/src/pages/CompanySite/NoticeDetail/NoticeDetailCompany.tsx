import React from 'react';

import { FootstepsHistoryCard } from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';

import { CONST_COMMON } from 'constants/language';

import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import Loading from '@components/Loading';
import { Container } from '@components/Style/Style';

import useNoticeDetailCompany from './useNoticeDetailCompany';

import { ContentNoticeCompany, HeaderTitleNotice } from './noticeDetailCompanyStyle';
import { HeaderNoticeListCompany } from '../NoticeListCompany/NoticeListCompany';
import { LoadingListNoticeCompany } from '../NoticeListCompany/noticeListCompanyStyle';
import { NoDataAttendance } from '../AttendanceRecord/attendanceRecordStyle';

const NoticeDetailCompany = () => {
  const { detaiLNoticeData, BREADS, isLoading } = useNoticeDetailCompany();

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

export default NoticeDetailCompany;
