import { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { useParams } from 'react-router-dom';
import { CONST_COMMON } from 'constants/language';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { formatStrDateTimezone } from 'helper/date';
import { aoiGetDetailNoticeCompany } from 'api/company';

const BREADS = [
  {
    name: CONST_COMMON.NOTICE,
    path: '/setting-page/listNotice',
  },
  {
    name: CONST_COMMON.NOTICE_DETAIL,
    path: '',
  },
];

interface IDetailNoticeCompany {
  title: string;
  content: string;
  date: string;
}

const useNoticeDetailCompany = () => {
  const { id } = useParams();

  const [detaiLNoticeData, setDetailNoticeData] = useState<IDetailNoticeCompany | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDetailNoticeCompany = async () => {
    try {
      setIsLoading(true);
      const response = await aoiGetDetailNoticeCompany(id);
      if (responseSuccess(response)) {
        setDetailNoticeData({
          title: response.data.title,
          content: response.data.content,
          date: dayjs(formatStrDateTimezone(response.data.updated_at)).format('YYYY/MM/DD HH : mm'),
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailNoticeCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    detaiLNoticeData,
    BREADS,
    isLoading,
  };
};

export default useNoticeDetailCompany;
