import { Container, GrantCard } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import React from 'react';
import images from '@assets/images-base';
import { CONST_COMPANY_PROFILE } from 'constants/language';
import { DetailWrapper, TitlePageWrapper, PrefixIcon } from '@components/CompanySite/common/styled';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import useCompanyProfile from './useCompanyProfile';
import Loading from '@components/Loading';
import DetailProfileCompany from '@containers/CompanySite/DetailProfileCompany/DetailProfileCompany';
import EditProfileCompany from '@containers/CompanySite/EditProfileCompany/EditProfileCompany';

export const CompanyProfile = () => {
  const { BREADS, isEdit, companyProfile, isLoadingCompanyProfile, onClickToHome, setIsEdit, updateCompanyData } =
    useCompanyProfile();

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} onClickHome={onClickToHome} />

      <Container>
        <GrantCard padding="1.25rem 0" percentWidth="100%" width={106.25} justifyContent={'flex-start'}>
          <div>
            <TitlePageWrapper>
              <PrefixIcon src={images.companySite.account} alt={CONST_COMPANY_PROFILE.ALT.COMPANY} />
              <div>{CONST_COMPANY_PROFILE.COMPANY_INFORMATION}</div>
            </TitlePageWrapper>
          </div>

          {isLoadingCompanyProfile && <Loading />}

          {companyProfile && !isLoadingCompanyProfile && !isEdit && (
            <DetailProfileCompany companyProfile={companyProfile} setIsEdit={setIsEdit} />
          )}
          {companyProfile && !isLoadingCompanyProfile && isEdit && (
            <EditProfileCompany
              companyProfile={companyProfile}
              setIsEdit={setIsEdit}
              updateCompanyData={updateCompanyData}
            />
          )}
        </GrantCard>
      </Container>
    </DetailWrapper>
  );
};
