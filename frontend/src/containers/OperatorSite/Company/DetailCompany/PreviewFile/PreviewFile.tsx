import { getTypeFileByURL, isFileImageType, isFilePDFType, isOfficeView } from 'helper';
import React from 'react';
import { SpaceBase } from 'styles';
import { IFramePreview, PreviewFileWrapper, TitlePreviewFile, ImagePreview } from './previewFileStyle';
import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';

interface IPreviewFile {
  url: string | undefined;
  name: string;
  onCloseModal?: () => void;
  height?: string;
}
const PreviewFile = ({ url, name, onCloseModal, height }: IPreviewFile) => {
  return (
    <PreviewFileWrapper isImg={isFileImageType(getTypeFileByURL(url))}>
      <TitlePreviewFile>{name}</TitlePreviewFile>
      <SpaceBase height={1} />
      {url && isFileImageType(getTypeFileByURL(url)) && <ImagePreview height={height} src={url} alt="" />}
      {url && isFilePDFType(getTypeFileByURL(url)) && <PreviewPDF width="90%" link={url} />}
      {url && !isFileImageType(getTypeFileByURL(url)) && !isFilePDFType(getTypeFileByURL(url)) && (
        <IFramePreview
          height={height}
          src={
            isOfficeView(getTypeFileByURL(url))
              ? `https://view.officeapps.live.com/op/embed.aspx?src=${url}&embedded=true`
              : `https://docs.google.com/viewer?url=${url}&embedded=true`
          }
          title="previewCV"
          width="100%"
        />
      )}
    </PreviewFileWrapper>
  );
};

export default PreviewFile;
