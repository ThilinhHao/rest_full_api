import React from 'react';
import { useNavigate } from 'react-router-dom';

import SearchCustom from '@components/Input/SearchCustom';
import ButtonIssuance from '@components/Button/ButtonIssuance';

import { IOperator } from '@pages/OperatorSite/Operators/ListOperator/useListOperator';
import { CONST_OPERATOR } from '@pages/OperatorSite/Operators/CreateOperator/constants';
import { CONST_LIST_OPERATOR } from '@pages/OperatorSite/Operators/ListOperator/constants';
import { useAppSelector } from '@hooks/useSelector/useAppSelector';

import {
  ItemWrapper,
  Line,
  ListWrapper,
  NodataWrapper,
  ScrollWrapper,
  SideBarOperatorWrapper,
} from './sideBarOperatorStyle';
import Loading from '@components/Loading';
import { USER_TYPE_OWNER } from 'constants/User';

interface IItem {
  id: number;
  name: string;
  create_at: string;
  code: string;
  selected: IOperator | null;
  onSelectItem: () => void;
}
const Item = ({ id, name, selected, create_at, code, onSelectItem }: IItem) => {
  return (
    <ItemWrapper isSelected={selected?.id === id} onClick={() => onSelectItem()}>
      <div>{code}</div>
      <div>{name}</div>
    </ItemWrapper>
  );
};

interface ISideBarOperator {
  listOperator: IOperator[];
  isLoading: boolean;
  selected: IOperator | null;
  onSearch: (searchText: string) => void;
  setSelected: (operator: IOperator | null) => void;
}

const SideBarOperator = ({ listOperator, isLoading, selected, onSearch, setSelected }: ISideBarOperator) => {
  const authInfo = useAppSelector((state) => state.auth.authInfo);
  const navigate = useNavigate();
  const toCreateOperator = () => {
    navigate('/operator/create');
  };

  const onSelectItem = (operator: IOperator) => {
    setSelected(operator);
  };

  return (
    <SideBarOperatorWrapper>
      <ListWrapper>
        <SearchCustom onSearch={onSearch} placeholder={CONST_LIST_OPERATOR.HOLDER_NAME_OR_ID} />
        {listOperator?.length > 0 && (
          <ScrollWrapper>
            {listOperator.map((element: IOperator) => {
              return (
                <React.Fragment key={String(element.id)}>
                  <Item
                    create_at={element.create_at}
                    id={element.id}
                    code={element.code}
                    name={`${element.full_name || ''}`}
                    onSelectItem={() => onSelectItem(element)}
                    selected={selected}
                  />
                </React.Fragment>
              );
            })}
          </ScrollWrapper>
        )}

        {isLoading && <Loading />}

        {listOperator?.length === 0 && !isLoading ? (
          <NodataWrapper>{CONST_LIST_OPERATOR.NO_DATA}</NodataWrapper>
        ) : (
          <div />
        )}
      </ListWrapper>
      {authInfo?.user?.type === USER_TYPE_OWNER && (
        <div>
          <Line />
          <ButtonIssuance PrefixIcon="hidden" onClick={toCreateOperator} label={CONST_OPERATOR.OPERATOR} />
        </div>
      )}
    </SideBarOperatorWrapper>
  );
};

export default SideBarOperator;
