import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { BoxChatMainWrapper } from './style';
import { SpinLoading } from '@components/Loading/LoadingStyle';

interface IBoxChatMain {
  children: any;
  boxChatRef: React.MutableRefObject<HTMLDivElement | null>;
  listMessage: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalMesssage: number;
}

export const BoxChatMain = ({ children, boxChatRef, listMessage, setPage, totalMesssage }: IBoxChatMain) => {
  return (
    <BoxChatMainWrapper id="scrollableDiv">
      <div ref={boxChatRef} />
      <InfiniteScroll
        dataLength={listMessage.length}
        next={() => setPage((prev) => prev + 1)}
        className="infiniteScroll"
        inverse={true}
        hasMore={listMessage.length < totalMesssage}
        loader={<SpinLoading />}
        scrollableTarget="scrollableDiv"
      >
        {children}
      </InfiniteScroll>
    </BoxChatMainWrapper>
  );
};
