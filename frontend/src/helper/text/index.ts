import configs from 'config';
import images from '@assets/images-base';

import { isNumberHaf, isNumberOfJP, NumberOfJP } from 'helper/regex';
import { AlignmentType, Document, HeadingLevel, Paragraph, TextRun } from 'docx';

const convertFullToHalf = (str = '') => str.replace(/[！-～]/g, (r) => String.fromCharCode(r.charCodeAt(0) - 0xfee0));

const toHalfWidth = (value = '') => {
  if (!isNaN(+value)) return value;
  return convertFullToHalf(value.normalize('NFKC'));
};

const searchTextInLongText = ({ text = '', longText = '' }: { text: string; longText: string }) => {
  return (
    toHalfWidth(`${longText}`).toLowerCase().includes(toHalfWidth(text.trim()).toLowerCase()) ||
    toHalfWidth(`${longText}`).toLowerCase().includes(text.trim().toLowerCase())
  );
};

const textHelpers = { toHalfWidth, searchTextInLongText };
export default textHelpers;

export const stringToNumber = (string: string) => {
  return Number(string.replace(isNumberOfJP, '')) || '';
};

export const toNumber = (string: string) => {
  if (!string.match(NumberOfJP)) {
    return '';
  }
  return string;
};

export const convertMessageToFile = (content: string) => {
  if (configs.REACT_APP_URL_UPLOAD && content.includes(configs.REACT_APP_URL_UPLOAD)) {
    const uploadedFiles = content.split('\n');
    const files: any = [];
    uploadedFiles.forEach((file: any) => {
      if (file) {
        const fileMessage = {
          name: file.split('\t')[0],
          url: file.split('\t')[1],
          type: file.substring(file.lastIndexOf('.') + 1),
        };
        files.push(fileMessage);
      }
    });
    return files;
  }
  return content;
};

export const getIconFile = (type: string) => {
  if (type === 'jpg' || type === 'jpeg' || type === 'png') return images.common.iconImage;
  if (type === 'xlsx' || type === 'xls') return images.common.iconXls;
  if (type === 'doc' || type === 'docx') return images.common.iconDocx;
  if (type === 'pdf') return images.common.iconPdf;
  if (type === 'csv') return images.common.iconCsv;
  if (type === 'mp4' || type === 'mov' || type === 'webm') return images.common.iconVideo;
  if (type === 'ppt' || type === 'pptx') return images.common.iconPpt;
  return images.common.iconFile;
};

export const onBlurInputNumber = (value: any, length?: number, isPhone: boolean = false) => {
  if (!value) return '';
  let result = value.replace(isNumberOfJP, '')?.normalize('NFKC')?.replace(/-/g, '');
  if (length) result = result.substring(0, length);

  if (isPhone) {
    return result;
  } else {
    return Number(result);
  }
};
export const onBlurNumber = (value: any, length?: number, isPhone: boolean = false) => {
  if (!value || value === '0') return value;
  let result = value.replace(isNumberOfJP, '')?.normalize('NFKC')?.replace(/-/g, '');
  if (length) result = result.substring(0, length);

  if (isPhone) {
    return result;
  } else {
    return Number(result);
  }
};
export const onInputNumberHaf = (value: any, length?: number) => {
  if (!value) return '';
  let result = value.replace(isNumberHaf, '')?.normalize('NFKC')?.replace(/-/g, '');
  if (length) result = result.substring(0, length);

  return result;
};

export const textToDocx = (title: string, content: string) => {
  const contentParagraph: Paragraph[] = [
    new Paragraph({
      children: [
        new TextRun({
          text: title,
          font: {
            name: 'Yu Gothic',
          },
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 150,
        afterAutoSpacing: true,
        beforeAutoSpacing: true,
      },
    }),
  ];
  if (content.split('\n').length > 0) {
    content.split('\n').forEach((ele, index) => {
      contentParagraph.push(
        new Paragraph({
          children: [
            new TextRun({
              text: ele,
              font: {
                name: 'Yu Gothic',
              },
            }),
          ],
        })
      );
    });
  }

  return new Document({
    sections: [
      {
        children: contentParagraph,
      },
    ],
  });
};
