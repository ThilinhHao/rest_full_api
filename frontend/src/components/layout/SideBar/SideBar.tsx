import React, { useMemo, useState } from 'react';

import images from '@assets/images-base';
import configs from 'config';
import HeaderBar from '../HeaderBar/HeaderBar';
import useSideBar from './useSideBar';

import { Layout } from 'antd';
import { colors } from 'constants/colorsBase';
import { getFullHostName } from 'helper';

import {
  IconMenu,
  MenuWrapper,
  SideBarWrapper,
  LogoWrapper,
  ContentPage,
  IconMenuWrapper,
  MoaiIcon,
  Moaibucho,
} from './sideBarStyle';

const { Sider } = Layout;

const SideBar = ({ content }: any) => {
  const [collapsed, setCollapsed] = useState(true);

  const { ITEM_MENU, keyToPath, pathToKey } = useSideBar();

  const bgColorSider = useMemo(() => {
    if (getFullHostName() === configs.APP_FRONTEND_OPERATOR) {
      return colors.mainColor;
    }
    if (getFullHostName() === configs.APP_FRONTEND_AGENCY) {
      return colors.mainColorAgency;
    }
    if (getFullHostName() === configs.APP_FRONTEND_COMPANY) {
      return colors.mainColorCompany;
    }
    return colors.mainColor;
  }, []);

  return (
    <SideBarWrapper>
      <HeaderBar />
      <Layout hasSider={true}>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          style={{
            backgroundColor: bgColorSider,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <IconMenuWrapper>
              <IconMenu
                src={collapsed ? images.sideBar.menu : images.sideBar.close}
                onClick={() => setCollapsed(!collapsed)}
              />
            </IconMenuWrapper>
            <MenuWrapper
              style={{
                backgroundColor: bgColorSider,
                color: 'white',
                fontWeight: 700,
              }}
              onClick={(e: any) => keyToPath(e.key)}
              // _internalDisableMenuItemTitleTooltip={true}
              selectedKeys={[`${pathToKey()}`]}
              items={ITEM_MENU}
            />
          </div>
          <LogoWrapper>
            <MoaiIcon src={images.sideBar.moai} />
            <Moaibucho
              className={!collapsed ? 'showContent content' : 'content'}
              src={images.sideBar.moibuchoSideBar}
            />
          </LogoWrapper>
        </Sider>
        <ContentPage>{content}</ContentPage>
      </Layout>
    </SideBarWrapper>
  );
};

export default SideBar;
