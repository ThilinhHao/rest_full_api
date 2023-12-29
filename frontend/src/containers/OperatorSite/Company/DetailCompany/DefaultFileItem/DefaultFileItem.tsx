import React, { useCallback, useEffect, useState } from 'react';

import images from '@assets/images-base';
import ModalCustom from '@components/Modal';

import { SpaceBase } from 'styles';
import { IFile, defaultFiles } from 'constants/operatorSite';
import {
  IDefaultFile,
  IDetailCompany,
  IDocumentCompany,
} from '@pages/OperatorSite/Companies/ListCompany/useListCompany';
import { FileItemWrapper, FileName } from '../detailCompanyStyle';
import { TickedDefaultIcon, TickedIcon } from '@containers/CompanySite/GrantCompany/CompanyStyle';
import { TitlePreview } from '@containers/OperatorSite/Agency/DetailAgency/PreviewFileAgency/previewFileAgencyStyle';
import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';
import { sendFile } from 'helper/api/axios';
import { IAgreedRegulationsSignatureData } from 'helper/export';
import { CONST_CREATE_COMPANY } from 'constants/language';
import { apiGetOperatorInfo } from 'api';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';

const TERM_OF_SERVICE = 0;
const PRIVACY_POLICY = 1;

const DefaultFileItem = ({
  documentsDefault,
  company,
  documents,
  lastAgreedRegulations,
}: {
  documentsDefault: IDefaultFile[];
  company: IDetailCompany | null;
  documents?: IDocumentCompany[] | IFile[];
  lastAgreedRegulations?: string;
}) => {
  const titleList = [defaultFiles[0].name, defaultFiles[1].name];
  const [isOpen, setIsOpen] = useState<number | boolean>(false);
  const [isFileExists, setIsFileExists] = useState<boolean>(false);
  const [isRegulationsStatus, setRegulationsStatus] = useState<boolean>(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false);
  const [agreedRegulationsSignatureData, setAgreedRegulationsSignatureData] =
    useState<IAgreedRegulationsSignatureData>();
  const [isLoadingAgreedRegulationsSignatureData, setIsLoadingAgreedRegulationsSignatureData] =
    useState<boolean>(false);

  const getAgreedRegulationsSignatureData = async () => {
    try {
      setIsLoadingAgreedRegulationsSignatureData(true);
      const response = await apiGetOperatorInfo();
      if (responseSuccess(response)) {
        setAgreedRegulationsSignatureData({
          fileName: CONST_CREATE_COMPANY.TERMS_SERVICE,
          companyName: response.data?.name || '',
          userName: company?.name || '',
        });
      }
    } catch {
      //
    } finally {
      setIsLoadingAgreedRegulationsSignatureData(false);
    }
  };

  const downloadTermsOfUseContract = useCallback(async () => {
    if (isLoadingDownload) {
      return;
    }
    setIsLoadingDownload(true);
    await sendFile(
      '/v1/api/file/download',
      lastAgreedRegulations ?? documentsDefault[TERM_OF_SERVICE].regulations,
      titleList[TERM_OF_SERVICE]
    );
    setTimeout(() => {
      setIsLoadingDownload(false);
    }, 1000);
    // eslint-disable-next-line
  }, [isLoadingDownload, lastAgreedRegulations, documentsDefault]);

  const downloadPrivacyPolicy = useCallback(async () => {
    if (isLoadingDownload) {
      return;
    }
    setIsLoadingDownload(true);
    await sendFile('/v1/api/file/download', documentsDefault[TERM_OF_SERVICE].regulations, titleList[PRIVACY_POLICY]);
    setTimeout(() => {
      setIsLoadingDownload(false);
    }, 1000);
    // eslint-disable-next-line
  }, [isLoadingDownload, documentsDefault]);

  const getIconFile = () => {
    if (
      (isFileExists || isRegulationsStatus) &&
      company?.user_root?.regulations_status &&
      company.user_root.regulations_status > 1
    ) {
      return <TickedDefaultIcon alt={images.company.ticked} src={images.company.ticked} />;
    }
    return <div className="icon-null" />;
  };

  useEffect(() => {
    if (documents && Array.isArray(documents) && documents?.length) {
      documents.forEach((element) => {
        if (element?.link) {
          setIsFileExists(true);
        }
      });
    }
    if (company?.user_root && company.user_root?.regulations_status >= 3) {
      setRegulationsStatus(true);
    }
  }, [documents, company]);

  useEffect(() => {
    setAgreedRegulationsSignatureData(undefined);
    getAgreedRegulationsSignatureData();
    // eslint-disable-next-line
  }, [company]);

  return (
    <>
      <FileItemWrapper>
        <div className="item-file">
          {getIconFile()}
          <FileName>
            <TickedIcon
              alt="View document"
              src={images.company.searchFile}
              isLoading={false}
              onClick={() => setIsOpen(TERM_OF_SERVICE)}
              className="view"
            />

            <div className="txt-name-document">{titleList[TERM_OF_SERVICE]}</div>
          </FileName>

          <SpaceBase width={0.313} />
          <TickedIcon
            alt=""
            src={images.company.download}
            onClick={() => downloadTermsOfUseContract()}
            isLoading={isLoadingDownload}
          />
        </div>
      </FileItemWrapper>
      <FileItemWrapper>
        <div className="item-file">
          {getIconFile()}
          <FileName>
            <TickedIcon
              alt="View document"
              src={images.company.searchFile}
              isLoading={false}
              onClick={() => setIsOpen(PRIVACY_POLICY)}
              className="view"
            />

            <div className="txt-name-document">{titleList[PRIVACY_POLICY]}</div>
          </FileName>

          <SpaceBase width={0.313} />
          <TickedIcon
            alt=""
            src={images.company.download}
            onClick={() => downloadPrivacyPolicy()}
            isLoading={isLoadingDownload}
          />
        </div>
      </FileItemWrapper>

      <ModalCustom
        isOpen={!!(isOpen === TERM_OF_SERVICE && !isLoadingAgreedRegulationsSignatureData)}
        setIsOpen={setIsOpen}
      >
        {isOpen === TERM_OF_SERVICE && !isLoadingAgreedRegulationsSignatureData ? (
          <>
            <TitlePreview>{titleList[isOpen] || ''}</TitlePreview>
            <PreviewPDF
              width="70rem"
              height="40rem"
              link={lastAgreedRegulations ?? documentsDefault[TERM_OF_SERVICE].regulations}
              agreedRegulationsSignatureData={lastAgreedRegulations ? undefined : agreedRegulationsSignatureData}
            />
          </>
        ) : (
          <div />
        )}
      </ModalCustom>
      <ModalCustom isOpen={!!(isOpen === PRIVACY_POLICY)} setIsOpen={setIsOpen}>
        {isOpen === PRIVACY_POLICY ? (
          <>
            <TitlePreview>{titleList[isOpen] || ''}</TitlePreview>
            <PreviewPDF width="70rem" height="40rem" link={documentsDefault[PRIVACY_POLICY].regulations} />
          </>
        ) : (
          <div />
        )}
      </ModalCustom>
    </>
  );
};

export default DefaultFileItem;
