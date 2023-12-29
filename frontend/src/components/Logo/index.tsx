import React from 'react';
import { CompanyStyleLogoText, StyleLogoText } from './logoStyled';

import images from '@assets/images-base';

export const LogoText = ({ isSiteLoginCompany = false }: { isSiteLoginCompany?: boolean }) => {
  return (
    <>
      {isSiteLoginCompany ? (
        <CompanyStyleLogoText>
          <img src={images.companySite.companyWhiteLogoWithName} alt="" />
          <img src={images.companySite.companyLogoHome} alt="" />
        </CompanyStyleLogoText>
      ) : (
        <StyleLogoText>
          <img src={images.home.logo} alt={images.home.logo} />
          <img src={images.home.logotext} alt={images.home.logotext} />
        </StyleLogoText>
      )}
    </>
  );
};
