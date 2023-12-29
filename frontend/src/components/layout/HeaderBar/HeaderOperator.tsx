import React, { memo, useEffect, useState } from 'react';

import {
  HeaderBarWrapper,
  IconNotice,
  IconOperator,
  MessageIconOperator,
  MessageImgOperator,
  UserImgOperator,
} from './headerBarStyle';
import images from '@assets/images-base';
import useHeaderOperator from './HeaderHooks/useHeaderOperator';

import { Popconfirm, Row } from 'antd';
import PopupSetting from './PopupSetting/PopupSetting';
import { CONST_COMMON } from 'constants/language';
import { RowCenter } from 'styles';

const ReNotice = memo(({ notice }: { notice: string }) => {
  const [noticeShow, setNoticeShow] = useState('');

  useEffect(() => {
    if (notice) {
      setNoticeShow('');
      setTimeout(() => {
        setNoticeShow(notice);
      }, 0);
    }
  }, [notice]);

  return (
    <>
      {noticeShow ? (
        <div id="scroll-container">
          <IconNotice src={images.operator.noticeTopPageOperator} alt="" />
          <div id="scroll-text">{noticeShow}</div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
});

const HeaderOperator = ({ onHandleLogout, headerInfo, isLoadingHeaderInfo, navigateToTopPage }: any) => {
  const { handleClickChat, messagesNotReadShow, colorBgContainer, listNoticeCurrent } = useHeaderOperator({
    onHandleLogout,
  });

  return (
    <HeaderBarWrapper style={{ height: '3.75rem', background: colorBgContainer }}>
      <RowCenter>
        <IconOperator src={images.sideBar.moibuchoOperator} onClick={navigateToTopPage} />
        {listNoticeCurrent[0] && listNoticeCurrent.length > 0 && <ReNotice notice={listNoticeCurrent[0]} />}
      </RowCenter>
      <Row>
        <MessageIconOperator>
          <MessageImgOperator src={images.header.message} alt="" onClick={handleClickChat} />
          {messagesNotReadShow > 0 && <span>{messagesNotReadShow}</span>}
        </MessageIconOperator>
        <Popconfirm
          className="popupProfile"
          placement="bottomRight"
          title={
            <PopupSetting
              name={CONST_COMMON.OPERATION}
              userName={headerInfo?.full_name}
              isLoading={isLoadingHeaderInfo}
              onHandleLogout={onHandleLogout}
            />
          }
        >
          <UserImgOperator src={images.header.user} alt="" />
        </Popconfirm>
      </Row>
    </HeaderBarWrapper>
  );
};

export default HeaderOperator;
