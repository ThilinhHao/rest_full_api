import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';
import { getFullHostName } from 'helper';
import { EStatusCheckCompanyDocument, EStatusCheckPrivacyPolicy } from 'constants/constants';
import UploadDocument from '@pages/CompanySite/UploadDocument/UploadDocument';
import DetailPrivacyPolicy from '@pages/CompanySite/DetailPrivacyPolicy/DetailPrivacyPolicy';
import DetailTermsOfUse from '@pages/CompanySite/DetailTermsOfUse/DetailTermsOfUse';
import SalaryAdvance from '@pages/CompanySite/SalaryAdvance/SalaryAdvance';
import BankSetting from '@pages/CompanySite/BankSetting/BankSetting';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import configs from 'config';

const useCompanyRoot = () => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);

  // check company verify documents
  const isVerifiedDocuments = authInfo?.regulations_status === EStatusCheckPrivacyPolicy.AGREE;
  const numberDocumentNotVerify = authInfo?.company?.documents?.filter(
    (document: any) => document?.status !== EStatusCheckCompanyDocument.VERIFIED
  )?.length;

  // if company not verify documents
  const isCompanyNotVerifiedAllDocuments = useMemo(() => {
    if (
      getFullHostName() === configs.APP_FRONTEND_COMPANY &&
      (!isVerifiedDocuments ||
        numberDocumentNotVerify > 0 ||
        !authInfo?.company?.company_setting ||
        !authInfo?.company?.is_setting_bank)
    ) {
      return true;
    }
    return false;
  }, [isVerifiedDocuments, authInfo, numberDocumentNotVerify]);

  // if company not submit salary setting
  const isCompanyNotSubmitSalarySetting = useMemo(() => {
    if (isVerifiedDocuments && !numberDocumentNotVerify && !authInfo?.company?.company_setting) {
      return true;
    }
    return false;
  }, [isVerifiedDocuments, authInfo, numberDocumentNotVerify]);

  // if company not submit bank setting
  const isCompanyNotSubmitBankSetting = useMemo(() => {
    if (isVerifiedDocuments && !numberDocumentNotVerify && !authInfo?.company?.is_setting_bank) {
      return true;
    }
    return false;
  }, [isVerifiedDocuments, authInfo, numberDocumentNotVerify]);

  const companyVerifyRoutes: JSX.Element = useMemo(() => {
    if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
      return (
        <>
          <Route path="/company/upload-document" element={<UploadDocument />} />
          <Route path="/company/verify-privacy-policy" element={<DetailPrivacyPolicy />} />
          <Route path="/company/verify-terms-of-use-contract" element={<DetailTermsOfUse />} />
          {isCompanyNotSubmitSalarySetting && (
            <Route path="/setting/edit/salary" element={<SalaryAdvance firstTime={true} />} />
          )}
          {isCompanyNotSubmitBankSetting && (
            <Route path="/setting/edit/bank" element={<BankSetting firstTime={true} />} />
          )}
        </>
      );
    }

    return <></>;
  }, [isCompanyNotSubmitSalarySetting, isCompanyNotSubmitBankSetting]);

  return {
    isCompanyNotVerifiedAllDocuments,
    companyVerifyRoutes,
  };
};

export default useCompanyRoot;
