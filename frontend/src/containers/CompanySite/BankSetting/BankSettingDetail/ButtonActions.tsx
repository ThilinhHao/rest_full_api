import React from 'react';

import { FormInstance } from 'antd/lib/form/Form';
import { CONST_COMMON, CONST_COMPANY_BANK_SETTING } from 'constants/language';
import { BtnCreateWrapper, BtnWrapper, Buttons } from './bankSettingDetailStyle';
import { BtnCancelWrapper } from '@containers/CompanySite/StaffManagement/DetailStaff/detailStaffStyle';

interface IButtonActionsProps {
  form: FormInstance<any>;
  isLoadingBtn: boolean;
  isConfirmed: boolean;
  onSubmitForm: () => Promise<void>;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonActions = ({
  form,
  isLoadingBtn,
  isConfirmed,
  onSubmitForm,
  setIsConfirmed,
}: IButtonActionsProps) => {
  return (
    <>
      {!isConfirmed && (
        <BtnWrapper>
          <BtnCreateWrapper onClick={form.submit} loading={isLoadingBtn}>
            {CONST_COMPANY_BANK_SETTING.BTN_SAVE}
          </BtnCreateWrapper>
        </BtnWrapper>
      )}
      {isConfirmed && (
        <Buttons>
          <BtnWrapper>
            <BtnCreateWrapper onClick={onSubmitForm} loading={isLoadingBtn}>
              {CONST_COMMON.CREATE}
            </BtnCreateWrapper>
          </BtnWrapper>
          <BtnWrapper>
            <BtnCancelWrapper onClick={() => setIsConfirmed(false)} disabled={isLoadingBtn}>
              {CONST_COMMON.CORRECTION}
            </BtnCancelWrapper>
          </BtnWrapper>
        </Buttons>
      )}
    </>
  );
};
