import { Collapse } from 'antd';
import { colors } from 'constants/colorsBase';
import styled from 'styled-components';

export const FootstepsHistoryContentWrapper = styled.div`
  width: 91.25rem;
  margin-left: 8rem;
  padding-bottom: 5rem;
  .ant-collapse > .ant-collapse-item:last-child {
    border-radius: 0 !important;
  }
`;
export const CollapseAccordionWrapper = styled(Collapse)`
  background-color: white;
  border: none;
  .ant-collapse-header {
    margin-top: 3.125rem;
    padding: 0rem !important;
    .ant-collapse-expand-icon {
      display: none !important;
    }
  }
  .ant-collapse-item {
    border-bottom: 1px solid ${colors.lineColor};
  }
  .ant-collapse-content {
    border-color: ${colors.lineColor};
  }
  .ant-collapse-item-active {
    border-bottom: none !important;
  }
`;
export const TitleBoxCollapseAccordion = styled.div<any>`
  display: flex;
  align-items: center;
  padding-bottom: 0.469rem;
  span {
    margin-left: 3.125rem;
    font-size: 1.5rem;
    margin-right: 1.25rem;
    font-weight: 500;
  }
  img {
    user-select: none;
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
export const ItemHistoryCollapse = styled.div`
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  border-bottom: 1px solid #d8d8d8;
  display: flex;
  align-items: center;
  padding-top: 1.25rem;
  padding-bottom: 0.625rem;
`;
export const ImgPerson = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;
export const ContentHistory = styled.div`
  color: #6e6e6e;
  font-size: 1.125rem;
  margin-left: 1.25rem;
  width: 75rem;
`;
export const TimeHistory = styled.div`
  color: #6e6e6e;
  margin-left: 1rem;
  font-size: 1rem;
`;
