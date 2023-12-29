import images from '@assets/images-base';
import { colors } from 'constants/colorsBase';
import { CONST_COMPANY_UPLOAD_DOCUMENT } from 'constants/language';
import React from 'react';
import { NoteText, PageRejectWrapper } from './uploadDocumentStyle';

export const PageReject = () => {
  return (
    <PageRejectWrapper>
      <img src={images.companySite.companyLogoWithName} alt="" />
      <NoteText color={colors.mainText}>{CONST_COMPANY_UPLOAD_DOCUMENT.WE_REALLY_SORRY}</NoteText>
      <NoteText color={colors.mainText}>{CONST_COMPANY_UPLOAD_DOCUMENT.WE_CANT_VERIFY_DOCUMENTS}</NoteText>
      <NoteText color={colors.mainText}>{CONST_COMPANY_UPLOAD_DOCUMENT.THANK_YOU}</NoteText>
    </PageRejectWrapper>
  );
};
