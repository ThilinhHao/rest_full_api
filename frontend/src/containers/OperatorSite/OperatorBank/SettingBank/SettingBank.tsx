import React from 'react';
import images from '@assets/images-base';

import { CONST_OPERATOR_BANK, CONST_COMMON, CONST_AGENCY_SITE } from 'constants/language';
import DropdownCustom from '@components/DropdownCustom/DropdownCustom';
import { BtnSettingBank } from '@components/Style/Style';
import { TitleHeaderSetting } from '@pages/CompanySite/SettingPage/settingPageStyle';

import { Require, SpaceBase } from 'styles';
import { SettingIcon } from '../DetailBank/detailBankStyle';
import { ISettingData, OPTION_ACCOUNT_TYPE_BANK } from 'constants/settingBank';
import { HeaderSettingWrapper, TitleDetailBank } from '../operatorBankStyle';
import { BtnSettingWrapper, CancelBtn, FormInputWrapper, UsagePlanPricing, WrapperSelect } from './settingBankStyled';

import useSettingBank from './useSettingBank';
import InputSettingBank from './InputSettingBank/InputSettingBank';
import UsagePlanPricingItem from './UsagePlanPricingItem/UsagePlanPricingItem';
import DetailBankComponent from '../DetailBank/DetailBankComponent';
import { EAccountType, MAX_LENGTH } from 'constants/constants';
import { Form } from 'antd';
import PostalCodeInput from './PostalCodeInput/PostalCodeInput';
import {
  AccountNumberRules,
  FaxRulesMessage,
  MailRules,
  NameKanaRules,
  PhoneRulesMessage,
  UsagePlanRules,
} from 'constants/rules';
import BankCodeSelect from './BankCodeSelect/BankCodeSelect';
import BankBranchCodeSelect from './BankBranchCodeSelect/BankBranchCodeSelect';
import { isFormatFax, isFormatPhone } from 'helper/formatPhone';

const SettingBank = ({
  defaultSetting,
  setIsEdit,
  setDetailBank,
}: {
  setDetailBank: (detail: ISettingData) => void;
  defaultSetting: ISettingData;
  setIsEdit: (isEdit: boolean) => void;
}) => {
  const {
    form,
    isConfirm,
    isLoading,
    setIsConfirm,
    onSubmit,
    confirmBack,
    onFinishForm,
    initFormData,
    handleOnChangeFax,
    handleTrimSpaceInput,
    handleFormatPhone,
    handleOnChangePhone,
    handleFormatNumber,
    handleRegisterCode,
    handleOnChange,
  } = useSettingBank(defaultSetting, setDetailBank, setIsEdit);

  return (
    <>
      <FormInputWrapper isConfirm={isConfirm}>
        <Form
          form={form}
          onFinish={onFinishForm}
          initialValues={initFormData}
          // requiredMark={false}
          scrollToFirstError={true}
          validateTrigger="onSubmit"
        >
          {/* -----------------------{CONST_OPERATOR_BANK.USAGE_PLAN_PRICING}----------------------------------------- */}
          <HeaderSettingWrapper>
            <SettingIcon src={images.setting.settingIcon} alt="setting" />
            <TitleHeaderSetting>{CONST_OPERATOR_BANK.USAGE_PLAN_PRICING}</TitleHeaderSetting>
          </HeaderSettingWrapper>

          <UsagePlanPricing>
            <UsagePlanPricingItem
              label={CONST_OPERATOR_BANK.DEPOSIT_PLAN}
              name="deposit"
              rules={UsagePlanRules}
              form={form}
              selectName="deposit_type"
              onChange={handleOnChange}
              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatPhone(e)}
            />
            <UsagePlanPricingItem
              label={CONST_OPERATOR_BANK.REIMBURSEMENT_PLAN}
              name="advance"
              form={form}
              rules={UsagePlanRules}
              onChange={handleOnChange}
              selectName="advance_type"
              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatPhone(e)}
            />
          </UsagePlanPricing>

          {/* --------------------------------------------------運営情報設定-------------------------------------------------- */}
          <HeaderSettingWrapper>
            <SettingIcon src={images.setting.settingIcon} alt="setting" />
            <TitleHeaderSetting>運営情報設定</TitleHeaderSetting>
          </HeaderSettingWrapper>

          <InputSettingBank
            requireLine
            labelLine="企業名"
            maxLength={MAX_LENGTH.DEFAULT}
            placeholder="株式会社〇〇"
            width={30.375}
            name="name"
            onChange={handleOnChange}
            rules={[{ required: true, message: '企業名は必須です' }]}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, MAX_LENGTH.DEFAULT)}
          />
          <InputSettingBank
            labelLine="インボイス登録番号"
            maxLength={17}
            type="tel"
            placeholder="T0-0000-0000-0000"
            name="register_code"
            onChange={handleOnChange}
            rules={[{ required: false }]}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleRegisterCode(e)}
          />
          <TitleDetailBank>住所</TitleDetailBank>
          <PostalCodeInput form={form} />
          <InputSettingBank
            label="住所 1"
            maxLength={MAX_LENGTH.INPUT_TEXT}
            placeholder="〇〇県〇〇市〇〇区〇〇町0丁目0−0"
            name="address1"
            require
            onChange={handleOnChange}
            width={30.375}
            rules={[{ required: true, message: CONST_COMMON.REQUIRE_ADDRESS_1 }]}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)}
          />
          <InputSettingBank
            label="住所 2"
            maxLength={MAX_LENGTH.INPUT_TEXT}
            placeholder="〇〇ビル 0F"
            name="address2"
            width={30.375}
            rules={[{ required: false }]}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)}
          />
          <TitleDetailBank>代表者名</TitleDetailBank>
          <InputSettingBank
            require
            label="お名前"
            maxLength={MAX_LENGTH.DEFAULT}
            placeholder="前払い　管理人"
            name="user_name"
            onChange={handleOnChange}
            rules={[{ required: true, message: 'お名前は必須です' }]}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, MAX_LENGTH.DEFAULT)}
          />
          <TitleDetailBank>電話番号</TitleDetailBank>
          <InputSettingBank
            label="運営Tel"
            maxLength={13}
            placeholder="090-111-2222"
            name="phone"
            type="tel"
            onChange={handleOnChangePhone}
            rules={[
              {
                validator: (_, value) => {
                  if (!isFormatPhone(value, true)) {
                    return Promise.reject(PhoneRulesMessage.formatPattern);
                  }
                  return Promise.resolve();
                },
              },
            ]}
            // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatPhone(e)}
          />
          <InputSettingBank
            label={CONST_AGENCY_SITE.FAX_LABEL}
            maxLength={13}
            placeholder="090-111-2222"
            name="fax"
            type="tel"
            // rules={FaxRules}
            onChange={handleOnChangeFax}
            rules={[
              {
                validator: (_, value) => {
                  if (!isFormatFax(value)) {
                    return Promise.reject(FaxRulesMessage.formatPattern);
                  }
                  return Promise.resolve();
                },
              },
            ]}
            // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatFax(e)}
          />

          <InputSettingBank
            requireLine
            labelLine="運営メールアドレス"
            maxLength={MAX_LENGTH.DEFAULT}
            placeholder="maebarai@exampel.co.jp"
            name="email"
            rules={MailRules}
            onChange={handleOnChange}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, MAX_LENGTH.DEFAULT)}
          />

          {/* ------------------------------------{CONST_OPERATOR_BANK.ACCOUNT_SETTING}----------------------------------------- */}
          <SpaceBase height={4.063} />
          <HeaderSettingWrapper>
            <SettingIcon src={images.setting.settingIcon} alt="setting" />
            <TitleHeaderSetting>{CONST_OPERATOR_BANK.ACCOUNT_SETTING}</TitleHeaderSetting>
          </HeaderSettingWrapper>

          <SpaceBase height={2.5} width={5} />
          <TitleDetailBank>
            金融機関名(銀行コード)<Require>{CONST_COMMON.REQUIRE}</Require>
          </TitleDetailBank>
          <BankCodeSelect form={form} />

          <TitleDetailBank>
            {CONST_OPERATOR_BANK.BRANCH_NAME}
            <Require>{CONST_COMMON.REQUIRE}</Require>
          </TitleDetailBank>
          <BankBranchCodeSelect form={form} />

          <InputSettingBank
            requireLine
            isSevenUser
            labelLine={'企業コード'}
            maxLength={10}
            placeholder={'0123456789'}
            name="seven_user_id"
            rules={[{ required: true, message: '企業コードは必須です。' }]}
            onChange={handleOnChange}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatNumber(e, MAX_LENGTH.DEFAULT)}
          />

          <InputSettingBank
            requireLine
            labelLine={CONST_OPERATOR_BANK.ACCOUNT_NUMBER}
            maxLength={MAX_LENGTH.DEFAULT}
            placeholder={CONST_OPERATOR_BANK.PLACEHOLDER_ACCOUNT_NUMBER}
            name="account_number"
            rules={AccountNumberRules}
            onChange={handleOnChange}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatNumber(e, MAX_LENGTH.DEFAULT)}
          />

          <SpaceBase height={1} />
          <TitleDetailBank>{CONST_OPERATOR_BANK.ACCOUNT_TYPE}</TitleDetailBank>
          <WrapperSelect>
            <Form.Item name="bank_type">
              <DropdownCustom
                height="3.125rem"
                width="25rem"
                options={OPTION_ACCOUNT_TYPE_BANK}
                defaultValue={EAccountType.USUALLY}
                onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, 12)}
              />
            </Form.Item>
          </WrapperSelect>

          <InputSettingBank
            isAccountName
            labelLine={CONST_OPERATOR_BANK.NAME_KANA}
            maxLength={MAX_LENGTH.INPUT_TEXT}
            placeholder={CONST_OPERATOR_BANK.PLACEHOLDER_ACCOUNT_NAME}
            name="account_name"
            requireLine
            rules={NameKanaRules}
            onChange={handleOnChange}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)}
          />

          {/* ----------------------------------------------------BTN Submit-------------------------------------------------- */}
          <BtnSettingWrapper>
            <BtnSettingBank onClick={form.submit} loading={isLoading}>
              {CONST_COMMON.BTN_SAVE}
            </BtnSettingBank>
            <CancelBtn onClick={confirmBack}>{CONST_COMMON.CANCEL}</CancelBtn>
          </BtnSettingWrapper>
        </Form>
      </FormInputWrapper>
      {isConfirm && (
        <DetailBankComponent
          isConfirm={isConfirm}
          dataDetail={{
            ...form.getFieldsValue(),
            postal_code: form.getFieldsValue().code_1 + form.getFieldsValue().code_2,
            advance_percentage: !form.getFieldsValue().advance_type ? form.getFieldsValue().advance : null,
            deposit_percentage: !form.getFieldsValue().deposit_type ? form.getFieldsValue().deposit : null,
            bank_name: `${form.getFieldsValue().bank_code_custom.split('-')[0]} (${
              form.getFieldsValue().bank_code_custom.split('-')[1]
            })`,
            bank_branches_name: `${form.getFieldsValue().bank_branches_code_custom.split('-')[0]} (${
              form.getFieldsValue().bank_branches_code_custom.split('-')[1]
            })`,
          }}
          setIsConfirm={setIsConfirm}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default SettingBank;
