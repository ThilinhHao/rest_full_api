import React from 'react';

import {
  DetailOperatorWrapper,
  TitleDetailWrapper,
} from '@containers/OperatorSite/Operator/DetailOperator/detailOperatorStyle';
import {
  BtnVerificationWrapper,
  ErrorOperator,
  WrapperInput,
} from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';

import { LabelName } from './editAgencyStyle';
import { NameWrapper } from '@containers/OperatorSite/Agency/DetailAgency/detailAgencyStyle';
import { Row, Tooltip } from 'antd';
import { StatusUpdate } from '../DetailAgency/detailAgencyStyle';
import { IAgencyResponse } from '@pages/OperatorSite/Agencies/ListAgency/useListAgency';
import { CONST_LIST_AGENCY } from '@pages/OperatorSite/Agencies/ListAgency/constants';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import { OPTION_EDIT_PROFILE } from 'constants/agency';
import { Container, GrantCard, ITemMark } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { formatStrDateTimezone } from 'helper/date';
import { RowCenter, SpaceBase, TextSize } from 'styles';
import { CONST_AGENCY_SITE_DETAIL, CONST_COMMON, CONST_EDIT_AGENCY } from 'constants/language';

import InputCard from '@components/Input/InputCard';
import WrapperBox from './WrapperBox/WrapperBox';
import TitleAgency from '../TitleAgency/TitleAgency';
import ButtonContainer from './ButtonContainer/ButtonContainer';
import useCreateAgency from '@pages/OperatorSite/Agencies/CreateAgency/useCreateAgency';

const BREADS: IBread[] = [
  {
    name: CONST_AGENCY_SITE_DETAIL.AGENCY_ACCOUNT_LIST,
    path: '',
  },
];

const EditAgency = ({
  agency,
  setIsEdit,
  updateListAgency,
}: {
  agency: IAgencyResponse | null;
  updateListAgency: (agencies: IAgencyResponse) => void;
  setIsEdit: (isEdit: boolean) => void;
}) => {
  const {
    error,
    isLoading,
    agencyData,
    onChangeFullName,
    onChangePhoneNumber,
    onChangeAgencyName,
    onEdit,
    isEdited,
    CONST_MAXLENGTH,
    onChangeAdvanceFee,
    onChangeDepositFee,
    handleBlurDepositFee,
    handleBlurAdvanceFee,
    handleFormatPhone,
  } = useCreateAgency(agency, setIsEdit, updateListAgency);
  return (
    <DetailOperatorWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        <GrantCard percentWidth="83.75rem" padding="1rem 3.5rem 0.875rem 3.5rem">
          <div>
            <TitleDetailWrapper pLeft="0" className="mt-1">
              <Tooltip placement="bottomLeft" title={agency?.name || agency?.user_root?.full_name}>
                <div className="full_name">{agency?.name || agency?.user_root?.full_name}</div>
              </Tooltip>
              <ITemMark>{CONST_COMMON.REQUIRE_TITLE}</ITemMark>
            </TitleDetailWrapper>
            <SpaceBase height={1.875} />

            <WrapperBox title={CONST_COMMON.BASIC_INFORMATION} width="100%">
              {/* <SpaceBase height={1.875} /> */}

              <WrapperInput margin="0 0 1rem 3.125rem">
                <LabelName>企業名</LabelName>
                <SpaceBase height={1} />
                <InputCard
                  width={25}
                  height={3.125}
                  isShadow={true}
                  maxLength={CONST_MAXLENGTH.DEFAULT}
                  value={agencyData.agencyName}
                  onChange={onChangeAgencyName}
                  margin={[0, 1.875, 0, 0]}
                  placeholder={CONST_COMMON.NAME}
                />
                <ErrorOperator>{error.agencyName}</ErrorOperator>
              </WrapperInput>

              <TitleAgency title={CONST_EDIT_AGENCY.AGENCY_CODE} width="100%" />
              <SpaceBase height={1.875} />
              <InputCard
                width={25}
                height={3.125}
                margin={[0, 0, 0, 3.125]}
                isShadow={true}
                value={agency?.code}
                disabled={true}
              />
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_COMMON.REPRESENTATIVE_NAME} require width="100%" />
              <SpaceBase height={1.875} />
              <Row>
                <WrapperInput margin="0 0 0 3.125rem">
                  <InputCard
                    width={25}
                    height={3.125}
                    isShadow={true}
                    maxLength={CONST_MAXLENGTH.DEFAULT}
                    value={agencyData.fullName}
                    onChange={onChangeFullName}
                    margin={[0, 1.875, 0, 0]}
                    placeholder={CONST_COMMON.NAME}
                  />
                  <ErrorOperator>{error.fullName}</ErrorOperator>
                </WrapperInput>
              </Row>
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_COMMON.PHONE_NUMBER} width="100%" />
              <SpaceBase height={1.875} />
              <WrapperInput margin="0 0 0 3.125rem">
                <InputCard
                  width={25}
                  height={3.125}
                  maxLength={CONST_MAXLENGTH.PHONE_NUMBER}
                  value={agencyData.phoneNumber}
                  isShadow={true}
                  type="tel"
                  onChange={onChangePhoneNumber}
                  onBlur={handleFormatPhone}
                  placeholder={CONST_COMMON.PHONE_NUMBER}
                />
                <ErrorOperator>{error.phoneNumber}</ErrorOperator>
              </WrapperInput>

              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_COMMON.EMAIL} width="100%" />
              <SpaceBase height={1.875} />
              <InputCard
                width={25}
                height={3.125}
                margin={[0, 0, 0, 3.125]}
                value={agencyData.email}
                isShadow={true}
                disabled={true}
                placeholder={CONST_COMMON.EMAIL}
              />
              <SpaceBase height={1.875} />
            </WrapperBox>

            <SpaceBase height={1.875} />
            <WrapperBox title={CONST_EDIT_AGENCY.AGENCY_FEE_SETTING} width="100%">
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_EDIT_AGENCY.DEPOSIT} require width="100%" />
              <SpaceBase height={1.875} />
              <RowCenter>
                <WrapperInput margin="0 0 0 3.125rem">
                  <InputCard
                    width={25}
                    height={3.125}
                    margin={[0, 1.375, 0, 0]}
                    isShadow={true}
                    maxLength={CONST_MAXLENGTH.DEPOSIT}
                    onChange={onChangeDepositFee}
                    onBlur={handleBlurDepositFee}
                    value={agencyData.depositFee}
                    placeholder={CONST_EDIT_AGENCY.DEPOSIT}
                  />
                  <ErrorOperator>{error.depositFee}</ErrorOperator>
                </WrapperInput>
                <TextSize size={1.5}>{CONST_COMMON.YEN}</TextSize>
              </RowCenter>
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_COMMON.REIMBURSEMENT} require width="100%" />
              <SpaceBase height={1.875} />
              <RowCenter>
                <WrapperInput margin="0 0 0 3.125rem">
                  <InputCard
                    width={25}
                    height={3.125}
                    margin={[0, 1.375, 0, 0]}
                    isShadow={true}
                    maxLength={CONST_MAXLENGTH.REIMBURSEMENT}
                    value={agencyData.advanceFee}
                    onChange={onChangeAdvanceFee}
                    onBlur={handleBlurAdvanceFee}
                    placeholder={CONST_COMMON.REIMBURSEMENT}
                  />
                  <ErrorOperator>{error.advanceFee}</ErrorOperator>
                </WrapperInput>
                <TextSize size={1.5}>{CONST_COMMON.YEN}</TextSize>
              </RowCenter>

              <SpaceBase height={1.875} />
            </WrapperBox>
            <SpaceBase height={1.875} />

            <WrapperBox title={CONST_EDIT_AGENCY.ACCOUNT_INFORMATION} width="100%">
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_EDIT_AGENCY.BANK_CODE} width="100%" />
              <SpaceBase height={1.875} />
              <InputCard
                width={25}
                height={3.125}
                margin={[0, 0, 0, 3.125]}
                isShadow={true}
                value={
                  agency?.agency_bank ? `${agency?.agency_bank?.bank_name} (${agency?.agency_bank?.bank_code})` : ''
                }
                disabled={true}
                maxLength={CONST_MAXLENGTH.DEFAULT}
              />
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_EDIT_AGENCY.BRANCHES_CODE} width="100%" />
              <SpaceBase height={1.875} />
              <InputCard
                width={25}
                height={3.125}
                margin={[0, 0, 0, 3.125]}
                value={
                  agency?.agency_bank
                    ? `${agency?.agency_bank?.bank_branches_name} (${agency?.agency_bank?.bank_branches_code})`
                    : ''
                }
                isShadow={true}
                disabled={true}
                maxLength={CONST_MAXLENGTH.DEFAULT}
              />
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_EDIT_AGENCY.ACCOUNT_TYPE} width="100%" />
              <SpaceBase height={1.875} />
              <InputCard
                width={25}
                height={3.125}
                margin={[0, 0, 0, 3.125]}
                isShadow={true}
                value={
                  agency?.agency_bank?.bank_type || agency?.agency_bank?.bank_type === 0
                    ? OPTION_EDIT_PROFILE[agency?.agency_bank?.bank_type - 1 || 0]?.label
                    : ''
                }
                disabled={true}
                maxLength={CONST_MAXLENGTH.DEFAULT}
              />
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_EDIT_AGENCY.KANA_NAME} width="100%" />
              <SpaceBase height={1.875} />
              <InputCard
                width={25}
                height={3.125}
                margin={[0, 0, 0, 3.125]}
                isShadow={true}
                disabled={true}
                value={agency?.agency_bank?.account_name}
                maxLength={CONST_MAXLENGTH.DEFAULT}
              />
              <SpaceBase height={1.875} />

              <TitleAgency title={CONST_EDIT_AGENCY.ACCOUNT_NUMBER} width="100%" />
              <SpaceBase height={1.875} />
              <InputCard
                width={25}
                height={3.125}
                margin={[0, 0, 0, 3.125]}
                isShadow={true}
                disabled={true}
                value={agency?.agency_bank?.account_number}
                maxLength={CONST_MAXLENGTH.DEFAULT}
              />
              <SpaceBase height={1.875} />
            </WrapperBox>
          </div>
          <BtnVerificationWrapper>
            <ButtonContainer onEdit={onEdit} isLoading={isLoading} setIsEdit={setIsEdit} isEdited={isEdited} />
          </BtnVerificationWrapper>
          {agency?.updated_at && (
            <StatusUpdate>
              {CONST_LIST_AGENCY.LAST_UPDATE} : {formatStrDateTimezone(agency.updated_at)} [
              <NameWrapper>{agency?.updated_by?.full_name}</NameWrapper>]
            </StatusUpdate>
          )}
        </GrantCard>
      </Container>
    </DetailOperatorWrapper>
  );
};

export default EditAgency;
