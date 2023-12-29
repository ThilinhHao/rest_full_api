import React from 'react';

import EditAgency from '@containers/OperatorSite/Agency/EditAgency/EditAgency';
import DetailAgency from '@containers/OperatorSite/Agency/DetailAgency/DetailAgency';
import SideBarAgency from '@containers/OperatorSite/Agency/SiderBarAgency/SiderBarAgency';
import { ListOperatorWrapper } from '@pages/OperatorSite/Operators/ListOperator/listOperatorStyle';

import useListAgency from './useListAgency';

const ListAgency = () => {
  const {
    currentListAgency,
    selected,
    isLoading,
    documents,
    isEdit,
    onSearch,
    setIsEdit,
    updateListAgency,
    onDeleteAgency,
    changeAgencySelected,
  } = useListAgency();
  return (
    <ListOperatorWrapper>
      <SideBarAgency
        selected={selected}
        isLoading={isLoading}
        listAgency={currentListAgency}
        onSearch={onSearch}
        setSelected={changeAgencySelected}
      />
      {!isEdit ? (
        <DetailAgency agency={selected} setIsEdit={setIsEdit} onDeleteAgency={onDeleteAgency} documents={documents} />
      ) : (
        <EditAgency agency={selected} setIsEdit={setIsEdit} updateListAgency={updateListAgency} />
      )}
    </ListOperatorWrapper>
  );
};

export default ListAgency;
