import { useEffect, useState } from 'react';

import {
  apiChangeStatusB2B,
  apiCompanyB2BByEmail,
  apiCompanyB2BCreate,
  apiListCompanyB2B,
  apiListCompanyB2BPaired,
} from 'api/company';
import { responseCode, responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { IDataCompanyB2BConfirm, IDataListCompanyB2B } from './interface';
import { ERROR_CODE_COMMON } from 'constants/errorCode';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';
import { STATUS_COMPANY_PAIR_B2B_DELETE } from 'constants/company';
import { MAX_LENGTH } from 'constants/constants';
import { trimSpaceInput } from 'helper';
import { storeSetListCompanyB2BPaired } from '@store/company-reducer';
import { useAppDispatch } from '@hooks/useDispatch/useAppDispatch';

const DEFAULT_PAGE = {
  total: 0,
  per_page: 6,
  page: 1,
  last_page: 0,
  path: '',
};

const DEFAULT_DATA_CONFIRM = {
  pair_info: {
    id: 0,
    status: 0,
    company_id: 0,
    company_paired_id: 0,
    created_at: '',
    updated_at: '',
    company_name: '',
    company_code: '',
    company_b2b_name: '',
    company_b2b_code: '',
  },
  status: 0,
};

export const useCompanyB2B = () => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const dispatch = useAppDispatch();

  const [inputEmail, setInputEmail] = useState<string>('');
  const [textError, setTxtError] = useState<string>('');
  const [detailCompanyB2B, setDetailCompanyB2B] = useState<any>();
  const [page, setPage] = useState(DEFAULT_PAGE.page);
  const [isLoadingDetailCompany, setLoadingDetailCompany] = useState<boolean>(false);
  const [idLoadingList, setIdLoadingList] = useState<boolean>(true);
  const [dataCompanyB2B, setDataCompanyB2B] = useState<IDataListCompanyB2B>(DEFAULT_PAGE);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);

  const [dataConfirm, setDataConfirm] = useState<IDataCompanyB2BConfirm>(DEFAULT_DATA_CONFIRM);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);

  const [isOpenModalNoti, setIsOpenModalNoti] = useState<boolean>(false);

  const getListCompanyB2BPaired = async () => {
    const response = await apiListCompanyB2BPaired();
    if (responseSuccess(response)) {
      dispatch(storeSetListCompanyB2BPaired(response.data));
    }
  };

  const getListCompanyB2B = async (_page?: number) => {
    try {
      const response = await apiListCompanyB2B({ page: _page || page, per_page: DEFAULT_PAGE.per_page });
      if (responseSuccess(response)) {
        setDataCompanyB2B(response.data);
      }
    } catch {
      setIdLoadingList(false);
    } finally {
      setIdLoadingList(false);
    }
  };

  useEffect(() => {
    setIdLoadingList(true);
    getListCompanyB2B();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const changePaging = (pageChange: number) => {
    setPage(pageChange);
  };

  const changeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
    setTxtError('');
  };

  const handleTrimSpaceInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setInputEmail(trimSpaceInput(e.target.value, MAX_LENGTH.INPUT_TEXT));
  };

  const sendCreateCompanyB2B = async () => {
    setIsLoadingCreate(true);
    try {
      const response = await apiCompanyB2BCreate({ email: inputEmail });
      if (responseSuccess(response)) {
        setIsOpenModalNoti(true);
        setDataConfirm(DEFAULT_DATA_CONFIRM);
        getListCompanyB2B(1);
        setInputEmail('');
        getListCompanyB2BPaired();
      } else {
        const codeError = responseCode(response);
        if (codeError === 'D005') {
          setTxtError(ERROR_CODE_COMMON.company_pair_b2b.D005);
        }
        if (codeError === 'B001') {
          setTxtError(ERROR_CODE_COMMON.company_pair_b2b.B001);
        }
      }
      setIsOpenModal(false);
      setIsLoadingCreate(false);
    } catch {
      setIsLoadingCreate(false);
    } finally {
      setIsLoadingCreate(false);
      setIsOpenModal(false);
    }
  };

  const getCompanyDetail = async () => {
    try {
      setLoadingDetailCompany(true);
      const response = await apiCompanyB2BByEmail(inputEmail);
      if (responseSuccess(response)) {
        if (response?.data) {
          setDetailCompanyB2B(response.data);
          setIsOpenModal(true);
        } else {
          setTxtError(ERROR_CODE_COMMON.company_pair_b2b.B001);
        }
      }
    } catch {
    } finally {
      setLoadingDetailCompany(false);
    }
  };

  const onClickSubmitInputEmail = () => {
    getCompanyDetail();
  };

  const onClickOkCreate = () => {
    sendCreateCompanyB2B();
  };

  const sendChangeStatusB2B = async () => {
    try {
      setIsLoadingConfirm(true);
      const response = await apiChangeStatusB2B(dataConfirm.pair_info.id, { status: dataConfirm.status });
      if (responseSuccess(response)) {
        if (STATUS_COMPANY_PAIR_B2B_DELETE.includes(dataConfirm.status)) {
          getListCompanyB2B(1);
        } else {
          const _listCompanyB2B = dataCompanyB2B?.data || [];
          const _data = _listCompanyB2B.map((item) =>
            item.id === dataConfirm.pair_info.id ? { ...item, status: dataConfirm.status } : { ...item }
          );

          setDataCompanyB2B({ ...dataCompanyB2B, data: _data });
          setDataConfirm({
            pair_info: { ...dataConfirm.pair_info, status: dataConfirm.status },
            status: dataConfirm.status,
          });
        }

        getListCompanyB2BPaired();
        setIsOpenModalNoti(true);
        setIsOpenModalConfirm(false);
      } else {
        setTxtError(ERROR_CODE_COMMON.company_pair_b2b.B001);
      }
    } catch {
      setIsLoadingConfirm(false);
      setIsOpenModalConfirm(false);
    } finally {
      setIsOpenModalConfirm(false);
      setIsLoadingConfirm(false);
    }
  };

  const onChangeStatusB2B = (data: IDataCompanyB2BConfirm) => {
    setDataConfirm(data);
    setIsOpenModalConfirm(true);
  };

  const onSumitChangeStatusB2B = () => {
    setIsLoadingConfirm(true);
    sendChangeStatusB2B();
  };

  return {
    changePaging,
    companyId: authInfo?.company?.id,
    dataCompanyB2B,
    dataConfirm,
    defaultParamListCompanyB2B: DEFAULT_PAGE,
    detailCompanyB2B,
    idLoadingList,
    inputEmail,
    isLoadingConfirm,
    isLoadingCreate,
    isLoadingDetailCompany,
    isOpenModal,
    isOpenModalConfirm,
    isOpenModalNoti,
    onChangeStatusB2B,
    onClickOkCreate,
    onClickSubmitInputEmail,
    onSumitChangeStatusB2B,
    setDataConfirm,
    setIsLoadingConfirm,
    setIsOpenModal,
    setIsOpenModalConfirm,
    setIsOpenModalNoti,
    setTxtError,
    textError,
    changeInputEmail,
    handleTrimSpaceInput,
  };
};

export default useCompanyB2B;
