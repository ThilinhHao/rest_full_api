import { useEffect, useState } from 'react';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { CONST_OPERATOR_BANK } from 'constants/language';
import { defaultData, ISettingData } from 'constants/settingBank';
import { apiOperatorDetailSettingBank } from 'api/operator';

const useOperatorBank = () => {
  const BREADS: IBread[] = [
    {
      name: CONST_OPERATOR_BANK.TITLE_SETTING_BANK,
      path: '',
    },
  ];
  const [detailBank, setDetailBank] = useState<ISettingData>(defaultData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);
    const response = await apiOperatorDetailSettingBank();
    if (responseSuccess(response)) {
      setDetailBank({
        ...(response.data.bank || {}),
        ...(response.data.info || {}),
        ...(response.data.setting_fee || {}),
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return { BREADS, detailBank, isEdit, isLoading, setIsEdit, setDetailBank };
};

export default useOperatorBank;
