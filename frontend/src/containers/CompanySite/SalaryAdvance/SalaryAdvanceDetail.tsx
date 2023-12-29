import React from 'react';

import images from '@assets/images-base';
import Loading from '@components/Loading';

import {
  IconInfo,
  Label,
  LabelRequired,
  RowFormItem,
  TitleLabel,
  BasicFormItem,
  BasicInput,
  DivUnit,
  NoticeRequired,
  ToolTipShow,
  CheckboxRadio,
  DetailWrapperSalary,
} from './salaryAdvanceDetailStyle';
import {
  BtnCreateWrapper,
  BtnWrapper,
  DetailForm,
  DetailFormItem,
  ItemIcon,
  PrefixIcon,
  TitlePageWrapper,
} from '../BankSetting/BankSettingDetail/bankSettingDetailStyle';
import { Container } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { SpaceBase } from 'styles';
import { RuleObject } from 'antd/es/form';
import { SettingCard } from '@pages/CompanySite/SettingPage/settingPageStyle';
import { Col, FormInstance } from 'antd';
import { ISalaryAdvanceData } from '@pages/CompanySite/SalaryAdvance/interface';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import { REGEX_SETTING_SALARY } from 'helper/regex';
import { DetailRadio, DetailRadioGroup, DivFormItem } from '../StaffManagement/DetailStaff/detailStaffStyle';
import { EApprovalMethod, MAX_LENGTH, VALIDATE_VALUE } from 'constants/constants';
import { CONST_COMPANY_BANK_SETTING, CONST_COMPANY_STAFF_MANAGEMENT, CONST_SETTING_SALARY } from 'constants/language';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface ISalaryAdvanceDetailProps {
  BREADS: IBread[];
  form: FormInstance<any>;
  salaryAdvanceData?: ISalaryAdvanceData;
  handleSubmitForm?: any;
  isLoadingBtn: boolean;
  firstTime?: boolean;
  handleStringToNumber: (
    e: React.FocusEvent<HTMLInputElement, Element>,
    length?: number | undefined,
    nullable?: boolean
  ) => void;
  handleTrimSpaceInput: (e: React.FocusEvent<HTMLInputElement, Element>, length?: number | undefined) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  navigate: any;
  isSalaryDayEndMonth: boolean;
  onChangeSalaryInputEndMonth: (e: CheckboxChangeEvent) => void;
}

export const SalaryAdvanceDetail = ({
  BREADS,
  form,
  salaryAdvanceData,
  handleSubmitForm,
  isLoadingBtn,
  firstTime,
  handleStringToNumber,
  handleTrimSpaceInput,
  handleOnChange,
  navigate,
  isSalaryDayEndMonth,
  onChangeSalaryInputEndMonth,
}: ISalaryAdvanceDetailProps) => {
  return (
    <DetailWrapperSalary firstTime={firstTime}>
      {!firstTime && <BreadCrumb margin="0.25rem 0 0.625rem 0.125rem" breads={BREADS} />}
      <Container height={firstTime ? '100%' : ''}>
        <SettingCard
          firstTime={firstTime}
          marginTop={firstTime ? '6.125rem' : '0'}
          padding={firstTime ? '1.5rem 5rem 0 8.75rem' : '1.5rem 0 0 0'}
          height={firstTime ? '100%' : ''}
          width={firstTime ? '100%' : ''}
        >
          <div>
            <TitlePageWrapper>
              <PrefixIcon src={images.companySite.settingCompany} alt="" />
              <div>{CONST_SETTING_SALARY.ADVANCE_PAYMENT_APP_SETTING}</div>
              {firstTime && <span>{CONST_SETTING_SALARY.INSTRUCTION_TEXT}</span>}
              {firstTime && <NoticeRequired>{CONST_SETTING_SALARY.NOTICE_REQUIRED}</NoticeRequired>}
            </TitlePageWrapper>

            {isLoadingBtn && <Loading />}

            {!isLoadingBtn && (
              <DetailForm
                form={form}
                initialValues={salaryAdvanceData}
                onFinish={handleSubmitForm}
                // requiredMark={false}
                scrollToFirstError={true}
                validateTrigger="onSubmit"
              >
                <Col span={24}>
                  <TitleLabel marginBottom="2.688rem">
                    {firstTime && (
                      <>
                        <LabelRequired>{CONST_SETTING_SALARY.APPROVAL_METHOD}</LabelRequired>
                        {firstTime && (
                          <>
                            <IconInfo className="iconInfo" src={images.companySite.iconInfo} alt="" />
                            <ToolTipShow
                              left="6.875rem"
                              top="-7.5rem"
                              className="tooltip"
                              width="44.813rem"
                              height="8.75rem"
                            >
                              <img src={images.companySite.tooltipSalaryType} alt="" />
                              <div className="tooltip-text">
                                <div>{CONST_SETTING_SALARY.TOOLTIP_TEXT.SALARY_TEXT_1}</div>
                                <div>{CONST_SETTING_SALARY.TOOLTIP_TEXT.SALARY_TEXT_2}</div>
                                <div>{CONST_SETTING_SALARY.TOOLTIP_TEXT.SALARY_TEXT_3}</div>
                              </div>
                            </ToolTipShow>
                          </>
                        )}
                      </>
                    )}
                    {!firstTime && <Label>{CONST_SETTING_SALARY.APPROVAL_METHOD}</Label>}
                  </TitleLabel>
                  <DetailFormItem labelCol={{ span: 24 }} colon={false} name="salary_type">
                    <DetailRadioGroup margin={'0 0 0 3.125rem'}>
                      <DetailRadio value={EApprovalMethod.MANUAL_APPROVAL}>
                        {CONST_SETTING_SALARY.MANUAL_APPROVAL}
                      </DetailRadio>
                      <DetailRadio value={EApprovalMethod.AUTO_APPROVAL}>
                        {CONST_SETTING_SALARY.AUTOMATIC_APPROVAL}
                      </DetailRadio>
                    </DetailRadioGroup>
                  </DetailFormItem>
                </Col>
                <SpaceBase height={1} />
                <Col span={24}>
                  <TitleLabel>
                    <LabelRequired>{CONST_SETTING_SALARY.DAILY_WAGE}</LabelRequired>
                    {firstTime && (
                      <>
                        <IconInfo className="iconInfo" src={images.companySite.iconInfo} alt="" />
                        <ToolTipShow left="6.75rem" top="-4.375rem" width="47rem" height="5.563rem" className="tooltip">
                          <img src={images.companySite.tooltipDayAmountLimit} alt="" />
                          <div className="tooltip-text">
                            <div>{CONST_SETTING_SALARY.TOOLTIP_TEXT.DAILY_WAGE}</div>
                          </div>
                        </ToolTipShow>
                      </>
                    )}
                  </TitleLabel>
                  <RowFormItem>
                    <DivFormItem>
                      <BasicFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        className="not-required"
                        label={CONST_COMPANY_STAFF_MANAGEMENT.DAY_TIME_APPLICATION_LIMIT}
                        name="prepaid_salary_morning"
                        rules={[
                          {
                            required: true,
                            message: CONST_SETTING_SALARY.VALIDATE.DAY_TIME_APPLICATION_LIMIT_REQUIRED,
                          },
                          () => ({
                            validator(_: RuleObject, value: string) {
                              if (value && Number(value) < VALIDATE_VALUE.SALARY_MIN) {
                                return Promise.reject(new Error(CONST_SETTING_SALARY.VALIDATE.MIN_1000_MORNING));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <BasicInput
                          placeholder={CONST_SETTING_SALARY.AMOUNT_MONEY}
                          name="prepaid_salary_morning"
                          maxLength={MAX_LENGTH.INPUT_SALARY}
                          onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                            handleStringToNumber(e, MAX_LENGTH.INPUT_SALARY)
                          }
                          onChange={handleOnChange}
                        />
                      </BasicFormItem>
                      <DivUnit>{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_ATTENDANCE}</DivUnit>
                    </DivFormItem>
                    <SpaceBase width={3} />
                    <DivFormItem>
                      <BasicFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        className="not-required"
                        label={CONST_COMPANY_STAFF_MANAGEMENT.NIGHT_TIME_APPLICATION_LIMIT}
                        name="prepaid_salary_afternoon"
                        rules={[
                          {
                            required: true,
                            message: CONST_SETTING_SALARY.VALIDATE.NIGHT_TIME_APPLICATION_LIMIT_REQUIRED,
                          },
                          () => ({
                            validator(_: RuleObject, value: string) {
                              if (value && Number(value) < VALIDATE_VALUE.SALARY_MIN) {
                                return Promise.reject(new Error(CONST_SETTING_SALARY.VALIDATE.MIN_1000_AFTERNOON));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <BasicInput
                          placeholder={CONST_SETTING_SALARY.AMOUNT_MONEY}
                          name="prepaid_salary_afternoon"
                          maxLength={MAX_LENGTH.INPUT_SALARY}
                          onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                            handleStringToNumber(e, MAX_LENGTH.INPUT_SALARY)
                          }
                          onChange={handleOnChange}
                        />
                      </BasicFormItem>
                      <DivUnit>{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_ATTENDANCE}</DivUnit>
                    </DivFormItem>
                  </RowFormItem>
                </Col>
                <SpaceBase height={1.5} />
                <Col span={24}>
                  <TitleLabel>
                    <LabelRequired>{CONST_SETTING_SALARY.MONTH_SALARY}</LabelRequired>
                    {firstTime && (
                      <>
                        <IconInfo className="iconInfo" src={images.companySite.iconInfo} alt="" />
                        <ToolTipShow
                          left="3.75rem"
                          top="-4.375rem"
                          width="44.25rem"
                          height="5.563rem"
                          className="tooltip"
                        >
                          <img src={images.companySite.tooltipMonthAmountLimit} alt="" />
                          <div className="tooltip-text">
                            <div>{CONST_SETTING_SALARY.TOOLTIP_TEXT.MONTH_SALARY}</div>
                          </div>
                        </ToolTipShow>
                      </>
                    )}
                  </TitleLabel>
                  <RowFormItem>
                    <DivFormItem>
                      <BasicFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        className="not-required"
                        label={CONST_COMPANY_STAFF_MANAGEMENT.DAYILY_TIME_APPLICATION_LIMIT}
                        name="prepaid_salary_month"
                        rules={[
                          {
                            required: true,
                            message: CONST_SETTING_SALARY.VALIDATE.DAYILY_TIME_APPLICATION_LIMIT_REQUIRED,
                          },
                          () => ({
                            validator(_: RuleObject, value: string) {
                              if (value && Number(value) < VALIDATE_VALUE.SALARY_MIN) {
                                return Promise.reject(new Error(CONST_SETTING_SALARY.VALIDATE.MIN_1000_MONTH));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <BasicInput
                          name="prepaid_salary_month"
                          placeholder={CONST_SETTING_SALARY.AMOUNT_MONEY}
                          maxLength={MAX_LENGTH.INPUT_SALARY}
                          onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                            handleStringToNumber(e, MAX_LENGTH.INPUT_SALARY)
                          }
                          onChange={handleOnChange}
                        />
                      </BasicFormItem>
                      <DivUnit>{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_DAY}</DivUnit>
                    </DivFormItem>
                    <SpaceBase width={3} />
                    <DivFormItem>
                      <BasicFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        className="not-required"
                        label={CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_TIME_APPLICATION_LIMIT}
                        name="prepaid_salary_day"
                        rules={[
                          {
                            required: true,
                            message: CONST_SETTING_SALARY.VALIDATE.MONTHLY_TIME_APPLICATION_LIMIT_REQUIRED,
                          },
                          () => ({
                            validator(_: RuleObject, value: string) {
                              if (value && Number(value) < VALIDATE_VALUE.SALARY_MIN) {
                                return Promise.reject(new Error(CONST_SETTING_SALARY.VALIDATE.MIN_1000_DAY));
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <BasicInput
                          name="prepaid_salary_day"
                          maxLength={MAX_LENGTH.INPUT_SALARY}
                          placeholder={CONST_SETTING_SALARY.AMOUNT_MONEY}
                          onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                            handleStringToNumber(e, MAX_LENGTH.INPUT_SALARY)
                          }
                          onChange={handleOnChange}
                        />
                      </BasicFormItem>
                      <DivUnit>{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_MONTH}</DivUnit>
                    </DivFormItem>
                  </RowFormItem>
                </Col>
                <SpaceBase height={1.5} />
                <Col span={24}>
                  <TitleLabel>
                    {firstTime && (
                      <>
                        <LabelRequired>{CONST_SETTING_SALARY.SALARY_CLOSING_DATE}</LabelRequired>
                        <IconInfo className="iconInfo" src={images.companySite.iconInfo} alt="" />
                        <ToolTipShow
                          left="6.875rem"
                          top="-4.375rem"
                          width="25.875rem"
                          height="5.563rem"
                          className="tooltip"
                        >
                          <img src={images.companySite.tooltipSalaryDay} alt="" />
                          <div className="tooltip-text">
                            <div>{CONST_SETTING_SALARY.TOOLTIP_TEXT.SALARY_CLOSING_DATE}</div>
                          </div>
                        </ToolTipShow>
                      </>
                    )}
                    {!firstTime && <Label>{CONST_SETTING_SALARY.SALARY_CLOSING_DATE}</Label>}
                  </TitleLabel>
                  <DivFormItem>
                    <BasicFormItem
                      labelCol={{ span: 24 }}
                      colon={false}
                      className="not-required"
                      label={
                        <>
                          {CONST_SETTING_SALARY.LAST_DAY}
                          <CheckboxRadio checked={isSalaryDayEndMonth} onChange={onChangeSalaryInputEndMonth} />
                        </>
                      }
                      name="salary_day"
                      rules={[
                        { required: !isSalaryDayEndMonth, message: CONST_SETTING_SALARY.VALIDATE.SALARY_DAY_REQUIRED },
                        {
                          pattern: REGEX_SETTING_SALARY,
                          message: CONST_SETTING_SALARY.VALIDATE.SALARY_DAY_INVALID,
                        },
                      ]}
                    >
                      <BasicInput
                        name="salary_day"
                        disabled={isSalaryDayEndMonth}
                        maxLength={MAX_LENGTH.INPUT_NUMBER}
                        placeholder={isSalaryDayEndMonth ? '' : CONST_SETTING_SALARY.DATE}
                        onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                          handleStringToNumber(e, MAX_LENGTH.INPUT_NUMBER, true)
                        }
                        onChange={handleOnChange}
                      />
                    </BasicFormItem>
                    <DivUnit>{CONST_SETTING_SALARY.DAY}</DivUnit>
                  </DivFormItem>
                </Col>
              </DetailForm>
            )}
          </div>
          {!isLoadingBtn && (
            <BtnWrapper>
              <BtnCreateWrapper
                onClick={form.submit}
                icon={
                  <ItemIcon
                    src={images.companySite.saveAccount}
                    alt={CONST_COMPANY_BANK_SETTING.ALT.SAVE_BANK_SETTING}
                  />
                }
                loading={isLoadingBtn}
              >
                {CONST_SETTING_SALARY.SAVE_SETTINGS}
              </BtnCreateWrapper>
            </BtnWrapper>
          )}
        </SettingCard>
      </Container>
    </DetailWrapperSalary>
  );
};
