import { colors } from 'constants/colorsBase';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styled from 'styled-components';
export const SideBarWrapper = styled(Layout)`
  height: 100vh;
  aside {
    width: 12.5rem !important;
    max-width: 12.5rem !important;
    min-width: 12.5rem !important;
  }
  .ant-layout-sider-collapsed {
    width: 3.75 !important;
    max-width: 3.75rem !important;
    min-width: 3.75rem !important;
  }
  .ant-layout-sider-collapsed {
    width: 3.75rem !important;
    max-width: 3.75rem !important;
    min-width: 3.75rem !important;
  }
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

export const MenuWrapper = styled(Menu)`
  .ant-menu-title-content {
    position: absolute;
    left: 2.7rem;
  }
  .ant-menu-item {
    position: relative;
    font-size: 0.875rem;
    padding-inline: 0.25rem !important;
    padding: 0.25rem 0;
    display: flex;
    padding-left: 0.375rem !important;
    text-overflow: ellipsis !important;
    height: max-content;
    margin-bottom: 0.8rem !important;
    line-height: 2.5rem;
    margin-inline: 0.25rem;
    margin-block: 0.25rem;
    width: calc(100% - 0.5rem);
    font-family: 'Yu Gothic', YuGothic, 'Noto Sans JP', sans-serif !important;
  }
  .ant-menu-item-selected {
    color: ${colors.white};
    background-color: rgb(255, 255, 255, 0.2) !important;
  }
`;
export const IconMenu = styled.img`
  cursor: pointer;
  width: 2.563rem;
  height: 2.844rem;
  margin: 1rem 0.6rem 0rem 0.6rem;
  left: 0;
`;
export const IconMenuWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const MenuItemIcon = styled.img<any>`
  cursor: pointer;
  width: ${(props) => props?.width || '2.5rem'} !important;
  height: ${(props) => props?.height || '2.5rem'};
  filter: ${(props) => (props?.boxShadow ? 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25))' : 'unset')};
`;
export const LogoWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1.25rem;
  color: ${colors.white};
  font-weight: 700;
`;
export const MoaiIcon = styled.img`
  width: 2.125rem;
  height: 3.875rem;
`;
export const Moaibucho = styled.img<any>`
  width: 3.125rem;
  transition: all 0.3s ease-in-out;
  height: 2.75rem;
  &.content {
    width: 0;
    overflow: hidden;
  }

  &.showContent {
    margin-left: 1rem;
    width: 3.125rem;
    overflow-y: scroll;
    margin-bottom: 0.3rem;
  }
`;
export const ContentPage = styled(Content)`
  section {
    width: 100%;
    height: 100%;
  }
`;
