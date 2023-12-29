import { Collapse } from 'antd';
import styled from 'styled-components';

export const BoxWrapper = styled(Collapse)`
  background-color: white;
  border: none;
  font-family: 'Noto Sans JP', sans-serif !important;
  .ant-collapse-header {
    padding: 0 !important;
    .ant-collapse-expand-icon {
      display: none !important;
    }
  }
  .ant-collapse-content-box {
    padding: 0 !important;
  }
  .ant-collapse-item {
    border-bottom: none;
  }
  .ant-collapse-content {
    border-top: none !important;
  }
`;
export const TitleBox = styled.div<any>`
  display: flex;
  align-items: center;
  padding-bottom: 0.469rem;
  span {
    font-weight: 500 !important;
    margin-left: 3.125rem;
    font-size: 1.5rem;
    margin-right: 1.25rem;
  }
  img {
    width: 1.875rem;
    height: auto;
    cursor: pointer;
    margin-bottom: -0.3rem;
    -moz-transition: all 0.3s linear;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.15);
    border-radius: 20rem;
    -moz-transform: ${(props) => (props?.isOpen ? 'unset' : 'rotate(180deg)')};
    -webkit-transform: ${(props) => (props?.isOpen ? 'unset' : 'rotate(180deg)')};
    transform: ${(props) => (props?.isOpen ? 'unset' : 'rotate(180deg)')};
  }
`;
