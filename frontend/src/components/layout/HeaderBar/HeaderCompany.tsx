import React from 'react';

import images from '@assets/images-base';
import PopupSetting from './PopupSetting/PopupSetting';
import useHeaderCompany from './HeaderHooks/useHeaderCompany';
import './styles.scss';

import { USER_TYPE_IP_SUPPORT, USER_TYPE_OWNER } from 'constants/User';
import { Popconfirm, Row, Select } from 'antd';
import {
  HeaderBarWrapper,
  IconCompany,
  ListCompanyB2B,
  MessageIconCompany,
  MessageImgCompany,
  SuffixIcon,
  UserImgCompany,
} from './headerBarStyle';
import { IListCompanyB2BPaired } from 'constants/company';
import { EStatusCompany } from 'constants/constants';

const { Option } = Select;

const HeaderCompany = ({
  onHandleLogout,
  onHandleProfile,
  headerInfo,
  isLoadingHeaderInfo,
  navigateToTopPage,
}: any) => {
  const {
    handleClickChat,
    navigate,
    authInfo,
    messagesNotRead,
    colorBgContainer,
    isHasNewNotify,
    handleClickNotice,
    listCompanyB2BPaired,
    companyIdLeague,
    changeCompanyLeague,
  } = useHeaderCompany();
  return (
    <HeaderBarWrapper style={{ height: '3.75rem', background: colorBgContainer }}>
      <IconCompany src={images.sideBar.moibuchoCompany} onClick={navigateToTopPage} />

      <Row>
        {listCompanyB2BPaired &&
          listCompanyB2BPaired?.length >= 1 &&
          authInfo &&
          authInfo?.company?.status !== EStatusCompany.STATUS_SUSPEND && (
            <ListCompanyB2B
              value={companyIdLeague || authInfo?.company?.id}
              onSelect={(e) => changeCompanyLeague(Number(e))}
              suffixIcon={<SuffixIcon src={images.companySite.iconSelect} alt="" />}
              id="ListCompanyB2B"
            >
              <Option key={authInfo?.company?.id} value={authInfo?.company?.id}>
                {authInfo?.company?.name}
              </Option>
              {listCompanyB2BPaired.map((element: IListCompanyB2BPaired) => (
                <Option key={element.id} value={element.id}>
                  {element.name}
                </Option>
              ))}
            </ListCompanyB2B>
          )}
        {!(companyIdLeague && companyIdLeague !== authInfo?.company?.id) && (
          <>
            {authInfo?.company?.status !== EStatusCompany.STATUS_SUSPEND && (
              <MessageIconCompany>
                <MessageImgCompany
                  src={images.header.companyNotification}
                  alt={images.header.companyNotification}
                  onClick={handleClickNotice}
                />
                {isHasNewNotify && <img className="new" src={images.common.newNotice} alt="" />}
              </MessageIconCompany>
            )}
            {(authInfo?.user?.type === USER_TYPE_OWNER || authInfo?.user?.type === USER_TYPE_IP_SUPPORT) &&
              authInfo?.company?.status !== EStatusCompany.STATUS_SUSPEND && (
                <MessageIconCompany>
                  <MessageImgCompany src={images.header.companyMessage} alt="" onClick={handleClickChat} />
                  {messagesNotRead > 0 && <span>{messagesNotRead}</span>}
                </MessageIconCompany>
              )}
            <Popconfirm
              className="popupProfile"
              placement="bottomRight"
              title={
                <PopupSetting
                  name={headerInfo?.div_name}
                  userName={headerInfo?.full_name}
                  isLoading={isLoadingHeaderInfo}
                  onHandleLogout={onHandleLogout}
                  onClickProfile={
                    authInfo?.company?.status === EStatusCompany.STATUS_SUSPEND ||
                    authInfo?.user?.type !== USER_TYPE_OWNER
                      ? undefined
                      : () => navigate('/profile-detail')
                  }
                />
              }
            >
              <UserImgCompany src={images.header.companyUser} alt="" />
            </Popconfirm>
          </>
        )}
      </Row>
    </HeaderBarWrapper>
  );
};

export default HeaderCompany;
