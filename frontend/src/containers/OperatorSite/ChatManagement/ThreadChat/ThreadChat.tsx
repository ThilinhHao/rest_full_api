import React from 'react';

import { CONST_LIST_OPERATOR } from '@pages/OperatorSite/Operators/ListOperator/constants';

import SearchCustom from '@components/Input/SearchCustom';
import {
  ListWrapper,
  NodataWrapper,
  SideBarOperatorWrapper,
} from '@containers/OperatorSite/Operator/SideBarOperator/sideBarOperatorStyle';
import Loading from '@components/Loading';
import { IChatGroup } from '@pages/OperatorSite/ChatManagement/interface';
import { CONST_AGENCY_SITE } from 'constants/language';
import { ItemWrapper, ThreadChatWrapper } from './threadChatStyle';
import { EStatusCompany } from 'constants/constants';

interface IItem {
  id: number;
  code: string;
  name: string;
  status?: number;
  selected: any;
  messageNotRead: number;
  onSelectItem: () => void;
}
const Item = ({ id, code, status, name, selected, messageNotRead, onSelectItem }: IItem) => {
  return (
    <ItemWrapper
      isSelected={selected?.id === id}
      onClick={onSelectItem}
      suspend={status === EStatusCompany.STATUS_SUSPEND}
    >
      <div>{code}</div>
      <div>{name}</div>
      {messageNotRead > 0 && <span>{messageNotRead}</span>}
    </ItemWrapper>
  );
};

interface IThreadChat {
  listGroupChat: IChatGroup[];
  isLoading: boolean;
  activeChatGroup?: IChatGroup;
  onSearch: (searchText: string) => void;
  hanldeChangeActiveChatGroup: (group: IChatGroup) => void;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const ThreadChat = ({
  listGroupChat,
  isLoading,
  activeChatGroup,
  onSearch,
  hanldeChangeActiveChatGroup,
  searchInput,
  setSearchInput,
}: IThreadChat) => {
  return (
    <SideBarOperatorWrapper>
      <ListWrapper>
        <SearchCustom
          onSearch={onSearch}
          placeholder={CONST_AGENCY_SITE.ENTER_COMPANY_NAME_OR_COMPANY_CODE}
          value={searchInput}
          setValue={setSearchInput}
        />
        {!isLoading && listGroupChat?.length > 0 && (
          <ThreadChatWrapper>
            {listGroupChat.map(
              (element: IChatGroup) =>
                element && (
                  <React.Fragment key={String(element.id)}>
                    <Item
                      id={element.id}
                      code={element.code}
                      name={`${element.companyName}`}
                      status={element?.status}
                      onSelectItem={() => hanldeChangeActiveChatGroup(element)}
                      selected={activeChatGroup}
                      messageNotRead={element.messages_not_readed}
                    />
                  </React.Fragment>
                )
            )}
          </ThreadChatWrapper>
        )}

        {isLoading && <Loading />}

        {listGroupChat?.length === 0 && !isLoading ? (
          <NodataWrapper>{CONST_LIST_OPERATOR.NO_DATA}</NodataWrapper>
        ) : (
          <div />
        )}
      </ListWrapper>
    </SideBarOperatorWrapper>
  );
};

export default ThreadChat;
