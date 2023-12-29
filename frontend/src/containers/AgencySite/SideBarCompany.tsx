import React from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@components/Loading';
import SearchCustom from '@components/Input/SearchCustom';
import ButtonIssuance from '@components/Button/ButtonIssuance';
import {
  ItemWrapper,
  Line,
  ListWrapper,
  NodataWrapper,
  ScrollWrapperAgency,
  SideBarOperatorWrapper,
} from '@containers/OperatorSite/Operator/SideBarOperator/sideBarOperatorStyle';
import { CONST_AGENCY_SITE, CONST_CREATE_COMPANY } from 'constants/language';

import { CONST_LIST_OPERATOR } from '@pages/OperatorSite/Operators/ListOperator/constants';
import { IListCompany } from '../../pages/AgencySite/Companies/interface';

interface IItem {
  id: number;
  code: string;
  name: string;
  selected: IListCompany | null;
  onSelectItem: () => void;
}

const Item = ({ id, code, name, selected, onSelectItem }: IItem) => {
  return (
    <ItemWrapper isSelected={selected?.id === id} onClick={onSelectItem}>
      <div>{code}</div>
      <div>{name}</div>
    </ItemWrapper>
  );
};

interface ISideBarOperator {
  listCompany: IListCompany[];
  isLoading: boolean;
  selected: IListCompany | null;
  onSearch: (searchText: string) => void;
  setSelected: (company: IListCompany | null) => void;
  isPermissionCreate: boolean;
}

const SideBarCompany = ({
  listCompany,
  isLoading,
  selected,
  onSearch,
  setSelected,
  isPermissionCreate,
}: ISideBarOperator) => {
  const navigate = useNavigate();
  const toCreateOperator = () => {
    navigate('/company/create');
  };

  const onSelectItem = (company: IListCompany) => {
    setSelected(company);
  };

  return (
    <SideBarOperatorWrapper>
      <ListWrapper>
        <SearchCustom onSearch={onSearch} placeholder={CONST_AGENCY_SITE.ENTER_COMPANY_NAME_OR_COMPANY_CODE} />
        {listCompany?.length > 0 && (
          <ScrollWrapperAgency>
            {listCompany.map((element: IListCompany) => {
              return (
                <React.Fragment key={String(element.id)}>
                  <Item
                    id={element.id}
                    code={element.code}
                    name={element.name}
                    onSelectItem={() => onSelectItem(element)}
                    selected={selected}
                  />
                </React.Fragment>
              );
            })}
          </ScrollWrapperAgency>
        )}

        {isLoading && <Loading />}

        {listCompany?.length === 0 && !isLoading ? (
          <NodataWrapper>{CONST_LIST_OPERATOR.NO_DATA}</NodataWrapper>
        ) : (
          <div />
        )}
      </ListWrapper>

      {isPermissionCreate && (
        <div>
          <Line />
          <ButtonIssuance onClick={toCreateOperator} label={CONST_CREATE_COMPANY.CORPORATE} />
        </div>
      )}
    </SideBarOperatorWrapper>
  );
};

export default SideBarCompany;
