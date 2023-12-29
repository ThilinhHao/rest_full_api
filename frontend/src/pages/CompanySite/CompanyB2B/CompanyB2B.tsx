import React from 'react';

import { Container, GrantCompanyWrapper } from '@pages/OperatorSite/Companies/CreateCompany/createCompanyStyle';
import { SettingCard } from '@pages/OperatorSite/SettingPage/settingPageStyle';

import BreadCrumb, { IBread } from '@components/Breadcrumb/BreadCrumb';
import { IconSetting } from '@components/Icon';
import { LineHeaderSetting } from '@components/Style/Style';
import { RowCenter, SpaceBase } from 'styles';
import {
  ButtonB2B,
  ColInputRequestB2B,
  ColPagination,
  InputB2B,
  ModalContainer,
  RowRequestB2B,
  TitleHeaderSetting,
} from './companyB2BStyle';

import { CONST_BREADS, LANGUAGE_COMPANY_SETING } from 'constants/language';
import { STATUS_COMPANY_PAIR_B2B } from 'constants/company';
import ListCompanyB2B from '@containers/CompanySite/CompanyB2B/ListCompanyB2B';
import useCompanyB2B from './useCompanyB2B';
import PaginationRecord from '@components/CompanySite/AttendanceRecord/PaginationRecord/PaginationRecord';
import { ErrorForgot } from '@components/SettingPassword/settingPasswordStyle';
import ModalCommon from '@components/Modal/ModalCommon';
import { ItemCompanyB2B } from '@containers/CompanySite/CompanyB2B/companyB2BStyle';
import { MAX_LENGTH } from 'constants/constants';

const getTxtStatusB2B = (status: number, isCompany: boolean) => {
  const style = {
    text: '',
    color: '',
  };

  switch (status) {
    case STATUS_COMPANY_PAIR_B2B.status_new:
      if (isCompany) {
        style.text = LANGUAGE_COMPANY_SETING.pair_b2b.status_confirm;
        style.color = 'status-confirm';
      } else {
        style.text = LANGUAGE_COMPANY_SETING.pair_b2b.status_request;
        style.color = 'status-request';
      }
      break;
    case STATUS_COMPANY_PAIR_B2B.status_reject:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.status_reject;
      style.color = 'status-reject';
      break;
    case STATUS_COMPANY_PAIR_B2B.status_cancel:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.status_cancel;
      style.color = 'status-cancel';
      break;
    case STATUS_COMPANY_PAIR_B2B.status_pair:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.status_pair;
      style.color = 'status-paired';
      break;
    case STATUS_COMPANY_PAIR_B2B.status_disconnect:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.status_disconnect;
      style.color = 'status-disconnect';
      break;
    case STATUS_COMPANY_PAIR_B2B.status_delete:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.status_delete;
      style.color = 'status-remove';
      break;
    default:
      break;
  }
  return style;
};

const getTxtBtnB2B = (status: number, isCompany: boolean) => {
  const style = {
    text: '',
    status: 0,
  };

  switch (status) {
    case STATUS_COMPANY_PAIR_B2B.status_new:
      if (isCompany) {
        style.text = LANGUAGE_COMPANY_SETING.pair_b2b.btn_reject;
        style.status = STATUS_COMPANY_PAIR_B2B.status_reject;
      } else {
        style.text = LANGUAGE_COMPANY_SETING.pair_b2b.btn_cancel;
        style.status = STATUS_COMPANY_PAIR_B2B.status_cancel;
      }
      break;
    case STATUS_COMPANY_PAIR_B2B.status_reject:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.btn_delete;
      style.status = STATUS_COMPANY_PAIR_B2B.status_delete;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_pair:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.btn_disconnect;
      style.status = STATUS_COMPANY_PAIR_B2B.status_disconnect;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_cancel:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.btn_delete;
      style.status = STATUS_COMPANY_PAIR_B2B.status_delete;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_disconnect:
      style.text = LANGUAGE_COMPANY_SETING.pair_b2b.btn_delete;
      style.status = STATUS_COMPANY_PAIR_B2B.status_delete;
      break;
    default:
      break;
  }
  return style;
};

const getTxtConfirmB2B = (statusNew: number, status: number, isCompany: boolean) => {
  let text = '';
  if (statusNew === STATUS_COMPANY_PAIR_B2B.status_pair) {
    return LANGUAGE_COMPANY_SETING.pair_b2b.txt_comfirm_approved;
  }
  switch (status) {
    case STATUS_COMPANY_PAIR_B2B.status_new:
      if (isCompany) {
        text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_comfirm_cancel;
      } else {
        text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_comfirm_reject;
      }
      break;
    case STATUS_COMPANY_PAIR_B2B.status_reject:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_comfirm_delete;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_cancel:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_comfirm_delete;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_pair:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_comfirm_disconnect;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_disconnect:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_comfirm_delete;
      break;
    default:
      break;
  }
  return text;
};

const getTxtNotiB2B = (status: number, isCompany: boolean) => {
  let text = '';
  switch (status) {
    case STATUS_COMPANY_PAIR_B2B.status_reject:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_noti_reject;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_delete:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_noti_delete;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_cancel:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_noti_cancel;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_pair:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_noti_approved;
      break;
    case STATUS_COMPANY_PAIR_B2B.status_disconnect:
      text = LANGUAGE_COMPANY_SETING.pair_b2b.txt_noti_disconnect;
      break;
    default:
      break;
  }
  return text;
};

const getNameCompany = (data: any, status: number, isCompany: boolean) => {
  if (isCompany) {
    return data.company_name;
  }
  return data.company_b2b_name;
};

const CompanyB2B = () => {
  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.SETTING_TOPAGE,
      path: '/setting-page',
    },
  ];

  const {
    changePaging,
    companyId,
    dataCompanyB2B,
    dataConfirm,
    detailCompanyB2B,
    idLoadingList,
    inputEmail,
    isLoadingConfirm,
    isLoadingCreate,
    isLoadingDetailCompany,
    isOpenModal,
    isOpenModalConfirm,
    isOpenModalNoti,
    onChangeStatusB2B,
    onClickOkCreate,
    onClickSubmitInputEmail,
    onSumitChangeStatusB2B,
    setIsOpenModal,
    setIsOpenModalConfirm,
    setIsOpenModalNoti,
    textError,
    changeInputEmail,
    handleTrimSpaceInput,
  } = useCompanyB2B();

  return (
    <div className="company-pair">
      <GrantCompanyWrapper>
        <BreadCrumb breads={BREADS} />
        <Container>
          <SettingCard>
            <SpaceBase height={1.5} />
            <RowCenter>
              <SpaceBase width={2.5} />
              <IconSetting />
              <TitleHeaderSetting>{LANGUAGE_COMPANY_SETING.pair_b2b.title}</TitleHeaderSetting>
            </RowCenter>
            <SpaceBase height={0.375} />
            <LineHeaderSetting />
            <SpaceBase height={3.75} />

            <RowRequestB2B>
              <ColInputRequestB2B>
                <div className="tile-request">{LANGUAGE_COMPANY_SETING.pair_b2b.titleInputB2B}</div>
                <div className="input-pair">
                  <InputB2B
                    placeholder={LANGUAGE_COMPANY_SETING.pair_b2b.placeholderInputB2B}
                    onChange={changeInputEmail}
                    maxLength={MAX_LENGTH.INPUT_TEXT}
                    onBlur={(e) => handleTrimSpaceInput(e)}
                    value={inputEmail}
                  />
                  <ErrorForgot>{textError}</ErrorForgot>
                </div>
                <ButtonB2B
                  disabled={!inputEmail || isLoadingDetailCompany}
                  onClick={onClickSubmitInputEmail}
                  loading={isLoadingDetailCompany}
                >
                  {LANGUAGE_COMPANY_SETING.pair_b2b.btnSumitB2B}
                </ButtonB2B>
              </ColInputRequestB2B>
              <ColPagination>
                <PaginationRecord
                  current={dataCompanyB2B.page}
                  total={dataCompanyB2B.total}
                  pageSize={dataCompanyB2B.per_page}
                  className="paginationRecord"
                  onChange={changePaging}
                />
              </ColPagination>
            </RowRequestB2B>
            <SpaceBase height={3.45} />

            <ListCompanyB2B
              listCompanyB2B={dataCompanyB2B?.data || []}
              getTxtStatusB2B={getTxtStatusB2B}
              getTxtBtnB2B={getTxtBtnB2B}
              getNameCompany={getNameCompany}
              idLoadingList={idLoadingList}
              companyId={companyId}
              onChangeStatusB2B={onChangeStatusB2B}
            />
          </SettingCard>
        </Container>
      </GrantCompanyWrapper>

      {detailCompanyB2B && (
        <ModalCommon
          isOpen={isOpenModal}
          setIsOpen={() => setIsOpenModal(false)}
          isShowBtnCancel={false}
          _className="confirm-company-pair"
          isLoadingOK={isLoadingCreate}
          onClickOk={onClickOkCreate}
          txtOK={LANGUAGE_COMPANY_SETING.pair_b2b.btn_submit_request}
        >
          <ModalContainer>
            <p className="txt-name-company-b2b">{detailCompanyB2B.name}</p>
            <p className="txt-confirm-b2b">{LANGUAGE_COMPANY_SETING.pair_b2b.txt_confirm_add_pair}</p>
          </ModalContainer>
        </ModalCommon>
      )}

      <ModalCommon
        isOpen={isOpenModalConfirm}
        setIsOpen={() => setIsOpenModalConfirm(false)}
        isShowBtnCancel={false}
        _className="confirm-company-pair"
        isLoadingOK={isLoadingConfirm}
        onClickOk={onSumitChangeStatusB2B}
        txtOK={
          dataConfirm.status === STATUS_COMPANY_PAIR_B2B.status_pair
            ? LANGUAGE_COMPANY_SETING.pair_b2b.btn_approved
            : getTxtBtnB2B(dataConfirm.pair_info.status, companyId === dataConfirm.pair_info.company_paired_id).text
        }
      >
        <ModalContainer>
          <ItemCompanyB2B>
            <div className="modal-confirm-pair box-txt-status-company">
              <div
                className={`view-status ${
                  getTxtStatusB2B(dataConfirm.pair_info.status, companyId === dataConfirm.pair_info.company_paired_id)
                    .color
                }`}
              >
                {
                  getTxtStatusB2B(dataConfirm.pair_info.status, companyId === dataConfirm.pair_info.company_paired_id)
                    .text
                }
              </div>
              <div className="txt-name-company-b2b">
                {getNameCompany(
                  dataConfirm.pair_info,
                  dataConfirm.pair_info.status,
                  companyId === dataConfirm.pair_info.company_paired_id
                )}
              </div>
            </div>
          </ItemCompanyB2B>
          <p className="txt-confirm-b2b">
            {getTxtConfirmB2B(
              dataConfirm.status,
              dataConfirm.pair_info.status,
              companyId === dataConfirm.pair_info.company_id
            )}
          </p>
        </ModalContainer>
      </ModalCommon>

      <ModalCommon
        isOpen={isOpenModalNoti}
        setIsOpen={() => setIsOpenModalNoti(false)}
        isShowBtnCancel={false}
        _className="confirm-company-pair modal-noti-company-pair"
        onClickOk={() => setIsOpenModalNoti(false)}
        txtOK={LANGUAGE_COMPANY_SETING.pair_b2b.txt_button_ok}
      >
        <ModalContainer>
          <ItemCompanyB2B>
            <div className="modal-confirm-pair">
              {!!dataConfirm.status && (
                <>
                  <div
                    className={`view-status ${
                      getTxtStatusB2B(
                        dataConfirm.pair_info.status,
                        companyId === dataConfirm.pair_info.company_paired_id
                      ).color
                    }`}
                  >
                    {
                      getTxtStatusB2B(
                        dataConfirm.pair_info.status,
                        companyId === dataConfirm.pair_info.company_paired_id
                      ).text
                    }
                  </div>
                  <div>
                    {getNameCompany(
                      dataConfirm.pair_info,
                      dataConfirm.pair_info.status,
                      companyId === dataConfirm.pair_info.company_paired_id
                    )}
                  </div>
                </>
              )}
              {!dataConfirm.status && detailCompanyB2B && <div>{detailCompanyB2B.name}</div>}
            </div>
          </ItemCompanyB2B>
          <p>
            {!dataConfirm.status && <div>{LANGUAGE_COMPANY_SETING.pair_b2b.txt_noti_add_pair}</div>}

            {!!dataConfirm.status &&
              dataConfirm.status === STATUS_COMPANY_PAIR_B2B.status_pair &&
              getNameCompany(
                dataConfirm.pair_info,
                dataConfirm.pair_info.status,
                companyId === dataConfirm.pair_info.company_paired_id
              )}

            {!!dataConfirm.status &&
              getTxtNotiB2B(dataConfirm.status, companyId === dataConfirm.pair_info.company_id)}
          </p>
        </ModalContainer>
      </ModalCommon>
    </div>
  );
};

export default CompanyB2B;
