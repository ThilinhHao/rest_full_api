import React from 'react';
import images from '@assets/images-base';
import { SelectProps } from 'antd';
import { DropdownWrapper, IconDown } from './dropdownStyle';
import { getFullHostName } from 'helper';
import configs from 'config';

interface IDropdown extends SelectProps {
  width?: string;
  height?: string;
  disabled?: boolean;
}
const DropdownCustom = ({ width, height, disabled, ...props }: IDropdown) => {
  const getUseRoleByHostName = () => {
    switch (getFullHostName()) {
      case configs.APP_FRONTEND_COMPANY:
        return images.companySite.arrowBottomCompany;
      default:
        return images.company.down;
    }
  };
  return (
    <DropdownWrapper
      {...props}
      disabled={disabled}
      height={height}
      width={width}
      suffixIcon={!disabled && <IconDown width={1.3} src={getUseRoleByHostName()} alt="" />}
    />
  );
};

export default DropdownCustom;
