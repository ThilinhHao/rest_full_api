import React, { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';

import { isStringEmpty } from 'helper/stringEmpty';
import { responseSuccess } from 'helper/responseSuccess/responseSuccess';

import { IBread } from '@components/Breadcrumb/BreadCrumb';
import { IOperator } from '@pages/OperatorSite/Operators/ListOperator/useListOperator';
import { CONST_AGENCY_SITE, CONST_COMMON, CONST_EDIT_OPERATOR } from 'constants/language';

import { CONST_DETAIL_OPERATOR } from '../DetailOperator/constants';
import { showConfirm } from 'helper/modal-confirm';
import { apiUpdateOperator } from 'api';
import { CONST_OPERATOR } from '@pages/OperatorSite/Operators/CreateOperator/constants';
import { katakana } from 'helper/regex';
import { isFormatPhone } from 'helper/formatPhone';
interface IOperatorEdit {
  fullName: string;
  kanaName: string;
  phone: string;
}
const useEditOperator = (
  operatorSelected: IOperator | null,
  updateOperator: (operatorDate: IOperator) => void,
  setIsEdit: (isEdit: boolean) => void
) => {
  const BREADS: IBread[] = [
    {
      name: CONST_DETAIL_OPERATOR.LIST_OPERATOR,
      path: '',
    },
  ];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [operator, setOperator] = useState<IOperatorEdit>({
    fullName: '',
    kanaName: '',
    phone: '',
  });
  const [error, setError] = useState<IOperatorEdit>({
    fullName: '',
    kanaName: '',
    phone: '',
  });

  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (operatorSelected) {
      setOperator({
        fullName: operatorSelected.full_name,
        kanaName: operatorSelected.name_kana,
        phone: operatorSelected.phone,
      });
    }
  }, [operatorSelected]);

  const isEdited = useMemo(() => {
    if (!operatorSelected) return false;
    const primitiveData = JSON.stringify({
      firstName: operatorSelected?.full_name || '',
      lastName: operatorSelected?.name_kana || '',
    });
    const changeData = JSON.stringify({
      fullName: operator?.fullName || '',
      kanaName: operator?.kanaName || '',
    });
    if (primitiveData === changeData) return false;
    return true;
  }, [operator, operatorSelected]);

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperator({ ...operator, fullName: e?.target?.value });
    setError({
      ...error,
      fullName: '',
    });
  };
  const onChangeLastName = (string: React.ChangeEvent<HTMLInputElement>) => {
    setOperator({ ...operator, kanaName: string?.target?.value });
    setError({
      ...error,
      kanaName: '',
    });
  };

  const toConfirm = () => {
    if (isLoading) {
      return false;
    }
    if (isStringEmpty(operator.fullName) || isStringEmpty(operator.kanaName) || !operator.kanaName.match(katakana)) {
      const errorNew = {
        fullName: isStringEmpty(operator.fullName) ? CONST_OPERATOR.ERROR_FIRST_NAME : '',
        kanaName: isStringEmpty(operator.kanaName) ? CONST_OPERATOR.ERROR_LAST_NAME : '',
        phone: isStringEmpty(operator.phone) ? CONST_OPERATOR.ERROR_PHONE : '',
      };
      if (!operator.kanaName.match(katakana)) {
        errorNew.kanaName = CONST_AGENCY_SITE.KATAKANA_ACCOUNT_NAME;
      }
      setError(errorNew);
      return;
    }
    setIsConfirm(true);
  };

  const onEdit = async () => {
    try {
      setIsLoading(true);
      if (operatorSelected?.id) {
        const response = await apiUpdateOperator(operatorSelected.id, {
          full_name: operator.fullName,
          name_kana: operator.kanaName,
          phone: operator.phone,
          email: operatorSelected?.email,
        });
        if (responseSuccess(response)) {
          message.success(CONST_EDIT_OPERATOR.EDIT_SUCCESS);
          updateOperator(response.data);
          setIsEdit(false);
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const beforeBack = () => {
    if (isEdited) {
      showConfirm({
        content: CONST_COMMON.REMOVE_EDIT,
        onOk: () => setIsEdit(false),
      });
      return;
    }
    setIsEdit(false);
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFormatPhone(e?.target?.value)) {
      setOperator({ ...operator, phone: e?.target?.value });
      setError({
        ...error,
        phone: '',
      });
    }
  };

  return {
    error,
    BREADS,
    operator,
    isLoading,
    beforeBack,
    onEdit,
    onChangeLastName,
    onChangeFirstName,
    isConfirm,
    toConfirm,
    onChangePhoneNumber,
  };
};

export default useEditOperator;
