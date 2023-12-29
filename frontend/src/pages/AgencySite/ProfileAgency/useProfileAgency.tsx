import { useEffect, useState } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { apiAdminGetDetailAgency } from 'api/agency';
import { IDataEditAgencyInfo } from '@containers/AgencySite/EditAgencyInfo/useEditAgencyInfo';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';
import { storeSetAuth } from '@store/auth-reducer';
import { useNavigate } from 'react-router-dom';

export interface IDetailAgency {
  id: number;
  name: string;
  code: string;
  status: number;
  deposit_fee: number;
  advance_fee: number;
  created_at: string;
  updated_at: string;
  register_code: string;
  fax: string;
  address1: string;
  address2: string;
  postal_code: string;
  code_1: string;
  code_2: string;
  updated_by?: {
    id: number;
    full_name: string;
    name_kana: string;
    email: string;
    status: number;
    regulations_status: number;
    phone: string;
    user_role: number;
    created_at: string;
    updated_at: string;
  };
  user_root: {
    id: number;
    full_name: string;
    name_kana: string;
    email: string;
    status: number;
    phone: string;
    user_role: number;
    created_at: string;
    updated_at: string;
  };
  agency_bank: {
    account_name: string;
    account_number: string;
    agency_id: number;
    bank_branches_code: string;
    bank_branches_id: string;
    bank_branches_name: string;
    bank_code: string;
    bank_name: string;
    bank_id: number;
    branch_name: string;
    bank_type: number;
    created_at: string;
    updated_at: string;
  };
}

const BREADS: IBread[] = [
  {
    name: '代理店情報',
    path: '',
  },
];

const getBank = (bank?: any) => {
  return {
    bank_code: bank?.bank_code || '',
    bank_name: bank?.bank_name || '',
    bank_id: bank?.bank_id || '',
    bank_branches_id: bank?.bank_branches_id,
    bank_branches_name: bank?.bank_branches_name,
    bank_branches_code: bank?.bank_branches_code || '',
    bank_type: bank?.bank_type || 1,
    account_name: bank?.account_name,
    account_number: bank?.account_number,
  };
};

const useProfileAgency = ({ firstTime = false }: { firstTime: boolean }) => {
  const navigate = useNavigate();
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [detailAgencyData, setDetailAgencyData] = useState<IDetailAgency>();

  const getData = async () => {
    setIsLoading(true);
    const response = await apiAdminGetDetailAgency();
    if (responseSuccess(response)) {
      setDetailAgencyData({
        ...response.data,
        agency_bank: getBank(response.data?.agency_bank),
      });
    }
    setIsLoading(false);
  };

  const updateAgencyData = (data: IDataEditAgencyInfo) => {
    if (firstTime) {
      const dataTemp: any = { ...authInfo };
      const updateAuthInfo = {
        ...dataTemp,
        user_root: {
          ...dataTemp?.user_root,
          phone: data.phone,
          full_name: data.full_name,
        },
        updated_at: data.updated_at,
        agency_bank: {
          ...dataTemp?.agency_bank,
          ...data,
        },
      };

      dispatch(storeSetAuth(updateAuthInfo));
      navigate('/');
    } else {
      const newData: IDetailAgency | any = {
        ...detailAgencyData,
        user_root: {
          ...detailAgencyData?.user_root,
          phone: data.phone,
          full_name: data.full_name,
        },
        updated_at: data.updated_at,
        agency_bank: {
          ...detailAgencyData?.agency_bank,
          ...data,
        },
      };
      setDetailAgencyData(newData);
      dispatch(
        storeSetAuth({
          ...authInfo,
          user: {
            ...authInfo.user,
            full_name: data.full_name,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/setting/profile') {
      //   setDetailAgencyData({
      //     ...authInfo,
      //     ...authInfo.agency,
      //     user_root: {
      //       ...authInfo.user,
      //     },
      //     agency_bank: getBank(authInfo.agency_bank),
      //   });
      // setIsLoading(false);
      setIsEdit(true);
    }
    getData();
  }, [authInfo]);

  return {
    BREADS,
    isLoading,
    isEdit,
    setIsEdit,
    detailAgencyData,
    updateAgencyData,
  };
};

export default useProfileAgency;
