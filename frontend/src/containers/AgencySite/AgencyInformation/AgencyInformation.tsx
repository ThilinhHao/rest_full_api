import React from 'react';

import { SpaceBase } from 'styles';
import { IDetailAgency } from '@pages/AgencySite/ProfileAgency/useProfileAgency';
import { BtnSettingBank } from '@components/Style/Style';
import { stringToPhoneView } from 'helper/formatPhone';
import { OPTION_EDIT_PROFILE } from 'constants/agency';
import { AgencyInformationWrapper } from './agencyInformationStyle';
import { CONST_AGENCY_SITE_DETAIL, CONST_COMMON } from 'constants/language';

import WrapperBox from '@containers/OperatorSite/Agency/EditAgency/WrapperBox/WrapperBox';
import ItemInformation from './ItemInformation/ItemInformation';

const AgencyInformation = ({
  detailAgencyData,
  setIsEdit,
}: {
  detailAgencyData: IDetailAgency;
  setIsEdit: (isEdit: boolean) => void;
}) => {
  return (
    <AgencyInformationWrapper>
      <SpaceBase height={1.875} />
      <WrapperBox title={CONST_AGENCY_SITE_DETAIL.BASIC_INFORMATION} width="100%">
        <ItemInformation title={CONST_AGENCY_SITE_DETAIL.AGENCY_NAME} value={detailAgencyData.name} />
        <ItemInformation title={CONST_AGENCY_SITE_DETAIL.CODE} value={detailAgencyData.code} />
        <ItemInformation title={CONST_AGENCY_SITE_DETAIL.INVOICE_REGISTRATION} value={detailAgencyData.register_code} />
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.POSTAL_CODE}
          value={`${detailAgencyData?.postal_code?.slice(0, 3) || ''}${detailAgencyData?.postal_code ? '-' : ''}${
            detailAgencyData?.postal_code?.slice(3, 7) || ''
          }`}
        />
        <ItemInformation title={CONST_AGENCY_SITE_DETAIL.ADDRESS_FIRST} value={detailAgencyData.address1} />
        <ItemInformation title={CONST_AGENCY_SITE_DETAIL.ADDRESS_SECOND} value={detailAgencyData.address2} />
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.REPRESENTATIVE_NAME}
          value={`${detailAgencyData.user_root.full_name}`}
        />
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.PHONE_NUMBER}
          value={stringToPhoneView(detailAgencyData.user_root.phone)}
        />
        <ItemInformation title="FAX" value={stringToPhoneView(detailAgencyData.fax)} />
        <ItemInformation title={CONST_AGENCY_SITE_DETAIL.EMAIL} value={detailAgencyData.user_root.email} />
      </WrapperBox>

      <SpaceBase height={1.875} />
      <WrapperBox title={CONST_AGENCY_SITE_DETAIL.AGENCY_FEE} width="100%">
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.DEPOSIT}
          value={`${detailAgencyData.deposit_fee}　${CONST_COMMON.YEN}`}
        />
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.REIMBURSEMENT}
          value={`${detailAgencyData.advance_fee}　${CONST_COMMON.YEN}`}
        />
      </WrapperBox>

      <SpaceBase height={1.875} />
      <WrapperBox title={CONST_AGENCY_SITE_DETAIL.ACCOUNT_INFORMATION} width="100%">
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.INSTITUTION_NAME}
          value={`${detailAgencyData.agency_bank.bank_name} ${
            detailAgencyData.agency_bank.bank_code && `(${detailAgencyData.agency_bank.bank_code})`
          }`}
        />
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.BRANCH_NAME}
          value={`${detailAgencyData.agency_bank.bank_branches_name} ${
            detailAgencyData.agency_bank.bank_branches_code && `(${detailAgencyData.agency_bank.bank_branches_code})`
          }`}
        />
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.ACCOUNT_TYPE}
          value={OPTION_EDIT_PROFILE[detailAgencyData?.agency_bank?.bank_type - 1 || 0]?.label || ''}
        />
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.NOMINEE_NAME}
          value={detailAgencyData.agency_bank.account_name}
        />
        <ItemInformation
          title={CONST_AGENCY_SITE_DETAIL.ACCOUNT_NUMBER}
          value={detailAgencyData.agency_bank.account_number}
        />
      </WrapperBox>

      <SpaceBase height={6.813} />
      <BtnSettingBank onClick={() => setIsEdit(true)}>{CONST_COMMON.EDIT}</BtnSettingBank>
      <SpaceBase height={6.813} />
    </AgencyInformationWrapper>
  );
};

export default AgencyInformation;
