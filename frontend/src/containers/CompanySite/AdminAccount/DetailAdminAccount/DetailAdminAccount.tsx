import { Container, GrantCard } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { Col } from 'antd';
import React from 'react';
import images from '@assets/images-base';
import { IAdminAccount } from '@pages/CompanySite/ListAdminAccount/useListAdminAccount';
import { CONST_COMMON, CONST_COMPANY_ADMIN_ACCOUNT, CONST_COMPANY_STAFF_MANAGEMENT } from 'constants/language';
import {
  BtnCancelWrapper,
  BtnCreateWrapper,
  BtnWrapper,
  DetailForm,
  DetailFormItem,
  DetailInput,
  DetailWrapper,
  ItemIcon,
  NoticeRequireMust,
  PrefixIcon,
  TitlePageWrapper,
} from './detailAdminAccountStyle';
import { MAX_LENGTH } from 'constants/constants';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import { katakana, REGEX_EMAIL } from 'helper/regex';
import useDetailAdminAccount from './useDetailAdminAccount';

interface IDetailAdminAccountProps {
  id?: number;
  adminAccount: IAdminAccount | null;
  handleSubmitForm?: any;
  isLoadingBtn: boolean;
  setStatePage: React.Dispatch<React.SetStateAction<number>>;
}

export const DetailAdminAccount = ({
  id,
  adminAccount,
  handleSubmitForm,
  isLoadingBtn,
  setStatePage,
}: IDetailAdminAccountProps) => {
  const { form, currentAdminAccount, BREADS, handleTrimSpaceInput, onFinishForm, showPopupConfirmBack } =
    useDetailAdminAccount(adminAccount, setStatePage, id, handleSubmitForm);

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} onClickHome={() => showPopupConfirmBack(true)} onClickPath={showPopupConfirmBack} />
      {adminAccount ? (
        <Container>
          <GrantCard padding="1.25rem 0" percentWidth="100%" width={86.875}>
            <div>
              <TitlePageWrapper>
                <PrefixIcon
                  src={images.companySite.createAccountWhite}
                  alt={CONST_COMPANY_ADMIN_ACCOUNT.ALT.CREATE_ACCOUNT}
                />
                <div>{CONST_COMPANY_ADMIN_ACCOUNT.TITLE_PAGE_EDIT}</div>
              </TitlePageWrapper>
              <DetailForm
                form={form}
                initialValues={currentAdminAccount}
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
                    name="full_name"
                    rules={[{ required: true, message: CONST_COMPANY_ADMIN_ACCOUNT.VALIDATE.FULL_NAME_REQUIRED }]}
                  >
                    <DetailInput
                      name="full_name"
                      placeholder={CONST_COMMON.PLACEHOLDER.FULL_NAME}
                      maxLength={MAX_LENGTH.INPUT_TEXT}
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)
                      }
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
                      { required: true, message: CONST_COMPANY_ADMIN_ACCOUNT.VALIDATE.FULL_NAME_FURIGANA_REQUIRED },
                      {
                        pattern: katakana,
                        message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_KATA_REGEX,
                      },
                    ]}
                  >
                    <DetailInput
                      name="name_kana"
                      placeholder={CONST_COMMON.PLACEHOLDER.FULL_NAME_FURIGANA}
                      maxLength={MAX_LENGTH.INPUT_TEXT}
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)
                      }
                    />
                  </DetailFormItem>
                </Col>
                <Col span={24}>
                  <DetailFormItem labelCol={{ span: 24 }} colon={false} label={CONST_COMMON.EMAIL} name="email">
                    <DetailInput
                      name="email"
                      disabled={true}
                      maxLength={MAX_LENGTH.INPUT_TEXT}
                      placeholder={CONST_COMMON.PLACEHOLDER.EMAIL}
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)
                      }
                    />
                  </DetailFormItem>
                </Col>
              </DetailForm>
            </div>
            <BtnWrapper>
              <BtnCreateWrapper
                onClick={form.submit}
                icon={
                  <ItemIcon src={images.companySite.saveAccount} alt={CONST_COMPANY_ADMIN_ACCOUNT.ALT.SAVE_ACCOUNT} />
                }
                loading={isLoadingBtn}
              >
                {CONST_COMMON.SAVE}
              </BtnCreateWrapper>
              <BtnCancelWrapper disabled={isLoadingBtn} onClick={() => showPopupConfirmBack()}>
                {CONST_COMMON.CANCEL}
              </BtnCancelWrapper>
            </BtnWrapper>
          </GrantCard>
        </Container>
      ) : (
        <Container>
          <GrantCard padding="1.25rem 0" percentWidth="100%" width={86.875}>
            <div>
              <TitlePageWrapper>
                <PrefixIcon
                  src={images.companySite.createAccountWhite}
                  alt={CONST_COMPANY_ADMIN_ACCOUNT.ALT.CREATE_ACCOUNT}
                />
                <div>
                  {CONST_COMPANY_ADMIN_ACCOUNT.TITLE_PAGE_CREATE}
                  <NoticeRequireMust>{CONST_COMPANY_STAFF_MANAGEMENT.NOTICE_REQUIRED}</NoticeRequireMust>
                </div>
              </TitlePageWrapper>
              <DetailForm
                form={form}
                initialValues={currentAdminAccount}
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
                    name="full_name"
                    rules={[{ required: true, message: CONST_COMPANY_ADMIN_ACCOUNT.VALIDATE.FULL_NAME_REQUIRED }]}
                  >
                    <DetailInput
                      name="full_name"
                      placeholder={CONST_COMMON.PLACEHOLDER.FULL_NAME}
                      maxLength={MAX_LENGTH.INPUT_TEXT}
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)
                      }
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
                      { required: true, message: CONST_COMPANY_ADMIN_ACCOUNT.VALIDATE.FULL_NAME_FURIGANA_REQUIRED },
                      {
                        pattern: katakana,
                        message: CONST_COMPANY_STAFF_MANAGEMENT.VALIDATE.FULL_NAME_KATA_REGEX,
                      },
                    ]}
                  >
                    <DetailInput
                      name="name_kana"
                      placeholder={CONST_COMMON.PLACEHOLDER.FULL_NAME_FURIGANA}
                      maxLength={MAX_LENGTH.INPUT_TEXT}
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)
                      }
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
                      { required: true, message: CONST_COMPANY_ADMIN_ACCOUNT.VALIDATE.EMAIL_REQUIRED },
                      {
                        pattern: REGEX_EMAIL,
                        message: CONST_COMPANY_ADMIN_ACCOUNT.VALIDATE.EMAIL_REGEX,
                      },
                    ]}
                  >
                    <DetailInput
                      name="email"
                      maxLength={MAX_LENGTH.INPUT_TEXT}
                      placeholder={CONST_COMMON.PLACEHOLDER.EMAIL}
                      onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
                        handleTrimSpaceInput(e, MAX_LENGTH.INPUT_TEXT)
                      }
                    />
                  </DetailFormItem>
                </Col>
              </DetailForm>
            </div>
            <BtnWrapper>
              <BtnCreateWrapper
                icon={
                  <ItemIcon
                    src={images.companySite.createAccountLineWhite}
                    alt={CONST_COMPANY_ADMIN_ACCOUNT.ALT.CREATE_ACCOUNT}
                  />
                }
                loading={isLoadingBtn}
                onClick={form.submit}
              >
                {CONST_COMMON.ISSUE}
              </BtnCreateWrapper>
              <BtnCancelWrapper disabled={isLoadingBtn} onClick={() => showPopupConfirmBack()}>
                {CONST_COMMON.CANCEL}
              </BtnCancelWrapper>
            </BtnWrapper>
          </GrantCard>
        </Container>
      )}
    </DetailWrapper>
  );
};
