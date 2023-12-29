import React from 'react';

import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom';

import {
  ContentItemItemNoticeCompany,
  ItemNoticeCompanyWrapper,
  TimeNotice,
  TitleItemCompany,
  TitleItemItemNoticeCompany,
} from './itemNoticeCompanyStyle';
import { EMessageUser } from 'constants/constants';
import images from '@assets/images-base';

const ItemNoticeCompany = ({
  id,
  title,
  time,
  content,
  status,
}: {
  id: number;
  status: number;
  title: string;
  time: string;
  content: string;
}) => {
  const navigate = useNavigate();
  return (
    <ItemNoticeCompanyWrapper onClick={() => navigate(`detail/${id}`)}>
      <div>
        {status === EMessageUser.UN_VIEW && <img className="box_new" src={images.common.newNotice} alt="" />}
        <TitleItemItemNoticeCompany>
          <TitleItemCompany>{title}</TitleItemCompany>
          <TimeNotice>{dayjs(time).format('YYYY/MM/DD')}</TimeNotice>
        </TitleItemItemNoticeCompany>
        <ContentItemItemNoticeCompany>{content}</ContentItemItemNoticeCompany>
      </div>
    </ItemNoticeCompanyWrapper>
  );
};

export default ItemNoticeCompany;
