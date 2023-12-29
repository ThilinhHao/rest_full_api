import { useState } from 'react';
import { apiAgencyTopPageSearch } from 'api/agency';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';

export interface IListCompany {
  address1: string;
  address2: string;
  code: string;
  id: number;
  name: string;
  status: number;
}
const useIntroducedCompanySearach = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [companyNameValue, setCompanyNameValue] = useState<string>('');
  const [addressValue, setAddressValue] = useState<string>('');
  const [listCompany, setListCompany] = useState<IListCompany[] | null>(null);

  const closeModal = () => {
    setListCompany(null);
    setAddressValue('');
    setCompanyNameValue('');
    setIsOpen(false);
  };

  const getCompanyList = async () => {
    try {
      const response = await apiAgencyTopPageSearch({
        name: companyNameValue,
        address: addressValue,
      });
      if (responseSuccess(response)) {
        setListCompany(response.data);
      }
    } catch (error) {}
  };

  return {
    isOpen,
    setIsOpen,
    setCompanyNameValue,
    setAddressValue,
    getCompanyList,
    listCompany,
    canSearch: !!companyNameValue.trim() || !!addressValue.trim(),
    closeModal,
    addressValue,
    companyNameValue,
  };
};

export default useIntroducedCompanySearach;
