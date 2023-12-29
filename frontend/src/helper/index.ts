import configs from 'config';
import {
  USER_PERMISION_ONWER,
  USER_ROLE_AGENCY,
  USER_ROLE_COMPANY,
  USER_ROLE_OPERATOR,
  USER_ROLE_STAFF,
  USER_TYPE_OWNER,
} from 'constants/User';
import { FILE_IMAGE_ACCEPT } from 'constants/constants';
import PizZip from 'pizzip';

export const getFullHostName = () => {
  return window.location.protocol + '//' + window.location.hostname;
};

export const getURLTopPage = () => {
  return window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/';
};

export const getUseRoleByHostName = () => {
  switch (getFullHostName()) {
    case configs.APP_FRONTEND_OPERATOR:
      return USER_ROLE_OPERATOR;
    case configs.APP_FRONTEND_AGENCY:
      return USER_ROLE_AGENCY;
    case configs.APP_FRONTEND_COMPANY:
      return USER_ROLE_COMPANY;
    default:
      return USER_ROLE_STAFF;
  }
};

export const trimSpaceInput = (value: string, length?: number) =>
  length ? value.replace(/\s+/g, ' ').trim().substring(0, length) : value.replace(/\s+/g, ' ').trim();

export const getDataPermssionOwner = (userType: number | undefined, routes: any[]) => {
  const result: any[] = [];

  routes.forEach((element: any) => {
    if (!element?.permssion || (element.permssion === USER_PERMISION_ONWER && userType === USER_TYPE_OWNER)) {
      result.push(element);
    }
  });

  return result;
};

export const sprintfNumber = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const getTypeFileByURL = (url?: string) => {
  if (!url) return;
  const index = url?.lastIndexOf('.');
  if (!index) return;

  return url.substring(index + 1).toLowerCase();
};

export const isOfficeView = (type?: string) => {
  if (!type) return;

  return `${FILE_IMAGE_ACCEPT.EXCEL},${FILE_IMAGE_ACCEPT.WORD}`.includes(type);
};
export const isFileImageType = (type?: string) => {
  if (!type) return;

  return FILE_IMAGE_ACCEPT.IMAGE.includes(type);
};
export const isFilePDFType = (type?: string) => {
  if (!type) return;

  return FILE_IMAGE_ACCEPT.PDF.includes(type);
};

export const str2xml = (str: string) => {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, 'text/xml');
};

// Get paragraphs as javascript array
export const getParagraphs = (content: any) => {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files['word/document.xml'].asText());
  const paragraphsXml = xml.getElementsByTagName('w:p');
  const paragraphs = [];

  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
    let fullText = '';
    const textsXml = paragraphsXml[i].getElementsByTagName('w:t');
    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
      const textXml = textsXml[j];
      if (textXml.childNodes) {
        fullText += textXml.childNodes[0].nodeValue;
      }
    }
    if (fullText) {
      paragraphs.push(fullText);
    }
  }
  return paragraphs;
};
