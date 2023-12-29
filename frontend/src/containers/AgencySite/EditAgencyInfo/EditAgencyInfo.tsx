import React from 'react';

import images from '@assets/images-base';
import EditItem from './EditItem/EditItem';
import WrapperBox from '@containers/OperatorSite/Agency/EditAgency/WrapperBox/WrapperBox';
import TitleAgency from '@containers/OperatorSite/Agency/TitleAgency/TitleAgency';
import LightningBank from '@components/common/LightningBank/LightningBank';
import DropdownCustom from '@components/DropdownCustom/DropdownCustom';
import InputCoverAgency from './InputCoverAgency/InputCoverAgency';
import LightningBranchCode from '@components/common/LightningBranchCode/LightningBranchCode';
import PostalCodeSettingBank from './PostalCodeSettingBank/PostalCodeSettingBank';

import { Form } from 'antd';
import { katakanaAccountName } from 'helper/regex';
import { FaxRules, PhoneRulesMessage } from 'constants/rules';
import { ItemIcon } from '@containers/CompanySite/AdminAccount/DetailAdminAccount/detailAdminAccountStyle';
import { SpaceBase } from 'styles';
import { IDetailAgency } from '@pages/AgencySite/ProfileAgency/useProfileAgency';
import { BtnSettingBank } from '@components/Style/Style';
import { BankCodeWrapper } from './editAgencyInfoStyle';
import { EditItemWrapper } from './EditItem/editItemStyle';
import { OPTION_EDIT_PROFILE } from 'constants/agency';
import { BtnSettingWrapper, CancelBtn } from '@containers/OperatorSite/OperatorBank/SettingBank/settingBankStyled';
import { CONST_AGENCY_SITE, CONST_COMMON } from 'constants/language';
import useEditAgencyInfo, { IDataEditAgencyInfo } from './useEditAgencyInfo';
import { isFormatPhone } from 'helper/formatPhone';

const EditAgencyInfo = ({
  detailAgencyData,
  setIsEdit,
  updateAgencyData,
}: {
  detailAgencyData: IDetailAgency;
  updateAgencyData: (data: IDataEditAgencyInfo) => void;
  setIsEdit: (isEdit: boolean) => void;
}) => {
  const {
    form,
    isLoading,
    initialValues,
    confirmBack,
    onFinishForm,
    handleTrimSpaceInput,
    handleOnChangeFax,
    handleStringToNumber,
    handleOnChange,
    handleOnChangePhone,
  } = useEditAgencyInfo(detailAgencyData, setIsEdit, updateAgencyData);

  return (
    <>
      <SpaceBase height={1.875} />
      <Form
        form={form}
        onFinish={onFinishForm}
        initialValues={initialValues}
        // style={{ fontFamily: 'Noto Sans JP , sans-serif' }}
        // requiredMark={false}
        scrollToFirstError={true}
        validateTrigger="onSubmit"
      >
        <WrapperBox title={CONST_AGENCY_SITE.BASIC_INFORMATION} width="100%">
          <EditItem
            label={CONST_AGENCY_SITE.COMPANY_NAME}
            name="name"
            value={detailAgencyData.name}
            rules={[{ required: false }]}
            disabled={true}
          />

          <TitleAgency title={CONST_AGENCY_SITE.AGENCY_CODE} width="100%" />
          <EditItem name="code" value={detailAgencyData.code} rules={[{ required: false }]} disabled={true} />

          <TitleAgency title={CONST_AGENCY_SITE.INVOICE_REGISTRATION} width="100%" />
          <EditItem
            name="register_code"
            placeholder={CONST_AGENCY_SITE.INVOICE_REGISTRATION_HOLDER}
            maxLength={17}
            type="tel"
            // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleRegisterCode(e)}
            onChange={handleOnChange}
          />

          <TitleAgency title={CONST_AGENCY_SITE.ADDRESS} width="100%" />
          <PostalCodeSettingBank form={form} />
          <InputCoverAgency
            require
            label={CONST_AGENCY_SITE.LABEL_ADDRESS_FIRST}
            maxLength={255}
            placeholder={CONST_AGENCY_SITE.ADDRESS_FIRST_HOLDER}
            name="address1"
            width={30.375}
            rules={[{ required: true, message: CONST_COMMON.REQUIRE_ADDRESS_1 }]}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, 255)}
            onChange={handleOnChange}
          />
          <InputCoverAgency
            label={CONST_AGENCY_SITE.LABEL_ADDRESS_SECOND}
            maxLength={255}
            placeholder="〇〇ビル 0F"
            name="address2"
            width={30.375}
            rules={[{ required: false }]}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, 255)}
            onChange={handleOnChange}
          />

          <TitleAgency title={CONST_AGENCY_SITE.REPRESENTATIVE} width="100%" />
          <EditItem
            require
            label={CONST_AGENCY_SITE.NAME}
            name="full_name"
            placeholder={CONST_AGENCY_SITE.ADVANCE_PAYMENT_MANAGER}
            maxLength={100}
            rules={[{ required: true, message: CONST_AGENCY_SITE.EMPTY_NAME }]}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e)}
            onChange={handleOnChange}
          />

          <TitleAgency title={CONST_AGENCY_SITE.PHONE} width="100%" />

          <InputCoverAgency
            require
            label={CONST_AGENCY_SITE.TEL}
            name="phone"
            type="tel"
            placeholder={CONST_AGENCY_SITE.PLACEHOLDER_PHONE}
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(CONST_AGENCY_SITE.EMPTY_TEL);
                  }
                  if (!isFormatPhone(value, true)) {
                    return Promise.reject(PhoneRulesMessage.formatPattern);
                  }
                  return Promise.resolve();
                },
              },
            ]}
            // rules={[
            //   { required: true, message: CONST_AGENCY_SITE.EMPTY_PHONE },
            //   { min: 10, message: CONST_COMMON.INCORRECT_PHONE },
            // ]}
            maxLength={13}
            // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatPhone(e)}
            onChange={handleOnChangePhone}
          />

          <InputCoverAgency
            label={CONST_AGENCY_SITE.FAX_LABEL}
            maxLength={13}
            placeholder={CONST_AGENCY_SITE.FAX_HOLDER}
            name="fax"
            type="tel"
            rules={FaxRules}
            // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatPhone(e)}
            onChange={handleOnChangeFax}
          />

          <TitleAgency title={CONST_AGENCY_SITE.EMAIL} width="100%" />
          <EditItem name="email" rules={[{ required: false }]} disabled={true} />
        </WrapperBox>

        <SpaceBase height={1.5} />
        <WrapperBox title={CONST_AGENCY_SITE.BROKERAGE_FEE} width="100%">
          <EditItem
            label={CONST_AGENCY_SITE.DEPOSIT}
            name="deposit_fee"
            value={detailAgencyData.deposit_fee}
            rules={[{ required: false }]}
            disabled={true}
            inputTail={CONST_COMMON.YEN}
            onChange={handleOnChange}
          />

          <TitleAgency title={CONST_AGENCY_SITE.REIMBURSEMENT} width="100%" />
          <EditItem
            name="advance_fee"
            rules={[{ required: false }]}
            disabled={true}
            value={detailAgencyData.advance_fee}
            inputTail={CONST_COMMON.YEN}
            onChange={handleOnChange}
          />
        </WrapperBox>

        <SpaceBase height={1.5} />
        <WrapperBox title={CONST_AGENCY_SITE.ACCOUNT_INFORMATION} width="100%">
          <SpaceBase height={1.875} />
          <TitleAgency title={CONST_AGENCY_SITE.BANK_CODE_TITLE} require width="100%" />

          <BankCodeWrapper>
            <LightningBank width={25} height={3.125} form={form} />
          </BankCodeWrapper>

          <TitleAgency title={CONST_AGENCY_SITE.BANK_BRANCH_TITLE} require width="100%" />
          <BankCodeWrapper>
            <LightningBranchCode width={25} height={3.125} form={form} />
          </BankCodeWrapper>

          <TitleAgency title={CONST_AGENCY_SITE.ACCOUNT_TYPE} width="100%" />
          <EditItemWrapper>
            <Form.Item name="bank_type">
              <DropdownCustom height="3.125rem" width="25rem" options={OPTION_EDIT_PROFILE} />
            </Form.Item>
          </EditItemWrapper>

          <TitleAgency title={CONST_AGENCY_SITE.ACCOUNT_NAME_TITLE} width="100%" require isAccountName />

          <EditItem
            name="account_name"
            maxLength={100}
            rules={[
              { required: true, message: CONST_AGENCY_SITE.EMPTY_ACCOUNT_NAME },
              {
                pattern: katakanaAccountName,
                message: CONST_COMMON.KATAKANA_HAF_AGENCY,
              },
            ]}
            placeholder={CONST_AGENCY_SITE.ACCOUNT_NAME_PLACE}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e)}
            onChange={handleOnChange}
          />

          <TitleAgency title={CONST_AGENCY_SITE.ACCOUNT_TITLE_NUMBER} width="100%" require />
          <EditItem
            name="account_number"
            type="tel"
            maxLength={100}
            rules={[{ required: true, message: CONST_AGENCY_SITE.EMPTY_ACCOUNT_NUMBER }]}
            placeholder={CONST_AGENCY_SITE.ACCOUNT_TITLE_PLACE}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStringToNumber(e)}
          />
        </WrapperBox>
        <BtnSettingWrapper>
          <BtnSettingBank
            onClick={form.submit}
            icon={<ItemIcon src={images.agencySite.saveAgency} top="0.25rem" />}
            loading={isLoading}
          >
            {CONST_COMMON.SETTING}
          </BtnSettingBank>
          {window.location.pathname !== '/setting/profile' && (
            <CancelBtn onClick={confirmBack}>{CONST_COMMON.CANCEL}</CancelBtn>
          )}
        </BtnSettingWrapper>
      </Form>
    </>
  );
};

export default EditAgencyInfo;
