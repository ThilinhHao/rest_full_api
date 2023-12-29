import React from 'react';
import { useNavigate } from 'react-router-dom';

import images from '@assets/images-base';
import ButtonIssuance from '@components/Button/ButtonIssuance';
import { IconChecked } from '@components/Icon';

import { LANGUAGE_COMPANY } from 'constants/language';
import { UploadSuccessWapper } from './uploadFileStyle';
import { PrefixIcon, TitlePageWrapper, TitleWrapper } from '../DetailStaff/detailStaffStyle';

const UploadSuccess = () => {
  const navigate = useNavigate();

  const toPageListStaff = () => {
    navigate('/staff-list');
  };

  return (
    <UploadSuccessWapper className="wrapper-success-staff-upload">
      <TitlePageWrapper>
        <TitleWrapper>
          <PrefixIcon src={images.companySite.createStaffMany} alt={images.companySite.createStaffMany} />
          <div className="title">{LANGUAGE_COMPANY.createStaff.successStaffTitle}</div>
        </TitleWrapper>
      </TitlePageWrapper>

      <div className="messsage">
        <p className="txt-message">{LANGUAGE_COMPANY.createStaff.successStaffTxtSuccess}</p>
        <div>
          <IconChecked height="3.875rem" width="3.875rem" />
        </div>
      </div>
      <div>
        <ButtonIssuance
          label={LANGUAGE_COMPANY.createStaff.btnRedirectListStaff}
          PrefixIcon={<img src={images.companySite.createMany} alt={images.companySite.createMany} />}
          className="btn-submit"
          onClick={toPageListStaff}
        />
      </div>
    </UploadSuccessWapper>
  );
};

export default UploadSuccess;
