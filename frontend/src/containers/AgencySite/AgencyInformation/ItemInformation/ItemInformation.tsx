import React from 'react';
import { ItemInformationWrapper, TitleItemWrapper, TitleValueWrapper } from './itemInformationStyle';

interface IItemInformation {
  title: string;
  value: string | number;
}
const ItemInformation = ({ title, value }: IItemInformation) => {
  return (
    <ItemInformationWrapper>
      <TitleItemWrapper>{title}</TitleItemWrapper>
      <TitleValueWrapper>{value}</TitleValueWrapper>
    </ItemInformationWrapper>
  );
};

export default ItemInformation;
