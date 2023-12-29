import ButtonCustom from '@components/Button';
import { Input } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const IntroducedCompanySearchWrapper = styled.div`
  width: 100;
  display: flex;
  justify-content: flex-end;
  padding: 2rem 5.313rem;
`;
export const SearchIcon = styled.img`
  width: 1.563rem;
  height: 1.563rem;
  margin-left: 1rem;
  margin-bottom: -0.2rem;
`;
export const BtnOpenSearchModal = styled(ButtonCustom)`
  background-color: #52b788;
  color: ${colors.white};
  font-weight: 600;
  font-size: 1.375rem;
  padding: 0;
  width: 16.25rem;
  height: 2.5rem;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.25);
  border: none;
  :active {
    box-shadow: none;
  }
`;

export const TitlePopup = styled.div`
  border-bottom: 1px solid ${colors.lineColor};
  width: 57.25rem;
  font-weight: 500;
  font-size: 1.5rem;
`;
export const PopupSearchContainer = styled.div`
  /* width: 64.25rem !important; */
  text-align: left;
`;
export const InputSearch = styled(Input)`
  width: ${(props) => (props?.width ? `${props?.width}rem` : 'unset')};
  height: ${(props) => (props?.height ? `${props?.height}rem` : 'unset')};
  border-radius: 2.125rem;
  font-size: 1.25rem;
  padding-left: 1.875rem;
  font-family: 'Noto Sans JP', sans-serif !important;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.15);
  &:disabled {
    -webkit-text-fill-color: ${colors.mainText} !important;
    background: ${colors.grey};
  }
`;

export const TitleSearch = styled.div`
  width: 6.25rem;
  font-size: 1.25rem;
  margin-left: 2.875rem;
`;
export const SearchButtonWrapper = styled.div`
  width: 57.25rem;
  display: flex;
  justify-content: center;
  margin-top: 1.563rem;
`;
export const NoDataSearch = styled.div`
  color: #fc0e0e;
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  &:empty {
    height: 0;
  }
  &:not(:empty) {
    height: 0.8rem;
  }
`;
export const SearchButton = styled(ButtonCustom)`
  background-color: #52b788;
  :disabled {
    background-color: ${colors.ashGrey};
    color: white;
  }
  color: ${colors.white};
  font-weight: 600;
  font-size: 1.375rem;
  padding: 0;
  width: 18.75rem;
  height: 3.125rem;
  border-radius: 3rem;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.25);
  border: none;
`;
