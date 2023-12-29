import { Container, GrantCard } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { Button, Col, RadioChangeEvent, Select } from 'antd';
import React, { useEffect } from 'react';
import images from '@assets/images-base';
import { CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT, CONST_SETTING_SALARY } from 'constants/language';
import {
  BasicFormItem,
  BasicInput,
  BtnCancelWrapper,
  DetailForm,
  DetailFormItem,
  DetailInput,
  DetailRadio,
  DetailRadioGroup,
  DetailSelect,
  DivFormItem,
  DivUnit,
  ItemIcon,
  ModalConfirmContent,
  TitleLabel,
} from './detailStaffStyle';
import { ECompanyStaffSalaryType, ECompanyStaffStatusType, MAX_LENGTH, VALIDATE_VALUE } from 'constants/constants';
import { ICompanyStaffDetailInformation } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import { katakana } from 'helper/regex';
import useDetailStaff from './useDetailStaff';
import { FormRowEdit } from '../ViewStaff/viewStaffStyle';
import {
  TitleRow,
  ViewFormBase,
  DetailWrapper,
  TitlePageWrapper,
  PrefixIcon,
  BtnWrapper,
  BtnActionWrapper,
} from '@components/CompanySite/common/styled';
import { MenuItemIcon } from '@components/layout/SideBar/sideBarStyle';
import { Icon } from '@containers/CompanySite/BankSetting/BankSettingDetail/bankSettingDetailStyle';
import { ViewFormScroll } from '@components/CompanySite/common/ViewFormScroll/styled';
import { RuleObject } from 'antd/es/form';
import {
  isDisabledInputEditBasicInfoStaff,
  isDisabledInputEditStaff,
  isDisabledStatusSelectEditStaff,
} from 'helper/getBackgroupItemStaff';
import { PhoneRulesMessage } from 'constants/rules';
import { isFormatPhone } from 'helper/formatPhone';
import ModalCommon from '@components/Modal/ModalCommon';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { getDayjsByTimeZone } from 'helper/date';

const { Option } = Select;

interface IDetaillStaffProps {
  id?: number;
  staff: ICompanyStaffDetailInformation | null;
  handleSubmitForm?: any;
  isLoadingBtn: boolean;
  setStatePage: React.Dispatch<React.SetStateAction<number>>;
}

export const EditStaff = ({ id, staff, handleSubmitForm, isLoadingBtn, setStatePage }: IDetaillStaffProps) => {
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
    isShowedBasicInfor,
    setIsShowedBasicInfor,
    isShowedAccountInfor,
    setIsShowedAccountInfor,
    handleOnChange,
    handleOnChangePhone,
    isOpenModalConfirmChangeStatus,
    setIsOpenModalConfirmChangeStatus,
    updateStaff,
    lastAttendanceTime,
    isLoadingSubmit,
  } = useDetailStaff(staff, setStatePage, id, handleSubmitForm);

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line
  }, [currentStaff]);

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} onClickHome={() => showPopupConfirmBack(true)} onClickPath={showPopupConfirmBack} />
      <Container>
        <GrantCard padding="1.25rem 0" percentWidth="100%" width={86.875}>
          <div>
            <TitlePageWrapper>
              <PrefixIcon src={images.companySite.account} alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.STAFF} />
              <div>{CONST_COMPANY_STAFF_MANAGEMENT.STAFF_INFORMATION}</div>
            </TitlePageWrapper>
            <DetailForm
              form={form}
              initialValues={currentStaff}
              onFinish={onFinishForm}
              // requiredMark={false}
              padding={'0'}
              scrollToFirstError={true}
              validateTrigger="onSubmit"
            >
              <ViewFormBase paddingTop={'0'}>
                <ViewFormScroll isShowed={isShowedBasicInfor} padding={'1.875rem 11.25rem 0 11.25rem'}>
                  <TitleRow>
                    <span>{CONST_COMPANY_STAFF_MANAGEMENT.BASIC_INFORMATION}</span>
                    <MenuItemIcon
                      src={isShowedBasicInfor ? images.companySite.iconHide : images.companySite.iconShow}
                      alt={isShowedBasicInfor ? 'hide' : 'show'}
                      onClick={() => setIsShowedBasicInfor(!isShowedBasicInfor)}
                    />
                  </TitleRow>
                  <FormRowEdit className={isShowedBasicInfor ? 'rowVisible' : 'rowHidden'} padding={'1.875rem 0 0 0'}>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={CONST_COMPANY_STAFF_MANAGEMENT.ID_STAFF}
                        name="code"
                      >
                        <DetailInput name="code" disabled={true} />
                      </DetailFormItem>
                    </Col>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={CONST_COMMON.FULL_NAME}
                        name="name"
                        rules={[
                          { required: true, message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_REQUIRED },
                        ]}
                      >
                        <DetailInput
                          name="name"
                          disabled={
                            isDisabledInputEditStaff(currentStaff?.status) ||
                            isDisabledInputEditBasicInfoStaff(currentStaff?.status)
                          }
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
                          {
                            required: true,
                            message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_KATA_REQUIRED,
                          },
                          {
                            pattern: katakana,
                            message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_KATA_REGEX,
                          },
                        ]}
                      >
                        <DetailInput
                          name="name_kana"
                          disabled={
                            isDisabledInputEditStaff(currentStaff?.status) ||
                            isDisabledInputEditBasicInfoStaff(currentStaff?.status)
                          }
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
                              //   return Promise.reject(
                              //     new Error(CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.PHONE_NUMBER_REGEX)
                              //   );
                              // }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <DetailInput
                          name="phone"
                          disabled={
                            isDisabledInputEditStaff(currentStaff?.status) ||
                            isDisabledInputEditBasicInfoStaff(currentStaff?.status)
                          }
                          placeholder={CONST_COMMON.PLACEHOLDER.PHONE_NUMBER}
                          maxLength={13}
                          // onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => handleTrimSpaceInput(e, 11)}
                          onChange={handleOnChangePhone}
                        />
                      </DetailFormItem>
                    </Col>
                    <Col span={24}>
                      <DetailFormItem labelCol={{ span: 24 }} colon={false} label={CONST_COMMON.EMAIL} name="email">
                        <DetailInput name="email" placeholder={CONST_COMMON.PLACEHOLDER.EMAIL} disabled={true} />
                      </DetailFormItem>
                    </Col>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={CONST_COMPANY_STAFF_MANAGEMENT.SALARY_FORM}
                        name="salary_type"
                        rules={[{ required: true, message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.EMAIL_REQUIRED }]}
                      >
                        <DetailRadioGroup
                          onChange={(e: RadioChangeEvent) => {
                            setSalaryType(e.target.value);
                          }}
                          disabled={isDisabledInputEditStaff(currentStaff?.status)}
                        >
                          <DetailRadio value={ECompanyStaffSalaryType.DAILY_SALARY}>
                            {CONST_COMPANY_STAFF_MANAGEMENT.DAILY_SALARY}
                          </DetailRadio>
                          <DetailRadio value={ECompanyStaffSalaryType.MONTHLY_SALARY}>
                            {CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_SALARY}
                          </DetailRadio>
                        </DetailRadioGroup>
                      </DetailFormItem>
                    </Col>
                    {salaryType === ECompanyStaffSalaryType.DAILY_SALARY && (
                      <Col span={24}>
                        <TitleLabel marginBottom={'1.875rem'}>
                          {CONST_COMPANY_STAFF_MANAGEMENT.INDIVIDUAL_SETTING}
                        </TitleLabel>
                        <DivFormItem>
                          <BasicFormItem
                            className="formEdit"
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
                              disabled={isDisabledInputEditStaff(currentStaff?.status)}
                              className="formEdit"
                              maxLength={MAX_LENGTH.INPUT_SALARY}
                              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                                handleStringToNumber(e, MAX_LENGTH.INPUT_NUMBER)
                              }
                              onChange={handleOnChange}
                            />
                          </BasicFormItem>
                          <DivUnit className="formEdit">{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_ATTENDANCE}</DivUnit>
                        </DivFormItem>
                        <DivFormItem>
                          <BasicFormItem
                            className="formEdit"
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
                              disabled={isDisabledInputEditStaff(currentStaff?.status)}
                              className="formEdit"
                              maxLength={MAX_LENGTH.INPUT_SALARY}
                              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                                handleStringToNumber(e, MAX_LENGTH.INPUT_NUMBER)
                              }
                              onChange={handleOnChange}
                            />
                          </BasicFormItem>
                          <DivUnit className="formEdit">{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_ATTENDANCE}</DivUnit>
                        </DivFormItem>
                      </Col>
                    )}
                    {salaryType === ECompanyStaffSalaryType.MONTHLY_SALARY && (
                      <Col span={24}>
                        <TitleLabel marginBottom={'1.875rem'}>
                          {CONST_COMPANY_STAFF_MANAGEMENT.INDIVIDUAL_SETTING}
                        </TitleLabel>
                        <DivFormItem>
                          <BasicFormItem
                            className="formEdit"
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
                              className="formEdit"
                              name="month_amount_limit_1"
                              disabled={isDisabledInputEditStaff(currentStaff?.status)}
                              maxLength={MAX_LENGTH.INPUT_SALARY}
                              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                                handleStringToNumber(e, MAX_LENGTH.INPUT_NUMBER)
                              }
                              onChange={handleOnChange}
                            />
                          </BasicFormItem>
                          <DivUnit className="formEdit">{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_DAY}</DivUnit>
                        </DivFormItem>
                        <DivFormItem>
                          <BasicFormItem
                            className="formEdit"
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
                              className="formEdit"
                              name="month_amount_limit_2"
                              disabled={isDisabledInputEditStaff(currentStaff?.status)}
                              maxLength={MAX_LENGTH.INPUT_SALARY}
                              onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                                handleStringToNumber(e, MAX_LENGTH.INPUT_NUMBER)
                              }
                              onChange={handleOnChange}
                            />
                          </BasicFormItem>
                          <DivUnit className="formEdit">{CONST_COMPANY_STAFF_MANAGEMENT.YEN_DIV_MONTH}</DivUnit>
                        </DivFormItem>
                      </Col>
                    )}
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={CONST_COMPANY_STAFF_MANAGEMENT.USEAGE_START_DATE}
                        name="login_first_time"
                      >
                        <DetailInput name="login_first_time" disabled={true} />
                      </DetailFormItem>
                    </Col>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={CONST_COMPANY_STAFF_MANAGEMENT.USEAGE_STATUS}
                        name="status"
                      >
                        <DetailSelect
                          id="selectCenter"
                          disabled={isDisabledStatusSelectEditStaff(currentStaff?.status)}
                          suffixIcon={<Icon src={images.companySite.arrowBottomCompany} alt="" />}
                        >
                          <Option
                            disabled={true}
                            key={ECompanyStaffStatusType.NOT_ACCESS}
                            value={ECompanyStaffStatusType.NOT_ACCESS}
                          >
                            {CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.NOT_ACCESS}
                          </Option>
                          <Option
                            disabled={true}
                            key={ECompanyStaffStatusType.STAFF_WAITING_APPROVE}
                            value={ECompanyStaffStatusType.STAFF_WAITING_APPROVE}
                          >
                            {CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.WAITING_CONFIRM}
                          </Option>
                          <Option key={ECompanyStaffStatusType.USING} value={ECompanyStaffStatusType.USING}>
                            {CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.USING}
                          </Option>
                          <Option
                            key={ECompanyStaffStatusType.STAFF_NOT_ALLOW_REQUEST_SALARY}
                            value={ECompanyStaffStatusType.STAFF_NOT_ALLOW_REQUEST_SALARY}
                          >
                            {CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.STAFF_NOT_ALLOW_REQUEST_SALARY}
                          </Option>
                          <Option
                            disabled={true}
                            key={ECompanyStaffStatusType.REJECT}
                            value={ECompanyStaffStatusType.REJECT}
                          >
                            {CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.REJECT}
                          </Option>
                          <Option
                            disabled={true}
                            key={ECompanyStaffStatusType.STAFF_DISCONNECT}
                            value={ECompanyStaffStatusType.STAFF_DISCONNECT}
                          >
                            {CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.STAFF_DISCONNECT}
                          </Option>
                          <Option
                            disabled={true}
                            key={ECompanyStaffStatusType.DELETED}
                            value={ECompanyStaffStatusType.DELETED}
                          >
                            {CONST_COMPANY_STAFF_MANAGEMENT.STAFF_STATUS.DELETED}
                          </Option>
                        </DetailSelect>
                      </DetailFormItem>
                    </Col>
                  </FormRowEdit>
                </ViewFormScroll>
              </ViewFormBase>
              <ViewFormBase paddingTop={'0'}>
                <ViewFormScroll isShowed={isShowedAccountInfor} padding={'0.625rem 11.25rem 6.25rem 11.25rem'}>
                  <TitleRow>
                    <span>{CONST_COMPANY_STAFF_MANAGEMENT.ACCOUNT_INFORMATION}</span>
                    <MenuItemIcon
                      src={isShowedAccountInfor ? images.companySite.iconHide : images.companySite.iconShow}
                      alt={isShowedAccountInfor ? 'hide' : 'show'}
                      onClick={() => setIsShowedAccountInfor(!isShowedAccountInfor)}
                    />
                  </TitleRow>
                  <FormRowEdit className={isShowedAccountInfor ? 'rowVisible' : 'rowHidden'} padding={'1.875rem 0 0 0'}>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={`${CONST_COMMON.FINANCIAL_INSTITUTION_NAME}(${CONST_COMMON.BANK_CODE})`}
                        name="bank_code"
                      >
                        <DetailInput name="bank_code" disabled={true} />
                      </DetailFormItem>
                    </Col>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={`${CONST_COMMON.BRANCH_NAME}(${CONST_COMMON.BRANCHES_CODE})`}
                        name="bank_branches_code"
                      >
                        <DetailInput name="bank_branches_code" disabled={true} />
                      </DetailFormItem>
                    </Col>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={CONST_COMMON.ACCOUNT_TYPE}
                        name="bank_type"
                      >
                        <DetailInput name="bank_type" disabled={true} />
                      </DetailFormItem>
                    </Col>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={CONST_COMMON.OWNER_NAME_KANA}
                        name="account_name"
                      >
                        <DetailInput name="account_name" disabled={true} />
                      </DetailFormItem>
                    </Col>
                    <Col span={24}>
                      <DetailFormItem
                        labelCol={{ span: 24 }}
                        colon={false}
                        label={CONST_COMMON.ACCOUNT_NUMBER}
                        name="account_number"
                      >
                        <DetailInput name="account_number" disabled={true} />
                      </DetailFormItem>
                    </Col>
                  </FormRowEdit>
                </ViewFormScroll>
              </ViewFormBase>
            </DetailForm>
          </div>
          <BtnWrapper paddingTop={'2.5rem'}>
            <BtnActionWrapper
              icon={
                <ItemIcon
                  src={images.companySite.saveAccount}
                  alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.CREATE_ONE_STAFF}
                />
              }
              loading={isLoadingBtn || isLoadingSubmit}
              onClick={form.submit}
              disabled={isDisabledInputEditStaff(currentStaff?.status)}
            >
              {CONST_COMMON.SAVE}
            </BtnActionWrapper>
            <BtnCancelWrapper disabled={isLoadingBtn || isLoadingSubmit} onClick={() => showPopupConfirmBack()}>
              {CONST_COMMON.CANCEL}
            </BtnCancelWrapper>
          </BtnWrapper>
        </GrantCard>
        <ModalCommon
          isOpen={isOpenModalConfirmChangeStatus}
          setIsOpen={() => setIsOpenModalConfirmChangeStatus(false)}
          onClickCancel={() => setIsOpenModalConfirmChangeStatus(false)}
          onCancel={() => setIsOpenModalConfirmChangeStatus(false)}
          isShowBtnOk={false}
          isShowBtnCancel={false}
          _className="confirm-company-pair confirm-attendance"
        >
          <ModalContainer>
            <ModalConfirmContent>
              <div className="content">
                <span>
                  {currentStaff.name}が{getDayjsByTimeZone(lastAttendanceTime).format('YYYY年MM月DD日')}
                  {CONST_COMPANY_STAFF_MANAGEMENT.CONFIRM_TO_WORK_UNTIL}
                </span>
                <span>{CONST_COMPANY_STAFF_MANAGEMENT.CONFIRM_CHANGE_STATUS}</span>
                <span>{CONST_COMPANY_STAFF_MANAGEMENT.IS_OK}</span>
              </div>
              <div className="button">
                <Button className="cancel" onClick={() => setIsOpenModalConfirmChangeStatus(false)}>
                  {CONST_COMMON.CANCEL}
                </Button>
                <Button className="success" onClick={updateStaff}>
                  {CONST_COMMON.VERIFY_NO_SPACE}
                </Button>
              </div>
            </ModalConfirmContent>
          </ModalContainer>
        </ModalCommon>
      </Container>
    </DetailWrapper>
  );
};
