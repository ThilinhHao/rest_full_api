import React from 'react';

import Loading from '@components/Loading';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import ItemListNotice from '@containers/OperatorSite/CreateNotice/ItemListNotice/ItemListNotice';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import useNoticeList, { INotice } from './useNoticeList';

import { NoDataAttendance } from '@pages/CompanySite/AttendanceRecord/attendanceRecordStyle';
import { GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { BottomButtonWrapper } from '@containers/OperatorSite/CreateNotice/BottomButton/bottomButtonStyle';
import { CONST_COMMON, CREATE_NOTIFICATION_OPERATOR } from 'constants/language';

import {
  BtnCreateNotice,
  ContainerNoticeList,
  ListNoticeCard,
  LoadingListNotice,
  TextTitle,
  TitleListNoticeWrapper,
} from './noticeListStyle';

const NoticeList = () => {
  const { listNotice, BREADS, navigate, pageStaff, changePaging, isLoading, toDetail } = useNoticeList();

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <ContainerNoticeList>
        <ListNoticeCard>
          {isLoading && (
            <LoadingListNotice>
              <Loading />
            </LoadingListNotice>
          )}
          <div>
            <TitleListNoticeWrapper>
              <TextTitle>{CREATE_NOTIFICATION_OPERATOR.NEW_TITLE_LIST}</TextTitle>
              <BtnCreateNotice onClick={() => navigate('create')}>
                {CREATE_NOTIFICATION_OPERATOR.NEW_POST}
              </BtnCreateNotice>
            </TitleListNoticeWrapper>

            {listNotice && listNotice.length === 0 && !isLoading && (
              <NoDataAttendance>{CONST_COMMON.NO_DATA}</NoDataAttendance>
            )}

            {listNotice.map((element: INotice) => (
              <React.Fragment key={element.id}>
                <ItemListNotice element={element} toDetail={toDetail} />
              </React.Fragment>
            ))}
          </div>
          <BottomButtonWrapper>
            <PaginationRecord
              current={pageStaff.page}
              total={pageStaff.total}
              pageSize={pageStaff.per_page}
              onChange={changePaging}
              noAbsolute={true}
            />
          </BottomButtonWrapper>
        </ListNoticeCard>
      </ContainerNoticeList>
    </GrantCompanyWrapper>
  );
};

export default NoticeList;
