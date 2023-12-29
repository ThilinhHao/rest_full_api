import { apiGetDetailNoticeAgency } from 'api/agency';
import { CONST_COMMON } from 'constants/language';
import dayjs from 'dayjs';
import { formatStrDateTimezone } from 'helper/date';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BREADS = [
  {
    name: CONST_COMMON.NOTICE,
    path: '/notice',
  },
  {
    name: CONST_COMMON.NOTICE_DETAIL,
    path: '',
  },
];

interface IDetailNoticeAgency {
  title: string;
  content: string;
  date: string;
}

const useNoticeDetailAgency = () => {
  const { id } = useParams();

  const [detaiLNoticeData, setDetailNoticeData] = useState<IDetailNoticeAgency | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDetailNoticeAgency = async () => {
    try {
      setIsLoading(true);
      const response = await apiGetDetailNoticeAgency(id);
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
    getDetailNoticeAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    detaiLNoticeData,
    BREADS,
    isLoading,
  };
};

export default useNoticeDetailAgency;
