import React from 'react';

import useBoxChat from './useBoxChat';

import { IMessage } from '@pages/OperatorSite/ChatManagement/interface';
import { USER_ROLE_OPERATOR } from 'constants/User';
import { MyMessage, YourMessage } from '@components/ChatMessage/BoxChatMain/style';
import { convertTimeFirebaseToString } from 'helper/date';

interface IListChatMessage {
  listMessage: any;
}

const ListChatMessage = ({ listMessage }: IListChatMessage) => {
  const { showContent } = useBoxChat({});

  return (
    <>
      {listMessage.map((ele: IMessage) =>
        ele.user_role_sent === USER_ROLE_OPERATOR ? (
          <MyMessage key={ele?.id} className="message">
            <span>{`${ele.user_name}　　${
              convertTimeFirebaseToString(ele.created_at?.seconds) || ele.created_at
            }`}</span>
            <div className="msg">{showContent(ele.content)}</div>
          </MyMessage>
        ) : (
          <YourMessage key={ele?.id} className="message">
            <span>{`${ele.group_company_name}　　${
              convertTimeFirebaseToString(ele.created_at?.seconds) || ele.created_at
            }`}</span>
            <div className="msg">{showContent(ele.content)}</div>
          </YourMessage>
        )
      )}
    </>
  );
};

export default ListChatMessage;
