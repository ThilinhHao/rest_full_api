import React from 'react';

import images from '@assets/images-base';
import PopupSetting from './PopupSetting/PopupSetting';
import useHeaderAgency from './HeaderHooks/useHeaderAgency';

import { Popconfirm, Row } from 'antd';
import { HeaderBarWrapper, IconAgency, MessageIconCompany, MessageImgAgency, UserImgAgency } from './headerBarStyle';

const HeaderAgency = ({ onHandleLogout, headerInfo, isLoadingHeaderInfo, navigateToTopPage }: any) => {
  const { colorBgContainer, toAgencyProfile, isHasNewNotify, handleClickNotice } = useHeaderAgency();

  return (
    <HeaderBarWrapper style={{ height: '3.75rem', background: colorBgContainer }}>
      <IconAgency src={images.sideBar.moibuchoOperator} onClick={navigateToTopPage} />

      <Row>
        <MessageIconCompany>
          <MessageImgAgency
            src={images.header.agencyNotification}
            alt={images.header.agencyNotification}
            onClick={handleClickNotice}
          />
          {isHasNewNotify && <img className="new" src={images.common.newNotice} alt="" />}
        </MessageIconCompany>
        <Popconfirm
          className="popupProfile"
          placement="bottomRight"
          title={
            <PopupSetting
              name={headerInfo?.div_name}
              userName={headerInfo?.full_name}
              isLoading={isLoadingHeaderInfo}
              onHandleLogout={onHandleLogout}
              onClickProfile={toAgencyProfile}
            />
          }
        >
          <UserImgAgency src={images.header.agencyUser} alt={images.header.agencyUser} />
        </Popconfirm>
      </Row>
    </HeaderBarWrapper>
  );
};

export default HeaderAgency;
