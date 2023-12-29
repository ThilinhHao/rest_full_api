import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { apiGetCompanyProfile } from 'api/company';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { CONST_BREADS } from 'constants/language';
import { ICompanyProfile } from './interface';
import { IDataEditCompanyInfo } from '@containers/CompanySite/EditProfileCompany/useEditProfileCompany';

const useCompanyProfile = () => {
  const navigate = useNavigate();

  const [companyProfile, setCompanyProfile] = useState<ICompanyProfile | null>(null);
  const [isLoadingCompanyProfile, setIsLoadingCompanyProfile] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const BREADS: IBread[] = [
    {
      name: CONST_BREADS.COMPANY_SITE.COMPANY_PROFILE,
      path: '',
    },
  ];

  const getCompanyProfile = async () => {
    try {
      setIsLoadingCompanyProfile(true);
      const response = await apiGetCompanyProfile();
      if (responseSuccess(response)) {
        setCompanyProfile(response.data);
      }
    } catch {
    } finally {
      setIsLoadingCompanyProfile(false);
    }
  };

  const onClickToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    getCompanyProfile();
  }, []);

  const updateCompanyData = (data: IDataEditCompanyInfo) => {
    const newData: ICompanyProfile | any = {
      ...companyProfile,
      address1: data.address1,
      address2: data.address2,
      postal_code: `${data.postal_code}`,
      user_root: {
        ...companyProfile?.user_root,
        phone: data.phone,
      },
      bank: {
        ...companyProfile?.bank,
        ...data,
      },
    };
    setCompanyProfile(newData);
  };

  return {
    BREADS,
    isEdit,
    setIsEdit,
    companyProfile,
    isLoadingCompanyProfile,
    onClickToHome,
    updateCompanyData,
  };
};

export default useCompanyProfile;
