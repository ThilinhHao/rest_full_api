import React from 'react';

import { Form } from 'antd';
import { katakanaAccountName } from 'helper/regex';
import { ItemIcon } from '@containers/CompanySite/AdminAccount/DetailAdminAccount/detailAdminAccountStyle';
import { ICompanyProfile } from '@pages/CompanySite/CompanyProfile/interface';
import { EditItemWrapper } from '@containers/AgencySite/EditAgencyInfo/EditItem/editItemStyle';
import { BtnSettingWrapper } from '@containers/OperatorSite/OperatorBank/SettingBank/settingBankStyled';
import { OPTION_EDIT_PROFILE } from 'constants/agency';
import { RowCenter, SpaceBase } from 'styles';
import { DetailProfileCompanyWrapper } from '../DetailProfileCompany/detailProfileCompanyStyle';
import { BtnCreateCompany, CancelEditCompanyBtn } from './editProfileStyle';
import {
  CONST_AGENCY_SITE,
  CONST_COMMON,
  CONST_COMPANY_BANK_SETTING,
  CONST_COMPANY_PROFILE,
  CONST_CREATE_COMPANY,
  CONST_OPERATOR_BANK,
} from 'constants/language';

import images from '@assets/images-base';
import EditItem from '@containers/AgencySite/EditAgencyInfo/EditItem/EditItem';
import WrapperBox from '@containers/OperatorSite/Agency/EditAgency/WrapperBox/WrapperBox';
import TitleAgency from '@containers/OperatorSite/Agency/TitleAgency/TitleAgency';
import DropdownCustom from '@components/DropdownCustom/DropdownCustom';
import useEditProfileCompany, { IDataEditCompanyInfo } from './useEditProfileCompany';
import { MAX_LENGTH } from 'constants/constants';
import { Strikethrough } from './editProfileCompanyStyle';
import LightningBank from '@components/common/LightningBank/LightningBank';
import { BankCodeWrapper } from '@containers/AgencySite/EditAgencyInfo/editAgencyInfoStyle';
import LightningBranchCode from '@components/common/LightningBranchCode/LightningBranchCode';
import { isFormatPhone } from 'helper/formatPhone';
import { PhoneRulesMessage } from 'constants/rules';
import { DEPOSIT_TYPE } from 'constants/invoice';

interface IEditProfileCompany {
  companyProfile: ICompanyProfile;
  setIsEdit: (isEdit: boolean) => void;
  updateCompanyData: (data: IDataEditCompanyInfo) => void;
}
const EditProfileCompany = ({ companyProfile, setIsEdit, updateCompanyData }: IEditProfileCompany) => {
  const {
    form,
    initialValues,
    isLoading,
    onFinishForm,
    handleStringToNumber,
    onChangeFirstPostal,
    confirmBack,
    handleOnChange,
    handleOnChangePhone,
  } = useEditProfileCompany(companyProfile, setIsEdit, updateCompanyData);

  const requireBankSetting = companyProfile.usage_plan === DEPOSIT_TYPE ? true : false;

  return (
    <DetailProfileCompanyWrapper>
      <Form
        form={form}
        onFinish={onFinishForm}
        initialValues={initialValues}
        style={{ fontFamily: 'Noto Sans JP , sans-serif' }}
        // requiredMark={false}
        scrollToFirstError={true}
        validateTrigger="onSubmit"
      >
        <SpaceBase height={2} />
        <WrapperBox title={CONST_COMPANY_PROFILE.COMPANY_INFORMATION} width="100%">
          <SpaceBase height={2} />
          <TitleAgency title={CONST_COMPANY_PROFILE.COMPANY_NAME} width="100%" />
          <EditItem name="name" rules={[{ required: false }]} disabled={true} />
          <TitleAgency title={CONST_COMPANY_PROFILE.COMPANY_ID} width="100%" />
          <EditItem name="code" rules={[{ required: false }]} disabled={true} />
          <TitleAgency title={CONST_COMPANY_PROFILE.USAGE_PLAN} width="100%" />
          <EditItem name="usage_plan" rules={[{ required: false }]} disabled={true} />

          <TitleAgency title={CONST_COMPANY_PROFILE.POST_CODE} require width="100%" />
          <RowCenter>
            <EditItem
              name="postal_code_1"
              type="tel"
              inputWidth={8}
              maxLength={MAX_LENGTH.POSTAL_FIRST}
              style={{ textAlign: 'center' }}
              rules={[
                { required: true, message: CONST_COMPANY_PROFILE.REQUIRED_POSTAL_CODE },
                {
                  validator: (_, value) => {
                    try {
                      const postalCodeLast = form?.getFieldValue('postal_code_2') || '';
                      const valueLength = value.length || 0;
                      const codeLength = postalCodeLast.length || 0;
                      const length = valueLength + codeLength;
                      if (length > 0 && length < 7) {
                        return Promise.reject(CONST_COMPANY_PROFILE.WRONG_ZIP_COD);
                      }
                      return Promise.resolve();
                    } catch (error) {}
                  },
                },
              ]}
              placeholder={CONST_COMPANY_PROFILE.PLACEHOLDER_POSTAL_FIRST}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFirstPostal(e)}
              distance="1.875rem 1rem 0.5rem 3.25rem"
              isPostalCode={true}
            />
            <Strikethrough>-</Strikethrough>
            <EditItem
              id="focusNext"
              type="tel"
              name="postal_code_2"
              inputWidth={8}
              maxLength={MAX_LENGTH.POSTAL_END}
              style={{ textAlign: 'center' }}
              rules={[
                { required: false },
                {
                  validator: (_, value) => {
                    try {
                      const postalCodeLast = form?.getFieldValue('postal_code_1') || '';
                      const valueLength = value.length || 0;
                      const codeLength = postalCodeLast.length || 0;
                      const length = valueLength + codeLength;
                      if (!postalCodeLast || (length > 0 && length < 7)) {
                        return Promise.reject('');
                      }
                      return Promise.resolve();
                    } catch (error) {}
                  },
                },
              ]}
              placeholder={CONST_COMPANY_PROFILE.PLACEHOLDER_POSTAL_SECOND}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStringToNumber(e)}
              distance="1.875rem 1rem 0.5rem 1rem"
              isPostalCode={true}
            />
          </RowCenter>

          <TitleAgency title={CONST_COMPANY_PROFILE.ADDRESS_FIRST} require width="100%" />
          <EditItem
            name="address1"
            inputWidth={50}
            maxLength={MAX_LENGTH.INPUT_TEXT}
            rules={[{ required: true, message: CONST_COMMON.REQUIRE_ADDRESS_1 }]}
            placeholder=""
          />
          <TitleAgency title={CONST_COMPANY_PROFILE.ADDRESS_SECOND} width="100%" />
          <EditItem
            name="address2"
            inputWidth={50}
            maxLength={MAX_LENGTH.INPUT_TEXT}
            rules={[{ required: false }]}
            placeholder=""
          />

          <TitleAgency title={CONST_COMPANY_PROFILE.AGENCY_CODE} width="100%" />
          <EditItem name="agency_code" rules={[{ required: false }]} disabled={true} />
          <TitleAgency title={CONST_COMPANY_PROFILE.AGENCY_NAME} width="100%" />
          <EditItem name="agency_name" rules={[{ required: false }]} disabled={true} />
        </WrapperBox>

        <SpaceBase height={2} />
        <WrapperBox title={CONST_COMPANY_PROFILE.REPRESENTATIVE_INFORMATION} width="100%">
          <SpaceBase height={2} />
          <TitleAgency title={CONST_COMPANY_PROFILE.REPRESENTATIVE_NAME} width="100%" />
          <EditItem name="operator_name" rules={[{ required: false }]} disabled={true} />
          <TitleAgency title={CONST_COMPANY_PROFILE.ADMINISTRATOR_ID} width="100%" />
          <EditItem name="operator_id" rules={[{ required: false }]} disabled={true} />

          <TitleAgency title={CONST_COMPANY_PROFILE.PHONE} require width="100%" />
          <EditItem
            name="phone"
            type="tel"
            maxLength={13}
            // rules={[
            //   { required: true, message: CONST_CREATE_COMPANY.EMPTY_PHONE },
            //   { min: 10, message: CONST_COMPANY_PROFILE.INCORRECT_PHONE },
            // ]}
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(CONST_CREATE_COMPANY.EMPTY_PHONE);
                  }
                  if (!isFormatPhone(value, true)) {
                    return Promise.reject(PhoneRulesMessage.formatPattern);
                  }
                  return Promise.resolve();
                },
              },
            ]}
            placeholder={CONST_COMPANY_PROFILE.PLACEHOLDER_PHONE}
            onChange={handleOnChangePhone}
            // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleOnChangePhone(e)}
          />
          <TitleAgency title={CONST_COMPANY_PROFILE.EMAIL} width="100%" />
          <EditItem name="email" rules={[{ required: false }]} placeholder="" disabled={true} />
        </WrapperBox>

        {companyProfile?.usage_plan === DEPOSIT_TYPE && (
          <>
            <SpaceBase height={2} />
            <WrapperBox title={CONST_COMPANY_PROFILE.ACCOUNT_INFORMATION} width="100%">
              <SpaceBase height={2} />

              <TitleAgency title={CONST_COMPANY_PROFILE.BANK_CODE} require={requireBankSetting} width="100%" />

              <BankCodeWrapper>
                <LightningBank
                  width={25}
                  height={3.125}
                  form={form}
                  isRequired={requireBankSetting}
                  onlySevenBank={true}
                />
              </BankCodeWrapper>

              <TitleAgency title={CONST_COMPANY_PROFILE.BRANCHES_CODE} require={requireBankSetting} width="100%" />
              <BankCodeWrapper>
                <LightningBranchCode width={25} height={3.125} form={form} isRequired={requireBankSetting} />
              </BankCodeWrapper>

              <TitleAgency
                title={CONST_COMPANY_BANK_SETTING.LABEL.SEVEN_USER_ID}
                require={requireBankSetting}
                isSevenUser
                width="100%"
              />
              <EditItem
                name="seven_user_id"
                type="tel"
                maxLength={10}
                rules={[
                  { required: requireBankSetting, message: CONST_COMPANY_BANK_SETTING.VALIDATE.SEVEN_USER_REQUIRE },
                ]}
                placeholder={CONST_COMPANY_BANK_SETTING.PLACEHOLDER.SEVEN_USER_ID}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStringToNumber(e)}
              />

              <TitleAgency title={CONST_COMPANY_PROFILE.ACCOUNT_NUMBER} require={requireBankSetting} width="100%" />
              <EditItem
                name="account_number"
                type="tel"
                maxLength={MAX_LENGTH.DEFAULT}
                rules={[{ required: requireBankSetting, message: CONST_OPERATOR_BANK.EMPTY_ACCOUNT_NUMBER }]}
                placeholder={CONST_AGENCY_SITE.ACCOUNT_TITLE_PLACE}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStringToNumber(e)}
              />

              <TitleAgency title={CONST_COMPANY_PROFILE.ACCOUNT_TYPE} width="100%" />
              <EditItemWrapper>
                <Form.Item name="bank_type">
                  <DropdownCustom height="3.125rem" width="25rem" options={OPTION_EDIT_PROFILE} />
                </Form.Item>
              </EditItemWrapper>

              <TitleAgency
                title={CONST_COMPANY_PROFILE.NOMINEE_NAME}
                require={requireBankSetting}
                width="100%"
                isAccountName
              />
              <EditItem
                name="account_name"
                maxLength={MAX_LENGTH.INPUT_TEXT}
                rules={[
                  { required: requireBankSetting, message: CONST_OPERATOR_BANK.EMPTY_ACCOUNT_NAME },
                  {
                    pattern: katakanaAccountName,
                    message: CONST_COMMON.KATAKANA_HAF_OPERATOR,
                  },
                ]}
                placeholder={CONST_AGENCY_SITE.ACCOUNT_NAME_PLACE}
                onChange={handleOnChange}
              />
            </WrapperBox>
          </>
        )}
        <BtnSettingWrapper>
          <BtnCreateCompany
            onClick={form.submit}
            icon={<ItemIcon src={images.companySite.saveAccount} />}
            loading={isLoading}
          >
            {CONST_COMMON.KEEP}
          </BtnCreateCompany>
          <CancelEditCompanyBtn onClick={confirmBack}>{CONST_COMMON.CANCEL}</CancelEditCompanyBtn>
        </BtnSettingWrapper>
      </Form>
    </DetailProfileCompanyWrapper>
  );
};

export default EditProfileCompany;
