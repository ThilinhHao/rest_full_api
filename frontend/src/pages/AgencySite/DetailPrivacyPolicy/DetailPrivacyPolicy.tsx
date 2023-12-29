import React from 'react';
import useDetailPrivacyPolicy from './useDetailPrivacyPolicy';
import { CONST_COMPANY_ADMIN_ACCOUNT } from 'constants/language';
import AgreeDocument from '@containers/AgencySite/AgreeDocument/AgreeDocument';

const DetailPrivacyPolicy = () => {
  const {
    agreePrivacyPolicy,
    detailPrivacyPolicy,
    isLoadingGetDetailPrivacyPolicy,
    isLoadingCheckPrivacyPolicy,
    handleBack,
    isVerified,
    isUpdate,
  } = useDetailPrivacyPolicy();

  return (
    <AgreeDocument
      agreeDocument={isVerified ? handleBack : agreePrivacyPolicy}
      detailDocument={detailPrivacyPolicy}
      isLoadingCheckDocument={isLoadingCheckPrivacyPolicy}
      isLoadingGetDetailDocument={isLoadingGetDetailPrivacyPolicy}
      titleDocument={CONST_COMPANY_ADMIN_ACCOUNT.PRIVACY_POLICY_CONTRACT}
      titleNoteUpdate={isUpdate ? CONST_COMPANY_ADMIN_ACCOUNT.PRIVACY_POLICY_CONTRACT_UPDATE_TEXT : '　'}
      handleBack={handleBack}
      isVerified={isVerified}
    />
  );
};

export default DetailPrivacyPolicy;
