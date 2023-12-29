import React from 'react';
import images from '@assets/images-base';
import { SpaceBase } from 'styles';
import { showConfirm } from 'helper/modal-confirm';
import { CONST_COMMON } from 'constants/language';
import { BtnContainerWrapper, CancelButton, EditButton } from './buttonContainerStyle';

const ButtonContainer = ({
  onEdit,
  isLoading,
  setIsEdit,
  isEdited,
}: {
  onEdit: () => void;
  isLoading: boolean;
  isEdited: boolean;
  setIsEdit: (isEdit: boolean) => void;
}) => {
  const checkBeforeBack = () => {
    if (isEdited) {
      showConfirm({
        content: CONST_COMMON.REMOVE_EDIT,
        onOk: () => setIsEdit(false),
      });
      return;
    }
    setIsEdit(false);
  };

  return (
    <BtnContainerWrapper>
      <EditButton onClick={onEdit} isLoading={isLoading}>
        <img src={images.dealerAgency.computer} alt="Edit" />
        {CONST_COMMON.KEEP}
      </EditButton>
      <SpaceBase width={6.25} />
      <CancelButton isLoading={isLoading} onClick={checkBeforeBack}>
        {CONST_COMMON.CANCEL}
      </CancelButton>
    </BtnContainerWrapper>
  );
};

export default ButtonContainer;
