import React, { useEffect, useState, useCallback } from 'react';

import images from '@assets/images-base';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';

import { IFile } from 'constants/operatorSite';
import { Tooltip } from 'antd';
import { IconFile } from '@components/Icon';
import { FileItem } from './FileItem/FileItem';
import { COMPANY_STATUS } from 'constants/company';
import {
  IDefaultFile,
  IDetailCompany,
  IDocumentCompany,
} from '@pages/OperatorSite/Companies/ListCompany/useListCompany';
import { stringToPhoneView } from 'helper/formatPhone';
import { CONST_LIST_AGENCY } from '@pages/OperatorSite/Agencies/ListAgency/constants';
import { formatDateJP, formatStrDateTimezone } from 'helper/date';
import { CompanyCard, Container } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { TitleWrapper, WrapperFile } from '@containers/CompanySite/GrantCompany/CompanyStyle';
import { NameWrapper, StatusUpdate } from '@containers/OperatorSite/Agency/DetailAgency/detailAgencyStyle';
import { CardItem, RowCenter, SpaceBase } from 'styles';
import { CONST_BREADS, CONST_CREATE_COMPANY, CONST_LIST_COMPANY } from 'constants/language';
import {
  EStatusCompany,
  EStatusFile,
  EStatusFileConfirm,
  SettingRegulationsEnum,
  USAGE_PLAN,
} from 'constants/constants';
import {
  BtnFileCompanyVerificationWrapper,
  CompanyNameDetail,
  DeleteDetailBtn,
  TitleDetailCompanyWrapper,
  UnderView,
} from './detailCompanyStyle';

import {
  DetailOperatorWrapper,
  ElementCard,
} from '@containers/OperatorSite/Operator/DetailOperator/detailOperatorStyle';
import {
  BtnSubmitFile,
  BtnVerification,
  BtnVerificationWrapper,
} from '@pages/OperatorSite/Operators/CreateOperator/createOperatorStyle';
import DefaultFileItem from './DefaultFileItem/DefaultFileItem';
import { apiGetLastAgreedRegulations } from 'api';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import dayjs from 'dayjs';

const BREADS: IBread[] = [
  {
    name: CONST_BREADS.LIST_COMPANY,
    path: '',
  },
];

export const DetailCompany = ({
  company,
  documentsDefault,
  setIsEdit,
  onDeleteCompany,
  onConfirmOperatorDocument,
  isLoadingOperatorConfirmDocument,
}: {
  company: IDetailCompany | null;
  isLoadingOperatorConfirmDocument: boolean;
  documentsDefault: IDefaultFile[];
  setIsEdit: (isEdit: boolean) => void;
  onDeleteCompany: () => void;
  onConfirmOperatorDocument: (data: any) => void;
}) => {
  const [documents, setDocuments] = useState<IDocumentCompany[] | IFile[]>();
  const [isShowBtnApprove, setIsChowBtnApprove] = useState<boolean>(false);
  const [isDisableApprove, setIsDisableApprove] = useState<boolean>(true);
  const [isShowBtnReject, setIsChowBtnReject] = useState<boolean>(false);
  const [isDisableReject, setDisableReject] = useState<boolean>(true);

  const [statusConfirm, setStatusConfirm] = useState<number>();
  const [textApprove, setTextApprove] = useState<string>(CONST_LIST_COMPANY.BTN_ROLLBACK_ACCOUNT);
  const [lastAgreedRegulations, setLastAgreedRegulations] = useState<string>();

  const getLastAgreedRegulations = useCallback(async () => {
    if (company?.id) {
      const response = await apiGetLastAgreedRegulations(SettingRegulationsEnum.TYPE_OPERATOR_COMPANY, company?.id);
      if (responseSuccess(response)) {
        setLastAgreedRegulations(response?.data?.regulations);
      }
    }
  }, [company?.id]);

  useEffect(() => {
    if (company?.documents) {
      setDocuments(company.documents);
      getLastAgreedRegulations();
    } else {
      setDocuments([]);
    }
    return () => {
      setDocuments([]);
      setTextApprove(CONST_LIST_COMPANY.BTN_ROLLBACK_ACCOUNT);
    };
  }, [company, getLastAgreedRegulations]);

  useEffect(() => {
    if (documents) {
      const _documents = [...documents];
      let statusArr: number[] = [];
      _documents.forEach((item: IDocumentCompany) => {
        if (item?.status) {
          statusArr = [...statusArr, item.status];
        }
      });
      if (
        (statusArr.includes(EStatusFile.UN_TICKED) ||
          statusArr.includes(EStatusFile.REJECT_DRAFT) ||
          statusArr.includes(EStatusFile.TICKED_DRAFT) ||
          statusArr.includes(EStatusFile.REJECT)) &&
        company?.status !== EStatusCompany.STATUS_REJECT
      ) {
        setIsChowBtnApprove(true);
      } else {
        setIsChowBtnApprove(false);
      }
      if (statusArr.includes(EStatusFile.REJECT_DRAFT)) {
        setIsChowBtnReject(true);
      } else {
        setIsChowBtnReject(false);
      }

      if (statusArr?.length) {
        const _statusArr = Array.from(new Set(statusArr));
        if (
          _statusArr.length === 1 &&
          (_statusArr[0] === EStatusFile.TICKED || _statusArr[0] === EStatusFile.TICKED_DRAFT)
        ) {
          setTextApprove(CONST_LIST_COMPANY.BTN_APPROVED_DUCUMENT);
        }
      }
      if (statusArr.includes(EStatusFile.REJECT_DRAFT)) {
        setTextApprove(CONST_LIST_COMPANY.BTN_ROLLBACK_ACCOUNT);
      }
      if (statusArr.includes(EStatusFile.REJECT)) {
        setTextApprove(CONST_LIST_COMPANY.RE_REQUESTING);
      }

      if (statusArr.includes(EStatusFile.UN_TICKED)) {
        setIsDisableApprove(true);
        setTextApprove(CONST_LIST_COMPANY.BTN_APPROVED_DUCUMENT);
        setDisableReject(true);
      } else {
        setIsDisableApprove(statusArr.includes(EStatusFile.REJECT) ? true : false);
        setDisableReject(false);
      }
    }
  }, [company?.status, documents]);

  const confirmOperatorDocument = (status: number) => {
    setStatusConfirm(status);
    onConfirmOperatorDocument({
      company_id: company?.id,
      user_id: company?.user_root.id,
      status: status,
      documents,
    });
  };

  const updateDocument = (document: IDocumentCompany) => {
    if (documents) {
      const _documents = documents.map((item: IDocumentCompany) => {
        if (document.id === item.id) {
          return { ...item, status: document.status, note: document.note };
        }
        return { ...item };
      });

      setDocuments(_documents);
    }
  };

  return (
    <DetailOperatorWrapper>
      <BreadCrumb breads={BREADS} />
      {company && (
        <Container>
          <CompanyCard>
            <div>
              <TitleDetailCompanyWrapper>
                <SpaceBase width={1} />
                <img src={images.sideBar.agencySidebar} alt="" />
                <Tooltip placement="bottomLeft" title={company.name}>
                  <RowCenter>
                    <CompanyNameDetail>{company.name}</CompanyNameDetail>
                    {company.status === EStatusCompany.STATUS_NOTVNVERIFY && <UnderView>{'審査中'}</UnderView>}
                  </RowCenter>
                </Tooltip>
              </TitleDetailCompanyWrapper>

              <SpaceBase height={1} />

              <CardItem lineBottom={true} paddingHoz="0.625rem 0">
                <div>{CONST_LIST_COMPANY.COMPANY_NAME}</div>
                <ElementCard>{company.name}</ElementCard>
                <ElementCard width="17rem">{CONST_LIST_COMPANY.COMPANY_CODE}</ElementCard>
                <ElementCard>{company.code}</ElementCard>
              </CardItem>

              <CardItem paddingHoz="0.625rem 0">
                <div>{CONST_CREATE_COMPANY.POSTAL_CODE}</div>
                <ElementCard>
                  {company?.postal_code && (
                    <>
                      {company.postal_code?.slice(0, 3)} - {company.postal_code?.slice(3, 7)}
                    </>
                  )}
                </ElementCard>
              </CardItem>

              <CardItem paddingHoz="0.75rem 0">
                <div>{CONST_CREATE_COMPANY.ADDRESS_FIRST}</div>
                <ElementCard>{company.address1}</ElementCard>
                <ElementCard width="17rem">{CONST_CREATE_COMPANY.ADDRESS_SECOND}</ElementCard>
                <ElementCard>{company.address2}</ElementCard>
              </CardItem>

              <CardItem lineBottom={true} paddingHoz="0.625rem 0">
                <div>{CONST_LIST_COMPANY.REPRESENTATIVE_NAME}</div>
                <ElementCard>{company?.user_root?.full_name}</ElementCard>
                <ElementCard width="17rem">{CONST_CREATE_COMPANY.OPERATOR_ID}</ElementCard>
                <ElementCard>{company?.user_root?.code}</ElementCard>
              </CardItem>

              <CardItem lineBottom={true} paddingHoz="0.625rem 0">
                <div>{CONST_CREATE_COMPANY.FEE_FREE_DATE}</div>
                <ElementCard width={'67.875rem'}>
                  {company?.free_start_date ? formatDateJP(dayjs(company.free_start_date).format('YYYY-MM-DD')) : ''}
                  <span className="space">{(company?.free_start_date || company?.free_end_date) && '〜'}</span>
                  {company?.free_end_date ? formatDateJP(dayjs(company.free_end_date).format('YYYY-MM-DD')) : ''}
                </ElementCard>
              </CardItem>

              <CardItem lineBottom={true} paddingHoz="0.625rem 0">
                <div>{CONST_LIST_COMPANY.PHONE_NUMBER}</div>
                <ElementCard>{stringToPhoneView(company?.user_root?.phone)}</ElementCard>
                <ElementCard width="17rem">{CONST_LIST_COMPANY.EMAIL_ADDRESS}</ElementCard>
                <ElementCard>{company?.user_root?.email}</ElementCard>
              </CardItem>

              <CardItem lineBottom={true} paddingHoz="0.625rem 0">
                <div>{CONST_CREATE_COMPANY.FEE}</div>
                <ElementCard>
                  {company.fee}
                  <span className="company-fee">{company.fee ? '円' : ''}</span>
                </ElementCard>
              </CardItem>

              <CardItem lineBottom={true} paddingHoz="0.625rem 0">
                <div>{CONST_LIST_COMPANY.USAGE_PLAN}</div>
                <ElementCard>{USAGE_PLAN[company.usage_plan - 1].label}</ElementCard>
                <ElementCard width="17rem">{CONST_LIST_COMPANY.REGISTRATION_STATUS}</ElementCard>
                <ElementCard>{COMPANY_STATUS[company?.status || EStatusCompany.STATUS_NOTVNVERIFY]}</ElementCard>
              </CardItem>

              <CardItem paddingHoz="0.625rem 0">
                <div>{CONST_CREATE_COMPANY.AGENCY_CODE}</div>
                <ElementCard>
                  {company?.agency?.name || company?.agency?.user_root?.full_name}
                  {company?.agency?.code && ` (${company?.agency?.code})`}
                </ElementCard>
                <ElementCard width="17rem">{CONST_LIST_COMPANY.AGENCY_FEE}</ElementCard>
                <ElementCard>
                  {company.agency_fee || company.agency_fee === 0
                    ? `${company.agency_fee}${CONST_LIST_COMPANY.YEN}`
                    : ''}
                </ElementCard>
              </CardItem>

              <BtnVerificationWrapper>
                <BtnVerification onClick={() => setIsEdit(true)}>{CONST_LIST_AGENCY.EDIT}</BtnVerification>
                <DeleteDetailBtn onClick={onDeleteCompany}>{CONST_LIST_AGENCY.DELETE}</DeleteDetailBtn>
              </BtnVerificationWrapper>

              <SpaceBase height={1} />
              <TitleWrapper>
                <div>{CONST_LIST_COMPANY.DOCUMENTS}</div>
                <div />
              </TitleWrapper>
              <SpaceBase height={1} />
              <WrapperFile>
                <DefaultFileItem
                  documentsDefault={documentsDefault}
                  company={company}
                  documents={documents}
                  lastAgreedRegulations={lastAgreedRegulations}
                />
                {documents?.map((element: IFile) => {
                  return (
                    <React.Fragment key={String(element.id)}>
                      <FileItem
                        name={element.name}
                        status={element.status}
                        link={element.link}
                        documentId={element.id}
                        note={element?.note}
                        notShowBtn={!isShowBtnApprove && !isShowBtnReject}
                        onUpdateDocument={updateDocument}
                      />
                    </React.Fragment>
                  );
                })}
              </WrapperFile>
            </div>

            <BtnFileCompanyVerificationWrapper>
              {isShowBtnApprove && (
                <BtnSubmitFile
                  disabled={isDisableApprove || isLoadingOperatorConfirmDocument}
                  loading={isLoadingOperatorConfirmDocument && statusConfirm === EStatusFileConfirm.APPROVE}
                  onClick={() => confirmOperatorDocument(EStatusFileConfirm.APPROVE)}
                >
                  <div className="icon rollback">
                    <IconFile width={'3.625rem'} height={'3.625rem'} bgColor={'#B3B3B3'} />
                  </div>
                  {textApprove}
                </BtnSubmitFile>
              )}
              {isShowBtnReject && isShowBtnApprove && <SpaceBase width={6.25} />}
              {isShowBtnReject && (
                <BtnSubmitFile
                  className="reject"
                  onClick={() => confirmOperatorDocument(EStatusFileConfirm.REJECT)}
                  disabled={isDisableReject || isLoadingOperatorConfirmDocument}
                  loading={isLoadingOperatorConfirmDocument && statusConfirm === EStatusFileConfirm.REJECT}
                >
                  <div className="icon">
                    <img src={images.common.iconClose} alt={images.common.iconClose} />
                  </div>
                  {CONST_LIST_COMPANY.BTN_REJECT_ACCOUNT}
                </BtnSubmitFile>
              )}
            </BtnFileCompanyVerificationWrapper>
            {company?.updated_at && (
              <StatusUpdate>
                {CONST_LIST_AGENCY.LAST_UPDATE} : {formatStrDateTimezone(company.updated_at)} [
                <NameWrapper>{company?.updated_by?.full_name}</NameWrapper>]
              </StatusUpdate>
            )}
          </CompanyCard>
        </Container>
      )}
    </DetailOperatorWrapper>
  );
};
