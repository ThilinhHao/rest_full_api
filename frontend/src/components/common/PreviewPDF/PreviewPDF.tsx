import React from 'react';

import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack5';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import usePreviewPDF from './usePreviewPDF';
import { SpinLoading } from '@components/Loading/LoadingStyle';
import { CONST_COMMON } from 'constants/language';
import { DocumentViewer, FileViewer } from './previewPDFStyle';
import { IAgreedRegulationsSignatureData } from 'helper/export';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PreviewPDFProps {
  link?: string;
  onLoadFileSuccess?: () => void;
  height?: string;
  width?: string;
  minHeight?: string;
  isViewDocument?: boolean;
  agreedRegulationsSignatureData?: IAgreedRegulationsSignatureData;
}

const PreviewPDF = ({
  link,
  width,
  height,
  minHeight,
  onLoadFileSuccess,
  isViewDocument = false,
  agreedRegulationsSignatureData,
}: PreviewPDFProps) => {
  const { isLoading, viewFile, numPages, onDocumentLoadSuccess, onDocumentLoadError } = usePreviewPDF(
    link,
    onLoadFileSuccess,
    agreedRegulationsSignatureData
  );

  return (
    <>
      {!isViewDocument && (
        <FileViewer width={width} height={height} minHeight={minHeight}>
          {viewFile && (
            <Document
              file={viewFile}
              // renderMode="svg"
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<SpinLoading />}
              noData={CONST_COMMON.NO_DATA}
              error={CONST_COMMON.SYSTEM_ERROR}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          )}
          {isLoading && !viewFile && <SpinLoading />}
        </FileViewer>
      )}
      {isViewDocument && (
        <DocumentViewer width={width} height={height} minHeight={minHeight}>
          {viewFile && (
            <Document
              file={viewFile}
              // renderMode="svg"
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<SpinLoading />}
              noData={CONST_COMMON.NO_DATA}
              error={CONST_COMMON.SYSTEM_ERROR}
            >
              {Array.from(new Array(1), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          )}
          {isLoading && !viewFile && <SpinLoading />}
        </DocumentViewer>
      )}
    </>
  );
};

export default PreviewPDF;
