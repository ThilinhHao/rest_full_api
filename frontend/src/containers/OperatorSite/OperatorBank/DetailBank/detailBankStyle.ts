import styled from 'styled-components';

export const SettingIcon = styled.img`
  width: 3.125rem;
  height: 3.125rem;
`;
export const MoneyWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: center;
`;
interface IItemMoney {
  isCenter?: boolean;
}
export const ItemMoney = styled.div<IItemMoney>`
  width: 16.5rem;
  font-size: 1.375rem;
`;
export const NormalWeight = styled.span`
  font-weight: 400;
  margin-right: 0.4rem;
  padding-left: 2rem;
`;
export const ItemTitleBankOperator = styled.div<IItemMoney>`
  margin-left: 13rem;
  padding: 0rem 6.5rem 0rem 6.5rem;
  font-size: 1.375rem;
`;
