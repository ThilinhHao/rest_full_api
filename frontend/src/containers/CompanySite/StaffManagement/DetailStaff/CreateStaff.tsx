import React from 'react';

import images from '@assets/images-base';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import ModalCommon from '@components/Modal/ModalCommon';
import useDetailStaff from './useDetailStaff';

import { colors } from 'constants/colorsBase';
import { RuleObject } from 'antd/es/form';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { Container, GrantCard } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { ICompanyStaffDetailInformation } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { Col, RadioChangeEvent } from 'antd';
import { katakana, REGEX_EMAIL } from 'helper/regex';
import { ECompanyStaffSalaryType, MAX_LENGTH, VALIDATE_VALUE } from 'constants/constants';
import { CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT, CONST_SETTING_SALARY } from 'constants/language';

import {
  BasicFormItem,
  BasicInput,
  BtnCreateWrapper,
  BtnWrapper,
  ColSalaryType,
  DetailForm,
  DetailFormItem,
  DetailInput,
  DetailRadio,
  DetailRadioGroup,
  DetailWrapper,
  DivFormItem,
  DivUnit,
  ItemIcon,
  ModalContent,
  NoticeRequired,
  PrefixIcon,
  TitleLabel,
  TitlePageWrapper,
  TitleWrapper,
} from './detailStaffStyle';
import { isFormatPhone } from 'helper/formatPhone';
import { PhoneRulesMessage } from 'constants/rules';

interface IDetaillStaffProps {
  id?: number;
  staff: ICompanyStaffDetailInformation | null;
  handleSubmitForm?: any;
  isLoadingBtn: boolean;
  setStatePage: React.Dispatch<React.SetStateAction<number>>;
  getListStaff: () => Promise<void>;
}

export const CreateStaff = ({
  id,
  staff,
  handleSubmitForm,
  isLoadingBtn,
  setStatePage,
  getListStaff,
}: IDetaillStaffProps) => {
  const {
    form,
    currentStaff,
    BREADS,
    salaryType,
    setSalaryType,
    handleTrimSpaceInput,
    handleStringToNumber,
    onFinishForm,
    showPopupConfirmBack,
    isOpenModal,
    setIsOpenModal,
    newStaff,
    navigateToViewAfterCreate,
    handleOnChange,
    handleOnChangePhone,
  } = useDetailStaff(staff, setStatePage, id, handleSubmitForm, getListStaff);

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} onClickHome={() => showPopupConfirmBack(true)} onClickPath={showPopupConfirmBack} />
      <Container>
        <GrantCard padding="1.25rem 0" percentWidth="100%" width={86.875}>
          <div>
            <TitlePageWrapper>
              <TitleWrapper>
                <PrefixIcon
                  src={images.companySite.createStaff}
                  alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.CREATE_ONE_STAFF}
                />
                <div>{CONST_COMPANY_STAFF_MANAGEMENT.STAFF_ACCOUNT_ISSUANCE}</div>
                <NoticeRequired>{CONST_COMPANY_STAFF_MANAGEMENT.NOTICE_REQUIRED}</NoticeRequired>
              </TitleWrapper>
            </TitlePageWrapper>
            <DetailForm
              form={form}
              initialValues={currentStaff}
              onFinish={onFinishForm}
              // requiredMark={false}
              scrollToFirstError={true}
              validateTrigger="onSubmit"
            >
              <Col span={24}>
                <DetailFormItem
                  labelCol={{ span: 24 }}
                  colon={false}
                  label={CONST_COMMON.FULL_NAME}
                  name="name"
                  rules={[{ required: true, message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_REQUIRED }]}
                >
                  <DetailInput
                    name="name"
                    placeholder={CONST_COMMON.PLACEHOLDER.FULL_NAME}
                    maxLength={MAX_LENGTH.DEFAULT}
                    onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                      handleTrimSpaceInput(e, MAX_LENGTH.DEFAULT)
                    }
                    onChange={handleOnChange}
                  />
                </DetailFormItem>
              </Col>
              <Col span={24}>
                <DetailFormItem
                  labelCol={{ span: 24 }}
                  colon={false}
                  label={CONST_COMMON.FULL_NAME_FURIGANA}
                  name="name_kana"
                  rules={[
                    { required: true, message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_KATA_REQUIRED },
                    {
                      pattern: katakana,
                      message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_KATA_REGEX,
                    },
                  ]}
                >
                  <DetailInput
                    name="name_kana"
                    placeholder={CONST_COMMON.PLACEHOLDER.FULL_NAME_FURIGANA}
                    maxLength={MAX_LENGTH.DEFAULT}
                    onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                      handleTrimSpaceInput(e, MAX_LENGTH.DEFAULT)
                    }
                    onChange={handleOnChange}
                  />
                </DetailFormItem>
              </Col>
              <Col span={24}>
                <DetailFormItem
                  labelCol={{ span: 24 }}
                  colon={false}
                  label={CONST_COMMON.PHONE_NUMBER}
                  name="phone"
                  rules={[
                    () => ({
                      validator(_: RuleObject, value: string) {
                        if (!isFormatPhone(value, true)) {
                          return Promise.reject(PhoneRulesMessage.formatPattern);
                        }
                        // if (value && !value.replace(/-/g, '').match(REGEX_PHONE_NUMBER_FORMATTED)) {
                        //   return Promise.reject(new Error(CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.PHONE_NUMBER_REGEX));
                        // }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <DetailInput
                    name="phone"
                    placeholder={CONST_COMMON.PLACEHOLDER.PHONE_NUMBER}
                    maxLength={13}
                    // onBlur={handleFormatPhone}
                    onChange={handleOnChangePhone}
                  />
                </DetailFormItem>
              </Col>
              <Col span={24}>
                <DetailFormItem
                  labelCol={{ span: 24 }}
                  colon={false}
                  label={CONST_COMMON.EMAIL}
                  name="email"
                  rules={[
                    { required: true, message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.EMAIL_REQUIRED },
                    {
                      pattern: REGEX_EMAIL,
                      message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.EMAIL_REGEX,
                    },
                  ]}
                >
                  <DetailInput
                    name="email"
                    placeholder={CONST_COMMON.PLACEHOLDER.EMAIL}
                    maxLength={MAX_LENGTH.INPUT_TEXT}
                    onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                      handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)
                    }
                    onChange={handleOnChange}
                  />
                </DetailFormItem>
              </Col>
              <ColSalaryType span={24}>
                <DetailFormItem
                  labelCol={{ span: 24 }}
                  colon={false}
                  label={CONST_COMPANY_STAFF_MANAGEMENT.SALARY_FORM}
                  name="salary_type"
                  rules={[{ required: true, message: '' }]}
                >
                  <DetailRadioGroup
                    margin={salaryType ? '' : '3.25rem 3.125rem 0.625rem 3.125rem'}
                    onChange={(e: RadioChangeEvent) => {
                      setSalaryType(e.target.value);
                    }}
                  >
                    <DetailRadio value={ECompanyStaffSalaryType.DAILY_SALARY}>
                      {CONST_COMPANY_STAFF_MANAGEMENT.DAILY_SALARY}
                    </DetailRadio>
                    <DetailRadio value={ECompanyStaffSalaryType.MONTHLY_SALARY}>
                      {CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_SALARY}
                    </DetailRadio>
                  </DetailRadioGroup>
                </DetailFormItem>
                {!salaryType && (
                  <div className="required">{CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.SALARY_TYPE_REQUIRED}</div>
                )}
              </ColSalaryType>
              {(!salaryType || salaryType === ECompanyStaffSalaryType.DAILY_SALARY) && (
                <Col span={24}>
                  <TitleLabel>{CONST_COMPANY_STAFF_MANAGEMENT.INDIVIDUAL_SETTING}</TitleLabel>
                  <DivFormItem>
                    <BasicFormItem
                      labelCol={{ span: 24 }}
                      colon={false}
                      label={CONST_COMPANY_STAFF_MANAGEMENT.DAY_TIME_APPLICATION_LIMIT}
                      name="day_amount_limit_1"
                      rules={[
                        () => ({
                          validator(_: RuleObject, value: string) {
                            if (value !== '' && Number(value) < VALIDATE_VALUE.SALARY_MIN) {
                              return Promise.reject(new Error(CONST_SETTING_SALARY.VALIDATE.MIN_1000));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <BasicInput
                        name="day_amount_limit_1"
                        maxLength={MAX_LENGTH.INPUT_SALARY}
                        onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                          handleStringToNumber(e, MAX_LENGTH.INPUT_SALARY)
                        }
                        onChange={handleOnChange}
                      />
                    </BasicFormItem>
                    <DivUnit>{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_ATTENDANCE}</DivUnit>
                  </DivFormItem>
                  <DivFormItem>
                    <BasicFormItem
                      labelCol={{ span: 24 }}
                      colon={false}
                      label={CONST_COMPANY_STAFF_MANAGEMENT.NIGHT_TIME_APPLICATION_LIMIT}
                      name="day_amount_limit_2"
                      rules={[
                        () => ({
                          validator(_: RuleObject, value: string) {
                            if (value !== '' && Number(value) < VALIDATE_VALUE.SALARY_MIN) {
                              return Promise.reject(new Error(CONST_SETTING_SALARY.VALIDATE.MIN_1000));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <BasicInput
                        name="day_amount_limit_2"
                        maxLength={MAX_LENGTH.INPUT_SALARY}
                        onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                          handleStringToNumber(e, MAX_LENGTH.INPUT_SALARY)
                        }
                        onChange={handleOnChange}
                      />
                    </BasicFormItem>
                    <DivUnit>{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_ATTENDANCE}</DivUnit>
                  </DivFormItem>
                </Col>
              )}
              {salaryType === ECompanyStaffSalaryType.MONTHLY_SALARY && (
                <Col span={24}>
                  <TitleLabel>{CONST_COMPANY_STAFF_MANAGEMENT.INDIVIDUAL_SETTING}</TitleLabel>
                  <DivFormItem>
                    <BasicFormItem
                      labelCol={{ span: 24 }}
                      colon={false}
                      label={CONST_COMPANY_STAFF_MANAGEMENT.DAYILY_TIME_APPLICATION_LIMIT}
                      name="month_amount_limit_1"
                      rules={[
                        () => ({
                          validator(_: RuleObject, value: string) {
                            if (value !== '' && Number(value) < VALIDATE_VALUE.SALARY_MIN) {
                              return Promise.reject(new Error(CONST_SETTING_SALARY.VALIDATE.MIN_1000));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <BasicInput
                        name="month_amount_limit_1"
                        maxLength={MAX_LENGTH.INPUT_SALARY}
                        onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                          handleStringToNumber(e, MAX_LENGTH.INPUT_SALARY)
                        }
                        onChange={handleOnChange}
                      />
                    </BasicFormItem>
                    <DivUnit>{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_DAY}</DivUnit>
                  </DivFormItem>
                  <DivFormItem>
                    <BasicFormItem
                      labelCol={{ span: 24 }}
                      colon={false}
                      label={CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_TIME_APPLICATION_LIMIT}
                      name="month_amount_limit_2"
                      rules={[
                        () => ({
                          validator(_: RuleObject, value: string) {
                            if (value !== '' && Number(value) < VALIDATE_VALUE.SALARY_MIN) {
                              return Promise.reject(new Error(CONST_SETTING_SALARY.VALIDATE.MIN_1000));
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <BasicInput
                        name="month_amount_limit_2"
                        maxLength={MAX_LENGTH.INPUT_SALARY}
                        onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                          handleStringToNumber(e, MAX_LENGTH.INPUT_SALARY)
                        }
                        onChange={handleOnChange}
                      />
                    </BasicFormItem>
                    <DivUnit>{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_MONTH}</DivUnit>
                  </DivFormItem>
                </Col>
              )}
            </DetailForm>
          </div>
          <BtnWrapper paddingTop={'2.5rem'}>
            <BtnCreateWrapper
              icon={
                <ItemIcon
                  src={images.companySite.saveAccount}
                  alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.CREATE_ONE_STAFF}
                />
              }
              loading={isLoadingBtn}
              onClick={form.submit}
            >
              {CONST_COMMON.ISSUE}
            </BtnCreateWrapper>
          </BtnWrapper>
          <ModalCommon
            isOpen={isOpenModal}
            setIsOpen={() => setIsOpenModal(false)}
            onClickCancel={() => {
              setIsOpenModal(false);
              navigateToViewAfterCreate();
            }}
            onCancel={() => {
              setIsOpenModal(false);
              navigateToViewAfterCreate();
            }}
            isShowBtnOk={false}
            txtCancel={CONST_COMMON.BACK}
            _className="confirm-company-pair"
            btnCancelColor={colors.atomicTangerine}
          >
            <ModalContainer>
              <ModalContent>
                <div>{newStaff?.name}</div>
                <div>
                  {CONST_COMPANY_STAFF_MANAGEMENT.CODE} {newStaff?.email}
                </div>
                <div>
                  {newStaff?.name} {CONST_COMPANY_STAFF_MANAGEMENT.INVITED}
                </div>
              </ModalContent>
            </ModalContainer>
          </ModalCommon>
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};
