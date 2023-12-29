import { INotice } from '@pages/OperatorSite/NoticeList/useNoticeList';
import React from 'react';
import { DateTitle, ItemListNoticeWrapper, NewTitle, TitleWrapper, ContentItemListNotice } from './itemListNoticeStyle';
import { formatStrDateTimezone } from 'helper/date';

const ItemListNotice = ({ element, toDetail }: { element: INotice; toDetail: (idNotice: number) => void }) => {
  return (
    <ItemListNoticeWrapper onClick={() => toDetail(element.id)}>
      <TitleWrapper>
        <NewTitle>{element.title}</NewTitle>
        <DateTitle>{formatStrDateTimezone(element.updated_at)}</DateTitle>
      </TitleWrapper>
      <ContentItemListNotice>{element.content}</ContentItemListNotice>
    </ItemListNoticeWrapper>
  );
};

export default ItemListNotice;
