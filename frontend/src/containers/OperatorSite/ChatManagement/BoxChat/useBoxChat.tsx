import React, { useEffect, useState } from 'react';

import { EKeyCode } from 'constants/constants';
import { convertMessageToFile, getIconFile } from 'helper/text';
import { sendFile } from 'helper/api/axios';
import images from '@assets/images-base';
import { TickedIcon } from '@containers/CompanySite/GrantCompany/CompanyStyle';

interface IBoxChatProps {
  sendMessage?: () => Promise<void>;
}

const useBoxChat = ({ sendMessage }: IBoxChatProps) => {
  const [canBeforeSendMessage, setCanBeforeSendMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showContent = (content: string) => {
    const files = convertMessageToFile(content);
    if (typeof files === 'string') return content;
    if (typeof files === 'object') {
      return files.map((ele: any) => (
        <div className="file">
          <img src={getIconFile(ele?.type)} alt="" />
          <div>{ele?.name}</div>
          <TickedIcon
            alt=""
            src={images.company.download}
            isLoading={isLoading}
            onClick={() => onDownloadFile(ele?.url, ele?.name.split('.')[0])}
          />
        </div>
      ));
    }
    return <></>;
  };

  const onDownloadFile = async (link?: string, fileName?: string) => {
    if (!link || isLoading) {
      return;
    }
    setIsLoading(true);
    await sendFile('/v1/s1/company/download-file', link, fileName);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (
        event.key === EKeyCode.ALT ||
        event.key === EKeyCode.ALT_GRAPH ||
        event.key === EKeyCode.CONTROL ||
        event.key === EKeyCode.SHIFT ||
        event.key === EKeyCode.COMMAND
      ) {
        event.preventDefault();
        setCanBeforeSendMessage(true);
      }

      if (event.key === EKeyCode.ENTER && canBeforeSendMessage) {
        event.preventDefault();
        if (sendMessage) sendMessage();
      }
    };

    const handleKeyUp = (event: any) => {
      if (
        event.key === EKeyCode.ALT ||
        event.key === EKeyCode.ALT_GRAPH ||
        event.key === EKeyCode.CONTROL ||
        event.key === EKeyCode.SHIFT ||
        event.key === EKeyCode.COMMAND
      ) {
        event.preventDefault();
        setCanBeforeSendMessage(false);
      }

      if (event.key === EKeyCode.ENTER && canBeforeSendMessage) {
        event.preventDefault();
        if (sendMessage) sendMessage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [canBeforeSendMessage, sendMessage]);

  return {
    showContent,
  };
};

export default useBoxChat;
