import React from 'react';
import { AdminAccountWrapper } from './listAdminAccountstyle';
import useListAdminAccount, { STATE_PAGE } from './useListAdminAccount';
import { ViewAdminAccount } from '@containers/CompanySite/AdminAccount/ViewAdminAccount/ViewAdminAccount';
import SideBarAdminAccount from '@containers/CompanySite/AdminAccount/SideBarAdminAccount/SideBarAdminAccount';
import { useLocation, useParams } from 'react-router-dom';
import { DetailAdminAccount } from '@containers/CompanySite/AdminAccount/DetailAdminAccount/DetailAdminAccount';

const ListAdminAccount = () => {
  const params = useParams();
  const { state } = useLocation();

  const {
    listAdminAccount,
    selected,
    isLoading,
    onSearch,
    setSelected,
    createAdminAccount,
    editAdminAccount,
    isLoadingCreateAdminAccount,
    isLoadingEditAdminAccount,
    statePage,
    setStatePage,
    searchText,
    setSearchText,
    getListAdminAccount,
  } = useListAdminAccount();

  return (
    <AdminAccountWrapper>
      <SideBarAdminAccount
        selected={selected || state}
        isLoading={isLoading}
        listAdminAccount={listAdminAccount}
        onSearch={onSearch}
        setSelected={setSelected}
        setStatePage={setStatePage}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {statePage === STATE_PAGE.VIEW && (
        <ViewAdminAccount
          adminAccount={selected || state}
          setSelected={setSelected}
          setStatePage={setStatePage}
          getListAdminAccount={getListAdminAccount}
        />
      )}
      {statePage === STATE_PAGE.EDIT && (
        <DetailAdminAccount
          id={Number(params?.id)}
          adminAccount={selected || state}
          handleSubmitForm={editAdminAccount}
          isLoadingBtn={isLoadingEditAdminAccount}
          setStatePage={setStatePage}
        />
      )}
      {statePage === STATE_PAGE.CREATE && (
        <DetailAdminAccount
          adminAccount={selected}
          handleSubmitForm={createAdminAccount}
          isLoadingBtn={isLoadingCreateAdminAccount}
          setStatePage={setStatePage}
        />
      )}
    </AdminAccountWrapper>
  );
};

export default ListAdminAccount;
