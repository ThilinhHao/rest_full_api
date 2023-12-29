import React from 'react';
import { BankCodeSelectWrapper } from '../BankCodeSelect/bankCodeSelectStyle';
import LightningBranchCode from '@components/common/LightningBranchCode/LightningBranchCode';

const BankBranchCodeSelect = ({ form }: { form: any }) => {
  return (
    <BankCodeSelectWrapper>
      <LightningBranchCode width={25} height={3.125} form={form} />
    </BankCodeSelectWrapper>
  );
};

export default BankBranchCodeSelect;
