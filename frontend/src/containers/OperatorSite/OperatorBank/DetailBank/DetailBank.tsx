import React from 'react';
import DetailBankComponent from './DetailBankComponent';
import { ISettingData } from 'constants/settingBank';

const DetailBank = ({ detailBank, setIsEdit }: { detailBank: ISettingData; setIsEdit: (isEdit: boolean) => void }) => {
  return (
    <DetailBankComponent
      dataDetail={{
        ...detailBank,
        bank_branches_name: detailBank.bank_branches_name
          ? `${detailBank.bank_branches_name} (${detailBank.bank_branches_code})`
          : '',
        bank_name: detailBank.bank_name ? `${detailBank.bank_name} (${detailBank.bank_code})` : '',
        deposit: detailBank.deposit_percentage || detailBank.deposit_yen || null,
        advance: detailBank.advance_percentage || detailBank.advance_yen || null,
      }}
      isLoading={false}
      setEdit={() => setIsEdit(true)}
      setIsConfirm={() => {}}
      onSubmit={() => {}}
    />
  );
};

export default DetailBank;
