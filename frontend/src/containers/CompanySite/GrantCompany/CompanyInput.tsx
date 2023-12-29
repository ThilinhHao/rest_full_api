import React from 'react';

import InputCard from '@components/Input/InputCard';
import SelectAgency from '@components/common/SelectAgency/SelectAgency';
import DropdownCustom from '@components/DropdownCustom/DropdownCustom';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';

import { colors } from 'constants/colorsBase';

import { ErrorOperator, WrapperInput } from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';
import { CardItem, RequireOperator, SpaceBase } from 'styles';
import { CONST_COMMON, CONST_CREATE_COMPANY } from 'constants/language';
import { MAX_LENGTH, EStatusCompany, USAGE_PLAN } from 'constants/constants';
import { COMPANY_STATUS } from 'constants/company';
import {
  BrokeragFeeLabel,
  CardItemDate,
  ErrorCode,
  Unit,
  WrapperBrokeragEFee,
  WrapperInputDate,
  YenWrapper,
} from './CompanyStyle';
import { ICompany, ICompanyInitData } from 'constants/operatorSite';

import {
  ElementCard,
  FirstItem,
  TitleItem,
} from '@containers/OperatorSite/Operator/DetailOperator/detailOperatorStyle';
import { Dayjs } from 'dayjs';

export const STATUS = [
  {
    value: EStatusCompany.STATUS_NOTVNVERIFY,
    label: COMPANY_STATUS[EStatusCompany.STATUS_NOTVNVERIFY],
    disabled: true,
  },
  {
    value: EStatusCompany.STATUS_USING,
    label: COMPANY_STATUS[EStatusCompany.STATUS_USING],
  },
  {
    value: EStatusCompany.STATUS_SUSPEND,
    label: COMPANY_STATUS[EStatusCompany.STATUS_SUSPEND],
  },
  {
    value: EStatusCompany.STATUS_REJECT,
    label: COMPANY_STATUS[EStatusCompany.STATUS_REJECT],
    disabled: true,
  },
];

interface ICompanyInput {
  error: ICompany;
  companyData: ICompany;
  constData?: ICompanyInitData;
  onChangeCompany: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFullName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDeposit: (e: number) => void;
  onChangeStatus: (e: number) => void;
  onChangeAgencyCode: (e: string, AgencyName: string) => void;
  onChangePhoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBrokerageFee: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePostalCodeFirst: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePostalCodeEnd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress2: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFreeStartDate: (e: Dayjs) => void;
  onChangeFreeEndDate: (e: Dayjs) => void;
  onChangeFee: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormatPhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyInput = ({
  error,
  companyData,
  constData,
  onChangeCompany,
  onChangeFullName,
  onChangeAgencyCode,
  onChangeEmail,
  onChangeDeposit,
  onChangeStatus,
  onChangePhoneNumber,
  onChangeBrokerageFee,
  onChangePostalCodeFirst,
  onChangePostalCodeEnd,
  onChangeAddress1,
  onChangeAddress2,
  onChangeFreeStartDate,
  onChangeFreeEndDate,
  onChangeFee,
  handleFormatPhone,
}: ICompanyInput) => {
  return (
    <>
      <CardItem lineBottom={true}>
        <FirstItem width="18rem">
          {CONST_CREATE_COMPANY.COMPANY_NAME}
          <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
        </FirstItem>
        <WrapperInput>
          <InputCard
            width={18.75}
            height={2.5}
            onChange={onChangeCompany}
            isShadow={true}
            value={companyData.companyName}
            placeholder={CONST_CREATE_COMPANY.COMPANY_NAME_PLACE}
            maxLength={MAX_LENGTH.DEFAULT}
            margin={[0, 4]}
            backGroundColor={colors.white}
          />
          <ErrorOperator>{error.companyName}</ErrorOperator>
        </WrapperInput>
        <ElementCard width="12rem">{CONST_CREATE_COMPANY.COMPANY_ID}</ElementCard>
        <WrapperInput>
          <InputCard
            width={18.75}
            height={2.5}
            isShadow={true}
            value={constData?.companyCode || CONST_CREATE_COMPANY.COMPANY_ID}
            disabled={true}
            maxLength={MAX_LENGTH.DEFAULT}
            backGroundColor={colors.aquaSqueeze}
          />
        </WrapperInput>
      </CardItem>

      <CardItem>
        <FirstItem width="18rem">
          {CONST_CREATE_COMPANY.POSTAL_CODE}
          <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
        </FirstItem>
        <WrapperInput>
          <InputCard
            width={6.875}
            height={2.5}
            onChange={onChangePostalCodeFirst}
            isShadow={true}
            type="tel"
            value={companyData.postalCodeFirst}
            maxLength={MAX_LENGTH.POSTAL_FIRST}
            margin={[0, 1]}
            placeholder={CONST_CREATE_COMPANY.POSTAL_FIRST_PLACE}
          />
          <ErrorCode>{error.postalCodeFirst}</ErrorCode>
        </WrapperInput>
        <ElementCard width="0rem">-</ElementCard>
        <WrapperInput>
          <InputCard
            id="focusOn"
            width={6.875}
            height={2.5}
            isShadow={true}
            type="tel"
            value={companyData.postalCodeEnd}
            onChange={onChangePostalCodeEnd}
            maxLength={MAX_LENGTH.POSTAL_END}
            margin={[0, 0, 0, 0.5]}
            placeholder={CONST_CREATE_COMPANY.POSTAL_END_PLACE}
          />
        </WrapperInput>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0rem 0 0.938rem 0">
        <FirstItem width="18rem">
          {CONST_CREATE_COMPANY.ADDRESS_FIRST}
          <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
        </FirstItem>
        <WrapperInput>
          <InputCard
            width={18.75}
            height={2.5}
            onChange={onChangeAddress1}
            isShadow={true}
            value={companyData.address1}
            placeholder={CONST_CREATE_COMPANY.ADDRESS_FIRST_PLACE}
            maxLength={MAX_LENGTH.INPUT_TEXT}
            margin={[0, 4]}
          />
          <ErrorOperator>{error.address1}</ErrorOperator>
        </WrapperInput>
        <ElementCard width="12rem">{CONST_CREATE_COMPANY.ADDRESS_SECOND}</ElementCard>
        <WrapperInput>
          <InputCard
            width={18.75}
            height={2.5}
            isShadow={true}
            value={companyData.address2}
            onChange={onChangeAddress2}
            maxLength={MAX_LENGTH.INPUT_TEXT}
            placeholder={CONST_CREATE_COMPANY.ADDRESS_END_PLACE}
          />
        </WrapperInput>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.625rem 0">
        <FirstItem width="18rem">
          {CONST_CREATE_COMPANY.REPRESENTATIVE_NAME}
          <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
        </FirstItem>
        <WrapperInput>
          <InputCard
            width={18.75}
            height={2.5}
            margin={[0, 4]}
            isShadow={true}
            value={companyData.fullName}
            placeholder={CONST_CREATE_COMPANY.FIRST_NAME_PLACE}
            onChange={onChangeFullName}
            maxLength={MAX_LENGTH.INPUT_TEXT}
          />
          <ErrorOperator>{error.fullName}</ErrorOperator>
        </WrapperInput>
        <ElementCard width="12rem">{CONST_CREATE_COMPANY.OPERATOR_ID}</ElementCard>
        <WrapperInput>
          <InputCard
            width={18.75}
            height={2.5}
            isShadow={true}
            placeholder={CONST_CREATE_COMPANY.OPERATOR_ID}
            value={constData?.idUserRoot || CONST_CREATE_COMPANY.OPERATOR_ID}
            disabled={true}
            maxLength={MAX_LENGTH.DEFAULT}
            backGroundColor={colors.aquaSqueeze}
          />
        </WrapperInput>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.625rem 0">
        <FirstItem width="18rem">{CONST_CREATE_COMPANY.PHONE_NUMBER}</FirstItem>
        <WrapperInput>
          <InputCard
            width={18.75}
            height={2.5}
            margin={[0, 4]}
            onChange={onChangePhoneNumber}
            placeholder={CONST_CREATE_COMPANY.PHONE_PLACE}
            maxLength={13}
            type="tel"
            isShadow={true}
            autoComplete="off"
            value={companyData.phoneNumber}
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatPhone(e)}
          />
          <ErrorOperator>{error.phoneNumber}</ErrorOperator>
        </WrapperInput>
        <TitleItem>
          {CONST_CREATE_COMPANY.EMAIL_ADDRESS}
          <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
        </TitleItem>
        <WrapperInput margin="0 4.063rem 0 3.1rem">
          <InputCard
            width={18.75}
            height={2.5}
            isShadow={true}
            maxLength={MAX_LENGTH.INPUT_TEXT}
            disabled={constData?.disableEmail}
            value={companyData.email}
            onChange={onChangeEmail}
            placeholder={CONST_CREATE_COMPANY.MAIL_PLACE}
          />
          <ErrorOperator>{error.email}</ErrorOperator>
        </WrapperInput>
      </CardItem>

      <CardItemDate lineBottom={true} paddingHoz="0.625rem 0">
        <FirstItem width="18rem" className="firstItem">
          {CONST_CREATE_COMPANY.FEE_FREE_DATE}
        </FirstItem>
        <WrapperInputDate>
          <DatePickerCustom
            onChangeMonth={onChangeFreeStartDate}
            month={companyData.freeStartDate}
            normalPicker={true}
            isHasBtnChange={false}
            allowClear={true}
            placeholder=""
          />
        </WrapperInputDate>
        <div className="space">〜</div>
        <WrapperInputDate>
          <DatePickerCustom
            onChangeMonth={onChangeFreeEndDate}
            month={companyData.freeEndDate}
            normalPicker={true}
            isHasBtnChange={false}
            allowClear={true}
            placeholder=""
          />
          <ErrorOperator>{error.errorFreeEndDate}</ErrorOperator>
        </WrapperInputDate>
      </CardItemDate>

      <CardItem lineBottom={true} paddingHoz="0.625rem 0">
        <FirstItem width="18rem">
          {CONST_CREATE_COMPANY.PLAN}
          <RequireOperator>{CONST_COMMON.REQUIRE}</RequireOperator>
        </FirstItem>
        <WrapperInput>
          <DropdownCustom
            options={USAGE_PLAN}
            value={USAGE_PLAN[Number(companyData.deposit) - 1 || 0].label}
            onSelect={(e) => onChangeDeposit(USAGE_PLAN[e].value + 1)}
          />
          <ErrorOperator>{error.deposit}</ErrorOperator>
        </WrapperInput>
        <SpaceBase width={4} />
        <ElementCard width="12rem">{CONST_CREATE_COMPANY.REGISTER_STATUS}</ElementCard>
        <WrapperInput>
          <DropdownCustom
            options={STATUS}
            disabled={
              !constData?.disableEmail ||
              companyData.status === EStatusCompany.STATUS_NOTVNVERIFY ||
              companyData.status === EStatusCompany.STATUS_REJECT
            }
            value={STATUS[Number(companyData?.status) - 1 || 0]?.label}
            onSelect={(e) => onChangeStatus(e)}
          />
          <ErrorOperator>{error.deposit}</ErrorOperator>
        </WrapperInput>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.625rem 0">
        <FirstItem width="18rem">{CONST_CREATE_COMPANY.FEE}</FirstItem>
        <WrapperInput>
          <InputCard
            width={8}
            height={2.5}
            type="tel"
            isShadow={true}
            maxLength={MAX_LENGTH.INPUT_TEXT}
            value={companyData.fee}
            onChange={onChangeFee}
            placeholder=""
          />
        </WrapperInput>
        <Unit className="unit">円</Unit>
      </CardItem>

      <CardItem paddingHoz="0.625rem 0">
        <FirstItem width="18rem">{CONST_CREATE_COMPANY.AGENCY_CODE}</FirstItem>
        <WrapperInput margin="0 4rem 0 0">
          <SelectAgency
            value={companyData?.agencyCode || undefined}
            onChangeAgency={onChangeAgencyCode}
            disabled={constData?.disableEmail}
          />
          <ErrorOperator>{error.agencyCode}</ErrorOperator>
        </WrapperInput>
        <ElementCard width="12rem">
          <WrapperBrokeragEFee>
            <BrokeragFeeLabel>{CONST_CREATE_COMPANY.BROKERAGE__FEE_TOP}</BrokeragFeeLabel>
            <div>{CONST_CREATE_COMPANY.BROKERAGE__PRE_CASE}</div>
          </WrapperBrokeragEFee>
        </ElementCard>
        <WrapperInput>
          <InputCard
            width={8}
            height={2.5}
            margin={[0, 0.625, 0, 0]}
            value={companyData.brokerageFee}
            disabled={!companyData?.agencyCode}
            maxLength={12}
            onChange={onChangeBrokerageFee}
          />
          <ErrorOperator width={8}>{error.brokerageFee}</ErrorOperator>
        </WrapperInput>
        <YenWrapper>{CONST_CREATE_COMPANY.YEN}</YenWrapper>
      </CardItem>
    </>
  );
};

export default CompanyInput;
