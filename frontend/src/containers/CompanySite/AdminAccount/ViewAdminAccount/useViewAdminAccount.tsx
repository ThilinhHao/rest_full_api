import { useCallback, useState } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { STATE_PAGE } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { useNavigate } from 'react-router-dom';
import { CONST_BREADS } from 'constants/language';
import { IAdminAccount } from '@pages/CompanySite/ListAdminAccount/useListAdminAccount';
import { apiCompanyDeleteAdmin } from 'api/company';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';

const useViewAdminAccount = (
  adminAccount: IAdminAccount | null,
  setSelected: React.Dispatch<React.SetStateAction<IAdminAccount | null>>,
  setStatePage: React.Dispatch<React.SetStateAction<number>>,
  getListAdminAccount: () => Promise<void>
) => {
  const navigate = useNavigate();

  const [adminAccountName, setAdminAccountName] = useState<string>('');
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.COMPANY_SITE.LIST_ADMIN_ACCOUNT,
      path: '/admin-account-list',
    },
  ];

  const showPopupConfirmBack = useCallback(
    (isBackHome: boolean = false) => {
      if (isBackHome) {
        navigate('/');
      } else {
        setSelected(null);
        navigate('/admin-account-list');
      }
    },
    [navigate, setSelected]
  );

  const navigateToUpdate = (item: IAdminAccount) => {
    navigate(`/admin-account/edit/${item?.id}`, {
      state: item,
    });
    setStatePage(STATE_PAGE.EDIT);
  };

  const confirmDelete = useCallback(() => {
    if (adminAccount?.full_name) {
      setAdminAccountName(adminAccount?.full_name);
      setIsOpenModalConfirm(true);
    }
  }, [adminAccount]);

  const deleteAdmin = useCallback(async () => {
    if (adminAccount?.id) {
      try {
        setIsLoadingDelete(true);
        const response = await apiCompanyDeleteAdmin(adminAccount?.id);
        if (responseSuccess(response)) {
          setIsOpenModalConfirm(false);
          setIsOpenModalSuccess(true);
        }
        setIsLoadingDelete(false);
      } catch (error) {
        //
      } finally {
        setIsOpenModalConfirm(false);
        setIsLoadingDelete(false);
      }
    }
  }, [adminAccount]);

  const successDelete = useCallback(() => {
    getListAdminAccount();
    setIsOpenModalSuccess(false);
    setSelected(null);
    navigate('/admin-account-list');
  }, [navigate, setSelected, getListAdminAccount]);

  return {
    BREADS,
    showPopupConfirmBack,
    navigateToUpdate,
    isOpenModalConfirm,
    setIsOpenModalConfirm,
    isOpenModalSuccess,
    setIsOpenModalSuccess,
    adminAccountName,
    confirmDelete,
    isLoadingDelete,
    deleteAdmin,
    successDelete,
  };
};

export default useViewAdminAccount;
