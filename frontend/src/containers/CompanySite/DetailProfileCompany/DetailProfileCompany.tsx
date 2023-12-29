import React from 'react';
import { BtnActionWrapper, BtnWrapper, FormRow } from '@components/CompanySite/common/styled';
import WrapperBox from '@containers/OperatorSite/Agency/EditAgency/WrapperBox/WrapperBox';
import { BANK_ACCOUNT_LABEL, ECompanyBankAccountType, USAGE_PLAN } from 'constants/constants';
import {
  CONST_COMMON,
  CONST_COMPANY_BANK_SETTING,
  CONST_COMPANY_PROFILE,
  CONST_CREATE_COMPANY,
} from 'constants/language';
import { SpaceBase } from 'styles';
import { ICompanyProfile } from '../../../pages/CompanySite/CompanyProfile/interface';
import { DetailProfileCompanyWrapper } from './detailProfileCompanyStyle';
import { stringToPhoneView } from 'helper/formatPhone';
import { DEPOSIT_TYPE } from 'constants/invoice';

interface IDetailProfileCompany {
  companyProfile: ICompanyProfile;
  setIsEdit: (isEdit: boolean) => void;
}
const DetailProfileCompany = ({ companyProfile, setIsEdit }: IDetailProfileCompany) => {
  return (
    <DetailProfileCompanyWrapper>
      <SpaceBase height={2} />
      <WrapperBox title={CONST_COMPANY_PROFILE.COMPANY_INFORMATION} width="100%">
        <FormRow>
          <div>
            <span>{CONST_CREATE_COMPANY.COMPANY_NAME}</span>
            <span>{companyProfile.name}</span>
          </div>
          <div>
            <span>{CONST_CREATE_COMPANY.COMPANY_ID}</span>
            <span>{companyProfile.code}</span>
          </div>
          <div>
            <span>{CONST_CREATE_COMPANY.PLAN}</span>
            <span>{USAGE_PLAN[Number(companyProfile.usage_plan) - 1 || 0].label}</span>
          </div>
          <div>
            <span>{CONST_CREATE_COMPANY.POSTAL_CODE}</span>
            <span>
              {companyProfile.postal_code &&
                `${companyProfile.postal_code?.slice(0, 3)} - ${companyProfile.postal_code?.slice(3, 7)}`}
            </span>
          </div>
          <div>
            <span>{CONST_CREATE_COMPANY.ADDRESS_FIRST}</span>
            <span>{companyProfile?.address1}</span>
          </div>
          <div>
            <span>{CONST_CREATE_COMPANY.ADDRESS_SECOND}</span>
            <span>{companyProfile?.address2}</span>
          </div>
          <div>
            <span>{CONST_CREATE_COMPANY.AGENCY_CODE}</span>
            <span>{companyProfile?.agency?.code}</span>
          </div>
          <div>
            <span>{CONST_CREATE_COMPANY.AGENCY_NAME}</span>
            <span>{companyProfile?.agency?.name || companyProfile?.agency?.user_root?.full_name}</span>
          </div>
        </FormRow>
      </WrapperBox>

      <SpaceBase height={2} />
      <WrapperBox title={CONST_COMPANY_PROFILE.OWNER_INFORMATION} width="100%">
        <FormRow>
          <div>
            <span>{CONST_CREATE_COMPANY.REPRESENTATIVE_NAME}</span>
            <span>{companyProfile.user_root.full_name}</span>
          </div>
          <div>
            <span>{CONST_CREATE_COMPANY.OPERATOR_ID}</span>
            <span>{companyProfile.user_root.code}</span>
          </div>
          <div>
            <span>{CONST_COMMON.PHONE_NUMBER}</span>
            <span>{stringToPhoneView(companyProfile.user_root.phone)}</span>
          </div>
          <div>
            <span>{CONST_COMMON.EMAIL}</span>
            <span>{companyProfile.user_root.email}</span>
          </div>
        </FormRow>
      </WrapperBox>

      {companyProfile?.usage_plan === DEPOSIT_TYPE && (
        <>
          <SpaceBase height={2} />
          <WrapperBox title={CONST_COMPANY_PROFILE.ACCOUNT_INFORMATION} width="100%">
            <FormRow>
              <div>
                <span>
                  {CONST_COMMON.FINANCIAL_INSTITUTION_NAME}
                  <br />({CONST_COMMON.BANK_CODE})
                </span>
                <span>
                  {companyProfile?.bank?.bank_name}{' '}
                  {companyProfile?.bank?.bank_code && `(${companyProfile?.bank?.bank_code})`}
                </span>
              </div>
              <div>
                <span>
                  {CONST_COMMON.BRANCH_NAME}
                  <br />({CONST_COMMON.BRANCHES_CODE})
                </span>
                <span>
                  {companyProfile?.bank?.bank_branches_name}{' '}
                  {companyProfile?.bank?.bank_branches_code && `(${companyProfile?.bank?.bank_branches_code})`}
                </span>
              </div>
              <div>
                <span>{CONST_COMPANY_BANK_SETTING.LABEL.SEVEN_USER_ID}</span>
                <span>{companyProfile?.bank?.seven_user_id}</span>
              </div>
              <div>
                <span>{CONST_COMMON.ACCOUNT_NUMBER}</span>
                <span>{companyProfile?.bank?.account_number}</span>
              </div>
              <div>
                <span>{CONST_COMMON.ACCOUNT_TYPE}</span>
                <span>{BANK_ACCOUNT_LABEL[companyProfile?.bank?.bank_type || ECompanyBankAccountType.USUALLY]}</span>
              </div>
              <div>
                <span>{CONST_COMMON.OWNER_NAME_KANA}</span>
                <span>{companyProfile?.bank?.account_name}</span>
              </div>
            </FormRow>
          </WrapperBox>
        </>
      )}
      <BtnWrapper paddingTop={'3rem'}>
        <BtnActionWrapper onClick={() => setIsEdit(true)}>{CONST_COMMON.EDIT}</BtnActionWrapper>
      </BtnWrapper>
    </DetailProfileCompanyWrapper>
  );
};

export default DetailProfileCompany;
