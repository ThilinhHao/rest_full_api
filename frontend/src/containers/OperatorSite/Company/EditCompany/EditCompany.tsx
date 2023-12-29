import React from 'react';

import images from '@assets/images-base';
import CompanyFile from '@containers/CompanySite/GrantCompany/CompanyFile';
import CompanyInput from '@containers/CompanySite/GrantCompany/CompanyInput';
import useCreateCompany from '@pages/OperatorSite/Companies/CreateCompany/useCreateCompany';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';

import { Tooltip } from 'antd';
import { showConfirm } from 'helper/modal-confirm';
import { IDetailCompany } from '@pages/OperatorSite/Companies/ListCompany/useListCompany';
import { CONST_LIST_AGENCY } from '@pages/OperatorSite/Agencies/ListAgency/constants';
import { RowCenter, SpaceBase } from 'styles';
import { formatStrDateTimezone } from 'helper/date';
import { DetailOperatorWrapper } from '@containers/OperatorSite/Operator/DetailOperator/detailOperatorStyle';
import { NameWrapper, StatusUpdate } from '@containers/OperatorSite/Agency/DetailAgency/detailAgencyStyle';
import { CONST_BREADS, CONST_EDIT_OPERATOR, CONST_COMMON } from 'constants/language';

import {
  BtnVerification,
  BtnVerificationWrapper,
} from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';
import {
  AvatarTitle,
  BtnCorrection,
  CompanyCard,
  Container,
  ITemMark,
  TitleCompany,
  Visible,
} from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';

const BREADS: IBread[] = [
  {
    name: CONST_BREADS.LIST_COMPANY,
    path: '',
  },
];
const EditCompany = ({
  company,
  isEdit,
  setIsEdit,
  updateCompany,
}: {
  company: IDetailCompany | null;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  updateCompany: (company: IDetailCompany) => void;
}) => {
  const {
    files,
    error,
    companyData,
    isLoading,
    isEdited,
    onChangeFile,
    onChangeEmail,
    onChangeDeposit,
    onChangeCompany,
    onChangeFullName,
    onChangeAgencyCode,
    onChangePhoneNumber,
    onChangeBrokerageFee,
    onChangePostalCodeFirst,
    onChangePostalCodeEnd,
    onChangeAddress1,
    onChangeAddress2,
    onEditCompany,
    onChangeStatus,
    handleFormatPhone,
    onChangeFreeStartDate,
    onChangeFreeEndDate,
    onChangeFee,
  } = useCreateCompany(company, isEdit, setIsEdit, updateCompany);

  const checkBeforeBack = () => {
    if (isEdited()) {
      showConfirm({
        content: CONST_COMMON.REMOVE_EDIT,
        onOk: () => setIsEdit(false),
      });
      return;
    }
    setIsEdit(false);
  };

  return (
    <DetailOperatorWrapper>
      <BreadCrumb breads={BREADS} onClickHome={checkBeforeBack} />
      <Container>
        <CompanyCard>
          <>
            <Visible isHidden={false}>
              <RowCenter>
                <SpaceBase width={1} />
                <AvatarTitle src={images.sideBar.adminPerson} />
                <SpaceBase width={1} />
                <Tooltip placement="bottomLeft" title={company?.name}>
                  <TitleCompany>{company?.name}</TitleCompany>
                </Tooltip>
                <ITemMark>{CONST_COMMON.REQUIRE_TITLE}</ITemMark>
              </RowCenter>
              <SpaceBase height={2} />

              <CompanyInput
                error={error}
                companyData={companyData}
                constData={{
                  companyCode: company?.code,
                  idUserRoot: company?.user_root.code,
                  disableEmail: true,
                }}
                onChangeEmail={onChangeEmail}
                onChangeCompany={onChangeCompany}
                onChangeDeposit={onChangeDeposit}
                onChangeFullName={onChangeFullName}
                onChangeAgencyCode={onChangeAgencyCode}
                onChangePhoneNumber={onChangePhoneNumber}
                onChangeBrokerageFee={onChangeBrokerageFee}
                onChangePostalCodeFirst={onChangePostalCodeFirst}
                onChangePostalCodeEnd={onChangePostalCodeEnd}
                onChangeAddress1={onChangeAddress1}
                onChangeAddress2={onChangeAddress2}
                onChangeStatus={onChangeStatus}
                handleFormatPhone={handleFormatPhone}
                onChangeFreeStartDate={onChangeFreeStartDate}
                onChangeFreeEndDate={onChangeFreeEndDate}
                onChangeFee={onChangeFee}
              />
              <BtnVerificationWrapper>
                <BtnVerification onClick={onEditCompany} isloading={isLoading}>
                  {CONST_EDIT_OPERATOR.KEEP}
                </BtnVerification>
                <BtnCorrection onClick={checkBeforeBack} isloading={isLoading}>
                  {CONST_COMMON.CANCEL}
                </BtnCorrection>
              </BtnVerificationWrapper>
              <CompanyFile
                error={error}
                files={files}
                setFiles={onChangeFile}
                statusCompany={company?.status || undefined}
              />
            </Visible>

            {company?.updated_at && (
              <StatusUpdate>
                {CONST_LIST_AGENCY.LAST_UPDATE} : {formatStrDateTimezone(company.updated_at)} [
                <NameWrapper>{company?.updated_by?.full_name}</NameWrapper>]
              </StatusUpdate>
            )}
          </>
        </CompanyCard>
      </Container>
    </DetailOperatorWrapper>
  );
};

export default EditCompany;
