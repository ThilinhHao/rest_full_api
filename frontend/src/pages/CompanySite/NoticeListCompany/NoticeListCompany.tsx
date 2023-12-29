import React from 'react';

import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import NoticeCompanyList from '@containers/CompanySite/NoticeCompanyList/NoticeCompanyList';
import useNoticeListCompany from './useNoticeListCompany';

import { SpaceBase } from 'styles';
import { Container } from '@components/Style/Style';
import { CONST_COMMON } from 'constants/language';
import { TitleHeaderSetting } from '@pages/OperatorSite/SettingPage/settingPageStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { BottomButtonWrapper } from '@containers/OperatorSite/CreateNotice/BottomButton/bottomButtonStyle';

import {
  FootstepsHistoryCard,
  HeaderFootstepsWrapper,
} from '@pages/OperatorSite/FootstepsHistory/footstepsHistoryStyle';
import { IconNotice } from '@components/Icon';
import { LoadingListNoticeCompany } from './noticeListCompanyStyle';
import { NoDataAttendance } from '../AttendanceRecord/attendanceRecordStyle';

const BREADS = [
  {
    name: CONST_COMMON.NOTICE,
    path: '',
  },
];

export function HeaderNoticeListCompany() {
  return (
    <HeaderFootstepsWrapper>
      <IconNotice />
      <TitleHeaderSetting>{CONST_COMMON.NOTICE}</TitleHeaderSetting>
    </HeaderFootstepsWrapper>
  );
}

const NoticeListCompany = () => {
  const { listNoticeCompany, pageNoticeCompany, changePaging, isLoading } = useNoticeListCompany();
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
            {listNoticeCompany && listNoticeCompany.length === 0 && !isLoading && (
              <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
            )}
            <NoticeCompanyList listNoticeCompany={listNoticeCompany} />
          </div>
          <BottomButtonWrapper>
            <div>
              <PaginationRecord
                current={pageNoticeCompany.page}
                total={pageNoticeCompany.total}
                pageSize={pageNoticeCompany.per_page}
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

export default NoticeListCompany;
