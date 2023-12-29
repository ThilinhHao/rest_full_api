import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ICompanyStaffDetailInformation, STATE_PAGE } from '@pages/CompanySite/StaffManagement/useStaffManagement';
import { useNavigate } from 'react-router-dom';
import { CONST_BREADS, CONST_COMMON, CONST_COMPANY_STAFF_MANAGEMENT } from 'constants/language';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { Form, FormInstance, message } from 'antd';
import { showConfirm } from 'helper/modal-confirm';
import { VALIDATE_ERROR_CODE } from 'constants/errorCode';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { onChangePhoneUseForm } from 'helper/formatPhone';
import { trimSpaceInput } from 'helper';
import { onBlurInputNumber } from 'helper/text';
import { ECompanyStaffSalaryType, ECompanyStaffStatusType, MAX_LENGTH } from 'constants/constants';
import { EServerErrorCode } from 'helper/api/networkConstant';
import { apiCompanyDeleteLinkB2C, apiCompanyGetLastAttendance, apiCompanyInviteStaffB2C } from 'api/company';

const StaffDefault: ICompanyStaffDetailInformation = {
  id: 0,
  name: '',
  name_kana: '',
  phone: '',
  email: '',
  status: ECompanyStaffStatusType.NOT_ACCESS,
  salary_type: undefined,
  day_amount_limit_1: undefined,
  day_amount_limit_2: undefined,
  month_amount_limit_1: undefined,
  month_amount_limit_2: undefined,
};

const VALIDATE_CODE_MESSAGE = {
  [VALIDATE_ERROR_CODE.NOT_ACCEPTTABLE_CODE]: CONST_COMPANY_STAFF_MANAGEMENT.EMAIL_NOT_EXISTS,
  [VALIDATE_ERROR_CODE.EMAIL_INVITED_CODE]: CONST_COMPANY_STAFF_MANAGEMENT.EMAIL_INVITED,
};

const useDetailStaff = (
  staff: ICompanyStaffDetailInformation | null,
  setStatePage: React.Dispatch<React.SetStateAction<number>>,
  id?: number,
  handleSubmitForm?: any,
  getListStaff?: () => Promise<void>,
  setDetailStaff?: React.Dispatch<React.SetStateAction<ICompanyStaffDetailInformation | null>>
) => {
  const navigate = useNavigate();
  const [form]: FormInstance<any>[] = Form.useForm();
  const currentStaff = useMemo(() => {
    return staff ? { ...staff, phone: staff.phone } : StaffDefault;
  }, [staff]);
  const [salaryType, setSalaryType] = useState<number | undefined>();
  const [isShowedBasicInfor, setIsShowedBasicInfor] = useState<boolean>(true);
  const [isShowedAccountInfor, setIsShowedAccountInfor] = useState<boolean>(true);

  const [isLoadingInviteStaff, setIsLoadingInviteStaff] = useState<boolean>(false);
  const [isLoadingDeleteB2C, setIsLoadingDeleteB2C] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<any>({});
  const [isOpenModalConfirmChangeStatus, setIsOpenModalConfirmChangeStatus] = useState<boolean>(false);
  const [lastAttendanceTime, setLastAttendanceTime] = useState<string>('');
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const [newStaff, setNewStaff] = useState<ICompanyStaffDetailInformation>();

  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.COMPANY_SITE.LIST_STAFF,
      path: '/staff-list',
    },
  ];

  const handleTrimSpaceInput = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>, length?: number) => {
      form.setFieldsValue({
        [e.target.name]: trimSpaceInput(e.target.value, length),
      });
    },
    [form]
  );

  const handleFormatPhone = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldsValue({
        [e.target.name]: onBlurInputNumber(e.target.value, MAX_LENGTH.INPUT_PHONE_NOT_FORMAT, true),
      });
    },
    [form]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFields([
        {
          name: e.target.name,
          errors: undefined,
        },
      ]);
    },
    [form]
  );

  const handleStringToNumber = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>, length?: number) => {
      form.setFieldsValue({
        [e.target.name]: onBlurInputNumber(e.target.value, length),
      });
    },
    [form]
  );

  const navigateToView = useCallback(() => {
    navigate(currentStaff.id ? `/staff-list/${currentStaff.id}` : '/staff-list', {
      state: currentStaff,
    });
    setStatePage(STATE_PAGE.VIEW);
  }, [currentStaff, navigate, setStatePage]);

  const navigateToViewAfterCreate = useCallback(() => {
    if (newStaff) {
      navigate(newStaff.id ? `/staff-list/${newStaff.id}` : '/staff-list', {
        state: newStaff,
      });
      setStatePage(STATE_PAGE.VIEW);
    }
  }, [newStaff, navigate, setStatePage]);

  const getLastAttendanceTime = async (staffId: number) => {
    const response = await apiCompanyGetLastAttendance(staffId);
    if (responseSuccess(response)) {
      setLastAttendanceTime(response?.data?.date);
      return response?.data?.date;
    }
    return '';
  };

  const updateStaff = useCallback(
    async (values?: any) => {
      setIsLoadingSubmit(true);
      const response = await handleSubmitForm(dataForm?.id ? dataForm : values);
      if (responseSuccess(response)) {
        if (response.data?.is_invite) {
          setNewStaff(response?.data);
          if (getListStaff) {
            getListStaff();
          }
          setIsOpenModal(true);
        } else {
          navigate(`/staff-list/${response.data?.id}`, {
            state: response.data,
          });
          setStatePage(STATE_PAGE.VIEW);
        }
      } else {
        if (VALIDATE_CODE_MESSAGE?.[response?.response?.data?.code]) {
          message.error(VALIDATE_CODE_MESSAGE?.[response?.response?.data?.code]);
        } else {
          message.error(CONST_COMMON.SYSTEM_ERROR);
        }
      }
      setIsLoadingSubmit(false);
    },
    [dataForm, handleSubmitForm, navigate, setStatePage, getListStaff]
  );

  const onFinishForm = useCallback(
    async (values: any) => {
      setIsLoadingSubmit(true);
      const dataSubmit = {
        id,
        name: values?.name,
        name_kana: values?.name_kana,
        phone: values?.phone,
        email: values?.email,
        status: values?.status,
        salary_type: values?.salary_type,
        amount_limit_1:
          values?.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
            ? values?.day_amount_limit_1
            : values?.month_amount_limit_1,
        amount_limit_2:
          values?.salary_type === ECompanyStaffSalaryType.DAILY_SALARY
            ? values?.day_amount_limit_2
            : values?.month_amount_limit_2,
      };
      if (
        staff?.id &&
        values?.status === ECompanyStaffStatusType.STAFF_NOT_ALLOW_REQUEST_SALARY &&
        staff?.status !== values?.status
      ) {
        const lastAttendance = await getLastAttendanceTime(staff.id);
        if (lastAttendance) {
          setLastAttendanceTime(lastAttendance);
          setDataForm(dataSubmit);
          setIsOpenModalConfirmChangeStatus(true);
          setIsLoadingSubmit(false);
          return;
        }
      }
      updateStaff(dataSubmit);
    },
    [id, staff, updateStaff]
  );

  const showPopupConfirmBack = useCallback(
    (isBackHome: boolean = false) => {
      const salaryTypeTemp = staff ? staff.salary_type : StaffDefault.salary_type;
      const amountLimit1 = staff ? staff.amount_limit_1 : StaffDefault.amount_limit_1;
      const amountLimit2 = staff ? staff.amount_limit_2 : StaffDefault.amount_limit_2;
      const valueDefault = {
        name: staff ? staff.name : StaffDefault.name,
        name_kana: staff ? staff.name_kana : StaffDefault.name_kana,
        phone: staff ? staff.phone : StaffDefault.phone,
        email: staff ? staff.email : StaffDefault.email,
        salary_type: salaryTypeTemp,
        day_amount_limit_1: salaryTypeTemp === ECompanyStaffSalaryType.DAILY_SALARY ? amountLimit1 : undefined,
        day_amount_limit_2: salaryTypeTemp === ECompanyStaffSalaryType.DAILY_SALARY ? amountLimit2 : undefined,
        month_amount_limit_1: salaryTypeTemp === ECompanyStaffSalaryType.MONTHLY_SALARY ? amountLimit1 : undefined,
        month_amount_limit_2: salaryTypeTemp === ECompanyStaffSalaryType.MONTHLY_SALARY ? amountLimit2 : undefined,
      };
      if (
        JSON.stringify(
          form.getFieldsValue([
            'name',
            'name_kana',
            'phone',
            'email',
            'salary_type',
            'day_amount_limit_1',
            'day_amount_limit_2',
            'month_amount_limit_1',
            'month_amount_limit_2',
          ])
        ) === JSON.stringify(valueDefault)
      ) {
        if (isBackHome) navigate('/');
        else navigateToView();
      } else {
        showConfirm({
          content: CONST_COMMON.REMOVE_EDIT,
          okText: CONST_COMMON.OK,
          onOk: () => {
            if (isBackHome) navigate('/');
            else navigateToView();
          },
        });
      }
    },
    [staff, form, navigateToView, navigate]
  );

  const inviteB2C = useCallback(
    async (email: string) => {
      if (email) {
        setIsLoadingInviteStaff(true);
        const dataForm = {
          email,
        };
        const response = await apiCompanyInviteStaffB2C(dataForm);
        if (responseSuccess(response)) {
          setNewStaff(response?.data);
          if (getListStaff) {
            getListStaff();
          }
          setIsOpenModal(true);
        } else {
          if (response?.response.status === EServerErrorCode.WRONG_DATA_REQUEST) {
            message.error(CONST_COMPANY_STAFF_MANAGEMENT.EMAIL_NOT_EXISTS);
          } else {
            if (VALIDATE_CODE_MESSAGE?.[response?.response?.data?.code]) {
              message.error(VALIDATE_CODE_MESSAGE?.[response?.response?.data?.code]);
            } else {
              message.error(CONST_COMMON.SYSTEM_ERROR);
            }
          }
        }
        setIsLoadingInviteStaff(false);
      }
    },
    [getListStaff]
  );

  const inviteStaffAgain = useCallback(async () => {
    if (currentStaff?.email) {
      inviteB2C(currentStaff?.email);
    }
  }, [currentStaff, inviteB2C]);

  const hanldeInviteAgainSuccess = useCallback(async () => {
    if (setDetailStaff && currentStaff) {
      setDetailStaff({
        ...currentStaff,
        status: ECompanyStaffStatusType.STAFF_WAITING_APPROVE,
      });
    }
  }, [currentStaff, setDetailStaff]);

  const deleteLinkB2C = useCallback(async () => {
    if (currentStaff?.id) {
      setIsLoadingDeleteB2C(true);
      const response = await apiCompanyDeleteLinkB2C(currentStaff.id);
      if (responseSuccess(response)) {
        if (getListStaff) {
          getListStaff();
        }
        if (setDetailStaff) {
          setDetailStaff(null);
        }
        navigate('/staff-list');
      } else {
        message.error(CONST_COMMON.SYSTEM_ERROR);
      }
      setIsLoadingDeleteB2C(false);
    }
  }, [currentStaff, getListStaff, setDetailStaff, navigate]);

  useEffect(() => {
    setSalaryType(currentStaff?.salary_type);
  }, [currentStaff]);

  const handleOnChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePhoneUseForm(form, e);
  };

  return {
    form,
    currentStaff,
    BREADS,
    salaryType,
    setSalaryType,
    handleTrimSpaceInput,
    handleFormatPhone,
    handleStringToNumber,
    onFinishForm,
    showPopupConfirmBack,
    isShowedBasicInfor,
    setIsShowedBasicInfor,
    isShowedAccountInfor,
    setIsShowedAccountInfor,
    isLoadingInviteStaff,
    isLoadingDeleteB2C,
    isOpenModal,
    setIsOpenModal,
    handleOnChange,
    navigate,
    inviteStaffAgain,
    deleteLinkB2C,
    hanldeInviteAgainSuccess,
    newStaff,
    navigateToViewAfterCreate,
    handleOnChangePhone,
    isOpenModalConfirmChangeStatus,
    setIsOpenModalConfirmChangeStatus,
    updateStaff,
    lastAttendanceTime,
    isLoadingSubmit,
  };
};

export default useDetailStaff;
