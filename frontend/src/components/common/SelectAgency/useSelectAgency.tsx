import { useEffect, useState } from 'react';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { IAgencyResponse } from '@pages/OperatorSite/Agencies/ListAgency/useListAgency';
import { apiOperatorAgencyList } from 'api/operator';

const useSelectAgency = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listAgency, setListAgency] = useState<IAgencyResponse | any>([]);
  //   const handleScrollBank = (e: any) => {
  //     const element = e.target;
  //     const conditionCall = element.scrollHeight - element.clientHeight - element.scrollTop;
  //     if (conditionCall <= 10) {
  //       console.log(conditionCall);
  //     }
  //   };

  const getListAgencyStomp = async () => {
    try {
      setIsLoading(true);
      const response = await apiOperatorAgencyList();
      if (responseSuccess(response)) {
        setListAgency(
          response.data.map((element: IAgencyResponse) => {
            return {
              ...element,
              value: element.code,
              label: `${element.name || element.user_root.full_name} (${element.code})`,
            };
          })
        );
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListAgencyStomp();
  }, []);

  return { listAgency, getListAgencyStomp, isLoading };
};

export default useSelectAgency;
