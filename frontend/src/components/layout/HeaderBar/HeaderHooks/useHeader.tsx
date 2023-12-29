import { useEffect, useState } from 'react';

import { IHeaderInfo } from '../HeaderBar';
import { apiGetUserInfo } from 'api';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { useNavigate } from 'react-router-dom';

const useHeader = () => {
  const navigate = useNavigate();
  const [isLoadingHeaderInfo, setIsLoadingHeaderInfo] = useState<boolean>(false);
  const [headerInfo, setHeaderInfo] = useState<IHeaderInfo>();

  const navigateToTopPage = () => {
    navigate('/');
  };

  const getHeaderInfo = async () => {
    setIsLoadingHeaderInfo(true);
    const response = await apiGetUserInfo();
    if (responseSuccess(response)) {
      setHeaderInfo(response.data);
    }
    setIsLoadingHeaderInfo(false);
  };

  useEffect(() => {
    getHeaderInfo();
  }, []);

  return {
    isLoadingHeaderInfo,
    headerInfo,
    navigateToTopPage,
  };
};

export default useHeader;
