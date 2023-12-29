import React from 'react';

import { WrapperPage } from '@components/Style/Style';
import useListCompany from './useListCompany';
import SideBarCompany from '@containers/AgencySite/SideBarCompany';

import CompanyDetail from '@containers/AgencySite/CompanyDetail/companyDetail';

const ListCompany = () => {
  const {
    currentListCompany,
    selected,
    isLoading,
    onSearch,
    setSelected,
    detailCompany,
    isLoadingDetailCompany,
    onChangeDate,
    dateSearch,
    companyStatisticalDate,
    isLoadingCompanyStatisticalDate,
  } = useListCompany();

  return (
    <WrapperPage>
      <SideBarCompany
        selected={selected}
        isLoading={isLoading}
        listCompany={currentListCompany}
        onSearch={onSearch}
        setSelected={setSelected}
        isPermissionCreate={false}
      />

      <CompanyDetail
        company={selected}
        isLoadingDetailCompany={isLoadingDetailCompany}
        isLoadingCompanyStatisticalDate={isLoadingCompanyStatisticalDate}
        detailCompany={detailCompany}
        onChangeDate={onChangeDate}
        dateSearch={dateSearch}
        companyStatisticalDate={companyStatisticalDate}
      />
    </WrapperPage>
  );
};

export default ListCompany;
