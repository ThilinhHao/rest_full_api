import React from 'react';

import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import CompanyFile from '@containers/CompanySite/GrantCompany/CompanyFile';
import CompanyInput from '@containers/CompanySite/GrantCompany/CompanyInput';

import {
  BtnVerification,
  BtnVerificationWrapper,
} from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';

import useCreateCompany from './useCreateCompany';
import {
  AvatarTitle,
  BtnCorrection,
  BtnVerificationCreateCompanyWrapper,
  CompanyCard,
  Container,
  GrantCompanyWrapper,
  ITemMark,
  TitleCompany,
  Visible,
  WrapperConfirm,
} from './createCompanyStyle';
import ConfirmCreate from '@containers/CompanySite/GrantCompany/ConfirmCreate';
import { CONST_CREATE_COMPANY, CONST_COMMON } from 'constants/language';
import { RowCenter, SpaceBase } from 'styles';
import images from '@assets/images-base';
import { SpinLoading } from '@components/Loading/LoadingStyle';

const CreateCompany = () => {
  const {
    files,
    error,
    BREADS,
    isLoading,
    companyData,
    isConfirming,
    agency,
    toConFirm,
    setIsConfirming,
    onChangeFile,
    onChangeEmail,
    onChangeDeposit,
    onChangeCompany,
    onCreateCompany,
    onChangeFullName,
    onChangeAgencyCode,
    onChangePhoneNumber,
    onChangeBrokerageFee,
    onChangePostalCodeFirst,
    onChangePostalCodeEnd,
    onChangeAddress1,
    onChangeAddress2,
    onChangeStatus,
    confirmBack,
    handleFormatPhone,
    companyInitData,
    isLoadingPage,
    onChangeFreeStartDate,
    onChangeFreeEndDate,
    onChangeFee,
  } = useCreateCompany();

  return (
    <GrantCompanyWrapper>
      <BreadCrumb breads={BREADS} />
      <Container>
        {!isLoadingPage && (
          <CompanyCard>
            <>
              <Visible isHidden={isConfirming}>
                <RowCenter>
                  <SpaceBase width={1} />
                  <AvatarTitle src={images.sideBar.adminPerson} />
                  <SpaceBase width={1} />
                  <TitleCompany>{CONST_CREATE_COMPANY.CREATE_TITLE}</TitleCompany>
                  <ITemMark>{CONST_COMMON.REQUIRE_TITLE}</ITemMark>
                </RowCenter>
                <SpaceBase height={2} />

                <CompanyInput
                  error={error}
                  constData={companyInitData}
                  companyData={companyData}
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
                <CompanyFile error={error} files={files} setFiles={onChangeFile} isCreate={true} />
              </Visible>
              <Visible isHidden={isConfirming}>
                <BtnVerificationWrapper>
                  <BtnVerification isloading={isLoading} onClick={toConFirm}>
                    {CONST_CREATE_COMPANY.VERIFICATION}
                  </BtnVerification>
                  <BtnCorrection onClick={confirmBack} isloading={isLoading}>
                    {CONST_COMMON.CANCEL}
                  </BtnCorrection>
                </BtnVerificationWrapper>
              </Visible>
            </>
            {isConfirming && (
              <WrapperConfirm>
                <div>
                  <RowCenter>
                    <SpaceBase width={1} />
                    <AvatarTitle src={images.sideBar.adminPerson} />
                    <SpaceBase width={1} />
                    <TitleCompany>{CONST_CREATE_COMPANY.CREATE_TITLE}</TitleCompany>
                  </RowCenter>
                  <SpaceBase height={2} />
                  <ConfirmCreate companyData={companyData} agency={agency} files={files} />
                </div>
                <BtnVerificationCreateCompanyWrapper>
                  <BtnVerification isloading={isLoading} onClick={onCreateCompany}>
                    {CONST_CREATE_COMPANY.ISSUE}
                  </BtnVerification>
                  <BtnCorrection onClick={() => setIsConfirming(false)} isloading={isLoading}>
                    {CONST_CREATE_COMPANY.CORRECTION}
                  </BtnCorrection>
                </BtnVerificationCreateCompanyWrapper>
              </WrapperConfirm>
            )}
          </CompanyCard>
        )}
        {isLoadingPage && <SpinLoading />}
      </Container>
    </GrantCompanyWrapper>
  );
};

export default CreateCompany;
