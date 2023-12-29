import React from 'react';
import { ETypeChartAgency } from 'constants/constants';
import { SwitchButtonWrapper } from './switchAgencyTopButtonStyle';
import { CONST_TOP_PAGE_AGENCY } from 'constants/language';

interface ISwitchButton {
  selected: ETypeChartAgency.NUMBER_USES | ETypeChartAgency.USAGE_AMOUNT | ETypeChartAgency.BROKERAGE_FEE;
  setSelected: (
    selected: ETypeChartAgency.NUMBER_USES | ETypeChartAgency.USAGE_AMOUNT | ETypeChartAgency.BROKERAGE_FEE
  ) => void;
}
const SwitchAgencyTopButton = ({ selected, setSelected }: ISwitchButton) => {
  return (
    <SwitchButtonWrapper
      block={true}
      value={selected}
      onChange={(e) => {
        if (
          e === ETypeChartAgency.NUMBER_USES ||
          e === ETypeChartAgency.USAGE_AMOUNT ||
          e === ETypeChartAgency.BROKERAGE_FEE
        )
          setSelected(e);
      }}
      options={[
        {
          label: CONST_TOP_PAGE_AGENCY.NUMBER_USES,
          value: ETypeChartAgency.NUMBER_USES,
        },
        {
          label: CONST_TOP_PAGE_AGENCY.USAGE_AMOUNT,
          value: ETypeChartAgency.USAGE_AMOUNT,
        },
        {
          label: CONST_TOP_PAGE_AGENCY.BROKERAGE_FEE,
          value: ETypeChartAgency.BROKERAGE_FEE,
        },
      ]}
    />
  );
};

export default SwitchAgencyTopButton;
