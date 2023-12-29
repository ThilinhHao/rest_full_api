import React from 'react';

import {
  DetailItemAgency,
  NameWrapper,
  RowIntroducedCompany,
  ScrollSubAgency,
  ShadowTop,
  StatusUpdate,
} from './detailAgencyStyle';
import {
  DetailOperatorWrapper,
  ElementCard,
} from '@containers/OperatorSite/Operator/DetailOperator/detailOperatorStyle';
import {
  BtnVerification,
  BtnVerificationWrapper,
} from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';

import { STATUS } from '@containers/CompanySite/GrantCompany/CompanyInput';
import { Tooltip } from 'antd';
import { SpaceBase } from 'styles';
import { DeleteDetailBtn } from '@containers/OperatorSite/Company/DetailCompany/detailCompanyStyle';
import { stringToPhoneView } from 'helper/formatPhone';
import { CONST_LIST_AGENCY } from '@pages/OperatorSite/Agencies/ListAgency/constants';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import { OPTION_EDIT_PROFILE } from 'constants/agency';
import { Container, GrantCard } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { formatStrDateTimezone } from 'helper/date';
import { IAgencyResponse, ICompany } from '@pages/OperatorSite/Agencies/ListAgency/useListAgency';
import { CONST_AGENCY_SITE_DETAIL, CONST_COMMON } from 'constants/language';

import images from '@assets/images-base';
import WrapperBox from '../EditAgency/WrapperBox/WrapperBox';
import ItemInformation from '@containers/AgencySite/AgencyInformation/ItemInformation/ItemInformation';
import PreviewFileAgency from './PreviewFileAgency/PreviewFileAgency';

const BREADS: IBread[] = [
  {
    name: CONST_AGENCY_SITE_DETAIL.AGENCY_ACCOUNT_LIST,
    path: '',
  },
];
const DetailAgency = ({
  agency,
  setIsEdit,
  onDeleteAgency,
  documents,
}: {
  agency: IAgencyResponse | null;
  setIsEdit: (isEdit: boolean) => void;
  onDeleteAgency: () => void;
  documents: string[];
}) => {
  const depositFee =
    agency && (agency.deposit_fee || agency.deposit_fee === 0) ? `${agency.deposit_fee}　${CONST_COMMON.YEN}` : '';
  const advanceFee =
    agency && (agency.advance_fee || agency.advance_fee === 0) ? `${agency.advance_fee}　${CONST_COMMON.YEN}` : '';
  return (
    <DetailOperatorWrapper>
      <BreadCrumb breads={BREADS} />
      {agency && (
        <Container>
          <GrantCard percentWidth="83.75rem" padding="1rem 2.688rem 0.875rem 4rem">
            <div>
              <DetailItemAgency>
                <img src={images.sideBar.agency} alt="" />
                <Tooltip placement="bottomLeft" title={agency?.name || agency?.user_root?.full_name}>
                  <div>{agency?.name || agency?.user_root?.full_name}</div>
                </Tooltip>
              </DetailItemAgency>
              <SpaceBase height={2} />

              <WrapperBox title={CONST_AGENCY_SITE_DETAIL.BASIC_INFORMATION} width="100%">
                <ItemInformation title={CONST_AGENCY_SITE_DETAIL.AGENCY_NAME} value={agency.name} />
                <ItemInformation title={CONST_AGENCY_SITE_DETAIL.CODE} value={agency.code} />
                <ItemInformation
                  title={CONST_AGENCY_SITE_DETAIL.REPRESENTATIVE_NAME}
                  value={`${agency.user_root.full_name}`}
                />
                <ItemInformation
                  title={CONST_AGENCY_SITE_DETAIL.PHONE_NUMBER}
                  value={stringToPhoneView(agency.user_root.phone)}
                />
                <ItemInformation title={CONST_AGENCY_SITE_DETAIL.EMAIL} value={agency.user_root.email} />
              </WrapperBox>

              <SpaceBase height={1.875} />
              <WrapperBox title={CONST_AGENCY_SITE_DETAIL.AGENCY_FEE} width="100%">
                <ItemInformation title={CONST_AGENCY_SITE_DETAIL.DEPOSIT} value={depositFee} />
                <ItemInformation title={CONST_AGENCY_SITE_DETAIL.REIMBURSEMENT} value={advanceFee} />
              </WrapperBox>

              <SpaceBase height={1.875} />
              <WrapperBox title={CONST_AGENCY_SITE_DETAIL.ACCOUNT_INFORMATION} width="100%">
                <ItemInformation
                  title={CONST_AGENCY_SITE_DETAIL.INSTITUTION_NAME}
                  value={
                    agency?.agency_bank ? `${agency?.agency_bank?.bank_name} (${agency?.agency_bank?.bank_code})` : ''
                  }
                />
                <ItemInformation
                  title={CONST_AGENCY_SITE_DETAIL.BRANCH_NAME}
                  value={
                    agency?.agency_bank
                      ? `${agency?.agency_bank?.bank_branches_name} (${agency?.agency_bank?.bank_branches_code})`
                      : ''
                  }
                />
                <ItemInformation
                  title={CONST_AGENCY_SITE_DETAIL.ACCOUNT_TYPE}
                  value={OPTION_EDIT_PROFILE[agency?.agency_bank?.bank_type - 1 || 0]?.label || ''}
                />
                <ItemInformation
                  title={CONST_AGENCY_SITE_DETAIL.NOMINEE_NAME}
                  value={agency?.agency_bank?.account_name}
                />
                <ItemInformation
                  title={CONST_AGENCY_SITE_DETAIL.ACCOUNT_NUMBER}
                  value={agency?.agency_bank?.account_number}
                />
              </WrapperBox>

              <SpaceBase height={1.875} />
              <WrapperBox title={CONST_AGENCY_SITE_DETAIL.DOCUMENT} width="100%">
                <SpaceBase height={2.5} />
                <PreviewFileAgency documents={documents} agency={agency} />
                <SpaceBase height={1} />
              </WrapperBox>

              <SpaceBase height={1.875} />
              <WrapperBox title={CONST_AGENCY_SITE_DETAIL.AGENCY_ACCOUNT} width="100%">
                <SpaceBase height={1} />
                <RowIntroducedCompany>
                  <div>{CONST_LIST_AGENCY.AGENCY_ID}</div>
                  <ElementCard width="35rem">{CONST_LIST_AGENCY.COMPANY_NAME}</ElementCard>
                  <ElementCard>{CONST_LIST_AGENCY.INTRODUCED_DATE}</ElementCard>
                  <ElementCard>{CONST_LIST_AGENCY.INFORMATION}</ElementCard>
                </RowIntroducedCompany>
                <ShadowTop />
                <ScrollSubAgency>
                  {agency?.companies?.map((element: ICompany) => (
                    <RowIntroducedCompany key={element.id}>
                      <div>{element.code}</div>
                      <ElementCard width="35rem">{element.name}</ElementCard>
                      <ElementCard>{element?.created_at?.split(' ')[0] || ''}</ElementCard>
                      <ElementCard>{STATUS[Number(element.status) - 1 || 0]?.label}</ElementCard>
                    </RowIntroducedCompany>
                  ))}
                </ScrollSubAgency>
              </WrapperBox>
            </div>
            <BtnVerificationWrapper>
              <SpaceBase height={10} />
              <BtnVerification onClick={() => setIsEdit(true)}>{CONST_LIST_AGENCY.EDIT}</BtnVerification>
              <DeleteDetailBtn onClick={onDeleteAgency}>{CONST_LIST_AGENCY.DELETE}</DeleteDetailBtn>
            </BtnVerificationWrapper>
            {agency?.updated_at && (
              <StatusUpdate>
                {CONST_LIST_AGENCY.LAST_UPDATE} : {formatStrDateTimezone(agency.updated_at)} [
                <NameWrapper>{agency?.updated_by?.full_name}</NameWrapper>]
              </StatusUpdate>
            )}
          </GrantCard>
        </Container>
      )}
    </DetailOperatorWrapper>
  );
};

export default DetailAgency;
