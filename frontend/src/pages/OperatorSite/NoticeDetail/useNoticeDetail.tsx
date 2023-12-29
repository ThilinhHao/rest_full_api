/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'antd/es/form/Form';
import { apiOperatorDeleteNotice, apiOperatorDetailNotice, apiOperatorEditNotice } from 'api/operator';
import { ESubjectKeyRequest } from 'constants/constants';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';
import { showConfirm, showConfirmDeleteNotice } from 'helper/modal-confirm';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ISelectedSubject } from '../NoticeCreate/useCreateNotice';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { message } from 'antd';

const BREADS = [
  {
    name: CREATE_NOTIFICATION_OPERATOR.NEW_ARRIVALS,
    path: '/notice',
  },
  {
    name: CREATE_NOTIFICATION_OPERATOR.NEW_ANNOUNCEMENT_DETAIL,
    path: '',
  },
];
const useNoticeDetail = () => {
  const navigate = useNavigate();
  const { idNotice } = useParams();

  const [form] = useForm();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageErrorSubject, setMessageErrorSubject] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [selectedSubject, setSelectedSubject] = useState<ISelectedSubject>({
    companyNotify: ESubjectKeyRequest.SEND,
    staffNotify: ESubjectKeyRequest.SEND,
    agencyNotify: ESubjectKeyRequest.SEND,
  });

  const [detailData, setDetailData] = useState<any>();

  const checkIsErrorSubject = () => {
    if (!selectedSubject.companyNotify && !selectedSubject.staffNotify && !selectedSubject.agencyNotify) {
      setMessageErrorSubject(CREATE_NOTIFICATION_OPERATOR.TARGET_REQUIRED);
    }
    else setMessageErrorSubject('');
  };

  const onFinishForm = () => {
    if (!selectedSubject.companyNotify && !selectedSubject.staffNotify && !selectedSubject.agencyNotify) return;
    setIsConfirm(true);
  };

  const getDetailData = async () => {
    try {
      setIsLoading(true);
      const response = await apiOperatorDetailNotice(idNotice);
      if (responseSuccess(response)) {
        setSelectedSubject({
          companyNotify: response.data.company_notify,
          staffNotify: response.data.staff_notify,
          agencyNotify: response.data.agency_notify,
        });
        setDetailData({
          updated_at: response.data.updated_at,
          user_updated: response.data.user_updated,
          title: response.data.title,
          content: response.data.content,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onEditNotice = async () => {
    if (isLoading) return;
    const values = form.getFieldsValue();
    try {
      setIsLoading(true);
      await apiOperatorEditNotice(idNotice, {
        title: values.title,
        content: values.content,
        company_notify: selectedSubject.companyNotify ? ESubjectKeyRequest.SEND : ESubjectKeyRequest.NOT_SEND,
        staff_notify: selectedSubject.staffNotify ? ESubjectKeyRequest.SEND : ESubjectKeyRequest.NOT_SEND,
        agency_notify: selectedSubject.agencyNotify ? ESubjectKeyRequest.SEND : ESubjectKeyRequest.NOT_SEND,
      });
      navigate('/notice');
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);

  const confirmCancel = () => {
    showConfirm({
      content: CREATE_NOTIFICATION_OPERATOR.CONFIRM_BACK,
      onOk: () => {
        form.resetFields();
        getDetailData();
        setIsEdit(false);
      },
    });
  };

  const onDeleteNotice = async () => {
    try {
      setIsLoading(true);
      const response = await apiOperatorDeleteNotice(idNotice);
      if (responseSuccess(response)) {
        message.success(CREATE_NOTIFICATION_OPERATOR.DELETE_NOTICE_SUCCESS);
        navigate('/notice');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = () => {
    showConfirmDeleteNotice({
      title: `${CREATE_NOTIFICATION_OPERATOR.TITLE}  「${detailData.title}」`,
      content: CREATE_NOTIFICATION_OPERATOR.CONFIRM_DELETE,
      onOk: () => onDeleteNotice(),
    });
  };
  return {
    form,
    BREADS,
    isEdit,
    isConfirm,
    isLoading,
    detailData,
    selectedSubject,
    messageErrorSubject,
    setIsEdit,
    confirmDelete,
    setIsConfirm,
    onFinishForm,
    confirmCancel,
    onEditNotice,
    setSelectedSubject,
    checkIsErrorSubject,
  };
};

export default useNoticeDetail;
