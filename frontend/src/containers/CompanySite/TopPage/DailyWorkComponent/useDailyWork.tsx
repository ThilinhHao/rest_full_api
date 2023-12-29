import { useState, useEffect, useMemo } from 'react';

import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { EApprovalMethod } from 'constants/constants';
import { apiCompanyTotalNotHandle, apiCompanyTotalNotMark, apiCompanyTotalNotSettingPayment } from 'api/company';
import { useNavigate } from 'react-router-dom';

interface IDailyWorking {
  notHandle: number;
  notMark: number;
  NotSettingPayment: number;
}
const useDailyWork = () => {
  const navigate = useNavigate();
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);
  const listCompanyB2BPaired = useAppSelector((state) => state.company.listCompanyB2BPaired);

  const isViewer = useMemo(() => {
    if (companyIdLeague && companyIdLeague !== authInfo?.company?.id) return true;
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authInfo]);

  const [dataDailyWork, setDataDailyWork] = useState<IDailyWorking>({
    notHandle: 0,
    notMark: 0,
    NotSettingPayment: 0,
  });

  const isAuto = useMemo(() => {
    if (isViewer) {
      const checkCompany = listCompanyB2BPaired.find((element) => element.id === companyIdLeague);
      return checkCompany?.salary_type === EApprovalMethod.AUTO_APPROVAL;
    }
    return authInfo.company.company_setting.salary_type === EApprovalMethod.AUTO_APPROVAL;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authInfo, listCompanyB2BPaired, dataDailyWork.notHandle]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toApproveScreen = () => {
    navigate('/approve');
  };
  const toAttendanceDetail = () => {
    navigate('/attendance/detail');
  };
  const toStaffList = () => {
    navigate('/staff-list');
  };

  const getDataDailyWork = async () => {
    try {
      setIsLoading(true);
      const responseHandle = await apiCompanyTotalNotHandle();
      const responseMark = await apiCompanyTotalNotMark();
      const responseSettingPayment = await apiCompanyTotalNotSettingPayment();
      setDataDailyWork({
        notHandle: responseHandle.data.total,
        notMark: responseMark.data.total,
        NotSettingPayment: responseSettingPayment.data.total,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataDailyWork();
  }, []);

  return {
    dataDailyWork,
    isLoading,
    toApproveScreen,
    toAttendanceDetail,
    toStaffList,
    isViewer,
    isAuto,
  };
};

export default useDailyWork;
