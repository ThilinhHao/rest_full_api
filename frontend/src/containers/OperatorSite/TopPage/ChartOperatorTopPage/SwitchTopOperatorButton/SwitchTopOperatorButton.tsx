import React from 'react';
import { ETotalTypeChart } from 'constants/constants';
import { SwitchButtonWrapper } from './SwitchTopOperatorButtonStyle';
import { CONST_TOP_PAGE_COMPANY } from 'constants/language';

interface ISwitchButton {
  selected: ETotalTypeChart.SALARY | ETotalTypeChart.REQUEST;
  setSelected: (selected: ETotalTypeChart.SALARY | ETotalTypeChart.REQUEST) => void;
}
const SwitchTopOperatorButton = ({ selected, setSelected }: ISwitchButton) => {
  return (
    <SwitchButtonWrapper
      block={true}
      value={selected}
      onChange={(e) => {
        if (e === ETotalTypeChart.SALARY || e === ETotalTypeChart.REQUEST) setSelected(e);
      }}
      options={[
        {
          label: CONST_TOP_PAGE_COMPANY.USAGE_AMOUNT,
          value: ETotalTypeChart.SALARY,
        },
        {
          label: CONST_TOP_PAGE_COMPANY.USER_AMOUNT,
          value: ETotalTypeChart.REQUEST,
        },
      ]}
    />
  );
};

export default SwitchTopOperatorButton;
