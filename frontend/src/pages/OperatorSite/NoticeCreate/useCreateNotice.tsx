import { useState } from 'react';
import { CREATE_NOTIFICATION_OPERATOR } from 'constants/language';
import { useForm } from 'antd/es/form/Form';
import { apiOperatorCreateNotice } from 'api/operator';
import { ESubjectKeyRequest } from 'constants/constants';
import { useNavigate } from 'react-router-dom';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';
import { showConfirm } from 'helper/modal-confirm';

const BREADS = [
  {
    name: CREATE_NOTIFICATION_OPERATOR.NEW_ARRIVALS,
    path: '/notice',
  },
  {
    name: CREATE_NOTIFICATION_OPERATOR.NEW_ANNOUNCEMENT,
    path: '',
  },
];

export interface ISelectedSubject {
  companyNotify: number | boolean;
  staffNotify: number | boolean;
  agencyNotify: number | boolean;
}

const useCreateNotice = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<ISelectedSubject>({
    companyNotify: ESubjectKeyRequest.NOT_SEND,
    staffNotify: ESubjectKeyRequest.NOT_SEND,
    agencyNotify: ESubjectKeyRequest.NOT_SEND,
  });
  const [messageErrorSubject, setMessageErrorSubject] = useState<string>('');
  const checkIsErrorSubject = () => {
    if (!selectedSubject.companyNotify && !selectedSubject.staffNotify && !selectedSubject.agencyNotify) {
      setMessageErrorSubject(CREATE_NOTIFICATION_OPERATOR.TARGET_REQUIRED);
    } else setMessageErrorSubject('');
  };

  const onFinishForm = () => {
    if (!selectedSubject.companyNotify && !selectedSubject.staffNotify && !selectedSubject.agencyNotify) return;
    setIsConfirm(true);
  };

  const onCreateNotice = async () => {
    if (isLoading) return;
    const values = form.getFieldsValue();
    try {
      setIsLoading(true);
      const response = await apiOperatorCreateNotice({
        title: values.title,
        content: values.content,
        company_notify: selectedSubject.companyNotify ? ESubjectKeyRequest.SEND : ESubjectKeyRequest.NOT_SEND,
        staff_notify: selectedSubject.staffNotify ? ESubjectKeyRequest.SEND : ESubjectKeyRequest.NOT_SEND,
        agency_notify: selectedSubject.agencyNotify ? ESubjectKeyRequest.SEND : ESubjectKeyRequest.NOT_SEND,
      });
      if (responseSuccess(response)) {
        navigate('/notice');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const confirmCancel = () => {
    showConfirm({
      content: CREATE_NOTIFICATION_OPERATOR.CONFIRM_BACK,
      onOk: () => {
        navigate('/notice');
      },
    });
  };

  return {
    BREADS,
    isConfirm,
    setIsConfirm,
    form,
    onFinishForm,
    selectedSubject,
    isLoading,
    setSelectedSubject,
    onCreateNotice,
    messageErrorSubject,
    checkIsErrorSubject,
    confirmCancel,
  };
};

export default useCreateNotice;
