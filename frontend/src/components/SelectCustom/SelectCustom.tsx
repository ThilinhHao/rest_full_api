import images from '@assets/images-base';
import { IconDown } from '@components/DropdownCustom/dropdownStyle';
import { Select } from 'antd';
import React, { useState } from 'react';
import { SelectContainer, SelectCustomWrapper } from './selectCustomStyle';

const SelectCustom = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <SelectContainer isFocus={isFocus}>
      <SelectCustomWrapper>
        <Select
          defaultValue="lucy"
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ]}
          onClick={() => {
            setIsFocus(true);
            debugger;
          }}
          suffixIcon={<IconDown src={images.company.down} alt="" />}
        />
      </SelectCustomWrapper>
    </SelectContainer>
  );
};

export default SelectCustom;
