import React from 'react';
import AgreeDocument from '@containers/CompanySite/AgreeDocument/AgreeDocument';
import useDetailTermsOfUse from './useDetailTermsOfUse';
import { CONST_COMPANY_ADMIN_ACCOUNT } from 'constants/language';
import Loading from '@components/Loading';

const DetailTermsOfUse = () => {
  const {
    agreeTermsOfUse,
    detailTermsOfUse,
    isLoadingGetDetailTermsOfUse,
    isLoadingCheckTermsOfUse,
    handleBack,
    isVerified,
    isUpdate,
    agreedRegulationsSignatureData,
    isLoadingAgreedRegulationsSignatureData,
  } = useDetailTermsOfUse();

  return (
    <>
      {!isLoadingAgreedRegulationsSignatureData && (
        <AgreeDocument
          agreeDocument={isVerified ? handleBack : agreeTermsOfUse}
          detailDocument={detailTermsOfUse}
          isLoadingCheckDocument={isLoadingCheckTermsOfUse}
          isLoadingGetDetailDocument={isLoadingGetDetailTermsOfUse}
          titleDocument={CONST_COMPANY_ADMIN_ACCOUNT.TERMS_OF_USE_CONTRACT}
          titleNoteUpdate={isUpdate ? CONST_COMPANY_ADMIN_ACCOUNT.TERMS_OF_USE_CONTRACT_UPDATE_TEXT : '　'}
          handleBack={handleBack}
          isVerified={isVerified}
          agreedRegulationsSignatureData={agreedRegulationsSignatureData}
        />
      )}
      {isLoadingAgreedRegulationsSignatureData && <Loading />}
    </>
  );
};

export default DetailTermsOfUse;
