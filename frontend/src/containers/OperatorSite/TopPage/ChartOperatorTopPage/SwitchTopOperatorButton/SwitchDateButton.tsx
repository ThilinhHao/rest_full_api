import React from 'react';
import { ETotalTypeChart } from 'constants/constants';
import { SwitchDateButtonWrapper } from './SwitchTopOperatorButtonStyle';
import { CONST_TOP_PAGE_OPERATOR } from 'constants/language';

interface ISwitchButton {
  selected: ETotalTypeChart.SALARY | ETotalTypeChart.REQUEST;
  setSelected: (selected: ETotalTypeChart.SALARY | ETotalTypeChart.REQUEST) => void;
}
const SwitchDateButton = ({ selected, setSelected }: ISwitchButton) => {
  return (
    <SwitchDateButtonWrapper
      block={true}
      value={selected}
      isLeft={selected === ETotalTypeChart.SALARY}
      onChange={(e: ETotalTypeChart.SALARY | ETotalTypeChart.REQUEST) => {
        if (e === ETotalTypeChart.SALARY || e === ETotalTypeChart.REQUEST) setSelected(e);
      }}
      options={[
        {
          label: CONST_TOP_PAGE_OPERATOR.YEAR,
          value: ETotalTypeChart.SALARY,
        },
        {
          label: CONST_TOP_PAGE_OPERATOR.MONTH,
          value: ETotalTypeChart.REQUEST,
        },
      ]}
    />
  );
};

export default SwitchDateButton;
