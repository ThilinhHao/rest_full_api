import React, { useMemo } from 'react';
import configs from 'config';
import UploadDocument from '@pages/AgencySite/UploadDocument/UploadDocument';
import DetailPrivacyPolicy from '@pages/AgencySite/DetailPrivacyPolicy/DetailPrivacyPolicy';
import DetailTermsOfUse from '@pages/AgencySite/DetailTermsOfUse/DetailTermsOfUse';
import ProfileAgency from '@pages/AgencySite/ProfileAgency/ProfileAgency';

import { Route } from 'react-router-dom';
import { getFullHostName } from 'helper';
import { EStatusCheckPrivacyPolicy } from 'constants/constants';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

const useAgencyRoot = () => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  // check agency verify documents
  const isVerifiedDocuments = authInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE;

  // if agency not verify documents
  const isAgencyNotVerifiedAllDocuments = useMemo(() => {
    if (getFullHostName() === configs.APP_FRONTEND_AGENCY && (!isVerifiedDocuments || !authInfo?.agency_bank)) {
      return true;
    }
    return false;
  }, [isVerifiedDocuments, authInfo]);

  // if agency not submit bank setting
  const isAgencyNotSubmitBankSetting = useMemo(() => {
    if (isVerifiedDocuments && !authInfo?.agency_bank) {
      return true;
    }
    return false;
  }, [isVerifiedDocuments, authInfo]);

  const agencyVerifyRoutes: JSX.Element = useMemo(() => {
    if (getFullHostName() === configs.APP_FRONTEND_AGENCY) {
      return (
        <>
          <Route path="/agency/upload-document" element={<UploadDocument />} />
          <Route path="/agency/verify-privacy-policy" element={<DetailPrivacyPolicy />} />
          <Route path="/agency/verify-terms-of-use-contract" element={<DetailTermsOfUse />} />
          {isAgencyNotSubmitBankSetting && (
            <Route path="/setting/profile" element={<ProfileAgency firstTime={true} />} />
          )}
        </>
      );
    }

    return <></>;
  }, [isAgencyNotSubmitBankSetting]);

  return {
    isAgencyNotVerifiedAllDocuments,
    agencyVerifyRoutes,
  };
};

export default useAgencyRoot;
