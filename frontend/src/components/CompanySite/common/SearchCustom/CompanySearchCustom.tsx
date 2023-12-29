import images from '@assets/images-base';
import { EKeyCode } from 'constants/constants';
import React, { useRef } from 'react';
import { InputSearch, SearchCustomWrapper, SearchIcon } from './styled';

interface ISearchCustomProps {
  onSearch: (searchText: string) => void;
  placeholder: string;
  iconSearch?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  padding?: string;
}

const CompanySearchCustom = ({ onSearch, placeholder, iconSearch, value, setValue, padding }: ISearchCustomProps) => {
  const ref = useRef<React.RefObject<HTMLInputElement> | any>();
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === EKeyCode.ENTER) {
      const target = e.target as HTMLTextAreaElement;
      onSearch(target.value);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <SearchCustomWrapper padding={padding}>
      {value !== undefined ? (
        <InputSearch placeholder={placeholder} onKeyDown={onKeyDown} ref={ref} value={value} onChange={onChange} />
      ) : (
        <InputSearch placeholder={placeholder} onKeyDown={onKeyDown} ref={ref} />
      )}
      <SearchIcon onClick={() => onSearch(ref.current.input.value)}>
        <img src={iconSearch || images.operator.search} alt="" />
      </SearchIcon>
    </SearchCustomWrapper>
  );
};

export default CompanySearchCustom;
