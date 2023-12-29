import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CONST_LIST_AGENCY } from '@pages/OperatorSite/Agencies/ListAgency/constants';
import { CONST_LIST_OPERATOR } from '@pages/OperatorSite/Operators/ListOperator/constants';

import SearchCustom from '@components/Input/SearchCustom';
import ButtonIssuance from '@components/Button/ButtonIssuance';
import {
  ItemWrapper,
  Line,
  ListWrapper,
  NodataWrapper,
  ScrollWrapper,
  SideBarOperatorWrapper,
} from '@containers/OperatorSite/Operator/SideBarOperator/sideBarOperatorStyle';
import Loading from '@components/Loading';
import { IAgencyResponse } from '@pages/OperatorSite/Agencies/ListAgency/useListAgency';
import configs from 'config';
import { getFullHostName } from 'helper';

interface IItem {
  id: number;
  code: string;
  name: string;
  create_at: string;
  selected: IAgencyResponse | null;
  onSelectItem: () => void;
}
const Item = ({ id, code, name, selected, create_at, onSelectItem }: IItem) => {
  return (
    <ItemWrapper isSelected={selected?.id === id} onClick={onSelectItem}>
      <div>{code}</div>
      <div>{name}</div>
    </ItemWrapper>
  );
};

interface ISideBarOperator {
  listAgency: IAgencyResponse[];
  isLoading: boolean;
  selected: IAgencyResponse | null;
  onSearch: (searchText: string) => void;
  setSelected: (agency: IAgencyResponse | null) => void;
}

const SideBarAgency = ({ listAgency, isLoading, selected, onSearch, setSelected }: ISideBarOperator) => {
  const navigate = useNavigate();
  const toCreateOperator = () => {
    navigate('/agency/create');
  };

  const onSelectItem = (agency: IAgencyResponse) => {
    setSelected(agency);
  };
  return (
    <SideBarOperatorWrapper>
      <ListWrapper>
        <SearchCustom onSearch={onSearch} placeholder={CONST_LIST_AGENCY.HOLDER_NAME_OR_ID} />
        {listAgency?.length > 0 && (
          <ScrollWrapper>
            {listAgency.map((element: IAgencyResponse) => {
              return (
                <React.Fragment key={String(element.id)}>
                  <Item
                    create_at={element.created_at}
                    id={element.id}
                    code={element.code}
                    name={`${element?.name || element?.user_root?.full_name}`}
                    onSelectItem={() => onSelectItem(element)}
                    selected={selected}
                  />
                </React.Fragment>
              );
            })}
          </ScrollWrapper>
        )}

        {isLoading && <Loading />}

        {listAgency?.length === 0 && !isLoading ? (
          <NodataWrapper>{CONST_LIST_OPERATOR.NO_DATA}</NodataWrapper>
        ) : (
          <div />
        )}
      </ListWrapper>
      {getFullHostName() === configs.APP_FRONTEND_OPERATOR && (
        <div>
          <Line />
          <ButtonIssuance PrefixIcon="hidden" onClick={toCreateOperator} label={CONST_LIST_AGENCY.ISSUANCE_AGENCY} />
        </div>
      )}
    </SideBarOperatorWrapper>
  );
};

export default SideBarAgency;
