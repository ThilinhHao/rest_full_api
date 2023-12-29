import React from 'react';

import ItemNoticeCompany from './ItemNoticeCompany/ItemNoticeCompany';

import { INoticeCompany } from '@pages/CompanySite/NoticeListCompany/useNoticeListCompany';
import { NoticeCompanyListWrapper } from './noticeCompanyListStyle';

const NoticeCompanyList = ({ listNoticeCompany }: { listNoticeCompany: INoticeCompany[] }) => {
  return (
    <NoticeCompanyListWrapper>
      {listNoticeCompany.map((element: INoticeCompany) => (
        <div key={element.id}>
          <ItemNoticeCompany
            id={element.id}
            title={element.title}
            time={element.created_at}
            content={element.content}
            status={element.status}
          />
        </div>
      ))}
    </NoticeCompanyListWrapper>
  );
};

export default NoticeCompanyList;
