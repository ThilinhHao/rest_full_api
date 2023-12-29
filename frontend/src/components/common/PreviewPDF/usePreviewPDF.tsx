import { useCallback, useEffect, useState } from 'react';
import { getFile } from 'helper/api/axios';
import { PDFDocument } from 'pdf-lib/cjs/api';
import { IAgreedRegulationsSignatureData, createAgreedRegulationsFile } from 'helper/export';

const usePreviewPDF = (
  link?: string,
  onLoadFileSuccess?: () => void,
  agreedRegulationsSignatureData?: IAgreedRegulationsSignatureData
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewFile, setViewFile] = useState<File>();
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages: totalPages }: { numPages: number }) => {
    setNumPages(totalPages);
    setIsLoading(false);
    if (onLoadFileSuccess) {
      onLoadFileSuccess();
    }
  };

  const onDocumentLoadError = () => {
    setIsLoading(false);
  };

  const getFilePDF = useCallback(async () => {
    if (!viewFile && link && !isLoading) {
      setIsLoading(true);
      if (agreedRegulationsSignatureData) {
        const newFile = await createAgreedRegulationsFile(
          link,
          agreedRegulationsSignatureData.fileName,
          agreedRegulationsSignatureData.companyName,
          agreedRegulationsSignatureData.userName,
          false
        );
        setViewFile(newFile);
      } else {
        const existingPdfBytes = await getFile('/v1/api/file/download', link);
        if (existingPdfBytes) {
          const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const file = new File([blob], 'fileview.pdf', { type: 'application/pdf' });
          setViewFile(file);
        }
      }
    }
  }, [viewFile, link, agreedRegulationsSignatureData, isLoading]);

  useEffect(() => {
    setViewFile(undefined);
  }, [agreedRegulationsSignatureData, link]);

  useEffect(() => {
    getFilePDF();
  }, [getFilePDF]);

  return {
    viewFile,
    isLoading,
    numPages,
    onDocumentLoadSuccess,
    onDocumentLoadError,
  };
};

export default usePreviewPDF;
