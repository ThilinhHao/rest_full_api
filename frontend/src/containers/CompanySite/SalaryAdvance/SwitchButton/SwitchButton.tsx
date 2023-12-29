import React from 'react';
import { EApprovalMethod } from 'constants/constants';
import { SwitchButtonWrapper } from './switchButtonStyle';
import { CONST_SETTING_SALARY } from 'constants/language';

interface ISwitchButton {
  selected: EApprovalMethod.AUTO_APPROVAL | EApprovalMethod.MANUAL_APPROVAL;
  setSelected: (selected: EApprovalMethod.AUTO_APPROVAL | EApprovalMethod.MANUAL_APPROVAL) => void;
}
const SwitchButton = ({ selected, setSelected }: ISwitchButton) => {
  return (
    <SwitchButtonWrapper
      block={true}
      value={selected}
      onChange={(e) => {
        if (e === EApprovalMethod.AUTO_APPROVAL || e === EApprovalMethod.MANUAL_APPROVAL) setSelected(e);
      }}
      options={[
        {
          label: CONST_SETTING_SALARY.AUTOMATIC_APPROVAL,
          value: EApprovalMethod.AUTO_APPROVAL,
        },
        {
          label: CONST_SETTING_SALARY.MANUAL_APPROVAL,
          value: EApprovalMethod.MANUAL_APPROVAL,
        },
      ]}
    />
  );
};

export default SwitchButton;
