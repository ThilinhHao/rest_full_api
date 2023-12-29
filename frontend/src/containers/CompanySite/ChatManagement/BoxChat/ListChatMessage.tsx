import React from 'react';

import { IMessage } from '@pages/OperatorSite/ChatManagement/interface';
import { CONST_COMMON } from 'constants/language';
import { USER_ROLE_COMPANY } from 'constants/User';
import { MyMessage, YourMessage } from '@components/ChatMessage/BoxChatMain/style';
import { convertTimeFirebaseToString } from 'helper/date';
import useBoxChat from './useBoxChat';

interface IListChatMessage {
  listMessage: any;
}

const ListChatMessage = ({ listMessage }: IListChatMessage) => {
  const { showContent } = useBoxChat({});

  return (
    <>
      {listMessage.map((ele: IMessage) =>
        ele.user_role_sent === USER_ROLE_COMPANY ? (
          <MyMessage key={ele?.id} className="message">
            <span>{`${ele.user_name}　　${
              convertTimeFirebaseToString(ele.created_at?.seconds) || ele.created_at
            }`}</span>
            <div className="msg">{showContent(ele.content)}</div>
          </MyMessage>
        ) : (
          <YourMessage key={ele?.id} className="message">
            <span>{`${ele.user_name} ${CONST_COMMON.LOOKS}　　${
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
