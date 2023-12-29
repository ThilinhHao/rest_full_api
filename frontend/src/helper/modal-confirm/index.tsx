import images from '@assets/images-base';
import { Modal } from 'antd';
import { CONST_COMMON } from 'constants/language';
import React from 'react';
import styles from './style.module.scss';
const { confirm } = Modal;
interface IProps {
  title?: string;
  width?: number;
  className?: string;
  cancelText?: any;
  hiddenOk?: boolean;
  okText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  content?: string | React.ReactNode;
  cancelButtonProps?: any;
  isCenter?: boolean;
  closable?: boolean;
}
export const showConfirm = ({ closable = true, ...props }: IProps) => {
  confirm({
    centered: true,
    closable: closable,
    closeIcon: <img src={images.common.btnCloseModal} alt="close" width={27} height={27} />,
    title: props.title,
    width: props.width,
    className: `${styles.modalCommon} ${props.className}`,
    content: props.content,
    cancelText: props.cancelText || CONST_COMMON.CANCEL,
    okText: props.okText || CONST_COMMON.OK,
    cancelButtonProps: props?.cancelButtonProps ? props.cancelButtonProps : '',
    onOk() {
      if (props.onOk) props.onOk();
    },
    onCancel() {
      if (props.onCancel) props.onCancel();
    },
  });
};

export const showConfirmDelete = ({ ...props }: IProps) => {
  confirm({
    centered: true,
    closable: true,
    closeIcon: <img src={images.common.btnCloseModal} alt="close" width={27} height={27} />,
    title: props.title,
    className: ` ${styles.modalDelete} ${styles.modalCommon} delete-modal  ${
      props.hiddenOk && 'hiddenCancelDeletePopup'
    }`,
    content: props.content,
    cancelText: props.cancelText || CONST_COMMON.CANCEL_HINA,
    okText: props.okText || CONST_COMMON.DELETE,
    onOk() {
      if (props.onOk) props.onOk();
    },
    onCancel() {
      if (props.onCancel) props.onCancel();
    },
  });
};

export const showConfirmDeleteNotice = ({ ...props }: IProps) => {
  confirm({
    centered: true,
    closable: true,
    closeIcon: <img src={images.common.btnCloseModal} alt="close" width={27} height={27} />,
    title: props.title,
    className: ` ${styles.modalCommon} ${styles.deleteNotice} delete-modal  ${
      props.hiddenOk && 'hiddenCancelDeletePopup'
    }`,
    content: props.content,
    cancelText: props.cancelText || CONST_COMMON.CANCEL_HINA,
    okText: props.okText || CONST_COMMON.DELETE,
    onOk() {
      if (props.onOk) props.onOk();
    },
    onCancel() {
      if (props.onCancel) props.onCancel();
    },
  });
};

export const successPopup = ({ ...props }: IProps) => {
  confirm({
    title: props.title,
    width: props.width || 378,
    content: props.content,
    className: `${props.className || styles.modalCommon} ${styles.modalSuccess}`,
    cancelButtonProps: { style: { display: 'none' } },
    onOk() {
      if (props.onOk) props.onOk();
    },
  });
};

export const previewPopup = ({ ...props }: IProps) => {
  confirm({
    title: props.title,
    width: props.width || 378,
    content: props.content,
    className: `${props.className || styles.modalCommon} ${styles.modalPreview} ${
      props?.isCenter ? styles.modalCenter : ''
    }`,
    cancelButtonProps: { style: { display: 'none' } },
    onOk() {
      if (props.onOk) props.onOk();
    },
  });
};
