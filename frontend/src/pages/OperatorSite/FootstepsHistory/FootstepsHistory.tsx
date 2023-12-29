import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import useFootstepsHistory from './useFootstepsHistory';
import FootstepsHistoryContent from '@containers/OperatorSite/FootstepsHistoryContent/FootstepsHistoryContent';

import { Container } from '@components/Style/Style';
import { SpaceBase } from 'styles';
import { TitleHeaderSetting } from '@pages/CompanySite/SettingPage/settingPageStyle';
import { SearchInputWrapper } from '@components/CompanySite/AttendanceRecord/SearchInput/searchInputStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { CONST_COMMON, CONST_FOOTSTEPS_HISTORY } from 'constants/language';
import { ControlHeaderWrapper, NoDataAttendance } from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import { FootstepsHistoryCard, HeaderFootstepsWrapper, LoadingFootsteps } from './footstepsHistoryStyle';

function HeaderFootsteps() {
  return (
    <>
      <HeaderFootstepsWrapper>
        <img src={images.setting.settingIcon} alt={CONST_FOOTSTEPS_HISTORY.OPERATION_LOG} />
        <TitleHeaderSetting>{CONST_FOOTSTEPS_HISTORY.OPERATION_LOG}</TitleHeaderSetting>
      </HeaderFootstepsWrapper>
    </>
  );
}

const FootstepsHistory = () => {
  const {
    BREADS,
    pageStaff,
    changePaging,
    month,
    onChangeMonth,
    listHistory,
    onSearch,
    isLoading,
    activeKey,
    setActiveKey,
    setSearchValue,
  } = useFootstepsHistory();
  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <FootstepsHistoryCard>
          <HeaderFootsteps />

          <ControlHeaderWrapper>
            <SpaceBase width={1} />
            <DatePickerCustom onChangeMonth={onChangeMonth} month={month} />
            <SearchInputWrapper
              onKeyDown={onSearch}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={CONST_COMMON.SEARCH_BY_NAME}
            />
            <PaginationRecord
              current={pageStaff.page}
              total={pageStaff.total}
              pageSize={pageStaff.per_page}
              onChange={changePaging}
            />
          </ControlHeaderWrapper>
          {isLoading && (
            <LoadingFootsteps>
              <Loading />
            </LoadingFootsteps>
          )}
          {listHistory && listHistory.length === 0 && !isLoading && (
            <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
          )}
          {listHistory && listHistory.length > 0 && (
            <FootstepsHistoryContent listHistory={listHistory} activeKey={activeKey} setActiveKey={setActiveKey} />
          )}
        </FootstepsHistoryCard>
      </Container>
    </GrantCompanyWrapper>
  );
};

export default FootstepsHistory;
