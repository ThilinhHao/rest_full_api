import React from 'react';
import { ModalCustomWrapper } from './style';

const ModalCustom = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: any;
}) => {
  return (
    <ModalCustomWrapper title="" open={isOpen} footer={false} onCancel={() => setIsOpen(false)}>
      {children}
    </ModalCustomWrapper>
  );
};

export default ModalCustom;
