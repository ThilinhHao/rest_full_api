import { Container, GrantCard } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import React from 'react';
import { BtnCreateWrapper, ItemIcon } from '../DetailStaff/detailStaffStyle';
import {
  FormRow,
  TitleRow,
  ViewFormBase,
  DetailWrapper,
  TitlePageWrapper,
  PrefixIcon,
  BtnWrapper,
  BtnActionWrapper,
} from '@components/CompanySite/common/styled';
import images from '@assets/images-base';
import { MenuItemIcon } from '@components/layout/SideBar/sideBarStyle';
import { CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT } from 'constants/language';
import { ButtonBanner, ButtonGroup, DownloadIcon, FormRowAction, IconBanner, WarningNote } from './viewStaffStyle';
import {
  ICompanyStaffBasicInformation,
  ICompanyStaffDetailInformation,
} from '@pages/CompanySite/StaffManagement/useStaffManagement';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import { ECompanyStaffSalaryType, ECompanyStaffStatusType, STATUS_STAFF_ALLOW_DELETE_ARRAY } from 'constants/constants';
import { colors } from 'constants/colorsBase';
import useViewStaff from './useViewStaff';
import { formatPrice } from 'helper/formatPrice';
import Loading from '@components/Loading';
import { ViewFormScroll } from '@components/CompanySite/common/ViewFormScroll/styled';
import { getTextStatusStaff } from 'helper/getBackgroupItemStaff';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import ModalCommon from '@components/Modal/ModalCommon';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { ModalContent } from '@containers/CompanySite/AdminAccount/ViewAdminAccount/viewAdminAccountStyle';
import { Button } from 'antd';

interface IViewStaffProps {
  staff: ICompanyStaffDetailInformation | null;
  isLoading: boolean;
  setSelected: React.Dispatch<React.SetStateAction<ICompanyStaffBasicInformation | null>>;
  setDetailStaff: React.Dispatch<React.SetStateAction<ICompanyStaffDetailInformation | null>>;
  setStatePage: React.Dispatch<React.SetStateAction<number>>;
  getListStaff: () => Promise<void>;
}

export const ViewStaff = ({
  staff,
  isLoading,
  setSelected,
  setStatePage,
  setDetailStaff,
  getListStaff,
}: IViewStaffProps) => {
  const {
    BREADS,
    isShowedBasicInfor,
    setIsShowedBasicInfor,
    isShowedAccountInfor,
    setIsShowedAccountInfor,
    isShowedConsentForm,
    setIsShowedConsentForm,
    showPopupConfirmBack,
    navigateToUpdate,
    previewRegulations,
    toHistory,
    toAttendance,
    userRegulations,
    downloadRegulations,
    isLoadingDownloadRegulations,
    isOpenModalConfirm,
    setIsOpenModalConfirm,
    isOpenModalSuccess,
    setIsOpenModalSuccess,
    isLoadingDelete,
    deleteStaff,
    successDelete,
  } = useViewStaff(staff, setStatePage, setDetailStaff, setSelected, getListStaff);

  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);
  const isOwner = !(companyIdLeague && companyIdLeague !== authInfo?.company?.id);

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} onClickHome={() => showPopupConfirmBack(true)} onClickPath={showPopupConfirmBack} />

      {!!staff?.id && (
        <Container>
          <GrantCard padding="1.25rem 0" percentWidth="100%" width={86.875} justifyContent={'flex-start'}>
            <div>
              <TitlePageWrapper>
                <PrefixIcon src={images.companySite.account} alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.STAFF} />
                <div>{CONST_COMPANY_STAFF_MANAGEMENT.STAFF_INFORMATION}</div>
                {staff?.status === ECompanyStaffStatusType.NOT_ACCESS ||
                  (staff?.status === ECompanyStaffStatusType.STAFF_WAITING_APPROVE && (
                    <WarningNote>
                      <img src={images.companySite.warningBrightRed} alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.WARNING} />
                      {CONST_COMPANY_STAFF_MANAGEMENT.NOT_ACCESS_OR_WARNING_FOR_COOPERATION}
                    </WarningNote>
                  ))}
              </TitlePageWrapper>
            </div>

            {isLoading && <Loading />}

            {!isLoading && (
              <ViewFormBase>
                <ViewFormScroll isShowed={isShowedBasicInfor}>
                  <TitleRow>
                    <span>{CONST_COMPANY_STAFF_MANAGEMENT.BASIC_INFORMATION}</span>
                    <MenuItemIcon
                      width="1.875rem"
                      height="1.875rem"
                      boxShadow="true"
                      src={isShowedBasicInfor ? images.companySite.iconHide : images.companySite.iconShow}
                      alt={isShowedBasicInfor ? 'hide' : 'show'}
                      onClick={() => setIsShowedBasicInfor(!isShowedBasicInfor)}
                    />
                  </TitleRow>
                  <FormRow className={isShowedBasicInfor ? 'rowVisible' : 'rowHidden'}>
                    <div>
                      <span>{CONST_COMPANY_STAFF_MANAGEMENT.ID_STAFF}</span>
                      <span>{staff?.code}</span>
                    </div>
                    <div>
                      <span>{CONST_COMMON.FULL_NAME}</span>
                      <span>{staff.name}</span>
                    </div>
                    <div>
                      <span>{CONST_COMMON.FULL_NAME_FURIGANA}</span>
                      <span>{staff.name_kana}</span>
                    </div>
                    <div>
                      <span>{CONST_COMMON.PHONE_NUMBER}</span>
                      <span>{staff.phone}</span>
                    </div>
                    <div>
                      <span>{CONST_COMMON.EMAIL}</span>
                      <span>{staff.email}</span>
                    </div>
                    <div>
                      <span>{CONST_COMPANY_STAFF_MANAGEMENT.SALARY_FORM}</span>
                      <span>
                        {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
                          ? CONST_COMPANY_STAFF_MANAGEMENT.DAILY_SALARY
                          : CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_SALARY}
                      </span>
                    </div>
                    <div>
                      <span>{CONST_COMPANY_STAFF_MANAGEMENT.INDIVIDUAL_SETTING}</span>
                      <span>
                        {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
                          ? CONST_COMPANY_STAFF_MANAGEMENT.DAY_TIME_APPLICATION_LIMIT
                          : CONST_COMPANY_STAFF_MANAGEMENT.DAYILY_TIME_APPLICATION_LIMIT}
                        &emsp;
                        {!!staff?.is_setting_limit_1
                          ? formatPrice(
                              staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
                                ? staff?.amount_limit_1
                                : staff?.amount_limit_2,
                              '円'
                            )
                          : ''}
                      </span>
                    </div>
                    <div>
                      <span>&emsp;</span>
                      <span>
                        {staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
                          ? CONST_COMPANY_STAFF_MANAGEMENT.NIGHT_TIME_APPLICATION_LIMIT
                          : CONST_COMPANY_STAFF_MANAGEMENT.MONTHLY_TIME_APPLICATION_LIMIT}
                        &emsp;
                        {!!staff?.is_setting_limit_2
                          ? formatPrice(
                              staff.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
                                ? staff?.amount_limit_2
                                : staff?.amount_limit_1,
                              '円'
                            )
                          : ''}
                      </span>
                    </div>
                    <div>
                      <span>{CONST_COMPANY_STAFF_MANAGEMENT.USEAGE_START_DATE}</span>
                      <span>{staff.login_first_time}</span>
                    </div>
                    <div>
                      <span>{CONST_COMPANY_STAFF_MANAGEMENT.USEAGE_STATUS}</span>
                      <span>{getTextStatusStaff(staff?.status)}</span>
                    </div>
                  </FormRow>
                </ViewFormScroll>
                {isOwner && (
                  <>
                    <ViewFormScroll isShowed={isShowedAccountInfor}>
                      <TitleRow>
                        <span>{CONST_COMPANY_STAFF_MANAGEMENT.ACCOUNT_INFORMATION}</span>
                        <MenuItemIcon
                          width="1.875rem"
                          height="1.875rem"
                          boxShadow="true"
                          src={isShowedAccountInfor ? images.companySite.iconHide : images.companySite.iconShow}
                          alt={isShowedAccountInfor ? 'hide' : 'show'}
                          onClick={() => setIsShowedAccountInfor(!isShowedAccountInfor)}
                        />
                      </TitleRow>
                      <FormRow className={isShowedAccountInfor ? 'rowVisible' : 'rowHidden'}>
                        <div>
                          <span>{CONST_COMMON.NAME_KANA}</span>
                          <span>{staff?.account_name}</span>
                        </div>
                        <div>
                          <span>{CONST_COMMON.BANK_NAME_CODE}</span>
                          <span>{staff?.bank_code}</span>
                        </div>
                        <div>
                          <span>{CONST_COMMON.BRANCH_NAME_CODE}</span>
                          <span>{staff?.bank_branches_code}</span>
                        </div>
                        <div>
                          <span>{CONST_COMMON.ACCOUNT_TYPE}</span>
                          <span>{staff?.bank_type}</span>
                        </div>
                        <div>
                          <span>{CONST_COMMON.ACCOUNT_NUMBER}</span>
                          <span>{staff?.account_number}</span>
                        </div>
                        <BtnWrapper paddingTop={'5rem'}>
                          <BtnActionWrapper onClick={() => navigateToUpdate(staff)}>
                            {CONST_COMMON.EDIT}
                          </BtnActionWrapper>
                          {STATUS_STAFF_ALLOW_DELETE_ARRAY.includes(staff.status) && (
                            <BtnActionWrapper
                              background={colors.white}
                              color={colors.crimson}
                              borderColor={colors.atomicTangerine}
                              onClick={() => setIsOpenModalConfirm(true)}
                            >
                              {CONST_COMMON.DELETE_INVITE}
                            </BtnActionWrapper>
                          )}
                        </BtnWrapper>
                      </FormRow>
                    </ViewFormScroll>
                    <ViewFormScroll isShowed={isShowedConsentForm} padding={'0.938rem 11.25rem 2.5rem 11.25rem'}>
                      <TitleRow>
                        <span>{CONST_COMPANY_STAFF_MANAGEMENT.CONSENT_FORM}</span>
                        <MenuItemIcon
                          width="1.875rem"
                          height="1.875rem"
                          boxShadow="true"
                          src={isShowedConsentForm ? images.companySite.iconHide : images.companySite.iconShow}
                          alt={isShowedConsentForm ? 'hide' : 'show'}
                          onClick={() => setIsShowedConsentForm(!isShowedConsentForm)}
                        />
                      </TitleRow>
                      <FormRowAction
                        className={isShowedConsentForm ? 'rowVisible' : 'rowHidden'}
                        padding={'1.875rem 0 2.5rem 3.125rem'}
                      >
                        <BtnCreateWrapper
                          icon={<ItemIcon src={images.companySite.iconForm} alt={''} />}
                          onClick={previewRegulations}
                          disabled={!userRegulations?.regulations}
                        >
                          {CONST_COMPANY_STAFF_MANAGEMENT.CONSENT_FORM_CONFIRMATION}
                        </BtnCreateWrapper>
                        <DownloadIcon
                          className="icon"
                          src={images.companySite.downloadPrivacyPolicy}
                          alt=""
                          onClick={downloadRegulations}
                          waiting={isLoadingDownloadRegulations}
                        />
                      </FormRowAction>
                    </ViewFormScroll>
                    <ViewFormScroll isShowed={true} padding={'0.938rem 11.25rem 2.5rem 11.25rem'}>
                      <FormRow className="rowVisible" padding={'1.875rem 0 2.5rem 3.125rem'}>
                        <ButtonGroup>
                          <ButtonBanner onClick={() => toHistory(staff.id)}>
                            <IconBanner src={images.companySite.timeHistory} alt={''} />
                            {CONST_COMPANY_STAFF_MANAGEMENT.PREPAYMENT_HISTORY}
                          </ButtonBanner>
                          <ButtonBanner
                            onClick={() => toAttendance(staff.id)}
                            background={colors.btnRadialGradientRightCompanySite}
                          >
                            <IconBanner src={images.companySite.attdendanceRecord} alt={''} />
                            {CONST_COMPANY_STAFF_MANAGEMENT.ATTDENDANCE_RECORD}
                          </ButtonBanner>
                        </ButtonGroup>
                      </FormRow>
                    </ViewFormScroll>
                  </>
                )}
              </ViewFormBase>
            )}
          </GrantCard>
          <ModalCommon
            isOpen={isOpenModalConfirm}
            setIsOpen={() => setIsOpenModalConfirm(false)}
            onClickCancel={() => setIsOpenModalConfirm(false)}
            isShowBtnOk={false}
            isShowBtnCancel={false}
            _className="confirm-company-pair"
          >
            <ModalContainer>
              <ModalContent>
                <div className="content">
                  <span>{staff.name}</span>
                  <span>{CONST_COMPANY_STAFF_MANAGEMENT.CONFIRM_DELETE}</span>
                </div>
                <div className="button">
                  <Button className="delete" onClick={deleteStaff} loading={isLoadingDelete}>
                    {CONST_COMMON.DELETE_INVITE}
                  </Button>
                  <Button className="cancel" disabled={isLoadingDelete} onClick={() => setIsOpenModalConfirm(false)}>
                    {CONST_COMMON.CANCEL}
                  </Button>
                </div>
              </ModalContent>
            </ModalContainer>
          </ModalCommon>
          <ModalCommon
            isOpen={isOpenModalSuccess}
            setIsOpen={() => setIsOpenModalSuccess(false)}
            onClickCancel={successDelete}
            onCancel={successDelete}
            isShowBtnOk={false}
            isShowBtnCancel={false}
            _className="confirm-company-pair"
          >
            <ModalContainer>
              <ModalContent>
                <div className="content">
                  <span>{staff.name}</span>
                  <span>{CONST_COMPANY_STAFF_MANAGEMENT.DELETED}</span>
                </div>
                <div className="button">
                  <Button className="success" onClick={successDelete}>
                    {CONST_COMMON.VERIFY}
                  </Button>
                </div>
              </ModalContent>
            </ModalContainer>
          </ModalCommon>
        </Container>
      )}
    </DetailWrapper>
  );
};
