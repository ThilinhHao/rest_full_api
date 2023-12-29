import React from 'react';
import { ListOperatorWrapper } from '@pages/OperatorSite/Operators/ListOperator/listOperatorStyle';
import SideBarCompany from '@containers/OperatorSite/Company/SideBarCompany/SideBarCompany';
import useListCompany from './useListCompany';
import { DetailCompany } from '@containers/OperatorSite/Company/DetailCompany/DetailCompany';
import EditCompany from '@containers/OperatorSite/Company/EditCompany/EditCompany';

const ListCompany = () => {
  const {
    currentListCompany,
    selected,
    isLoading,
    onSearch,
    onSetSelected,
    isEdit,
    setIsEdit,
    updateCompany,
    onDeleteCompany,
    onConfirmOperatorDocument,
    documents,
    isLoadingOperatorConfirmDocument,
  } = useListCompany();

  return (
    <ListOperatorWrapper>
      <SideBarCompany
        selected={selected}
        isLoading={isLoading}
        listCompany={currentListCompany}
        onSearch={onSearch}
        setSelected={onSetSelected}
        isPermissionCreate={true}
      />
      {!isEdit ? (
        <DetailCompany
          documentsDefault={documents}
          company={selected}
          setIsEdit={setIsEdit}
          onDeleteCompany={onDeleteCompany}
          onConfirmOperatorDocument={onConfirmOperatorDocument}
          isLoadingOperatorConfirmDocument={isLoadingOperatorConfirmDocument}
        />
      ) : (
        <EditCompany company={selected} setIsEdit={setIsEdit} isEdit={isEdit} updateCompany={updateCompany} />
      )}
    </ListOperatorWrapper>
  );
};

export default ListCompany;
