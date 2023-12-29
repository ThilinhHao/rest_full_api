import React from 'react';

import images from '@assets/images-base';
import BreadCrumb from '@components/Breadcrumb/BreadCrumb';
import ModalCommon from '@components/Modal/ModalCommon';
import useViewAdminAccount from './useViewAdminAccount';

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
import { Button } from 'antd';
import { colors } from 'constants/colorsBase';
import { ModalContent } from './viewAdminAccountStyle';
import { IAdminAccount } from '@pages/CompanySite/ListAdminAccount/useListAdminAccount';
import { ModalContainer } from '@pages/CompanySite/CompanyB2B/companyB2BStyle';
import { ViewFormScroll } from '@components/CompanySite/common/ViewFormScroll/styled';
import { Container, GrantCard } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { CONST_COMMON, CONST_COMPANY_ADMIN_ACCOUNT } from 'constants/language';
import { USER_TYPE_IP_SUPPORT, USER_TYPE_OWNER } from 'constants/User';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

interface IViewAdminAccountProps {
  adminAccount: IAdminAccount | null;
  setSelected: React.Dispatch<React.SetStateAction<IAdminAccount | null>>;
  setStatePage: React.Dispatch<React.SetStateAction<number>>;
  getListAdminAccount: () => Promise<void>;
}

export const ViewAdminAccount = ({
  adminAccount,
  setSelected,
  setStatePage,
  getListAdminAccount,
}: IViewAdminAccountProps) => {
  const {
    BREADS,
    navigateToUpdate,
    showPopupConfirmBack,
    isOpenModalConfirm,
    setIsOpenModalConfirm,
    isOpenModalSuccess,
    setIsOpenModalSuccess,
    adminAccountName,
    confirmDelete,
    deleteAdmin,
    isLoadingDelete,
    successDelete,
  } = useViewAdminAccount(adminAccount, setSelected, setStatePage, getListAdminAccount);
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);

  return (
    <DetailWrapper>
      <BreadCrumb breads={BREADS} onClickHome={() => showPopupConfirmBack(true)} onClickPath={showPopupConfirmBack} />
      {!!adminAccount?.id && (
        <Container>
          <GrantCard padding="1.25rem 0" percentWidth="100%" width={86.875} justifyContent={'flex-start'}>
            <div>
              <TitlePageWrapper>
                <PrefixIcon
                  src={images.companySite.createAccountWhite}
                  alt={CONST_COMPANY_ADMIN_ACCOUNT.ALT.CREATE_ACCOUNT}
                />
                <div>{CONST_COMPANY_ADMIN_ACCOUNT.TITLE_PAGE_VIEW}</div>
              </TitlePageWrapper>
            </div>
            <ViewFormBase minHeight={'calc(100vh - 17rem)'} justifyContent={'space-between'}>
              <ViewFormScroll isShowed={true}>
                <TitleRow>
                  <span>{CONST_COMPANY_ADMIN_ACCOUNT.BASIC_INFORMATION}</span>
                </TitleRow>
                <FormRow>
                  <div>
                    <span>{CONST_COMMON.FULL_NAME}</span>
                    <span>{adminAccount.full_name}</span>
                  </div>
                  <div>
                    <span>{CONST_COMMON.FULL_NAME_FURIGANA}</span>
                    <span>{adminAccount.name_kana}</span>
                  </div>
                  <div>
                    <span>{CONST_COMMON.EMAIL}</span>
                    <span>{adminAccount.email}</span>
                  </div>
                </FormRow>
              </ViewFormScroll>
              {!(companyIdLeague && companyIdLeague !== authInfo?.company?.id) && (
                <BtnWrapper>
                  <BtnActionWrapper onClick={() => navigateToUpdate(adminAccount)}>
                    {CONST_COMMON.EDIT}
                  </BtnActionWrapper>
                  {adminAccount?.type !== USER_TYPE_OWNER && adminAccount?.type !== USER_TYPE_IP_SUPPORT && (
                    <BtnActionWrapper
                      background={colors.white}
                      color={colors.crimson}
                      borderColor={colors.atomicTangerine}
                      onClick={confirmDelete}
                    >
                      {CONST_COMMON.DELETE_INVITE}
                    </BtnActionWrapper>
                  )}
                </BtnWrapper>
              )}
            </ViewFormBase>
          </GrantCard>
        </Container>
      )}
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
              <span>{adminAccountName}</span>
              <span>{CONST_COMPANY_ADMIN_ACCOUNT.CONFIRM_DELETE}</span>
            </div>
            <div className="button">
              <Button className="delete" onClick={deleteAdmin} loading={isLoadingDelete}>
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
              <span>{adminAccountName}</span>
              <span>{CONST_COMPANY_ADMIN_ACCOUNT.DELETED}</span>
            </div>
            <div className="button">
              <Button className="success" onClick={successDelete}>
                {CONST_COMMON.VERIFY}
              </Button>
            </div>
          </ModalContent>
        </ModalContainer>
      </ModalCommon>
    </DetailWrapper>
  );
};
