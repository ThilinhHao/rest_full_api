import { useCallback, useEffect, useState } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import textHelpers from 'helper/text';
import { apiCompanyCreateStaff, apiCompanyDetailStaff, apiCompanyListStaff, apiCompanyUpdateStaff } from 'api/company';
import { useLocation } from 'react-router-dom';
import { BANK_ACCOUNT_LABEL, ECompanyStaffSalaryType, ECompanyStaffStatusType } from 'constants/constants';
import { formatPhone } from 'helper/formatPhone';

export interface ICompanyStaffDetailInformation {
  id?: number;
  code?: string;
  name: string;
  name_kana: string;
  email: string;
  phone: string;
  status: number;
  salary_type?: number;
  company_id?: number;
  amount_limit_1?: number;
  amount_limit_2?: number;
  is_setting_limit_1?: number;
  is_setting_limit_2?: number;
  day_amount_limit_1?: number;
  day_amount_limit_2?: number;
  month_amount_limit_1?: number;
  month_amount_limit_2?: number;
  login_first_time?: string;
  account_name?: string;
  account_number?: string;
  bank_branches_code?: string;
  bank_code?: string;
  bank_type?: number;
}

export interface ICompanyStaffBasicInformation {
  id: number;
  status: number;
  code: string;
  name: string;
}

export const STATE_PAGE = {
  VIEW: 1,
  EDIT: 2,
  CREATE: 3,
  CREATE_MANY: 4,
};

const useStaffManagement = (params: any, state: any) => {
  const location = useLocation();
  const [allListStaff, setAllListStaff] = useState<ICompanyStaffBasicInformation[]>([]);
  const [listStaff, setListStaff] = useState<ICompanyStaffBasicInformation[]>([]);
  const [selected, setSelected] = useState<ICompanyStaffBasicInformation | null>(null);
  const [detailStaff, setDetailStaff] = useState<ICompanyStaffDetailInformation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCreateStaff, setIsLoadingCreateStaff] = useState<boolean>(false);
  const [isLoadingEditStaff, setIsLoadingEditStaff] = useState<boolean>(false);
  const [isLoadingDetailStaff, setIsLoadingDetailStaff] = useState<boolean>(false);

  const [statePage, setStatePage] = useState<number>(STATE_PAGE.VIEW);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const [activeStatus, setActiveStatus] = useState<number>(ECompanyStaffStatusType.NONE);

  const getListStaff = async () => {
    try {
      setIsLoading(true);
      const response = await apiCompanyListStaff();
      if (responseSuccess(response)) {
        setAllListStaff(response.data);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const getDetailStaff = async (id: number) => {
    try {
      setIsLoadingDetailStaff(true);
      const response = await apiCompanyDetailStaff(id);
      if (responseSuccess(response)) {
        const amountLimit1 = response.data?.is_setting_limit_1 ? response.data?.amount_limit_1 : '';
        const amountLimit2 = response.data?.is_setting_limit_2 ? response.data?.amount_limit_2 : '';
        setDetailStaff({
          id: response.data?.id,
          code: response.data?.code,
          name: response.data?.name,
          name_kana: response.data?.name_kana,
          email: response.data?.email,
          phone: response.data?.phone ? formatPhone(response.data?.phone) : '',
          status: response.data?.status,
          salary_type: response.data?.salary_type,
          amount_limit_1: amountLimit1,
          amount_limit_2: amountLimit2,
          is_setting_limit_1: response.data?.is_setting_limit_1,
          is_setting_limit_2: response.data?.is_setting_limit_2,
          day_amount_limit_1:
            response.data?.salary_type === ECompanyStaffSalaryType.DAILY_SALARY ? amountLimit1 : undefined,
          day_amount_limit_2:
            response.data?.salary_type === ECompanyStaffSalaryType.DAILY_SALARY ? amountLimit2 : undefined,
          month_amount_limit_1:
            response.data?.salary_type === ECompanyStaffSalaryType.MONTHLY_SALARY ? amountLimit2 : undefined,
          month_amount_limit_2:
            response.data?.salary_type === ECompanyStaffSalaryType.MONTHLY_SALARY ? amountLimit1 : undefined,
          login_first_time: response.data?.login_first_time?.substr(0, 10)?.replaceAll('-', '/'),
          account_name: response.data?.staff_bank?.account_name,
          account_number: response.data?.staff_bank?.account_number,
          bank_branches_code: response.data?.staff_bank?.bank_branches_code
            ? `${response.data?.staff_bank?.bank_branches_name} (${response.data?.staff_bank?.bank_branches_code})`
            : '',
          bank_code: response.data?.staff_bank?.bank_code
            ? `${response.data?.staff_bank?.bank_name} (${response.data?.staff_bank?.bank_code})`
            : '',
          bank_type: response.data?.staff_bank?.bank_type && BANK_ACCOUNT_LABEL[response.data?.staff_bank?.bank_type],
        });
      }
    } catch {
    } finally {
      setIsLoadingDetailStaff(false);
    }
  };

  const filterStatus = useCallback(() => {
    const listSearch = [...allListStaff];
    if (activeStatus === ECompanyStaffStatusType.DELETED) {
      const arrStatus = [
        ECompanyStaffStatusType.DELETED,
        ECompanyStaffStatusType.STAFF_NOT_ALLOW_REQUEST_SALARY,
        ECompanyStaffStatusType.STAFF_DISCONNECT,
      ];
      const dataSearch: ICompanyStaffBasicInformation[] = allListStaff.filter((_, index) =>
        activeStatus ? arrStatus.includes(listSearch[index]?.status) : true
      );
      setListStaff(dataSearch);
    } else {
      const dataSearch: ICompanyStaffBasicInformation[] = allListStaff.filter((_, index) =>
        activeStatus ? listSearch[index]?.status === activeStatus : true
      );
      setListStaff(dataSearch);
    }
  }, [allListStaff, activeStatus]);

  const onSearch = useCallback(
    (searchText: string) => {
      const listSearch = [...allListStaff].map((element: ICompanyStaffBasicInformation) => element.name);
      const dataSearch: ICompanyStaffBasicInformation[] = allListStaff.filter(
        (_, index) =>
          listSearch[index]
            ?.replaceAll(/\s/g, '')
            .toLowerCase()
            .includes(searchText.toLowerCase()?.replaceAll(/\s/g, '')) ||
          textHelpers.searchTextInLongText({
            text: searchText,
            longText: listSearch[index],
          }) ||
          searchText === ''
      );
      setListStaff(dataSearch);
    },
    [allListStaff]
  );

  const createStaff = async (formData: ICompanyStaffDetailInformation) => {
    try {
      setIsLoadingCreateStaff(true);
      const response = await apiCompanyCreateStaff(formData);
      if (responseSuccess(response)) {
        getListStaff();
        setSearchText('');
      }
      return response;
    } catch (error) {
      return error;
    } finally {
      setIsLoadingCreateStaff(false);
    }
  };

  const editStaff = async (formData: ICompanyStaffDetailInformation) => {
    try {
      setIsLoadingEditStaff(true);
      const response = await apiCompanyUpdateStaff(formData);
      if (responseSuccess(response)) {
        getListStaff();
        setSelected(null);
      }
      return response;
    } catch (error) {
      return error;
    } finally {
      setIsLoadingEditStaff(false);
    }
  };

  useEffect(() => {
    setSelected(state);
  }, [state]);

  useEffect(() => {
    getListStaff();
  }, []);

  useEffect(() => {
    if (selected) {
      getDetailStaff(selected?.id);
    }
  }, [selected]);

  useEffect(() => {
    if (location.pathname.indexOf('/list') !== -1) setStatePage(STATE_PAGE.VIEW);
    if (location.pathname.indexOf('/edit') !== -1) setStatePage(STATE_PAGE.EDIT);
    if (location.pathname.indexOf('/create') !== -1) setStatePage(STATE_PAGE.CREATE);
  }, [location.pathname]);

  useEffect(() => {
    filterStatus();
  }, [activeStatus, filterStatus]);

  useEffect(() => {
    onSearch(searchText || '');
    // eslint-disable-next-line
  }, [allListStaff, onSearch]);

  return {
    listStaff,
    selected,
    isLoading,
    onSearch,
    setSelected,
    createStaff,
    editStaff,
    isLoadingCreateStaff,
    isLoadingEditStaff,
    isLoadingDetailStaff,
    statePage,
    setStatePage,
    searchText,
    setSearchText,
    activeStatus,
    setActiveStatus,
    detailStaff,
    setDetailStaff,
    getListStaff,
  };
};

export default useStaffManagement;
