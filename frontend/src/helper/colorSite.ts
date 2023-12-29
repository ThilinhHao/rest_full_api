import images from '@assets/images-base';
import configs from 'config';
import { colors } from 'constants/colorsBase';
import { getFullHostName } from 'helper';

export const getColorSite = () => {
  switch (getFullHostName()) {
    case configs.APP_FRONTEND_OPERATOR:
      return colors.mainColor;
    case configs.APP_FRONTEND_AGENCY:
      return colors.mainColorAgency;
    case configs.APP_FRONTEND_COMPANY:
      return colors.mainColorCompany;
    default:
      return colors.mainColor;
  }
};

export const getColorSiteHover = () => {
  switch (getFullHostName()) {
    case configs.APP_FRONTEND_OPERATOR:
      return colors.mainColorHover;
    case configs.APP_FRONTEND_AGENCY:
      return colors.mainColorAgency;
    case configs.APP_FRONTEND_COMPANY:
      return colors.hoverMainColorCompany;
    default:
      return colors.mainColorHover;
  }
};

export const getBgIconSite = () => {
  return getColorSite();
};

export const getBgColorLogin = (isLogin: boolean = false) => {
  if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
    if (isLogin) {
      return 'linear-gradient(180deg, #FD9672 0%, #FDAB29 100%)';
    }
    return 'linear-gradient(180deg, #ffdcd1 0%, #fff7de 100%)';
  }
  return '#95D5B2';
};

export const getColorLogin = () => {
  return getFullHostName() === configs.APP_FRONTEND_COMPANY ? '#FD9670' : '#52B788';
};

export const getBgColorBtnLogin = () => {
  return getFullHostName() === configs.APP_FRONTEND_COMPANY
    ? 'linear-gradient(270deg, #FD9672 0%, #FFB239 100%)'
    : '#52B788';
};

export const getShadowBtnLogin = () => {
  return getFullHostName() === configs.APP_FRONTEND_COMPANY
    ? '0px 0.125rem 0.625rem rgba(0, 0, 0, 0.25)'
    : '0px 0.125rem 0.625rem rgba(0, 0, 0, 0.161)';
};

// ====== style SettingItemWrapper =====
export const getBgSettingItem = () => {
  if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
    return 'radial-gradient(73.49% 395.24% at 26.51% 100%, #FFB239 0%, #FD9672 100%)';
  }
  return 'linear-gradient(81.18deg, #93c8a8 0%, #52b788 96.51%)';
};

export const getButtonColorSite = () => {
  switch (getFullHostName()) {
    case configs.APP_FRONTEND_OPERATOR:
      return colors.mainColor;
    case configs.APP_FRONTEND_AGENCY:
      return colors.mainColorAgency;
    case configs.APP_FRONTEND_COMPANY:
      return colors.btnDefaultCompanySite;
    default:
      return colors.mainColor;
  }
};
export const getButtonColorNotice = () => {
  switch (getFullHostName()) {
    case configs.APP_FRONTEND_OPERATOR:
      return colors.mainColor;
    case configs.APP_FRONTEND_AGENCY:
      return colors.mainColorAgency;
    case configs.APP_FRONTEND_COMPANY:
      return 'linear-gradient(90deg, #fdab29 0%, #fd9770 100%)';
    default:
      return colors.mainColor;
  }
};

export const getIconPaginationNext = () => {
  return getColorSite() === colors.mainColorCompany
    ? images.companySite.nextIconPaging
    : images.companySite.nextIconPagingGreen;
};

export const getIconPaginationPrev = () => {
  return getColorSite() === colors.mainColorCompany
    ? images.companySite.nextIconPaging
    : images.companySite.nextIconPagingGreen;
};

// invoice
export const getBackGroundInvoice = () => {
  return getFullHostName() === configs.APP_FRONTEND_COMPANY ? '#F7E9D9' : '#D9F7E8';
};

export const getColorColumnInvoice = () => {
  return getFullHostName() === configs.APP_FRONTEND_COMPANY ? '#FFFBF7' : '#F2FDF8';
};
