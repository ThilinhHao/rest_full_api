import React from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@components/Loading';
import ButtonIssuance from '@components/CompanySite/common/Button/ButtonIssuance';
import {
  Line,
  ListWrapper,
  NodataWrapper,
  ScrollWrapper,
  SideBarCompanyWrapper,
  PrefixIconBtn,
  ButtonGroup,
} from './sideBarAdminAccountStyle';
import { IAdminAccount, STATE_PAGE } from '@pages/CompanySite/ListAdminAccount/useListAdminAccount';
import { CONST_COMPANY_ADMIN_ACCOUNT, CONST_COMMON } from 'constants/language';
import images from '@assets/images-base';
import ItemCommon, { IItemCommon } from '@containers/CompanySite/common/Item';
import CompanySearchCustom from '@components/CompanySite/common/SearchCustom/CompanySearchCustom';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

const Item = ({ name, isSelected, onSelectItem }: IItemCommon) => {
  return <ItemCommon name={name} isSelected={isSelected} onSelectItem={onSelectItem} />;
};

interface ISideBarAdminAccount {
  listAdminAccount: IAdminAccount[];
  isLoading: boolean;
  selected: IAdminAccount | null;
  onSearch: (searchText: string) => void;
  setSelected: (company: IAdminAccount | null) => void;
  setStatePage: React.Dispatch<React.SetStateAction<number>>;
  searchText?: string;
  setSearchText: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SideBarAdminAccount = ({
  listAdminAccount,
  isLoading,
  selected,
  onSearch,
  setSelected,
  setStatePage,
  searchText,
  setSearchText,
}: ISideBarAdminAccount) => {
  const navigate = useNavigate();
  const toCreateAdminAccount = () => {
    navigate('/admin-account-list/create');
    setSelected(null);
    setStatePage(STATE_PAGE.CREATE);
  };

  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const companyIdLeague = useAppSelector((state) => state.auth.companyIdLeague);

  const onSelectItem = (account: IAdminAccount) => {
    setSelected(account);
    navigate(`/admin-account-list/${account?.id}`, {
      state: account,
    });
    setStatePage(STATE_PAGE.VIEW);
  };
  return (
    <SideBarCompanyWrapper>
      <ListWrapper>
        <CompanySearchCustom
          onSearch={onSearch}
          placeholder={CONST_COMMON.SEARCH_BY_NAME}
          iconSearch={images.companySite.iconSearch}
          value={searchText}
          setValue={setSearchText}
        />
        {isLoading && <Loading />}

        {listAdminAccount?.length > 0 && !isLoading && (
          <ScrollWrapper>
            {listAdminAccount.map((element: IAdminAccount) => {
              return (
                <React.Fragment key={String(element.id)}>
                  <Item
                    name={element.full_name}
                    onSelectItem={() => onSelectItem(element)}
                    isSelected={selected?.id === element.id}
                  />
                </React.Fragment>
              );
            })}
          </ScrollWrapper>
        )}

        {listAdminAccount?.length === 0 && !isLoading ? <NodataWrapper>{CONST_COMMON.NO_DATA}</NodataWrapper> : <div />}
      </ListWrapper>
      <Line />
      {!(companyIdLeague && companyIdLeague !== authInfo?.company?.id) && (
        <ButtonGroup>
          <ButtonIssuance
            onClick={toCreateAdminAccount}
            label={CONST_COMPANY_ADMIN_ACCOUNT.CREATE_ADMIN_ACCOUNT}
            PrefixIcon={
              <PrefixIconBtn
                src={images.companySite.createAccount}
                alt={CONST_COMPANY_ADMIN_ACCOUNT.ALT.CREATE_ACCOUNT}
              />
            }
          />
        </ButtonGroup>
      )}
    </SideBarCompanyWrapper>
  );
};

export default SideBarAdminAccount;
