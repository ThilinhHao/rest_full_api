import React from 'react';

import images from '@assets/images-base';
import LightningBank from '@components/common/LightningBank/LightningBank';
import LightningBranchCode from '@components/common/LightningBranchCode/LightningBranchCode';

import {
  BankCodeWrapperCompany,
  DetailForm,
  DetailFormItem,
  DetailSelect,
  DetailWrapper,
  Icon,
  InstructUID,
  PrefixIcon,
  TitleLabel,
  TitlePageWrapper,
} from './bankSettingDetailStyle';
import { Container } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { SettingCard } from '@pages/CompanySite/SettingPage/settingPageStyle';
import { ButtonActions } from './ButtonActions';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import { IBankSettingDetail } from '@pages/CompanySite/BankSetting/useBankSetting';
import { Col, FormInstance, Input, Select } from 'antd';
import { katakanaAccountName, REGEX_NUMBER_HAFLWIDTH } from 'helper/regex';
import { ECompanyBankAccountType, MAX_LENGTH } from 'constants/constants';
import { CONST_COMMON, CONST_COMPANY_BANK_SETTING } from 'constants/language';
import { TooltipAccountName } from '@containers/OperatorSite/Agency/TitleAgency/TitleAgency';
import { Require } from 'styles';
import {
  IconInfo,
  Label,
  LabelRequired,
  ToolTipShow,
} from '@containers/CompanySite/SalaryAdvance/salaryAdvanceDetailStyle';
import { SpinLoading } from '@components/Loading/LoadingStyle';

const { Option } = Select;

interface IBankSettingDetailProps {
  BREADS: IBread[];
  form: FormInstance<any>;
  navigate: any;
  bankSettingDetail?: IBankSettingDetail;
  isLoadingBtn: boolean;
  isLoadingDetail: boolean;
  firstTime?: boolean;
  isConfirmed: boolean;
  handleTrimSpaceInput: (e: React.FocusEvent<HTMLInputElement, Element>, length?: number) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFinishForm: (values: any) => void;
  onSubmitForm: () => Promise<void>;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BankSettingDetail = ({
  BREADS,
  form,
  navigate,
  bankSettingDetail,
  isLoadingBtn,
  isLoadingDetail,
  firstTime,
  isConfirmed,
  handleTrimSpaceInput,
  handleOnChange,
  onFinishForm,
  onSubmitForm,
  setIsConfirmed,
}: IBankSettingDetailProps) => {
  return (
    <DetailWrapper firstTime={firstTime}>
      {!firstTime && <BreadCrumb margin="0.25rem 0 0.625rem 0.125rem" breads={BREADS} />}
      <Container height={firstTime ? '100%' : ''}>
        <SettingCard
          firstTime={firstTime}
          marginTop={firstTime ? '3.125rem' : '0'}
          height={firstTime ? '100%' : ''}
          width={firstTime ? '100%' : ''}
        >
          <div>
            <TitlePageWrapper>
              <PrefixIcon
                src={images.companySite.settingCompany}
                alt={CONST_COMPANY_BANK_SETTING.ALT.SAVE_BANK_SETTING}
              />
              <div>{CONST_COMPANY_BANK_SETTING.TITLE_PAGE}</div>
              <span>{CONST_COMPANY_BANK_SETTING.INSTRUCTION_TEXT}</span>
            </TitlePageWrapper>
            {isLoadingDetail && <SpinLoading />}
            {!isLoadingDetail && (
              <DetailForm
                form={form}
                initialValues={bankSettingDetail}
                onFinish={onFinishForm}
                // requiredMark={false}
                scrollToFirstError={true}
                validateTrigger="onSubmit"
              >
                <Col span={24}>
                  <DetailFormItem
                    labelCol={{ span: 24 }}
                    colon={false}
                    label={
                      <div>
                        <span>
                          {CONST_COMPANY_BANK_SETTING.LABEL.BANK_CODE}
                          {!isConfirmed && <Require>{CONST_COMMON.REQUIRE}</Require>}
                        </span>
                      </div>
                    }
                    name="bank_name"
                  >
                    {isConfirmed && <Input className="detailInput detailInputConfirm" name="bank_name" />}
                  </DetailFormItem>
                  <BankCodeWrapperCompany isConfirmed={isConfirmed}>
                    <LightningBank width={25} height={3.125} form={form} onlySevenBank={true} />
                  </BankCodeWrapperCompany>
                </Col>
                <Col span={24}>
                  <DetailFormItem
                    labelCol={{ span: 24 }}
                    colon={false}
                    label={
                      <div>
                        <span>
                          {CONST_COMPANY_BANK_SETTING.LABEL.BRANCHES_CODE}
                          {!isConfirmed && <Require>{CONST_COMMON.REQUIRE}</Require>}
                        </span>
                      </div>
                    }
                    name="bank_branches_name"
                  >
                    {isConfirmed && <Input className="detailInput detailInputConfirm" name="bank_branches_name" />}
                  </DetailFormItem>
                  <BankCodeWrapperCompany isConfirmed={isConfirmed}>
                    <LightningBranchCode width={25} height={3.125} form={form} />
                  </BankCodeWrapperCompany>
                </Col>

                <Col span={24}>
                  <TitleLabel marginBottom="0">
                    {!isConfirmed && <LabelRequired>{CONST_COMPANY_BANK_SETTING.LABEL.SEVEN_USER_ID}</LabelRequired>}
                    {isConfirmed && <Label>{CONST_COMPANY_BANK_SETTING.LABEL.SEVEN_USER_ID}</Label>}
                    <IconInfo className="iconInfo" src={images.companySite.iconInfo} alt="" />
                    <ToolTipShow left="11.875rem" top="-4.375rem" width="47.875rem" height="6rem" className="tooltip">
                      <img src={images.companySite.tooltipDayAmountLimit} alt="" />
                      <div className="tooltip-text">
                        <InstructUID>
                          セブン銀行から届く書類の中に「リアルタイム振込サービスについてのご連絡」がございますので
                          <br />
                          そちらに記載されている「企業コード」を入力してください
                        </InstructUID>
                      </div>
                    </ToolTipShow>
                  </TitleLabel>
                  <DetailFormItem
                    labelCol={{ span: 24 }}
                    colon={false}
                    className={isConfirmed ? 'not-required' : ''}
                    name="seven_user_id"
                    rules={[
                      { required: true, message: CONST_COMPANY_BANK_SETTING.VALIDATE.SEVEN_USER_REQUIRE },
                      {
                        pattern: REGEX_NUMBER_HAFLWIDTH,
                        message: CONST_COMPANY_BANK_SETTING.VALIDATE.ACCOUNT_NUMBER_REGEX,
                      },
                    ]}
                  >
                    <Input
                      className={`detailInput ${isConfirmed ? 'detailInputConfirm' : ''}`}
                      name="seven_user_id"
                      maxLength={10}
                      placeholder="0123456789"
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_ACCOUNT_NUMBER)
                      }
                      onChange={handleOnChange}
                    />
                  </DetailFormItem>
                </Col>

                <Col span={24}>
                  <DetailFormItem
                    labelCol={{ span: 24 }}
                    colon={false}
                    className={isConfirmed ? 'not-required' : ''}
                    label={
                      <div>
                        <span>{CONST_COMPANY_BANK_SETTING.LABEL.ACCOUNT_NUMBER}</span>
                      </div>
                    }
                    name="account_number"
                    rules={[
                      { required: true, message: CONST_COMPANY_BANK_SETTING.VALIDATE.ACCOUNT_NUMBER_REQUIRED },
                      {
                        pattern: REGEX_NUMBER_HAFLWIDTH,
                        message: CONST_COMPANY_BANK_SETTING.VALIDATE.ACCOUNT_NUMBER_REGEX,
                      },
                    ]}
                  >
                    <Input
                      className={`detailInput ${isConfirmed ? 'detailInputConfirm' : ''}`}
                      name="account_number"
                      maxLength={MAX_LENGTH.INPUT_ACCOUNT_NUMBER}
                      placeholder={CONST_COMPANY_BANK_SETTING.PLACEHOLDER.ACCOUNT_NUMBER}
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_ACCOUNT_NUMBER)
                      }
                      onChange={handleOnChange}
                    />
                  </DetailFormItem>
                </Col>

                <Col span={24}>
                  {!isConfirmed && (
                    <DetailFormItem
                      labelCol={{ span: 24 }}
                      colon={false}
                      label={
                        <div>
                          <span>{CONST_COMPANY_BANK_SETTING.LABEL.BANK_TYPE}</span>
                        </div>
                      }
                      name="bank_type"
                      rules={[{ required: true, message: CONST_COMPANY_BANK_SETTING.VALIDATE.BRANCHES_CODE_REQUIRED }]}
                    >
                      <DetailSelect suffixIcon={<Icon src={images.companySite.arrowBottomCompany} alt="" />}>
                        <Option key={ECompanyBankAccountType.USUALLY} value={ECompanyBankAccountType.USUALLY}>
                          {CONST_COMPANY_BANK_SETTING.BANK_ACCOUNT_TYPE.USUALLY}
                        </Option>
                        <Option key={ECompanyBankAccountType.CURRENT} value={ECompanyBankAccountType.CURRENT}>
                          {CONST_COMPANY_BANK_SETTING.BANK_ACCOUNT_TYPE.CURRENT}
                        </Option>
                      </DetailSelect>
                    </DetailFormItem>
                  )}
                  {isConfirmed && (
                    <DetailFormItem
                      labelCol={{ span: 24 }}
                      colon={false}
                      label={
                        <div>
                          <span>{CONST_COMPANY_BANK_SETTING.LABEL.BANK_TYPE}</span>
                        </div>
                      }
                      name="bank_type"
                    >
                      <div className="detailSelect">
                        {bankSettingDetail?.bank_type === ECompanyBankAccountType.USUALLY
                          ? CONST_COMPANY_BANK_SETTING.BANK_ACCOUNT_TYPE.USUALLY
                          : CONST_COMPANY_BANK_SETTING.BANK_ACCOUNT_TYPE.CURRENT}
                      </div>
                    </DetailFormItem>
                  )}
                </Col>

                <Col span={24}>
                  <TitleLabel marginBottom="0">
                    {!isConfirmed && <LabelRequired>{CONST_COMPANY_BANK_SETTING.LABEL.ACCOUNT_NAME}</LabelRequired>}
                    {isConfirmed && <Label>{CONST_COMPANY_BANK_SETTING.LABEL.ACCOUNT_NAME}</Label>}
                    <TooltipAccountName marginLeft="0.3rem" />
                  </TitleLabel>
                  <DetailFormItem
                    labelCol={{ span: 24 }}
                    name="account_name"
                    rules={[
                      { required: true, message: CONST_COMPANY_BANK_SETTING.VALIDATE.ACCOUNT_NAME_REQUIRED },
                      {
                        pattern: katakanaAccountName,
                        message: CONST_COMMON.KATAKANA_HAF_OPERATOR,
                      },
                    ]}
                  >
                    <Input
                      className={`detailInput ${isConfirmed ? 'detailInputConfirm' : ''}`}
                      name="account_name"
                      maxLength={MAX_LENGTH.INPUT_TEXT}
                      placeholder={CONST_COMPANY_BANK_SETTING.PLACEHOLDER.ACCOUNT_NAME}
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)
                      }
                      onChange={handleOnChange}
                    />
                  </DetailFormItem>
                </Col>
              </DetailForm>
            )}
          </div>
          {!isLoadingDetail && (
            <ButtonActions
              form={form}
              isLoadingBtn={isLoadingBtn}
              isConfirmed={isConfirmed}
              onSubmitForm={onSubmitForm}
              setIsConfirmed={setIsConfirmed}
            />
          )}
        </SettingCard>
      </Container>
    </DetailWrapper>
  );
};
