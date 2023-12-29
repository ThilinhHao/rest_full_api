import React from 'react';
import images from '@assets/images-base';

import { BtnSettingBank } from '@components/Style/Style';
import { TitleHeaderSetting } from '@pages/CompanySite/SettingPage/settingPageStyle';

import { SpaceBase } from 'styles';
import { CONST_OPERATOR_BANK, CONST_COMMON, CONST_AGENCY_SITE, CONST_COMPANY_BANK_SETTING } from 'constants/language';
import { BtnSettingWrapper, CancelBtn } from '../SettingBank/settingBankStyled';
import { ItemMoney, ItemTitleBankOperator, MoneyWrapper, NormalWeight, SettingIcon } from './detailBankStyle';
import { HeaderSettingWrapper, ItemBankWrapper, TitleDetailBank } from '../operatorBankStyle';
import { ISettingData, ObJOption } from 'constants/settingBank';
import { stringToPhoneView } from 'helper/formatPhone';
import { BANK_ACCOUNT_LABEL, EOptionYenPercentage } from 'constants/constants';

interface IDetailBank {
  isConfirm?: boolean;
  dataDetail: ISettingData;
  setIsConfirm: (isConfirm: boolean) => void;
  onSubmit: () => void;
  setEdit?: () => void;
  isLoading: boolean;
}
const DetailBankComponent = ({ isConfirm, dataDetail, setIsConfirm, onSubmit, setEdit, isLoading }: IDetailBank) => {
  const ObJOptionDeposit = dataDetail.deposit_percentage ? EOptionYenPercentage.PERCENTAGE : EOptionYenPercentage.YEN;
  const ObJOptionAdvance = dataDetail.advance_percentage ? EOptionYenPercentage.PERCENTAGE : EOptionYenPercentage.YEN;
  return (
    <React.Fragment>
      <HeaderSettingWrapper>
        <SettingIcon src={images.setting.settingIcon} alt="setting" />
        <TitleHeaderSetting>{CONST_OPERATOR_BANK.USAGE_PLAN_PRICING}</TitleHeaderSetting>
      </HeaderSettingWrapper>

      <MoneyWrapper>
        <ItemMoney>{CONST_OPERATOR_BANK.DEPOSIT_PLAN}</ItemMoney>
        <ItemMoney>{CONST_OPERATOR_BANK.REIMBURSEMENT_PLAN}</ItemMoney>
        <ItemMoney />
        <ItemMoney />
      </MoneyWrapper>
      <SpaceBase height={1} />
      <MoneyWrapper>
        <ItemMoney>
          <NormalWeight>{dataDetail.deposit}</NormalWeight> {ObJOption[ObJOptionDeposit]}
        </ItemMoney>
        <ItemMoney>
          <NormalWeight>{dataDetail.advance}</NormalWeight> {ObJOption[ObJOptionAdvance]}
        </ItemMoney>
        <ItemMoney />
        <ItemMoney />
      </MoneyWrapper>

      <HeaderSettingWrapper>
        <SettingIcon src={images.setting.settingIcon} alt="setting" />
        <TitleHeaderSetting>運営情報設定</TitleHeaderSetting>
      </HeaderSettingWrapper>
      <SpaceBase height={2.5} width={5} />
      <TitleDetailBank>企業名</TitleDetailBank>
      <ItemBankWrapper>{dataDetail.name}</ItemBankWrapper>

      <TitleDetailBank>インボイス登録番号</TitleDetailBank>
      <ItemBankWrapper>{dataDetail.register_code}</ItemBankWrapper>

      <TitleDetailBank>住所</TitleDetailBank>
      <SpaceBase height={1.688} />
      <ItemTitleBankOperator>郵便番号</ItemTitleBankOperator>
      <ItemBankWrapper>{`${dataDetail?.postal_code?.slice(0, 3) || ''}${dataDetail?.postal_code ? '-' : ''}${
        dataDetail?.postal_code?.slice(3, 7) || ''
      }`}</ItemBankWrapper>
      <ItemTitleBankOperator>住所 1</ItemTitleBankOperator>
      <ItemBankWrapper>{dataDetail.address1}</ItemBankWrapper>
      <ItemTitleBankOperator>住所 2</ItemTitleBankOperator>
      <ItemBankWrapper>{dataDetail.address2}</ItemBankWrapper>

      <TitleDetailBank>代表者名</TitleDetailBank>
      <SpaceBase height={1.688} />
      <ItemTitleBankOperator>お名前</ItemTitleBankOperator>
      <ItemBankWrapper>{dataDetail.user_name}</ItemBankWrapper>

      <TitleDetailBank>電話番号</TitleDetailBank>
      <SpaceBase height={1.688} />
      <ItemTitleBankOperator>運営Tel</ItemTitleBankOperator>
      <ItemBankWrapper>{stringToPhoneView(dataDetail.phone)}</ItemBankWrapper>
      <ItemTitleBankOperator>{CONST_AGENCY_SITE.FAX_LABEL}</ItemTitleBankOperator>
      <ItemBankWrapper>{stringToPhoneView(dataDetail.fax)}</ItemBankWrapper>

      <TitleDetailBank>運営メールアドレス</TitleDetailBank>
      <ItemBankWrapper>{dataDetail.email}</ItemBankWrapper>

      <HeaderSettingWrapper>
        <SettingIcon src={images.setting.settingIcon} alt="setting" />
        <TitleHeaderSetting>{CONST_OPERATOR_BANK.ACCOUNT_SETTING}</TitleHeaderSetting>
      </HeaderSettingWrapper>
      <SpaceBase height={2.5} width={5} />
      <TitleDetailBank>{CONST_OPERATOR_BANK.BANK_CODE}</TitleDetailBank>
      <ItemBankWrapper>{dataDetail.bank_name}</ItemBankWrapper>
      <TitleDetailBank>{CONST_OPERATOR_BANK.BRANCH_NAME}</TitleDetailBank>
      <ItemBankWrapper>{dataDetail.bank_branches_name}</ItemBankWrapper>

      <TitleDetailBank>{CONST_COMPANY_BANK_SETTING.LABEL.SEVEN_USER_ID}</TitleDetailBank>
      <ItemBankWrapper>{dataDetail.seven_user_id}</ItemBankWrapper>
      <TitleDetailBank>{CONST_OPERATOR_BANK.ACCOUNT_NUMBER}</TitleDetailBank>
      <ItemBankWrapper>{dataDetail.account_number}</ItemBankWrapper>
      <TitleDetailBank>{CONST_OPERATOR_BANK.ACCOUNT_TYPE}</TitleDetailBank>
      <ItemBankWrapper>{BANK_ACCOUNT_LABEL[dataDetail.bank_type || 1] || ''}</ItemBankWrapper>

      <TitleDetailBank>{CONST_OPERATOR_BANK.NAME_KANA}</TitleDetailBank>
      <ItemBankWrapper>{dataDetail.account_name}</ItemBankWrapper>

      {!isConfirm && (
        <React.Fragment>
          <SpaceBase height={6.813} />
          <BtnSettingBank onClick={setEdit}>{CONST_OPERATOR_BANK.EDIT}</BtnSettingBank>
          <SpaceBase height={6.813} />
        </React.Fragment>
      )}

      {isConfirm && (
        <BtnSettingWrapper>
          <BtnSettingBank onClick={onSubmit} loading={isLoading}>
            {CONST_OPERATOR_BANK.KEEP}
          </BtnSettingBank>
          <CancelBtn
            onClick={() => {
              if (isLoading) return true;
              setIsConfirm(false);
            }}
          >
            {CONST_COMMON.CANCEL}
          </CancelBtn>
        </BtnSettingWrapper>
      )}
    </React.Fragment>
  );
};

export default DetailBankComponent;
