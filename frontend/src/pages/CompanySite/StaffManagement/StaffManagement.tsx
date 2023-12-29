import React, { useRef, useState, useEffect } from 'react';
import { StaffManagementWrapper } from './staffManagementStyle';
import useStaffManagement, { STATE_PAGE } from './useStaffManagement';
import { useLocation, useParams } from 'react-router-dom';
import SideBarStaff from '@containers/CompanySite/StaffManagement/SideBarStaff/SideBarStaff';
import { ViewStaff } from '@containers/CompanySite/StaffManagement/ViewStaff/ViewStaff';
import { EditStaff } from '@containers/CompanySite/StaffManagement/DetailStaff/EditStaff';
import { CreateStaff } from '@containers/CompanySite/StaffManagement/DetailStaff/CreateStaff';
import StaffUploadCreate from '@containers/CompanySite/StaffManagement/StaffUploadCreate/StaffUploadCreate';
import { ECompanyStaffStatusType } from 'constants/constants';
import { StaffOut } from '@containers/CompanySite/StaffManagement/DetailStaff/StaffOut';
import Loading from '@components/Loading';

const StaffManagement = () => {
  const params = useParams();
  const { state } = useLocation();
  const [hiddenSilde, setHiddenSilde] = useState<boolean>(false);

  const {
    listStaff,
    selected,
    isLoading,
    onSearch,
    setSelected,
    createStaff,
    editStaff,
    isLoadingCreateStaff,
    isLoadingEditStaff,
    isLoadingDetailStaff,
    statePage,
    setStatePage,
    searchText,
    setSearchText,
    activeStatus,
    setActiveStatus,
    detailStaff,
    setDetailStaff,
    getListStaff,
  } = useStaffManagement(params, state);

  const refStaffUploadCreate = useRef<any>();

  const refershPageStaffCreate = () => {
    refStaffUploadCreate?.current?.refreshPageStaffUploadCreate();
  };

  useEffect(() => {
    if ('/staff-list' === window.location.pathname) {
      setHiddenSilde(false);
      setStatePage(STATE_PAGE.VIEW);
      refStaffUploadCreate?.current?.refreshPageStaffUploadCreate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <StaffManagementWrapper>
      {!hiddenSilde && (
        <SideBarStaff
          selected={selected}
          isLoading={isLoading}
          listStaff={listStaff}
          onSearch={onSearch}
          setSelected={setSelected}
          statePage={statePage}
          setStatePage={setStatePage}
          searchText={searchText}
          setSearchText={setSearchText}
          activeStatus={activeStatus}
          setActiveStatus={setActiveStatus}
          refershPageStaffCreate={refershPageStaffCreate}
        />
      )}

      {statePage === STATE_PAGE.VIEW && isLoadingDetailStaff && <Loading />}
      {statePage === STATE_PAGE.VIEW &&
        !isLoadingDetailStaff &&
        detailStaff?.status !== ECompanyStaffStatusType.REJECT && (
          <ViewStaff
            staff={detailStaff}
            isLoading={isLoadingDetailStaff}
            setSelected={setSelected}
            setStatePage={setStatePage}
            setDetailStaff={setDetailStaff}
            getListStaff={getListStaff}
          />
        )}
      {statePage === STATE_PAGE.VIEW &&
        !isLoadingDetailStaff &&
        detailStaff?.status === ECompanyStaffStatusType.REJECT && (
          <StaffOut
            id={Number(params?.id)}
            staff={detailStaff}
            handleSubmitForm={editStaff}
            setStatePage={setStatePage}
            getListStaff={getListStaff}
            setDetailStaff={setDetailStaff}
          />
        )}
      {statePage === STATE_PAGE.EDIT && (
        <EditStaff
          id={Number(params?.id)}
          staff={detailStaff}
          handleSubmitForm={editStaff}
          isLoadingBtn={isLoadingEditStaff}
          setStatePage={setStatePage}
        />
      )}
      {statePage === STATE_PAGE.CREATE && (
        <CreateStaff
          staff={null}
          handleSubmitForm={createStaff}
          isLoadingBtn={isLoadingCreateStaff}
          setStatePage={setStatePage}
          getListStaff={getListStaff}
        />
      )}

      {statePage === STATE_PAGE.CREATE_MANY && (
        <StaffUploadCreate
          refStaffUploadCreate={refStaffUploadCreate}
          onGetListStaff={getListStaff}
          onSetHiddenSilde={setHiddenSilde}
        />
      )}
    </StaffManagementWrapper>
  );
};

export default StaffManagement;
