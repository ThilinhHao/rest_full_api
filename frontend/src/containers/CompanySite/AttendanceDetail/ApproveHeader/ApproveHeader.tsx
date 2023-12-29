import React from 'react';
import { ApplicationAmountHeader, ApproveHeaderWrapper, NameApproveHeader } from './approveHeaderStyle';
import { RequestTime } from '../ApproveTable/approveTableStyle';

const ApproveHeader = () => {
  return (
    <ApproveHeaderWrapper>
      <NameApproveHeader>氏名</NameApproveHeader>
      <RequestTime>申請時間</RequestTime>
      <ApplicationAmountHeader>申請額</ApplicationAmountHeader>
    </ApproveHeaderWrapper>
  );
};

export default ApproveHeader;
