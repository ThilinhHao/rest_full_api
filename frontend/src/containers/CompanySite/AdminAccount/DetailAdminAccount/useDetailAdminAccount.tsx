import { useCallback } from 'react';
import { STATE_PAGE } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { useNavigate } from 'react-router-dom';
import { CONST_BREADS, CONST_COMMON, CONST_COMPANY_ADMIN_ACCOUNT } from 'constants/language';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { Form, FormInstance } from 'antd';
import { showConfirm } from 'helper/modal-confirm';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { trimSpaceInput } from 'helper';
import { IAdminAccount } from '@pages/CompanySite/ListAdminAccount/useListAdminAccount';

const AdminAccountDefault: IAdminAccount = {
  id: 0,
  full_name: '',
  name_kana: '',
  email: '',
  created_at: '',
};

const useDetailAdminAccount = (
  adminAccount: IAdminAccount | null,
  setStatePage: React.Dispatch<React.SetStateAction<number>>,
  id?: number,
  handleSubmitForm?: any
) => {
  const navigate = useNavigate();
  const [form]: FormInstance<any>[] = Form.useForm();
  const currentAdminAccount = adminAccount ? adminAccount : AdminAccountDefault;

  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.COMPANY_SITE.LIST_ADMIN_ACCOUNT,
      path: '/admin-account-list',
    },
  ];

  const handleTrimSpaceInput = (e: React.FocusEvent<HTMLInputElement, Element>, length?: number) => {
    form.setFieldsValue({
      [e.target.name]: trimSpaceInput(e.target.value, length),
    });
  };

  const navigateToView = useCallback(() => {
    navigate(currentAdminAccount.id ? `/admin-account-list/${currentAdminAccount.id}` : '/admin-account-list', {
      state: currentAdminAccount,
    });
    setStatePage(STATE_PAGE.VIEW);
  }, [currentAdminAccount, navigate, setStatePage]);

  const onFinishForm = async (values: any) => {
    const dataForm = {
      id,
      full_name: values?.full_name,
      name_kana: values?.name_kana,
      email: values?.email,
    };

    const response = await handleSubmitForm(dataForm);
    if (responseSuccess(response)) {
      navigate(`/admin-account-list/${response.data?.id}`, {
        state: response.data,
      });
      setStatePage(STATE_PAGE.VIEW);
    } else {
      if (response?.response?.data?.message?.email) {
        form.setFields([
          {
            name: 'email',
            errors: [CONST_COMPANY_ADMIN_ACCOUNT.VALIDATE.EMAIL_UNIQUE],
          },
        ]);
        form.scrollToField('email');
      }
    }
  };

  const showPopupConfirmBack = useCallback(
    (isBackHome: boolean = false) => {
      const valueDefault = {
        full_name: adminAccount ? adminAccount.full_name : AdminAccountDefault.full_name,
        name_kana: adminAccount ? adminAccount.name_kana : AdminAccountDefault.name_kana,
        email: adminAccount ? adminAccount.email : AdminAccountDefault.email,
      };

      if (JSON.stringify(form.getFieldsValue()) === JSON.stringify(valueDefault)) {
        if (isBackHome) navigate('/');
        else navigateToView();
      } else {
        showConfirm({
          content: CONST_COMPANY_ADMIN_ACCOUNT.CONFIRM_CANCEL,
          okText: CONST_COMMON.AGREE,
          onOk: () => {
            if (isBackHome) navigate('/');
            else navigateToView();
          },
        });
      }
    },
    [adminAccount, form, navigateToView, navigate]
  );

  return {
    form,
    currentAdminAccount,
    BREADS,
    handleTrimSpaceInput,
    onFinishForm,
    showPopupConfirmBack,
  };
};

export default useDetailAdminAccount;
