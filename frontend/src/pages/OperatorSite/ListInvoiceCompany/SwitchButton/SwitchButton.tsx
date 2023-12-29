import React from 'react';

import { SwitchButtonWrapper } from './switchButtonStyle';
import { CONST_OPERATOR_INVOICE } from 'constants/language';
import { DEPOSIT_TYPE, REIMBURSEMENT_TYPE } from 'constants/invoice';

interface ISwitchButton {
  selected: number;
  setSelected: (selected: number) => void;
}
const SwitchButton = ({ selected, setSelected }: ISwitchButton) => {
  return (
    <SwitchButtonWrapper
      block={true}
      value={selected}
      onChange={(e) => {
        if (e === DEPOSIT_TYPE || e === REIMBURSEMENT_TYPE) setSelected(e);
      }}
      options={[
        {
          label: CONST_OPERATOR_INVOICE.DEPOSIT,
          value: DEPOSIT_TYPE,
        },
        {
          label: CONST_OPERATOR_INVOICE.REIMBURSEMENT,
          value: REIMBURSEMENT_TYPE,
        },
      ]}
    />
  );
};

export default SwitchButton;
