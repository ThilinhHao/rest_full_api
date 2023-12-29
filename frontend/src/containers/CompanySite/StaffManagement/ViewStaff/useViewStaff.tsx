import React, { useCallback, useEffect, useState } from 'react';

import PreviewPDF from '@components/common/PreviewPDF/PreviewPDF';

import {
  ICompanyStaffBasicInformation,
  ICompanyStaffDetailInformation,
  STATE_PAGE,
} from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { useNavigate } from 'react-router-dom';
import { previewPopup } from 'helper/modal-confirm';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiGetUserRegulations } from 'api';
import { CONST_BREADS, CONST_COMPANY_STAFF_MANAGEMENT } from 'constants/language';
import { SettingRegulationsEnum } from 'constants/constants';
import { apiCompanyDeleteStaff, apiGetLastAgreedRegulationsOfStaff } from 'api/company';
import { sendFile } from 'helper/api/axios';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

interface IUserRegulations {
  regulations: string;
  type: string;
}

const useViewStaff = (
  staff: ICompanyStaffDetailInformation | null,
  setStatePage: React.Dispatch<React.SetStateAction<number>>,
  setDetailStaff: React.Dispatch<React.SetStateAction<ICompanyStaffDetailInformation | null>>,
  setSelected: (company: ICompanyStaffBasicInformation | null) => void,
  getListStaff: () => Promise<void>
) => {
  const navigate = useNavigate();
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const [isShowedBasicInfor, setIsShowedBasicInfor] = useState<boolean>(true);
  const [isShowedAccountInfor, setIsShowedAccountInfor] = useState<boolean>(true);
  const [isShowedConsentForm, setIsShowedConsentForm] = useState<boolean>(true);
  const [isLoadingDownloadRegulations, setIsLoadingDownloadRegulations] = useState<boolean>(false);

  const [userRegulations, setUserRegulations] = useState<IUserRegulations | null>(null);
  const [lastAgreedRegulations, setLastAgreedRegulations] = useState<IUserRegulations | null>(null);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.COMPANY_SITE.LIST_STAFF,
      path: '/staff-list',
    },
  ];

  const deleteStaff = async () => {
    if (staff?.id) {
      setIsLoadingDelete(true);
      const response = await apiCompanyDeleteStaff(staff.id);
      if (responseSuccess(response)) {
        setIsOpenModalConfirm(false);
        setIsOpenModalSuccess(true);
      } else {
        setIsOpenModalConfirm(false);
      }
      setIsLoadingDelete(false);
    }
  };

  const successDelete = useCallback(() => {
    getListStaff();
    setIsOpenModalSuccess(false);
    setSelected(null);
    setDetailStaff(null);
    navigate('/staff-list');
  }, [navigate, setSelected, getListStaff, setDetailStaff]);

  const previewRegulations = useCallback(() => {
    if (userRegulations?.regulations) {
      previewPopup({
        title: CONST_COMPANY_STAFF_MANAGEMENT.CONSENT_FORM_CONFIRMATION,
        content: (
          <PreviewPDF
            link={lastAgreedRegulations?.regulations || userRegulations?.regulations}
            width="50rem"
            height="40rem"
            minHeight="40rem"
            agreedRegulationsSignatureData={
              !lastAgreedRegulations?.regulations
                ? {
                    fileName: CONST_COMPANY_STAFF_MANAGEMENT.CONSENT_FORM_CONFIRMATION,
                    companyName: authInfo?.company?.name || '',
                    userName: staff?.name || '',
                  }
                : undefined
            }
          />
        ),
        isCenter: true,
      });
    }
  }, [userRegulations, lastAgreedRegulations, staff, authInfo]);

  const downloadRegulations = useCallback(async () => {
    if ((!lastAgreedRegulations?.regulations && !userRegulations?.regulations) || isLoadingDownloadRegulations) {
      return;
    }
    setIsLoadingDownloadRegulations(true);
    await sendFile(
      '/v1/api/file/download',
      lastAgreedRegulations?.regulations || userRegulations?.regulations || '',
      CONST_COMPANY_STAFF_MANAGEMENT.CONSENT_FORM_CONFIRMATION
    );
    setTimeout(() => {
      setIsLoadingDownloadRegulations(false);
    }, 1000);
  }, [userRegulations, lastAgreedRegulations, isLoadingDownloadRegulations]);

  const getUserRegulations = async () => {
    const response = await apiGetUserRegulations(SettingRegulationsEnum.TYPE_OPERATOR_STAFF);
    if (responseSuccess(response)) {
      setUserRegulations(response.data);
    }
  };

  const getLastAgreedRegulations = useCallback(async () => {
    if (staff?.id) {
      const response = await apiGetLastAgreedRegulationsOfStaff(staff?.id);
      if (responseSuccess(response)) {
        setLastAgreedRegulations(response.data);
      }
    }
  }, [staff]);

  const showPopupConfirmBack = useCallback(
    (isBackHome: boolean = false) => {
      if (isBackHome) {
        navigate('/');
      } else {
        setSelected(null);
        setDetailStaff(null);
        navigate('/staff-list');
      }
    },
    [navigate, setSelected, setDetailStaff]
  );

  const navigateToUpdate = (item: ICompanyStaffDetailInformation) => {
    navigate(`/staff/edit/${item?.id}`, {
      state: item,
    });
    setStatePage(STATE_PAGE.EDIT);
  };

  useEffect(() => {
    getUserRegulations();
  }, []);

  useEffect(() => {
    getLastAgreedRegulations();
  }, [getLastAgreedRegulations]);

  const toHistory = (id: number | undefined) => {
    navigate(`/history/${id}`);
  };
  const toAttendance = (id: number | undefined) => {
    navigate(`/attendance/detail/${id}`);
  };

  return {
    BREADS,
    isShowedBasicInfor,
    setIsShowedBasicInfor,
    isShowedAccountInfor,
    setIsShowedAccountInfor,
    isShowedConsentForm,
    setIsShowedConsentForm,
    showPopupConfirmBack,
    navigateToUpdate,
    userRegulations,
    previewRegulations,
    toHistory,
    toAttendance,
    downloadRegulations,
    isLoadingDownloadRegulations,
    isOpenModalConfirm,
    setIsOpenModalConfirm,
    isOpenModalSuccess,
    setIsOpenModalSuccess,
    isLoadingDelete,
    deleteStaff,
    successDelete,
  };
};

export default useViewStaff;
