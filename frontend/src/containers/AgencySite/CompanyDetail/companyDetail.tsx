import React from 'react';
import { Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { SpaceBase } from 'styles';
import images from '@assets/images-base';

import { ICompanyStatisticalDate, IDetailCompany, IListCompany } from '@pages/AgencySite/Companies/interface';

import { DetailWrapperSilder, GrantCard } from '@components/Style/Style';
import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import Loading from '@components/Loading';

import { CONST_BREADS, CONST_COMMON, LANGUAGE_AGENCY_COMPANY_LIST, CONST_AGENCY_SITE } from 'constants/language';
import {
  AvatarCompany,
  ContainerAgency,
  ContainerDetail,
  RowCard,
  RowCardDate,
  RowDate,
  StatusUpdate,
  TitleCard,
  TitleDetailWrapper,
} from './companyDetailStyle';
import { COMPANY_STATUS } from 'constants/company';
import { EStatusCompany, USAGE_PLAN } from 'constants/constants';
import { formatDateJP, formatStrDateTimezone } from 'helper/date';
import { NameWrapper } from '@containers/OperatorSite/Agency/DetailAgency/detailAgencyStyle';
import DatePickerCustom from '@components/CompanySite/AttendanceRecord/DatePickerCustom/DatePickerCustom';
import { formatMoneyNumber } from 'helper/formatMoney';

const BREADS: IBread[] = [
  {
    name: CONST_BREADS.LIST_OF_INTRODUCED_COMPANIES,
    path: '/companies',
  },
];

const CompanyDetail = ({
  company,
  isLoadingDetailCompany,
  isLoadingCompanyStatisticalDate,
  detailCompany,
  onChangeDate,
  dateSearch,
  companyStatisticalDate,
}: {
  company: IListCompany | null;
  isLoadingDetailCompany: boolean;
  isLoadingCompanyStatisticalDate: boolean;
  detailCompany: IDetailCompany | null;
  onChangeDate: any;
  companyStatisticalDate: ICompanyStatisticalDate | null;
  dateSearch?: Dayjs;
}) => {
  return (
    <DetailWrapperSilder>
      <BreadCrumb breads={BREADS} />
      {company && (
        <ContainerAgency>
          <GrantCard marginTop="1rem" padding="1.313rem 1.875rem 2.063rem 1.875rem">
            <div>
              <TitleDetailWrapper>
                <SpaceBase width={1} />
                <AvatarCompany src={images.agencySite.user} alt="avata-company-detail" />
                <Tooltip placement="bottomLeft" title={company.name}>
                  <div className="full_name">{company.name}</div>
                </Tooltip>
              </TitleDetailWrapper>
              <ContainerDetail>
                <TitleCard marginTop={1.5}>{CONST_AGENCY_SITE.BASIC_INFORMATION}</TitleCard>
                {!isLoadingDetailCompany && detailCompany && (
                  <>
                    <RowCard>
                      <div>{LANGUAGE_AGENCY_COMPANY_LIST.ENTERPRISE_ID}</div>
                      <div>{detailCompany.code}</div>
                    </RowCard>
                    <RowCard>
                      <div>{LANGUAGE_AGENCY_COMPANY_LIST.REPRESENTATIVE_NAME}</div>
                      <div>{detailCompany.user_root.full_name}</div>
                    </RowCard>
                    <RowCard>
                      <div>{LANGUAGE_AGENCY_COMPANY_LIST.USAGE_SITUATION}</div>
                      <div>{COMPANY_STATUS[detailCompany?.status || EStatusCompany.STATUS_NOTVNVERIFY]}</div>
                    </RowCard>
                    <RowCard>
                      <div>{LANGUAGE_AGENCY_COMPANY_LIST.USAGE_PLAN}</div>
                      <div>{USAGE_PLAN[detailCompany.usage_plan - 1].label}</div>
                    </RowCard>
                    <RowCard>
                      <div>{LANGUAGE_AGENCY_COMPANY_LIST.BROKERAGE_FEE_TOTAL}</div>
                      <div>
                        {detailCompany?.agency_fee || detailCompany?.agency_fee === 0
                          ? `${detailCompany?.agency_fee}円`
                          : ''}
                      </div>
                    </RowCard>
                  </>
                )}
                {isLoadingDetailCompany && <Loading />}
              </ContainerDetail>
              <ContainerDetail>
                <TitleCard marginTop={2.25}>{LANGUAGE_AGENCY_COMPANY_LIST.PREPAID_USAGE_INFORMATION}</TitleCard>
                <RowDate>
                  <DatePickerCustom
                    onChangeMonth={onChangeDate}
                    month={dateSearch}
                    normalPicker={false}
                    isHasBtnChange={false}
                    placeholder={LANGUAGE_AGENCY_COMPANY_LIST.CLICK_TO_SELECT_DATE}
                  />
                  {formatDateJP(dateSearch ? dateSearch.format('YYYY-MM') : dayjs().format('YYYY-MM'), false)}
                  {LANGUAGE_AGENCY_COMPANY_LIST.SHOWING_CONFIRMED_INFORMATION_IN}
                </RowDate>

                {!isLoadingCompanyStatisticalDate && (
                  <>
                    <RowCardDate>
                      <div>{LANGUAGE_AGENCY_COMPANY_LIST.NUMBER_OF_ADVANCE_PAYMENTS}</div>
                      <div>
                        {companyStatisticalDate?.total_request || 0} <span>件</span>
                      </div>
                    </RowCardDate>
                    <RowCardDate>
                      <div>{LANGUAGE_AGENCY_COMPANY_LIST.USAGE_AMOUNT}</div>
                      <div>
                        {formatMoneyNumber(companyStatisticalDate?.total_salary || 0)}
                        <span>{CONST_COMMON.YEN}</span>
                      </div>
                    </RowCardDate>
                    <RowCardDate>
                      <div>{LANGUAGE_AGENCY_COMPANY_LIST.BROKERAGE_FEE}</div>
                      <div>
                        {formatMoneyNumber(companyStatisticalDate?.total_agency_tip || 0)}
                        <span>{CONST_COMMON.YEN}</span>
                      </div>
                    </RowCardDate>
                  </>
                )}
                {isLoadingCompanyStatisticalDate && <Loading />}
              </ContainerDetail>
            </div>
            {detailCompany && (
              <StatusUpdate>
                {CONST_COMMON.FINAL_UPDATE} : {formatStrDateTimezone(detailCompany.updated_at)} [
                <NameWrapper>{detailCompany.updated_by.full_name}</NameWrapper>]
              </StatusUpdate>
            )}
          </GrantCard>
        </ContainerAgency>
      )}
    </DetailWrapperSilder>
  );
};

export default CompanyDetail;
