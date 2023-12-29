import React from 'react';

import images from '@assets/images-base';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import useDetailStaff from './useDetailStaff';

import {
  BtnCancelWrapper,
  BtnCreateWrapper,
  Buttons,
  ContentAlert,
  DetailWrapper,
  ModalContent,
  PrefixIcon,
  TitlePageWrapper,
  TitleWrapper,
} from './detailStaffStyle';
import { Container, GrantCard } from '@components/Style/Style';
import { CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT } from 'constants/language';
import { ICompanyStaffDetailInformation } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { ViewFormBase } from '@components/CompanySite/common/styled';
import { PrefixIconBtn } from '../SideBarStaff/sideBarStaffStyle';
import ModalCommon from '@components/Modal/ModalCommon';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { colors } from 'constants/colorsBase';

interface IStaffOutProps {
  id?: number;
  staff: ICompanyStaffDetailInformation | null;
  handleSubmitForm?: any;
  setStatePage: React.Dispatch<React.SetStateAction<number>>;
  getListStaff?: () => Promise<void>;
  setDetailStaff: React.Dispatch<React.SetStateAction<ICompanyStaffDetailInformation | null>>;
}

export const StaffOut = ({
  id,
  staff,
  handleSubmitForm,
  setStatePage,
  getListStaff,
  setDetailStaff,
}: IStaffOutProps) => {
  const {
    BREADS,
    navigate,
    isLoadingInviteStaff,
    isLoadingDeleteB2C,
    inviteStaffAgain,
    deleteLinkB2C,
    isOpenModal,
    setIsOpenModal,
    newStaff,
    hanldeInviteAgainSuccess,
  } = useDetailStaff(staff, setStatePage, id, handleSubmitForm, getListStaff, setDetailStaff);

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} onClickHome={() => navigate('/')} onClickPath={() => navigate('/')} />
      <Container>
        <GrantCard padding="1.25rem 0" percentWidth="100%" width={86.875} justifyContent="flex-start">
          <div>
            <TitlePageWrapper>
              <TitleWrapper>
                <PrefixIcon
                  src={images.companySite.createStaff}
                  alt={CONST_COMPANY_STAFF_MANAGEMENT.ALT.CREATE_ONE_STAFF}
                />
                <div>{CONST_COMPANY_STAFF_MANAGEMENT.STAFF_INFORMATION}</div>
              </TitleWrapper>
            </TitlePageWrapper>
          </div>
          <ViewFormBase>
            <ContentAlert>
              <div>
                ＜{staff?.email}＞{CONST_COMPANY_STAFF_MANAGEMENT.TO}
              </div>
              <div>{CONST_COMPANY_STAFF_MANAGEMENT.REJECT_INVITE}</div>
            </ContentAlert>
            <Buttons>
              <BtnCreateWrapper
                icon={<PrefixIconBtn src={images.companySite.createStaffMany} alt="" />}
                onClick={inviteStaffAgain}
                loading={isLoadingInviteStaff}
                disabled={isLoadingDeleteB2C}
              >
                {CONST_COMMON.INVITE_AGAIN}
              </BtnCreateWrapper>
              <BtnCancelWrapper onClick={deleteLinkB2C} disabled={isLoadingInviteStaff} loading={isLoadingDeleteB2C}>
                {CONST_COMMON.DELETE_INVITE}
              </BtnCancelWrapper>
            </Buttons>
          </ViewFormBase>
        </GrantCard>
      </Container>
      <ModalCommon
        isOpen={isOpenModal}
        setIsOpen={() => setIsOpenModal(false)}
        onClickCancel={() => {
          setIsOpenModal(false);
          hanldeInviteAgainSuccess();
        }}
        onCancel={() => {
          setIsOpenModal(false);
          hanldeInviteAgainSuccess();
        }}
        isShowBtnOk={false}
        txtCancel={CONST_COMMON.BACK}
        _className="confirm-company-pair"
        btnCancelColor={colors.atomicTangerine}
      >
        <ModalContainer>
          <ModalContent>
            <div>{newStaff?.name}</div>
            <div>
              {CONST_COMPANY_STAFF_MANAGEMENT.CODE} {newStaff?.email}
            </div>
            <div>
              {newStaff?.name} {CONST_COMPANY_STAFF_MANAGEMENT.INVITED}
            </div>
          </ModalContent>
        </ModalContainer>
      </ModalCommon>
    </DetailWrapper>
  );
};
