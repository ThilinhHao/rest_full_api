import React from 'react';

import { colors } from 'constants/colorsBase';
import { getUseRoleByHostName } from 'helper';
import { ButtonAction, Buttons, ButtonUpload } from './style';
import { CONST_CHAT_MANAGEMENT, CONST_COMMON } from 'constants/language';
import { USER_ROLE_AGENCY, USER_ROLE_COMPANY, USER_ROLE_OPERATOR, USER_ROLE_STAFF } from 'constants/User';

const widthBtnUpload = {
  [USER_ROLE_OPERATOR]: '9.125rem',
  [USER_ROLE_COMPANY]: '25rem',
  [USER_ROLE_AGENCY]: '9.125rem',
  [USER_ROLE_STAFF]: '9.125rem',
};

const heightBtnUpload = {
  [USER_ROLE_OPERATOR]: '3.125rem',
  [USER_ROLE_COMPANY]: '4.25rem',
  [USER_ROLE_AGENCY]: '9.125rem',
  [USER_ROLE_STAFF]: '9.125rem',
};

interface IUploadButtons {
  cancelUpload: () => void;
  sendUploadFiles: () => void;
  isLoadingSaveFile: boolean;
}

export const UploadButtons = ({ cancelUpload, sendUploadFiles, isLoadingSaveFile }: IUploadButtons) => {
  return getUseRoleByHostName() === USER_ROLE_OPERATOR ? (
    <Buttons width="22.563rem">
      <ButtonAction
        width={widthBtnUpload[getUseRoleByHostName()]}
        height={heightBtnUpload[getUseRoleByHostName()]}
        onClick={sendUploadFiles}
        loading={isLoadingSaveFile}
      >
        {CONST_CHAT_MANAGEMENT.CHANGE_NEW}
      </ButtonAction>
      <ButtonAction
        width={widthBtnUpload[getUseRoleByHostName()]}
        height={heightBtnUpload[getUseRoleByHostName()]}
        background={colors.nobel}
        color={colors.white}
        border={`1px solid ${colors.nobel}`}
        onClick={cancelUpload}
      >
        {CONST_COMMON.CANCEL}
      </ButtonAction>
    </Buttons>
  ) : (
    <Buttons>
      <ButtonUpload
        width={widthBtnUpload[getUseRoleByHostName()]}
        height={heightBtnUpload[getUseRoleByHostName()]}
        onClick={sendUploadFiles}
        loading={isLoadingSaveFile}
      >
        {CONST_CHAT_MANAGEMENT.CHANGE_NEW}
      </ButtonUpload>
      <ButtonUpload
        width={widthBtnUpload[getUseRoleByHostName()]}
        height={heightBtnUpload[getUseRoleByHostName()]}
        background={colors.white}
        color={colors.atomicTangerine}
        border={`1px solid ${colors.atomicTangerine}`}
        onClick={cancelUpload}
      >
        {CONST_COMMON.CANCEL}
      </ButtonUpload>
    </Buttons>
  );
};
