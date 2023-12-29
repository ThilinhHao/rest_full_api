import ButtonCustom from '@components/CompanySite/common/Button';
import styled from 'styled-components';

export const QuickSelectWrapper = styled.div`
  font-size: 0.875rem;
  width: 57.625rem;
  height: 20.875rem;
  background-color: white;
  border-radius: 0.625rem;
  box-shadow: 0.188rem 0.188rem 0.313rem rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const QuickSelectLoadingWrapper = styled.div`
  position: absolute;
  width: 57.625rem;
  height: 20.875rem;
  background: rgb(255, 255, 255, 0.7);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 2;
`;
export const ItemSelectTopPage = styled.div``;

interface IIconSelectTopPageWrapper {
  imgWidth: string;
  imgHeight: string;
}
export const IconSelectTopPageWrapper = styled(ButtonCustom)<IIconSelectTopPageWrapper>`
  cursor: pointer;
  width: 8.125rem;
  height: 8.125rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  img {
    width: ${(props) => props.imgWidth};
    height: ${(props) => props.imgHeight};
  }
`;
export const TextItemSelectTopPage = styled.div`
  text-align: center;
  margin-top: 1.25rem;
  color: #6e6e6e;
  font-size: 0.938rem;
`;
export const CountUnprocessed = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 1rem;
  background-color: #b75252;
  color: white;
  font-weight: 700;
  font-size: 1rem;
`;
