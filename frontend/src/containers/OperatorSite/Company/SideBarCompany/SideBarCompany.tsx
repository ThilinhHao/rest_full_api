import React from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@components/Loading';
import SearchCustom from '@components/Input/SearchCustom';
import ButtonIssuance from '@components/Button/ButtonIssuance';
import {
  Line,
  ListWrapper,
  NodataWrapper,
  ScrollWrapper,
  SideBarOperatorWrapper,
} from '@containers/OperatorSite/Operator/SideBarOperator/sideBarOperatorStyle';
import { CONST_CREATE_COMPANY, CONST_LIST_COMPANY } from 'constants/language';

import { CONST_LIST_OPERATOR } from '@pages/OperatorSite/Operators/ListOperator/constants';
import { IDetailCompany, IDocumentCompany } from '@pages/OperatorSite/Companies/ListCompany/useListCompany';
import { ItemCompanyWrapper } from './sidebarCompanyStyle';
import { EStatusCompany, EStatusFile } from 'constants/constants';
import { colors } from 'constants/colorsBase';

interface IItem {
  id: number;
  code: string;
  name: string;
  selected: IDetailCompany | null;
  onSelectItem: () => void;
  status: number;
  isWaitingApprove?: boolean;
}
const statusToStyle: any = (status: number) => {
  const styleItem = {
    color: 'unset',
    background: 'unset',
    shadow: 'unset',
  };
  if (status === EStatusCompany.STATUS_NOTVNVERIFY) {
    styleItem.color = colors.deepChestnut;
  }
  if (status === EStatusCompany.STATUS_SUSPEND) {
    styleItem.color = colors.suspended;
    styleItem.shadow = colors.shadowSuspended;
    styleItem.background = colors.backgroundSuspended;
  }
  return styleItem;
};
const Item = ({ id, code, name, selected, onSelectItem, status, isWaitingApprove }: IItem) => {
  return (
    <ItemCompanyWrapper custom={statusToStyle(status)} isSelected={selected?.id === id} onClick={onSelectItem}>
      <div>{code}</div>
      <div>{name}</div>
      {isWaitingApprove && <div className="waiting-validate">1</div>}
    </ItemCompanyWrapper>
  );
};

interface ISideBarOperator {
  listCompany: IDetailCompany[];
  isLoading: boolean;
  selected: IDetailCompany | null;
  onSearch: (searchText: string) => void;
  setSelected: (company: IDetailCompany | null) => void;
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

  const onSelectItem = (company: IDetailCompany) => {
    setSelected(company);
  };

  const checkIsWaitingApprove = (element: IDetailCompany) => {
    const _documents = [...element.documents];
    const statusArr = _documents
      .filter((itemFilter: IDocumentCompany) => itemFilter.link)
      .map((item: IDocumentCompany) => item.status);

    if (
      statusArr.includes(EStatusFile.UN_TICKED) ||
      statusArr.includes(EStatusFile.TICKED_DRAFT) ||
      statusArr.includes(EStatusFile.REJECT_DRAFT)
    ) {
      return true;
    }
  };

  return (
    <SideBarOperatorWrapper>
      <ListWrapper>
        <SearchCustom onSearch={onSearch} placeholder={CONST_LIST_COMPANY.HOLDER_SEARCH_COMPANY} />
        {listCompany?.length > 0 && (
          <ScrollWrapper>
            {listCompany.map((element: IDetailCompany) => {
              return (
                <React.Fragment key={String(element.id)}>
                  <Item
                    id={element.id}
                    code={element.code}
                    name={element.name}
                    onSelectItem={() => onSelectItem(element)}
                    selected={selected}
                    status={element.status}
                    isWaitingApprove={checkIsWaitingApprove(element)}
                  />
                </React.Fragment>
              );
            })}
          </ScrollWrapper>
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
          <ButtonIssuance PrefixIcon="hidden" onClick={toCreateOperator} label={CONST_CREATE_COMPANY.CREATE_COMPANY} />
        </div>
      )}
    </SideBarOperatorWrapper>
  );
};

export default SideBarCompany;
