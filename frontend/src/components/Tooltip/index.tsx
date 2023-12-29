import React from 'react';
import { Tooltip, TooltipProps } from 'antd';
import './index.scss';

const TooltipBase = ({ ...props }: TooltipProps) => {
  return <Tooltip id="tooltipWrapper" {...props} />;
};

export default TooltipBase;
