import React from 'react';
import { Require, SpaceBase } from 'styles';

import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import FileComponent from './FileComponent/FileComponent';
import HomePageWrapper from '@pages/HomePage/homePageStyle';
import InputItemCreate from './InputItemCreate/InputItemCreate';
import useNewCreateAgency from './useNewCreateAgency';

import { Form } from 'antd';
import { Container, ITemMark } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { NumberOfJP } from 'helper/regex';
import { TitleGrant } from '@containers/CompanySite/GrantCompany/CompanyStyle';
import { REGEX_EMAIL } from 'helper/regex';
import { MESSAGE_FROM_CODE } from 'constants/errorCode';
import { CONST_CREATE_AGENCY } from './constants';
import { CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT } from 'constants/language';
import { CardCreateAgency, LabelLeft, LabelMoney, RoWTitle, RowCreateAgencyWrapper } from './createAgencyStyle';

import {
  BtnVerification,
  BtnVerificationWrapper,
} from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';

const CreateAgency = () => {
  const { form, BREADS, isLoading, handleTrimSpaceInput, onFinishForm, handleFormatNumber, onChangePhoneNumber } =
    useNewCreateAgency();
  return (
    <HomePageWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <CardCreateAgency>
          <div>
            <TitleGrant>
              {CONST_CREATE_AGENCY.TITLE}
              <ITemMark>{CONST_COMMON.REQUIRE_TITLE}</ITemMark>
            </TitleGrant>
            <SpaceBase height={2} />
            <Form
              form={form}
              onFinish={onFinishForm}
              // requiredMark={false}
              scrollToFirstError={true}
              validateTrigger="onSubmit"
            >
              <RowCreateAgencyWrapper>
                <LabelLeft>{CONST_CREATE_AGENCY.NAME_AGENCY}</LabelLeft>
                <InputItemCreate
                  name="name_agency"
                  // rules={[{ required: true, message: CONST_CREATE_AGENCY.EMPTY_COMPANY_NAME }]}
                  placeholder={CONST_CREATE_AGENCY.NAME_AGENCY}
                  maxLength={100}
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, 100)}
                />
              </RowCreateAgencyWrapper>

              <RowCreateAgencyWrapper>
                <LabelLeft>
                  {CONST_CREATE_AGENCY.REPRESENTATIVE_NAME}
                  <Require>{CONST_COMMON.REQUIRE}</Require>
                </LabelLeft>
                <InputItemCreate
                  name="full_name"
                  rules={[{ required: true, message: CONST_CREATE_AGENCY.EMPTY_FULL_NAME }]}
                  placeholder={CONST_CREATE_AGENCY.FULL_NAME_PLACEHOLDER}
                  maxLength={100}
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, 100)}
                />
              </RowCreateAgencyWrapper>

              <RowCreateAgencyWrapper>
                <LabelLeft>{CONST_CREATE_AGENCY.PHONE_NUMBER}</LabelLeft>
                <InputItemCreate
                  name="phone"
                  rules={[
                    // { required: true, message: CONST_CREATE_AGENCY.EMPTY_PHONE },
                    { min: 10, message: MESSAGE_FROM_CODE.phone.A015 },
                  ]}
                  placeholder={CONST_CREATE_AGENCY.HOLDER_PHONE}
                  maxLength={13}
                  type="tel"
                  onChange={onChangePhoneNumber}
                  // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, 11)}
                />
                <LabelLeft>
                  {CONST_CREATE_AGENCY.ADDRESS_EMAIL}
                  <Require>{CONST_COMMON.REQUIRE}</Require>
                </LabelLeft>
                <InputItemCreate
                  name="email"
                  rules={[
                    { required: true, message: CONST_CREATE_AGENCY.EMPTY_MAIL },
                    {
                      pattern: REGEX_EMAIL,
                      message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.EMAIL_REGEX,
                    },
                  ]}
                  placeholder={CONST_CREATE_AGENCY.HOLDER_EMAIL}
                  inputWidth={26.25}
                  maxLength={255}
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, 255)}
                />
              </RowCreateAgencyWrapper>

              <RoWTitle>
                <LabelLeft>
                  {CONST_CREATE_AGENCY.BROKERAGE_FEE_SETTING}
                  <Require>{CONST_COMMON.REQUIRE}</Require>
                </LabelLeft>
                <LabelMoney>{CONST_CREATE_AGENCY.DEPOSIT}</LabelMoney>
                <LabelMoney>{CONST_CREATE_AGENCY.ADVANCE}</LabelMoney>
              </RoWTitle>
              <RowCreateAgencyWrapper borderNone>
                <LabelLeft />
                <InputItemCreate
                  name="deposit_fee"
                  rules={[
                    { required: true, message: CONST_CREATE_AGENCY.EMPTY_BROKERAGE_FEE },
                    {
                      pattern: NumberOfJP,
                      message: CONST_CREATE_AGENCY.INTEGER_BROKERAGE_FEE,
                    },
                  ]}
                  placeholder="00"
                  inputTail={CONST_COMMON.YEN}
                  maxLength={12}
                  alignRight
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatNumber(e, 12)}
                />
                <SpaceBase width={3} />
                <InputItemCreate
                  name="advance_fee"
                  rules={[
                    { required: true, message: CONST_CREATE_AGENCY.EMPTY_BROKERAGE_FEE },
                    {
                      pattern: NumberOfJP,
                      message: CONST_CREATE_AGENCY.INTEGER_BROKERAGE_FEE,
                    },
                  ]}
                  placeholder="00"
                  inputTail={CONST_COMMON.YEN}
                  maxLength={12}
                  alignRight
                  onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleFormatNumber(e, 12)}
                />
              </RowCreateAgencyWrapper>
              <FileComponent />
              <SpaceBase height={3.5} />
              <BtnVerificationWrapper>
                <BtnVerification isloading={isLoading ? true : undefined} onClick={form.submit}>
                  {CONST_CREATE_AGENCY.REGISTER}
                </BtnVerification>
              </BtnVerificationWrapper>
            </Form>
          </div>
        </CardCreateAgency>
      </Container>
    </HomePageWrapper>
  );
};

export default CreateAgency;
