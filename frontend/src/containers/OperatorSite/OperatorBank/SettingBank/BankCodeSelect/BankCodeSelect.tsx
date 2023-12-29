import LightningBank from '@components/common/LightningBank/LightningBank';
import React from 'react';
import { BankCodeSelectWrapper } from './bankCodeSelectStyle';

const BankCodeSelect = ({ form }: { form: any }) => {
  return (
    <BankCodeSelectWrapper>
      <LightningBank width={25} height={3.125} form={form} />
    </BankCodeSelectWrapper>
  );
};

export default BankCodeSelect;
