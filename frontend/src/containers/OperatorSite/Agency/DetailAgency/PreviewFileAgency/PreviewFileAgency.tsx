import React, { useState, useCallback, useEffect } from 'react';

import images from '@assets/images-base';
import ModalCustom from '@components/Modal';

import { SpaceBase } from 'styles';
import { defaultFiles } from 'constants/operatorSite';
import { IAgencyResponse } from '@pages/OperatorSite/Agencies/ListAgency/useListAgency';

import { FileItemPreview, PreviewFileAgencyWrapper, TickedIcon, TitlePreview } from './previewFileAgencyStyle';
import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';
import { apiGetLastAgreedRegulations, apiGetOperatorInfo } from 'api';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { SettingRegulationsEnum } from 'constants/constants';
import { sendFile } from 'helper/api/axios';
import { IAgreedRegulationsSignatureData } from 'helper/export';
import { CONST_CREATE_COMPANY } from 'constants/language';

const TERM_OF_SERVICE = 0;
const PRIVACY_POLICY = 1;

const PreviewFileAgency = ({ documents, agency }: { documents: string[]; agency: IAgencyResponse | null }) => {
  const [isOpen, setIsOpen] = useState<number | boolean>(false);
  const titleList = [defaultFiles[TERM_OF_SERVICE].name, defaultFiles[PRIVACY_POLICY].name];
  const [lastAgreedRegulations, setLastAgreedRegulations] = useState<string>();
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
          userName: agency?.name || agency?.user_root?.full_name || '',
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
      lastAgreedRegulations ?? documents[TERM_OF_SERVICE],
      titleList[TERM_OF_SERVICE]
    );
    setTimeout(() => {
      setIsLoadingDownload(false);
    }, 1000);
    // eslint-disable-next-line
  }, [isLoadingDownload, lastAgreedRegulations, documents]);

  const downloadPrivacyPolicy = useCallback(async () => {
    if (isLoadingDownload) {
      return;
    }
    setIsLoadingDownload(true);
    await sendFile('/v1/api/file/download', documents[PRIVACY_POLICY], titleList[PRIVACY_POLICY]);
    setTimeout(() => {
      setIsLoadingDownload(false);
    }, 1000);
    // eslint-disable-next-line
  }, [isLoadingDownload, documents]);

  const getLastAgreedRegulations = useCallback(async () => {
    if (agency?.id) {
      const response = await apiGetLastAgreedRegulations(
        SettingRegulationsEnum.TYPE_OPERATOR_AGENCY,
        undefined,
        agency?.id
      );
      if (responseSuccess(response)) {
        setLastAgreedRegulations(response?.data?.regulations);
      }
    }
  }, [agency?.id]);

  const getIconFile = () => {
    if (agency?.user_root?.regulations_status && agency.user_root.regulations_status > 1) {
      return <TickedIcon src={images.company.ticked} pointer="default" />;
    }
    return <div />;
  };

  useEffect(() => {
    getLastAgreedRegulations();
  }, [getLastAgreedRegulations]);

  useEffect(() => {
    setAgreedRegulationsSignatureData(undefined);
    getAgreedRegulationsSignatureData();
    // eslint-disable-next-line
  }, [agency]);

  return (
    <PreviewFileAgencyWrapper>
      <FileItemPreview>
        {getIconFile()}
        <span>{titleList[TERM_OF_SERVICE]}</span>
        <TickedIcon src={images.company.searchFile} onClick={() => setIsOpen(TERM_OF_SERVICE)} pointer="pointer" />
        <TickedIcon src={images.company.download} pointer="pointer" onClick={() => downloadTermsOfUseContract()} />
      </FileItemPreview>

      <SpaceBase width={8.125} />

      <FileItemPreview>
        {getIconFile()}
        <span>{titleList[PRIVACY_POLICY]}</span>
        <TickedIcon src={images.company.searchFile} onClick={() => setIsOpen(PRIVACY_POLICY)} pointer="pointer" />
        <TickedIcon src={images.company.download} pointer="pointer" onClick={() => downloadPrivacyPolicy()} />
      </FileItemPreview>

      <ModalCustom
        isOpen={!!(isOpen === TERM_OF_SERVICE && !isLoadingAgreedRegulationsSignatureData)}
        setIsOpen={setIsOpen}
      >
        {isOpen === TERM_OF_SERVICE && !isLoadingAgreedRegulationsSignatureData ? (
          <>
            <TitlePreview>{titleList[isOpen] || ''}</TitlePreview>
            <PreviewPDF
              width="50rem"
              height="40rem"
              link={lastAgreedRegulations ?? documents[TERM_OF_SERVICE]}
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
            <PreviewPDF width="50rem" height="40rem" link={documents[PRIVACY_POLICY]} />
          </>
        ) : (
          <div />
        )}
      </ModalCustom>
    </PreviewFileAgencyWrapper>
  );
};

export default PreviewFileAgency;
