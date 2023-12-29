import React from 'react';

import EditOperator from '@containers/OperatorSite/Operator/EditOperator/EditOperator';
import DetailOperator from '@containers/OperatorSite/Operator/DetailOperator/DetailOperator';
import SideBarOperator from '@containers/OperatorSite/Operator/SideBarOperator/SideBarOperator';

import useListOperator from './useListOperator';
import { ListOperatorWrapper } from './listOperatorStyle';

const ListOperator = () => {
  const {
    currentListOperator,
    isLoading,
    selected,
    isEdit,
    setIsEdit,
    onDelete,
    onSearch,
    changeOperatorSelected,
    updateOperator,
  } = useListOperator();
  return (
    <ListOperatorWrapper>
      <SideBarOperator
        selected={selected}
        isLoading={isLoading}
        listOperator={currentListOperator}
        onSearch={onSearch}
        setSelected={changeOperatorSelected}
      />
      {!isEdit ? (
        <DetailOperator operator={selected} setIsEdit={setIsEdit} onDelete={onDelete} />
      ) : (
        <EditOperator
          operatorSelected={selected}
          setIsEdit={setIsEdit}
          updateOperator={updateOperator}
          // format
        />
      )}
    </ListOperatorWrapper>
  );
};

export default ListOperator;
