import React from 'react';

import { ElementCard } from '@containers/OperatorSite/Operator/DetailOperator/detailOperatorStyle';

import { USAGE_PLAN } from 'constants/constants';
import { ICompany, IFile } from 'constants/operatorSite';
import { CardItem, SpaceBase } from 'styles';
import { CONST_LIST_COMPANY, CONST_CREATE_COMPANY } from 'constants/language';
import { stringToPhoneView, phoneStringToNumber } from 'helper/formatPhone';
import { BrokeragFeeLabel, TitleWrapper, WrapperBrokeragEFee, WrapperFile } from './CompanyStyle';
import { FileItem } from '@containers/OperatorSite/Company/DetailCompany/FileItem/FileItem';
import { formatDateJP } from 'helper/date';

interface IConfirmCreate {
  companyData: ICompany;
  agency: string;
  files: IFile[];
}
const ConfirmCreate = ({ companyData, agency, files }: IConfirmCreate) => {
  return (
    <>
      <CardItem lineBottom={true} paddingHoz="0.75rem 0">
        <div>{CONST_LIST_COMPANY.COMPANY_NAME}</div>
        <ElementCard>{companyData.companyName}</ElementCard>
      </CardItem>

      <CardItem paddingHoz="0.75rem 0">
        <div>{CONST_CREATE_COMPANY.POSTAL_CODE}</div>
        <ElementCard>{`${
          companyData.postalCodeFirst && `${companyData.postalCodeFirst} - ${companyData.postalCodeEnd}`
        }`}</ElementCard>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.75rem 0">
        <div>{CONST_CREATE_COMPANY.ADDRESS_FIRST}</div>
        <ElementCard>{companyData.address1}</ElementCard>
        <ElementCard width="14rem">{CONST_CREATE_COMPANY.ADDRESS_SECOND}</ElementCard>
        <ElementCard>{companyData.address2}</ElementCard>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.75rem 0">
        <div>{CONST_LIST_COMPANY.REPRESENTATIVE_NAME}</div>
        <ElementCard>{companyData.fullName}</ElementCard>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.75rem 0">
        <div>{CONST_LIST_COMPANY.PHONE_NUMBER}</div>
        <ElementCard>{stringToPhoneView(phoneStringToNumber(companyData.phoneNumber))}</ElementCard>
        <ElementCard width="14rem">{CONST_LIST_COMPANY.EMAIL_ADDRESS}</ElementCard>
        <ElementCard>{companyData.email}</ElementCard>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.75rem 0">
        <div>{CONST_CREATE_COMPANY.FEE_FREE_DATE}</div>
        <ElementCard width={'67.875rem'}>
          {companyData?.freeStartDate ? formatDateJP(companyData.freeStartDate.format('YYYY-MM-DD')) : ''}
          <span className="space">{(companyData?.freeStartDate || companyData?.freeEndDate) && '〜'}</span>
          {companyData?.freeEndDate ? formatDateJP(companyData.freeEndDate.format('YYYY-MM-DD')) : ''}
        </ElementCard>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.75rem 0">
        <div>{CONST_LIST_COMPANY.USAGE_PLAN}</div>
        <ElementCard>{USAGE_PLAN[Number(companyData.deposit) - 1].label}</ElementCard>
        <ElementCard width="14rem">{CONST_CREATE_COMPANY.USAGE_SITUATION}</ElementCard>
        <ElementCard>{CONST_CREATE_COMPANY.UNDER_REVIEW}</ElementCard>
      </CardItem>

      <CardItem lineBottom={true} paddingHoz="0.75rem 0">
        <div>{CONST_CREATE_COMPANY.FEE}</div>
        <ElementCard>
          {companyData.fee}
          <span className='company-fee'>{companyData.fee ? '円' : ''}</span>
        </ElementCard>
      </CardItem>

      <CardItem paddingHoz="0.75rem 0">
        <div>{CONST_LIST_COMPANY.AGENCY_CODE}</div>
        <ElementCard>
          {agency}
          {agency && `(${companyData.agencyCode})`}
        </ElementCard>
        <ElementCard width="14rem">
          <WrapperBrokeragEFee>
            <BrokeragFeeLabel>{CONST_CREATE_COMPANY.BROKERAGE__FEE_TOP}</BrokeragFeeLabel>
            <div>{CONST_CREATE_COMPANY.BROKERAGE__PRE_CASE}</div>
          </WrapperBrokeragEFee>
        </ElementCard>
        <ElementCard>{companyData.brokerageFee && `${companyData.brokerageFee}${CONST_LIST_COMPANY.YEN}`}</ElementCard>
      </CardItem>

      <TitleWrapper>
        <div>{CONST_LIST_COMPANY.DOCUMENTS}</div>
        <div />
      </TitleWrapper>
      <SpaceBase height={1} />
      <WrapperFile>
        {files?.map((element: IFile) => {
          const dataFile: any = document?.getElementById(`element_${element.id}`);
          return (
            <React.Fragment key={element.id}>
              <FileItem
                name={dataFile?.value || ''}
                status={element.status}
                fromConfirm={true}
                documentId={element.id}
              />
            </React.Fragment>
          );
        })}
      </WrapperFile>
    </>
  );
};

export default ConfirmCreate;
