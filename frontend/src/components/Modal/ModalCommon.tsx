import React from 'react';
import { ButtonCuttom, ButtonFooter, ModalCommonWrapper } from './style';

import { CONST_COMMON } from 'constants/language';
import images from '@assets/images-base';

const ModalCommon = ({
  title,
  isOpen,
  setIsOpen,
  txtOK,
  txtCancel,
  _className,
  isShowBtnOk = true,
  isShowBtnCancel = true,
  children,
  onClickOk,
  onClickCancel,
  onCancel,
  isLoadingOK = false,
  isLoadingCancel = false,
  btnCancelColor = '',
  width = '62.5rem',
}: {
  title?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  txtOK?: string;
  txtCancel?: string;
  children: any;
  _className?: string;
  isShowBtnOk?: boolean;
  isShowBtnCancel?: boolean;
  onClickOk?: () => void;
  onClickCancel?: () => void;
  onCancel?: () => void;
  isLoadingOK?: boolean;
  isLoadingCancel?: boolean;
  btnCancelColor?: string;
  width?: string;
}) => {
  return (
    <ModalCommonWrapper
      title={title}
      open={isOpen}
      footer={false}
      onCancel={() => {
        if (onCancel) onCancel();
        else setIsOpen(false);
      }}
      className={_className}
      closeIcon={<img src={images.common.btnCloseModal} alt="close" width={27} height={27} />}
      width={width}
    >
      {children}

      <ButtonFooter>
        {isShowBtnCancel && (
          <ButtonCuttom
            btnCancelColor={btnCancelColor}
            className="btn-cancel"
            onClick={onClickCancel}
            loading={isLoadingCancel}
          >
            {txtCancel ? txtCancel : CONST_COMMON.CANCEL}
          </ButtonCuttom>
        )}
        {isShowBtnOk && (
          <ButtonCuttom className="btn-ok" onClick={onClickOk} loading={isLoadingOK}>
            {txtOK ? txtOK : CONST_COMMON.OK}
          </ButtonCuttom>
        )}
      </ButtonFooter>
    </ModalCommonWrapper>
  );
};

export default ModalCommon;
