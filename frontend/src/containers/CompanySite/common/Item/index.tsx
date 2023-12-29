import React, { ReactElement } from 'react';
import { ItemCommonWrapper } from './styled';

export interface IItemCommon {
  name: string;
  isSelected: boolean;
  background?: string;
  onSelectItem: () => void;
  icon?: ReactElement;
}

const ItemCommon = ({ name, isSelected, onSelectItem, background, icon }: IItemCommon) => {
  return (
    <ItemCommonWrapper isSelected={isSelected} onClick={onSelectItem} background={background}>
      <div>{name}</div>
      {icon}
    </ItemCommonWrapper>
  );
};

export default ItemCommon;
